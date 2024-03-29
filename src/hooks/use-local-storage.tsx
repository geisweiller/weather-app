import { useEffect, useState } from "react";

import { getLocalStorageItem } from "../utils/local-storage";

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = getLocalStorageItem(key);
      return item || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    if (typeof window === "undefined") {
      console.warn(`Enviroment is not a client “${key}” was not set`);
    }

    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const item = getLocalStorageItem(key);
      setValue(item || initialValue);
    } catch (error) {
      console.log(error);
      setValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, initialValue]);

  return {
    storedValue,
    setValue,
  };
}
