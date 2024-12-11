import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../lib/utils';
import { fetchCountries, fetchCountryMetrics } from '../lib/api';

interface Metric {
  value: number;
  trend: number;
  historicalData?: number[];
}

interface Metrics {
  [key: string]: Metric;
}

interface MetricCardProps {
  title: string;
  value: number | null;
  trend: number;
  unit: string;
  description: string;
  data: number[];
}

interface Country {
  code: string;
  name: string;
}

const Analytics = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [countries, setCountries] = useState<Country[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      loadCountryMetrics(selectedCountry);
    }
  }, [selectedCountry]);

  const loadCountries = async () => {
    try {
      const data = await fetchCountries();
      setCountries(data);
    } catch (err) {
      setError('Failed to load countries');
      console.error('Error loading countries:', err);
    }
  };

  const loadCountryMetrics = async (countryCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryMetrics(countryCode);
      setMetrics(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to load country metrics');
      console.error('Error loading metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (selectedCountry) {
      loadCountryMetrics(selectedCountry);
    }
  };

  const MetricCard = ({ title, value, trend, unit, description, data }: MetricCardProps) => {
    const isPositive = trend >= 0;
    const isPopulation = title.toLowerCase() === "population";

    // Check for data anomalies
    const hasAnomalies = data.some(val => {
      if (title.toLowerCase() === "exports" || title.toLowerCase() === "gdp growth") {
        return Math.abs(val) > 50; // Significant changes over 50%
      }
      return false;
    });

    const isDataMissing = data.every(val => val === 0) || value === 0;

    // Format numbers with commas and appropriate decimal places
    const formatNumber = (num: number) => {
      if (num === 0 && isDataMissing) {
        return "No data";
      }

      // Population is already in millions from the API
      if (isPopulation) {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      // Special formatting for GNI Per Capita with 2 decimal places
      if (title.toLowerCase() === "gnipercapita") {
        if (num >= 1000) {
          return (num / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
        }
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      // Regular formatting for other metrics
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Format tooltip values
    const formatTooltipValue = (value: number) => {
      if (isPopulation) {
        return value.toFixed(2) + "M";
      }
      if (title.toLowerCase() === "gnipercapita") {
        if (value >= 1000) {
          return (value / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
        }
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return value.toLocaleString() + unit;
    };

    const formattedValue = value !== null ? formatNumber(value) : 'N/A';
    const chartData = data?.map((value, index) => ({ 
      value,
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index % 12]
    })) || [];

    const formatTitle = (title: string) => {
      // First convert camelCase to space-separated words
      const spaced = title.replace(/([A-Z])/g, ' $1').trim();
      
      // Special handling for GDP and GNI
      return spaced
        .replace(/Gdp/g, 'GDP')
        .replace(/Gni/g, 'GNI')
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
          if (word === 'gdp') return 'GDP';
          if (word === 'gni') return 'GNI';
          return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
        })
        .join(' ');
    };

    const formattedTitle = formatTitle(title);
    const formattedDescription = formatTitle(description);

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-white/90 to-emerald-50/80 p-3 rounded-lg shadow-lg border border-emerald-100/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{formattedTitle}</h3>
            {(hasAnomalies || isDataMissing) && (
              <div className="group relative inline-block">
                <div className="text-gray-500 cursor-help">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div className="absolute left-0 top-[calc(100%+4px)] w-48 px-3 py-2 bg-white text-gray-600 text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 z-50">
                  <div className="absolute bottom-full left-2 border-8 border-transparent border-b-white"></div>
                  {hasAnomalies && (
                    <p className="mb-2">Unusual variations detected in this metric. This might be due to economic events or data reporting changes.</p>
                  )}
                  {isDataMissing && (
                    <p>{formattedDescription}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {value !== null && !isDataMissing && (
            <div className={cn(
              "flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium",
              isPositive ? "text-emerald-700 bg-emerald-100" : "text-red-700 bg-red-100"
            )}>
              <span className="mr-0.5">{isPositive ? "↑" : "↓"}</span>
              {Math.abs(trend).toFixed(2)}%
            </div>
          )}
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-white/50 rounded-lg p-1 border border-emerald-100/20">
            <span className="text-xs font-medium text-gray-600">Current</span>
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-gray-900">{formattedValue}</span>
              {value !== null && !isDataMissing && (
                <span className="ml-1 text-xs text-gray-600">{unit}</span>
              )}
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-1 border border-emerald-100/20">
            <span className="text-xs font-medium text-gray-600">1Y Avg</span>
            <div>
              <span className="text-lg font-bold text-gray-900">{formatNumber(data.slice(-12).reduce((a, b) => a + b, 0) / 12)}</span>
              {!isDataMissing && (
                <span className="ml-1 text-xs text-gray-600">{unit}</span>
              )}
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-2 bg-white/50 rounded-lg p-1 border border-emerald-100/20">
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 8, fill: '#6B7280' }}
                  interval="preserveStartEnd"
                  height={10}
                />
                <YAxis 
                  domain={[Math.min(...data) * 0.95, Math.max(...data) * 1.05]}
                  tick={{ fontSize: 8, fill: '#6B7280' }}
                  width={20}
                  tickFormatter={(value) => {
                    if (isPopulation) {
                      return (value / 1000000).toFixed(2);
                    }
                    if (title.toLowerCase() === "gnipercapita") {
                      return value.toFixed(2);
                    }
                    return value.toFixed(0);
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    padding: '4px 8px'
                  }}
                  formatter={(value: any) => [formatTooltipValue(value), 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#10B981" : "#EF4444"}
                  fill={`url(#gradient-${title})`}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Metrics Section */}
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-white/50 rounded-lg p-1 border border-emerald-100/20">
            <span className="text-xs font-medium text-gray-700">YoY</span>
            <div>
              <span className={cn(
                "text-xs font-semibold",
                trend > 0 ? "text-emerald-600" : "text-red-600"
              )}>
                {trend > 0 ? "+" : ""}{trend.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-1 border border-emerald-100/20">
            <span className="text-xs font-medium text-gray-700">Peak</span>
            <div>
              <span className="text-xs font-semibold text-gray-900">{formatNumber(Math.max(...data))}</span>
              {!isDataMissing && (
                <span className="text-xs text-gray-700">{unit}</span>
              )}
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-1 border border-emerald-100/20">
            <span className="text-xs font-medium text-gray-700">Low</span>
            <div>
              <span className="text-xs font-semibold text-gray-900">{formatNumber(Math.min(...data))}</span>
              {!isDataMissing && (
                <span className="text-xs text-gray-700">{unit}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50/95 via-emerald-50/80 to-blue-50/90 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Title Section */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Global Economic Analytics
          </h2>
          <p className="mt-1 text-base leading-6 text-gray-600">
            Real-time insights into key economic indicators
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Country Selection and Last Updated */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 mb-4">
          <div className="flex items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex-grow sm:flex-grow-0">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full h-full min-h-[38px] px-3 py-1.5 rounded-lg bg-white/80 border border-gray-200 text-gray-800 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors appearance-none"
                style={{ WebkitAppearance: 'menulist-button' }}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-white/80 border border-gray-200 text-gray-600 hover:text-emerald-600 transition-colors flex-shrink-0"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          <div className="text-sm text-gray-600 text-center sm:text-right">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {metrics && Object.entries(metrics).map(([key, metric]) => (
            <MetricCard
              key={key}
              title={key}
              value={metric.value}
              trend={metric.trend}
              unit={key === 'gdpGrowth' || key === 'inflation' || key === 'unemployment' ? '%' : 
                    key === 'population' ? 'M' :  // Keep 'M' as the unit for population
                    key === 'exports' ? '% of GDP' : 
                    '$'}
              description={key.replace(/([A-Z])/g, ' $1').trim()}
              data={metric.historicalData || Array(12).fill(0).map(() => Math.random() * metric.value * 1.2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Analytics };
export default Analytics;
