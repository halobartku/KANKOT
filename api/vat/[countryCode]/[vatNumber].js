import axios from 'axios';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { countryCode, vatNumber } = req.query;

  if (!countryCode || !vatNumber) {
    return res.status(400).json({
      error: 'Missing required parameters: countryCode and vatNumber'
    });
  }

  try {
    console.log(`Verifying VAT: ${countryCode}${vatNumber}`);
    
    const response = await axios.get(
      `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${countryCode}/vat/${vatNumber}`,
      {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('VIES API Response:', response.data);

    // Ensure we're sending a properly formatted response
    return res.status(200).json({
      valid: response.data.valid || false,
      traderName: response.data.traderName,
      traderAddress: response.data.traderAddress,
      requestDate: new Date().toISOString()
    });

  } catch (error) {
    console.error('VIES API Error:', error.response?.data || error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data?.message || 'Failed to verify VAT number',
        details: error.response.data
      });
    } else if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'VIES service timeout. Please try again.'
      });
    } else {
      return res.status(500).json({
        error: 'Failed to connect to VIES service',
        message: error.message
      });
    }
  }
}
