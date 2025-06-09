export const storage = {
  set: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key: string) => {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  remove: (key: string) => localStorage.removeItem(key),
};
