export const processCategories = (caption) => {
  const categories = caption.match(/#[^#\s]+/g) || [];
  return categories.map((category) => ({
    where: { category },
    create: { category },
  }));
};
