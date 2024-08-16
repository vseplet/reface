import {
  type BasePageProps,
  component,
  GET,
  Hono,
  html,
  island,
  Reface,
  RESPONSE,
  salt,
  twa,
} from "jsr:@vseplet/reface@^0.0.12";

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
  [GET("/joke")]: async () =>
    RESPONSE(
      await (await fetch(
        "https://icanhazdadjoke.com/",
        { headers: { "Accept": "text/plain" } },
      )).text(),
    ),
});

const Home = component<BasePageProps>((props) => {
  return html`<div>${Joke({ interval: 5 })}</div>`;
});

const app = new Hono()
  .route(
    "/",
    new Reface({
      layout: twa({
        htmx: true,
        bootstrap: true,
      }),
    }).page("/", Home).getRouter(),
  );

Deno.serve(app.fetch);
