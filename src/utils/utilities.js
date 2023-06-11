export const getStaticImage = (urlString) => {
  return new URL(`../${urlString}`, import.meta.url).href;
};