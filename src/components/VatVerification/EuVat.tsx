import { useState } from 'react';
import { verifyEuVat } from '../../lib/api/vies';
import type { EuCountry, ViesResponse } from '../../lib/api/types';

const EU_COUNTRIES: EuCountry[] = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' }
];

export default function EuVat() {
  const [country, setCountry] = useState<string>('');
  const [vatNumber, setVatNumber] = useState('');
  const [result, setResult] = useState<ViesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous results
    setError(null);
    setResult(null);

    // Validate inputs
    if (!country) {
      setError('Please select a country');
      return;
    }
    if (!vatNumber) {
      setError('Please enter a VAT number');
      return;
    }

    // Show loading state
    setLoading(true);

    try {
      const data = await verifyEuVat(country, vatNumber);
      setResult(data);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setResult(null);
              setError(null);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={loading}
          >
            <option value="">Select a country</option>
            {EU_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">
            VAT Number
          </label>
          <input
            type="text"
            id="vatNumber"
            value={vatNumber}
            onChange={(e) => {
              setVatNumber(e.target.value);
              setResult(null);
              setError(null);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter VAT number"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
        >
          {loading ? 'Verifying...' : 'Verify VAT Number'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div className={`mt-4 p-4 ${result.valid ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
          <div className={`text-lg font-medium mb-2 ${result.valid ? 'text-green-700' : 'text-yellow-700'}`}>
            {result.valid ? 'Valid VAT Number' : 'Invalid VAT Number'}
          </div>
          <dl className="space-y-2 text-sm text-gray-600">
            <div>
              <dt className="inline font-medium">VAT Number: </dt>
              <dd className="inline">{result.countryCode} {result.vatNumber}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Verification Date: </dt>
              <dd className="inline">
                {new Date(result.requestDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </dd>
            </div>
            {result.name && (
              <div>
                <dt className="inline font-medium">Company Name: </dt>
                <dd className="inline">{result.name}</dd>
              </div>
            )}
            {result.address && (
              <div>
                <dt className="inline font-medium">Address: </dt>
                <dd className="inline">{result.address}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
