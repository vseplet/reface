import { type Context, Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { layout } from "./layout.ts";
import { Home } from "./pages/Home.ts";
import { html } from "@vseplet/reface";
import { Features } from "$components/sections/Features.ts";
import { Footer } from "$components/sections/Footer.ts";
import { Header } from "$components/sections/Header.ts";
import { Hero } from "$components/sections/Hero.ts";

const app = new Hono();

const components = {
  "Features": Features,
  "Footer": Footer,
  "Header": Header,
  "Hero": Hero,
};

const pages = {
  "/": Home,
};

Object.entries(pages).forEach(([path, page]) =>
  app.get(path, (c: Context) => c.html(layout({ children: page() })))
);

app.get("/component/:name", (c: Context) => {
  const name = c.req.param("name");
  if (!(name in components)) {
    return c.html(html`<div>Component not found</div>`, 404);
  } else {
    return c.html(components[name as keyof typeof components]());
  }
});

app.use("/public/*", serveStatic({ root: "./" }));

const api = new Hono();

api.post("/contact-form", async (c: Context) => {
  const formData = await c.req.json();
  console.log(formData);

  const success = html`
    <div class="alert alert-primary" role="alert">
      Thank you! Your request has been sent.
    </div>
  `;

  const reject = html`
    <div class="alert alert-danger" role="alert">
      Sorry! Your request has been rejected.
    </div>
  `;

  return c.html(Math.random() > 0.5 ? success : reject);
});

api.post("/send", async (c: Context) => {
  const data = await c.req.json();
  console.log(data);

  return c.html(`
    <div class="alert alert-light" role="alert">
      A simple light alert—check it out!
    </div>
  `);
});

app.route("/api", api);

Deno.serve(app.fetch);
