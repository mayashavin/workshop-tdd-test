export const filterItems = (
  items: Array<Object>,
  filterBy: string,
  query?: string
) => {
  if (query) {
    return items.filter((item) =>
      item[filterBy]?.toLowerCase().includes(query.toLowerCase())
    );
  }

  return items;
};
