export const searchIndexById = (notes, searchKey) => {
  const index = notes.findIndex((el) => {
    if (el.id === searchKey) return true;
    return false;
  });
  return index;
};
