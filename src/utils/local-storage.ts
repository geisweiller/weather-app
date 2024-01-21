const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const removeLocalStorageItem = (key: string) => {
  const item = getLocalStorageItem(key);
  if (item) {
    window.localStorage.removeItem(key);
  }
};

export { getLocalStorageItem, removeLocalStorageItem };
