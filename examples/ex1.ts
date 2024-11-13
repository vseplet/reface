import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  clean,
  GET,
  html,
  island,
  type PageProps,
  POST,
  Reface,
  RESPONSE,
  salt,
} from "jsr:@vseplet/reface@0.1.24";

const RandomJoke = island<{}, { interval: number }>({
  template: ({ props, rest }) => {
    const id = salt();
    return html`
      <div
        ${rest.hx("self", "get", "/joke")}
        hx-trigger="load, every ${props.interval}s"
        hx-target="#${id}"
        hx-swap="innerHTML">
        <h2 id="${id}"></h2>
      </div>
    `;
  },
  rest: {
    [GET("/joke")]: async (req) =>
      RESPONSE(
        await (await fetch(
          "https://icanhazdadjoke.com/",
          { headers: { "Accept": "text/plain" } },
        )).text(),
      ),
  },
});

const Home = island<PageProps>({
  template: ({ rest }) =>
    html`
    <form
      ${rest.hx("self", "post", "/contact")}
      hx-target="#output"
      class="row g-3 m-1">
      ${RandomJoke({ interval: 10 })}
      ${RandomJoke({ interval: 10 })}
      <div class="col-auto">
        <input
          class="form-control"
          type="text"
          name="name"
          aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
      <div id="output" class="row-auto"></div>
    </form>
  `,
  rest: {
    [POST("/contact")]: async (req) => {
      const name = req.formData?.get("name") as string;
      // deno-fmt-ignore
      return RESPONSE(!/^[a-zA-Z\s]{1,20}$/.test(name) ?
        html`
          <div class="alert alert-warning" role="alert">
            Invalid name format. Only English letters (1-20 characters) are allowed.
          </div>
        ` : html`
          <div class="alert alert-success" role="alert">
            Contact form submitted for name: ${name}
          </div>
        `,
      );
    },
  },
});

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      bootstrap: true,
    }),
  }).page("/", Home).hono(),
);

Deno.serve(app.fetch);
