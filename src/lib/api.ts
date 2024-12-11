import { Metric, Metrics } from '../types';

interface CountryData {
  code: string;
  name: string;
}

export async function fetchCountries(): Promise<CountryData[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Failed to fetch countries');
    
    const data = await response.json();
    return data
      .map((country: any) => ({
        code: country.cca3,
        name: country.name.common
      }))
      .sort((a: CountryData, b: CountryData) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function fetchCountryMetrics(countryCode: string): Promise<Metrics> {
  try {
    // Replace these URLs with your actual API endpoints
    const gdpResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`);
    const inflationResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json`);
    const unemploymentResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json`);
    const populationResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`);
    const gniResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GNP.PCAP.CD?format=json`);
    const exportsResponse = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.EXP.GNFS.ZS?format=json`);

    const [gdpData, inflationData, unemploymentData, populationData, gniData, exportsData] = await Promise.all([
      gdpResponse.json(),
      inflationResponse.json(),
      unemploymentResponse.json(),
      populationResponse.json(),
      gniResponse.json(),
      exportsResponse.json()
    ]);

    const processMetric = (data: any, isPopulation = false): Metric => {
      const values = data[1] || [];
      const historicalData = values.slice(0, 12).map((item: any) => {
        const value = item.value || 0;
        return isPopulation ? value / 1000000 : value;
      }).reverse();
      
      const currentValue = values[0]?.value || 0;
      const previousValue = values[1]?.value || 0;
      const trend = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;

      return {
        value: isPopulation ? currentValue / 1000000 : currentValue,
        trend,
        historicalData
      };
    };

    return {
      gdpGrowth: processMetric(gdpData),
      inflation: processMetric(inflationData),
      unemployment: processMetric(unemploymentData),
      population: processMetric(populationData, true),
      gniPerCapita: processMetric(gniData),
      exports: processMetric(exportsData)
    };
  } catch (error) {
    console.error('Error fetching country metrics:', error);
    throw error;
  }
}
