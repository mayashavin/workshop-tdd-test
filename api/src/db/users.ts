export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "",
    orders: [],
  },
];

export const getUser = (id: string | number) => {
  return users.find((user) => user.id === id);
};

export const updateUser = async (
  id: string | number,
  field: string,
  data: any
) => {
  const user = users.find((user) => user.id === id);

  if (user) {
    user[field] = data;
    return user;
  }

  throw new Error("User not found");
};
