/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useStore } from './store/useStore';
import { ViewerPage } from './pages/ViewerPage';
import { FormatterPage } from './pages/FormatterPage';
import { ValidatorPage } from './pages/ValidatorPage';
import { ComparePage } from './pages/ComparePage';
import { SchemaPage } from './pages/SchemaPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { activeTab, theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'viewer':
        return <ViewerPage />;
      case 'formatter':
        return <FormatterPage />;
      case 'validator':
        return <ValidatorPage />;
      case 'compare':
        return <ComparePage />;
      case 'schema':
        return <SchemaPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ViewerPage />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg)] font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" theme={theme} richColors />
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
}
