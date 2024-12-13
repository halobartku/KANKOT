import { PolishCompanyData } from './types';

export const verifyCompany = async (nip: string): Promise<PolishCompanyData> => {
  try {
    const response = await fetch(
      `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${new Date().toISOString().split('T')[0]}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to verify company');
    }

    const data = await response.json();
    
    if (!data.result.subject) {
      throw new Error('Company not found');
    }

    const subject = data.result.subject;
    
    return {
      name: subject.name,
      nip: subject.nip,
      statusVat: subject.statusVat,
      regon: subject.regon,
      workingAddress: subject.workingAddress 
        ? `${subject.workingAddress.street || ''} ${subject.workingAddress.number || ''}, ${subject.workingAddress.city || ''}`
        : 'Address not available'
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to verify company');
  }
};
