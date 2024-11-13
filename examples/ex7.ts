import {
  clean,
  component,
  html,
  island,
  PageProps,
  Reface,
  RESPONSE,
} from "@vseplet/reface";

const cmp1 = component<{ x: number }>((props) =>
  html`<div>Hello, ${props.x} World!</div>`
);

const cmp2 = component(() => html`<div>Hello, World!</div>`);

const isl1 = island<{ joke: null }>({
  template: ({ rpc, props }) => html`<div>Hello, World!</div>`,
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

const isl2 = island<{ joke: { x: 10 } }, { x: number }>({
  template: ({ rpc, props }) =>
    html`<div ${rpc.hx.joke({ x: 10 })}>Hello, ${props.x} World!</div>`,
  rpc: {
    joke: async ({ args }) => {
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

const page = component<PageProps>(
  (props) =>
    html`
    ${cmp1({ x: 10 })}
    ${cmp2({})}

    ${isl1({})}
    ${isl2({ x: 10 })}
`,
);
