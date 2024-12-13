import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('Serverless function called with:', {
    method: req.method,
    query: req.query,
    headers: req.headers
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { countryCode, vatNumber } = req.query;

  if (!countryCode || !vatNumber || Array.isArray(countryCode) || Array.isArray(vatNumber)) {
    console.error('Invalid parameters:', { countryCode, vatNumber });
    return res.status(400).json({
      error: 'Invalid parameters: countryCode and vatNumber must be strings'
    });
  }

  try {
    console.log(`Verifying VAT: ${countryCode}${vatNumber}`);
    
    const viesUrl = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${countryCode}/vat/${vatNumber}`;
    console.log('Calling VIES API:', viesUrl);

    const response = await axios.get(viesUrl, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    console.log('VIES API Response:', response.data);

    // Map the VIES API response to our expected format
    const responseData = {
      valid: response.data.isValid === true,
      traderName: response.data.name || null,
      traderAddress: response.data.address || null,
      requestDate: response.data.requestDate || new Date().toISOString(),
      userError: response.data.userError || null
    };

    console.log('Sending response:', responseData);
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('VIES API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      response: axios.isAxiosError(error) ? error.response?.data : null,
      stack: error instanceof Error ? error.stack : null
    });

    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status || 500).json({
        error: error.response.data?.message || 'Failed to verify VAT number',
        details: error.response.data || null
      });
    } else if (error instanceof Error && error.message.includes('timeout')) {
      return res.status(504).json({
        error: 'VIES service timeout. Please try again.',
        details: null
      });
    } else {
      return res.status(500).json({
        error: 'Failed to connect to VIES service',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: null
      });
    }
  }
}
