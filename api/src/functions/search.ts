import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function search(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  //TODO: Implement search logic
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `Hello, ${name}!` };
}

app.http("search", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: search,
});
