import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { addOrder, Order } from "../services/orders";

export async function makeOrder(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const bodyPayload: { order?: Order } = await request.json();

  if (bodyPayload.order) {
    const status = await addOrder(bodyPayload.order);

    if (status) {
      return {
        status: 200,
        body: "Order added",
      };
    }
  }

  return { status: 400, body: "No order passed" };
}

app.http("makeOrder", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: makeOrder,
});
