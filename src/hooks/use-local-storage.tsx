/* eslint-disable no-console */
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "../utils/local-storage";

/* inspired from from https://usehooks.com/useLocalStorage/ */
export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

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

    /* Remove from local storage if value is same as initial value */
    if (value === initialValue) {
      setStoredValue(value);
      removeLocalStorageItem(key);
      return;
    }

    /* if not same as initial value, set it to local storage */
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
  }, [key]);

  return {
    storedValue,
    setValue,
  };
}
