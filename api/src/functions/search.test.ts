import { describe, vi, it, expect } from "vitest";
import { search } from "./search";
import { HttpRequest, InvocationContext } from "@azure/functions";

describe("search", () => {
  vi.stubEnv("API_URL", "http://exploringvue.com/.netlify/functions");

  it("should return all pizzas", async () => {
    const request: HttpRequest = {
      method: "GET",
      url: "/api/search",
      json: () =>
        Promise.resolve({
          query: "pepperoni",
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
    const response = await search(request, context);

    expect(response.jsonBody).toEqual([
      {
        description:
          "A delicious combination of pepperoni, cheese, and pineapple.",
        id: "2",
        image:
          "https://res.cloudinary.com/mayashavin/image/upload/v1643005556/Demo/pepperoni_pizza.jpg",
        price: "12.00",
        quantity: 2,
        title: "Pepperoni Pizza",
      },
    ]);
  });
});
