# Reface

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)

**Reface** is a web library designed for creating
[Hypermedia-Driven Applications](https://htmx.org/essays/hypermedia-driven-applications/)
without a build step, based on HTMX.

In this tool, I strive to combine the power of SSR, SPA, and islands-based
architecture while using plain HTML, CSS, and JS. I came up with the idea for
this tool as a result of trying to optimize the development of TWA (Telegram Web
Apps) using Deno and Deno Deploy. Traditional approaches that push for building
and maintaining complex data APIs to support SPAs in React or Vue seem
excessively cumbersome, complex, and costly to me.

Currently, Reface is based on [Hono](https://hono.dev/), but in the future,
support for other libraries may be added.

### In this work, I adhere to the following ideas:

1. Any island can implement its own independent set of API handlers that return
   hypertext (other islands).
2. Any island is rendered on the server and has access to the server
   environment.
3. Any component can be called and re-rendered independently.
4. Islands form a hierarchy, can be nested within each other, and can return
   each other through the API, and so on.
5. Minimal or no need for writing client-side JavaScript.
6. No build step.
7. No need for preliminary API data design.
8. The library that renders islands and implements the API can be integrated
   into any project on Deno/TypeScript.

I believe this approach will be useful if you don't need to separate the
frontend and backend into distinct services connected by a data API. In my case,
it is perfect for developing Telegram Web Apps for small bots that are
monolithic. It can also perform well in developing desktop applications where
such a separation is unnecessary. Additionally, since the library integrates
well by nature, it can be used to implement web interfaces in tools that
initially do not anticipate them.

### Example

Try it on [playground](https://dash.deno.com/playground/react-sucks)

```ts
import {
  GET,
  Hono,
  html,
  island,
  type PageProps,
  POST,
  Reface,
  RESPONSE,
  salt,
  twa,
} from "jsr:@vseplet/reface@^0.0.14";

const Joke = island<{ interval: number }>((props) => {
  const id = salt();
  return html`
    <div
      hx-get="${props.api}/joke"
      hx-trigger="load, every ${props.interval}s"
      hx-target="#${id}"
      hx-swap="innerHTML">
      <h2 id="${id}"></h2>
    </div>
  `;
}, {
  [GET("/joke")]: async (req) =>
    RESPONSE(
      await (await fetch(
        "https://icanhazdadjoke.com/",
        { headers: { "Accept": "text/plain" } },
      )).text(),
    ),
});

const Home = island<PageProps>((props) =>
  html`
    <form hx-post="${props.api}/contact" hx-target="#output" class="row g-3 m-1">
      ${Joke({ interval: 10 })}
      ${Joke({ interval: 10 })}
      <div class="col-auto">
        <input class="form-control" type="text" name="name" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
      <div id="output" class="row-auto"></div>
    </form>
  `, {
  [POST("/contact")]: async (req) => {
    const name = req.formData?.get("name") as string;
    return RESPONSE(
      !/^[a-zA-Z\s]{1,20}$/.test(name)
        ? html`<div class="alert alert-warning" role="alert">
        Invalid name format. Only English letters (1-20 characters) are allowed.
      </div>`
        : html`<div class="alert alert-success" role="alert">
        Contact form submitted for name: ${name}
      </div>`,
    );
  },
});

const app = new Hono();

app.route(
  "/",
  new Reface({
    layout: twa({
      htmx: true,
      bootstrap: true,
    }),
  }).page("/", Home).getRouter(),
);

Deno.serve(app.fetch);
```
