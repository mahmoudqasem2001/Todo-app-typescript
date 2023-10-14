/**
 * Saves data to the local storage using the provided key.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {*} data - The data to be saved in the local storage.
 * @returns {void}
 */
export function saveDataToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}
/**
 * Retrieves data from the local storage using the provided key.
 *
 * @param {string} key - The key to look up in the local storage.
 * @returns {*} The retrieved data, or null if no data is found for the given key.
 */
export function getDataFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
