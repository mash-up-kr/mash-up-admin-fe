export const getLocalStorageData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) ?? '{}');
};

export const setLocalStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
