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
} from "jsr:@vseplet/reface@^0.0.15";

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
