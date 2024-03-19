import { getUser, updateUser } from "../db/users";

export interface Order {
  id: number;
  pizzas: PizzaOrder[];
  userId: string;
}

export interface PizzaOrder {
  pizzaId: string | number;
  quantity: number;
  unitPrice: number;
}

export const addOrder = async (order: Order): Promise<boolean> => {
  try {
    const user = await getUser(order.userId);

    if (user) {
      const orders = [...(user.orders || []), order];
      await updateUser(user.id, "orders", orders);
      return true;
    }

    throw new Error("User not found");
  } catch (err) {
    throw err;
  }
};
