import { GET, html, island, RESPONSE, salt } from "@vseplet/reface";

export const RandomJoke = island<{ interval: number }>({
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
