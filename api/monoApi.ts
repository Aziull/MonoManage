import secureStoreService from "../services/secureStoreService";
import { Transaction } from "../types/transaction";
import { apiConfig } from "./config";


export async function getTransactions(account: number, from: Date, to: Date): Promise<Transaction[]> {
  try {
    const apiUrl = `${apiConfig.monobank}/statement/${account}/${from.getTime()}/${to.getTime()}`;
    const token = await secureStoreService.getAuthToken();

    const headers = new Headers({
      'X-Token': token,
      'Content-Type': 'application/json',
    });

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch(apiUrl, requestOptions);

    

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
