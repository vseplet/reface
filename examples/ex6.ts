import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  clean,
  html,
  island,
  type PageProps,
  Reface,
  RESPONSE,
} from "jsr:@vseplet/reface@0.1.24";

const RandomJoke = island<{ joke: null }, PageProps>({
  template: ({ rpc }) => {
    return html`
      <div
        ${rpc.hx.joke()}
        hx-trigger="load, every 2s"
        hx-target="#output"
        hx-swap="innerHTML">
        <h2 id="output"></h2>
      </div>
    `;
  },
  rpc: {
    joke: async () => {
      const text = await (await fetch(
        "https://icanhazdadjoke.com/",
        { headers: { "Accept": "text/plain" } },
      )).text();

      return RESPONSE(html`
        <div>
          ${text}
        </div>
      `);
    },
  },
});

const pageRouter = new Reface({
  layout: clean({
    htmx: true,
    jsonEnc: true,
  }),
})
  .page("/", RandomJoke)
  .hono();

Deno.serve(
  new Hono()
    .route(
      "/",
      pageRouter,
    ).fetch,
);
