import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  clean,
  css,
  html,
  inlineStyle,
  island,
  Reface,
  RESPONSE,
} from "@vseplet/reface";

const StyledDiv = inlineStyle<{ primary: boolean }>(
  (props) => css`
    color: ${props.primary ? "red" : "blue"};
    border: 1px solid ${props.primary ? "orange" : "green"};
    padding: 10px;
  `,
);

const RandomJoke = island<{ str: string }>({
  template: ({ rpc, props }) => {
    return html`
      <div
        ${rpc.hx.joke()}
        hx-trigger="load, every 2s"
        hx-target="#output"
        hx-swap="innerHTML"
      >
        <h2 id="output"></h2>
      </div>
    `;
  },
  rpc: {
    joke: async () => {
      const text = await (
        await fetch("https://icanhazdadjoke.com/", {
          headers: { Accept: "text/plain" },
        })
      ).text();

      return RESPONSE(html`
        <div ${StyledDiv({ primary: Math.random() > 0.5 })}>${text}</div>
      `);
    },
  },
});

Deno.serve(
  new Hono().route(
    "/",
    new Reface({
      layout: clean({
        htmx: true,
        jsonEnc: true,
      }),
    })
      .page("/", RandomJoke)
      .hono(),
  ).fetch,
);
