import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TabType = 'viewer' | 'formatter' | 'validator' | 'compare' | 'schema' | 'settings';

interface JSONState {
  // Main JSON for viewer/formatter/validator/schema
  mainJson: string;
  setMainJson: (json: string) => void;

  // Comparison JSONs
  leftJson: string;
  rightJson: string;
  setLeftJson: (json: string) => void;
  setRightJson: (json: string) => void;

  // UI State
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Settings
  indentSize: number;
  setIndentSize: (size: number) => void;
}

export const useStore = create<JSONState>()(
  persist(
    (set) => ({
      mainJson: '{\n  "name": "JSON Inspector Pro",\n  "version": "1.0.0",\n  "features": ["Viewer", "Validator", "Compare", "Schema"]\n}',
      setMainJson: (mainJson) => set({ mainJson }),

      leftJson: '{\n  "id": 1,\n  "status": "pending"\n}',
      rightJson: '{\n  "id": 1,\n  "status": "completed",\n  "tags": ["new"]\n}',
      setLeftJson: (leftJson) => set({ leftJson }),
      setRightJson: (rightJson) => set({ rightJson }),

      activeTab: 'formatter',
      setActiveTab: (activeTab) => set({ activeTab }),
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      indentSize: 2,
      setIndentSize: (indentSize) => set({ indentSize }),
    }),
    {
      name: 'json-inspector-storage',
    }
  )
);
