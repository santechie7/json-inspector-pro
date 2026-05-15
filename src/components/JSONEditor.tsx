import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { useStore } from '../store/useStore';

interface JSONEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
}

export const JSONEditor: React.FC<JSONEditorProps> = ({ 
  value, 
  onChange, 
  language = 'json', 
  readOnly = false 
}) => {
  const theme = useStore((state) => state.theme);

  const handleEditorWillMount = (monaco: Monaco) => {
    // Custom monaco configuration if needed
  };

  return (
    <div className="editor-container h-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        value={value}
        onChange={onChange}
        beforeMount={handleEditorWillMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true,
          wordWrap: 'on',
        }}
      />
    </div>
  );
};
