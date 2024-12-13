import { useState } from 'react';
import { verifyCompany } from '../../lib/api/kas';
import type { PolishCompanyData } from '../../lib/api/types';

export default function PolishVat() {
  const [nip, setNip] = useState('');
  const [companyData, setCompanyData] = useState<PolishCompanyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCompanyData(null);

    try {
      const data = await verifyCompany(nip);
      setCompanyData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
            NIP
          </label>
          <input
            type="text"
            id="nip"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter NIP"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Checking...' : 'Check NIP'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {companyData && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">{companyData.name}</h3>
          <dl className="mt-2 text-sm text-gray-500">
            <div className="mt-1">
              <dt className="inline font-medium">NIP: </dt>
              <dd className="inline">{companyData.nip}</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">Status: </dt>
              <dd className="inline">{companyData.statusVat}</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">REGON: </dt>
              <dd className="inline">{companyData.regon}</dd>
            </div>
            <div className="mt-1">
              <dt className="inline font-medium">Address: </dt>
              <dd className="inline">{companyData.workingAddress}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
