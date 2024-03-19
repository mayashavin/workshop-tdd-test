import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function makeOrder(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  return { jsonBody: { orderStatus: true } };
}

app.http("makeOrder", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: makeOrder,
});
