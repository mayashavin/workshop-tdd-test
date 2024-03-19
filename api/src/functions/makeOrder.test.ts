import { HttpRequest, InvocationContext } from "@azure/functions";
import { describe, vi, expect, it } from "vitest";
import { makeOrder } from "./makeOrder";

const context: InvocationContext = {
  invocationId: "",
  functionName: "",
  extraInputs: undefined,
  extraOutputs: undefined,
  log: vi.fn(),
  trace: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  options: undefined,
};

const request: HttpRequest = {
  method: "POST",
  url: "/api/makeOrder",
  json: () =>
    Promise.resolve({
      order: {
        id: 1,
        userId: "1",
        pizzas: [{ pizzaId: "1", quantity: 1, unitPrice: 10 }],
      },
    }),
  headers: new Headers(),
  query: new URLSearchParams(),
  params: undefined,
  user: undefined,
  body: undefined,
  bodyUsed: false,
  arrayBuffer: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn(),
  text: vi.fn(),
  clone: vi.fn(),
};

describe("makeOrder", () => {
  it("should add an order", async () => {
    const response = await makeOrder(request, context);

    expect(response).toEqual({ status: 200, body: "Order added" });
  });

  it("should return orderStatus false when no order is found", async () => {
    const mockRequest: HttpRequest = {
      ...request,
      json: () =>
        Promise.resolve({
          order: null,
        }),
    };

    const response = await makeOrder(mockRequest, context);

    expect(response).toEqual({ status: 400, body: "No order passed" });
  });
});
