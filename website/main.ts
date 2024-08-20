import { Hono } from "@hono/hono";
import { clean, Reface } from "@vseplet/reface";
import { Home } from "$/pages/Home.ts";

const app = new Hono();
const pages = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
  }),
})
  .page("/", Home)
  .hono();

app.route("/", pages);
Deno.serve(app.fetch);
