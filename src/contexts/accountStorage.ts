/**
 * Provides a local storage utility class to store the connected account address.
 */
export class AccountStorage {
    static CONNECTED_ADRR_STORAGE_KEY = 'connectedAddress';
    static getConnectedAddress = () =>
      localStorage.getItem(this.CONNECTED_ADRR_STORAGE_KEY);
    static setConnectedAddress = (address: string) =>
      localStorage.setItem(this.CONNECTED_ADRR_STORAGE_KEY, address);
  }