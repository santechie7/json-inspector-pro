import JSON5 from 'json5';
import yaml from 'js-yaml';

export interface FixReport {
  original: string;
  fixed: string;
  fixes: string[];
  isValid: boolean;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
}

export const fixJson = (input: string): FixReport => {
  const fixes: string[] = [];
  let current = input.trim();
  
  if (!current) {
    return { original: input, fixed: '', fixes: [], isValid: false, error: { message: 'Empty input' } };
  }

  try {
    // Attempt standard parse first
    JSON.parse(current);
    return { original: input, fixed: input, fixes: [], isValid: true };
  } catch (err: any) {
    // Not valid JSON, let's try to fix it
  }

  // Pre-process for common issues that JSON5 might not handle
  
  // 1. Single quotes to double quotes (naive check, JSON5 handles this well usually)
  // 2. Unquoted keys (JSON5 handles this)
  // 3. Trailing commas (JSON5 handles this)
  
  try {
    const parsed = JSON5.parse(current);
    const fixed = JSON.stringify(parsed, null, 2);
    
    // Determine what was fixed by comparing or checking features
    if (current.includes("'")) fixes.push('Replaced single quotes with double quotes');
    if (/(,(\s*)[}\]])/.test(current)) fixes.push('Removed trailing commas');
    if (/[{,]\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/.test(current)) fixes.push('Added quotes around keys');
    
    return {
      original: input,
      fixed,
      fixes: fixes.length > 0 ? fixes : ['Standardize formatting'],
      isValid: true
    };
  } catch (err: any) {
    return {
      original: input,
      fixed: '',
      fixes: [],
      isValid: false,
      error: {
        message: err.message,
        line: err.lineNumber,
        column: err.columnNumber
      }
    };
  }
};

export interface SchemaNode {
  name: string;
  type: string;
  nullable: boolean;
  required: boolean;
  children?: SchemaNode[];
}

export const generateSchema = (obj: any, name: string = 'root'): SchemaNode => {
  const type = obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj;
  const node: SchemaNode = {
    name,
    type,
    nullable: obj === null,
    required: true,
  };

  if (type === 'object' && obj !== null) {
    node.children = Object.keys(obj).map(key => generateSchema(obj[key], key));
  } else if (type === 'array' && obj.length > 0) {
    // For arrays, we peek at the first element's structure
    node.children = [generateSchema(obj[0], 'items')];
  }

  return node;
};

export const formatJson = (json: string, indent: number = 2): string => {
  try {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    return JSON.stringify(parsed, null, indent);
  } catch (e) {
    try {
      const parsed = JSON5.parse(json);
      return JSON.stringify(parsed, null, indent);
    } catch (e2) {
      return json;
    }
  }
};

export const minifyJson = (json: string): string => {
  try {
    const parsed = JSON5.parse(json);
    return JSON.stringify(parsed);
  } catch (e) {
    return json;
  }
};

export const jsonToYaml = (json: string): string => {
  try {
    const parsed = typeof json === 'string' ? JSON5.parse(json) : json;
    return yaml.dump(parsed);
  } catch (e) {
    return 'Invalid JSON for conversion';
  }
};

export const yamlToJson = (yamlStr: string): string => {
  try {
    const parsed = yaml.load(yamlStr);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return 'Invalid YAML for conversion';
  }
};
