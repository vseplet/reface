import { Hono } from "@hono/hono";
import { clean, Reface } from "@vseplet/reface";
import { Home } from "$/pages/Home.ts";
import { wrapper } from "$/pages/wrapper.ts";

const app = new Hono();

const pages = new Reface({
  layout: clean({
    htmx: true,
    bootstrap: true,
    bootstrapIcons: true,
    title: "Reface",
    head: `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism.min.css" integrity="sha512-/mZ1FHPkg6EKcxo0fKXF51ak6Cr2ocgDi5ytaTBjsQZIH/RNs6GF6+oId/vPe3eJB836T36nXwVh/WBl/cWT4w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-typescript.min.js" integrity="sha512-Hb168WC7SiCJ1GlGPHBb5ol0ResC6n5wu+5V8FTT5inC5ajLgBSm2hpQBvDq1YG2KqXr7UanlfQqRy6VEb1/kQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    `,
  }),
})
  .page("/", wrapper(Home))
  .hono();

app.route("/", pages);
Deno.serve(app.fetch);
