export const getPath = (href?: string) => {
  if (!href) return '';

  if (href.startsWith('/')) {
    return `${import.meta.env.BASE_URL}?path=${href}`;
  }

  return href;
};
