import { client } from "./client.gen";

// Base URL points to the Next.js API proxy which attaches the authentication tokens
client.setConfig({
  baseUrl: "/api/proxy",
});

export const swaggerApiClient = client;
