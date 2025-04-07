/**
 * This will load data from session storage given a key or returns a default
 * @param keyVal the key to retrieve from session storage
 * @param initialState The default value to return if no data exists
 * @returns stored data or the initialState
 */

const loadFromSessionStorage = <T>(keyVal: string, initialState: T): T => {
  try {
    const storedData = sessionStorage.getItem(keyVal);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error loading from session storage:", error);
  }
  return initialState;
};

/**
 * saves data to session storage
 * @param keyVal the key to store data under
 * @param state the data you want to add to the stoage
 */

const saveToSessionStorage = <T>(keyVal: string, state: T): void => {
  try {
    sessionStorage.setItem(keyVal, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to session storage:", error);
  }
};

export { loadFromSessionStorage, saveToSessionStorage };
