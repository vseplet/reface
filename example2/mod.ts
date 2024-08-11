import { Hono } from "@hono/hono";
import { twa } from "@vseplet/reface/layouts";
import { RefaceApp } from "@vseplet/reface";

const twaLayout = twa({
  htmx: true,
  hyperscript: true,
  bootstrap: true,
  bootstrapIcons: true,
});

const refaceApp = new RefaceApp({
  staticPath: "/static",
  layout: twaLayout,
});
