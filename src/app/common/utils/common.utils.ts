export function cleanObject<T>(obj: T): T {
  const cleanObj = {} as T;
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null) {
      cleanObj[key] = obj[key];
    }
  });
  return cleanObj;
}
