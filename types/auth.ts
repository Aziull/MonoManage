export interface User {
  id: string;
  name: string;
  bank?: AuthResponse;  // Банк є опціональним
}

export interface AuthResponse {
  clientId: string;
  name: string;
  webHookUrl: string;
  permissions: string;
  accounts: Account[];
  jars: Jar[];
}


// Визначення типу для відповіді аутентифікації
export interface AuthResponse {
  clientId: string;
  name: string;
  webHookUrl: string;
  permissions: string;
  accounts: Account[];
  jars: Jar[];
}

export interface Account {
  id: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type: string;
  currencyCode: number;
  cashbackType: string;
  maskedPan: string[];
  iban: string;
}

export interface Jar {
  id: string;
  sendId: string;
  title: string;
  description: string;
  currencyCode: number;
  balance: number;
  goal: number;
}

// Визначення типів для стану аутентифікації
export interface AuthState {
  user: AuthResponse | null;
  isLoading: boolean;
  error: string | null;
}
