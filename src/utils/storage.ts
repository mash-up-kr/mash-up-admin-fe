export const getLocalStorageData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) ?? '{}');
};
