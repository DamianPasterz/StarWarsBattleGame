export const extractNumberFromUrl = (url: string): string => {
  const matches = url.match(/\d+$/);

  if (matches) {
    return matches[0];
  }

  return null;
};
