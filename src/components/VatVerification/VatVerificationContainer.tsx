import { useState } from 'react';
import PolishVat from './PolishVat';
import EuVat from './EuVat';

export default function VatVerificationContainer() {
  const [activeTab, setActiveTab] = useState<'polish' | 'eu'>('polish');

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Verification Tools
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            VAT Number Verification
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Verify Polish NIP numbers and EU VAT numbers quickly and easily
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('polish')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${activeTab === 'polish'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } transition-colors duration-200`}
                >
                  Polish NIP
                </button>
                <button
                  onClick={() => setActiveTab('eu')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                    ${activeTab === 'eu'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } transition-colors duration-200`}
                >
                  EU VAT
                </button>
              </nav>
            </div>

            {activeTab === 'polish' ? <PolishVat /> : <EuVat />}
          </div>
        </div>
      </div>
    </section>
  );
}
