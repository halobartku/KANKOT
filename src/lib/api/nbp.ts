// NBP API for currency rates
const NBP_API_URL = 'https://api.nbp.pl/api/exchangerates/rates/a/eur?format=json';

// NBP API - pobieranie kursu EUR
export const getEurRate = async (): Promise<number> => {
  try {
    const response = await fetch(NBP_API_URL);
    
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania kursu EUR');
    }

    const data = await response.json();
    if (!data?.rates?.[0]?.mid) {
      throw new Error('Nieprawidłowa struktura danych z API NBP');
    }

    return data.rates[0].mid;
  } catch (error) {
    console.error('NBP API error:', error);
    return 4.50; // Default EUR rate if API fails
  }
};
