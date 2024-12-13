import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../lib/utils';
import PolishVat from './VatVerification/PolishVat';
import EuVat from './VatVerification/EuVat';

type TabType = 'polish' | 'eu';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<TabType>('polish');

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
        activeTab === tab
          ? "bg-[#862B44] text-white"
          : "text-gray-600 hover:text-[#862B44] hover:bg-[#862B44]/10"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50/95 via-[#862B44]/5 to-[#A13553]/5 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#862B44] to-[#A13553] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Weryfikacja Kontrahenta
          </h2>
          <p className="mt-1 text-base leading-6 text-gray-600">
            Sprawdź status VAT, dane rejestrowe i kursy walut
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 mb-8 p-1 bg-gray-100/80 rounded-lg">
            <TabButton tab="polish" label="Polski NIP" />
            <TabButton tab="eu" label="VAT UE" />
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'polish' ? <PolishVat /> : <EuVat />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Analytics };
export default Analytics;
