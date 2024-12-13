export interface EuCountry {
  code: string;
  name: string;
}

export interface PolishCompanyData {
  name: string;
  nip: string;
  statusVat: string;
  regon: string;
  workingAddress: string;
}

export interface ViesResponse {
  valid: boolean;
  countryCode: string;
  vatNumber: string;
  requestDate: string;
  name?: string;
  address?: string;
  userError?: string;
}
