export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const serializedData = window.localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : defaultValue;
  } catch (err) {
    console.error("Error loading data from local storage", err);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    window.localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error("Error saving data to local storage", err);
  }
};
