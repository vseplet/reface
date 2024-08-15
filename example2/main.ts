import { twa } from "jsr:@vseplet/reface@^0.0.9/layouts";
import {
  Context,
  Hono,
  html,
  page,
  RefaceHono,
} from "jsr:@vseplet/reface@^0.0.9";

const reface = new RefaceHono({
  layout: twa({
    htmx: true,
    bootstrap: true,
  }),
});

reface.page(
  "/",
  page(() =>
    html`
      <form hx-post="/api/contact" hx-target="#output" class="row g-3 m-1">
        <div hx-get="/api/joke" hx-trigger="load, every 5s" hx-target="#jokes" hx-swap="innerHTML">
          <h2 id="jokes"></h2>
        </div>
        <div class="col-auto">
          <input class="form-control" type="text" name="name" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div id="output" class="row-auto"></div>
      </form>
    `
  ),
);

const hono = new Hono();

hono.get("/api/joke", async (c: Context) =>
  c.html(
    await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text(),
  ));

hono.post("/api/contact", async (c: Context) => {
  const name = (await c.req.formData()).get("name") as string;
  return c.html(
    `${
      !/^[a-zA-Z\s]{1,20}$/.test(name)
        ? html`<div class="alert alert-warning" role="alert">
        Invalid name format. Only English letters (1-20 characters) are allowed.
      </div>`
        : html`<div class="alert alert-success" role="alert">
        Contact form submitted for name: ${name}
      </div>`
    }`,
  );
});

// hono.route("/", reface.getRouter());

// Deno.serve(hono.fetch);

const test = (str: TemplateStringsArray, ...args: any[]) => {
  console.log(str);
  console.log(args);
};

test`Hello, ${1} ahaha, ${2}${3}`;
