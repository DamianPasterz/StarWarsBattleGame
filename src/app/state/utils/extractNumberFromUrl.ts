export const extractNumberFromUrl = (url: string) => {
  let matches = url.match(/\d+$/);

  if (matches) {
    return matches[0];
  }

  return null;
};
