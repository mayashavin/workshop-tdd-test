import { describe, it, expect, vi } from "vitest";
import { addOrder, Order } from "./orders";
import * as userActions from "../db/users";
import { afterEach } from "node:test";

describe("addOrders", () => {
  //1. Spy on the users module
  const updateUserSpy = vi.spyOn(userActions, "updateUser");
  const getUserSpy = vi.spyOn(userActions, "getUser");

  it("adds an order", async () => {
    const order: Order = {
      id: 1,
      userId: "1",
      pizzas: [{ pizzaId: "1", quantity: 1, unitPrice: 10 }],
    };

    await addOrder(order);
    expect(getUserSpy).toHaveBeenCalledWith(order.userId);
    expect(updateUserSpy).toHaveBeenCalled();
  });

  it("adds order to existing order list", async () => {
    const order: Order = {
      id: 1,
      userId: "1",
      pizzas: [{ pizzaId: "1", quantity: 1, unitPrice: 10 }],
    };

    await addOrder(order);
    await addOrder(order);

    expect(getUserSpy).toHaveBeenCalled();
    expect(updateUserSpy).toHaveBeenNthCalledWith(2, "1", "orders", [
      order,
      order,
    ]);
  });

  it("throws error when no user is found", async () => {
    const order: Order = {
      id: 1,
      userId: "2",
      pizzas: [{ pizzaId: "1", quantity: 1, unitPrice: 10 }],
    };

    await expect(() => addOrder(order)).rejects.toThrow("User not found");
  });

  afterEach(() => {
    getUserSpy.mockClear();
    updateUserSpy.mockClear();
  });
});
