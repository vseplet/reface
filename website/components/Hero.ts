// https://dash.deno.com/playground/reface-kv-viewer

import { component, html } from "@vseplet/reface";

const example = `
import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  Reface,
  clean,
  html,
  island,
  RESPONSE
} from "jsr:@vseplet/reface@0.1.0";

const RandomJoke = island<{ joke: null }>({
  template: ({ rpc }) => html\`
    &lt;div
      \${rpc.hx.joke()}
      hx-trigger="load, every 5s"
      hx-target="#output"
      hx-swap="innerHTML"&gt;
      &lt;h2 id="output"&gt;&lt;/h2&gt;
    &lt;/div&gt;
  \`,
  rpc: {
    joke: async () => RESPONSE(
      await (await fetch(
        "https://icanhazdadjoke.com/",
        { headers: { "Accept": "text/plain" } },
      )).text(),
    ),
  },
});

Deno.serve(
  new Hono()
    .route("/", new Reface({
      layout: clean({
        htmx: true,
        jsonEnc: true,
      }),
    })
    .page("/", RandomJoke)
    .hono()
).fetch);
`;

// deno-fmt-ignore
export const Hero = component(() => html`
  <div class="container d-flex justify-content-center">
    <div>
      <!-- <h3>No data api, no build step, no client side js</h3> -->
    </div>
    <div style="">
      <h5 style="color: #ff7f0e;">I want to integrate an interface into my project, but I don't want to use heavy frameworks, build anything, or change the project's structure...</h5>
      <br>
      <h5 class="text-end" style="color: #2ca02c;">Use Reface:</h5>
      <br>
      <pre class="rounded" hx-disable style="background-color: #f8f9fa; overflow: auto; height: 500px;"><code class="language-typescript">${example}</code></pre>
      <br>
      <h5 style="color: #ff7f0e;">Is that it? Seriously?</h5>
      <br>
      <h5 class="text-end" style="color: #2ca02c;">Seriously, bro :)</h5>
    </div>
  </div>
`);
