import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { getPizzas } from "../services/pizzas";

export async function search(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const bodyPayload: { query?: string } = await request.json();
  const query = bodyPayload?.query || "";
  const pizzas = await getPizzas(query);

  return { jsonBody: pizzas };
}

app.http("search", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: search,
});
