# [Reface](https://reface.deno.dev/)

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)
[![JSR Score](https://jsr.io/badges/@vseplet/reface/score)](https://jsr.io/@vseplet/reface)
[![Discord](https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white)](https://discord.gg/gT4gvVwqb8)

## 👋 👋 ATTENTION!

> This package is under development and will be frequently updated. The author
> would appreciate any help, advice, and pull requests! Thank you for your
> understanding 😊

---

**Reface** is a web framework designed for creating
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

### Examples

#### 1. [Simple form validation and joke generator](./examples/ex1.ts) and [playground](https://dash.deno.com/playground/react-sucks)

```sh
deno run --allow-all https://raw.githubusercontent.com/vseplet/reface/main/examples/ex1.ts
```

#### 2. [File tree and proc list view](./examples/ex2.ts)

```sh
deno run --allow-all https://raw.githubusercontent.com/vseplet/reface/main/examples/ex2.ts
```

#### 3. [Simple Deno KV viewer](./examples/ex3.ts) and [playground](https://dash.deno.com/playground/reface-kv-viewer)

```sh
deno run --allow-all --unstable-kv https://raw.githubusercontent.com/vseplet/reface/main/examples/ex3.ts
```

#### 4. [Simple Web Terminal](./examples/ex4.ts)

```sh
deno run --allow-all https://raw.githubusercontent.com/vseplet/reface/main/examples/ex4.ts
```

## Tutorial - development of a Simple Web Terminal

![img](/ex4.gif)

First, you need to import all necessary objects and functions. For simplicity,
I'll do this directly from [JSR](https://jsr.io/@vseplet/reface):

```ts
import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  clean,
  component,
  html,
  island,
  Reface,
  RESPONSE,
} from "jsr:@vseplet/reface@0.0.23";
```

Here is a simple example of a function that can "call" sh with a certain set of
arguments, returning the stdout of the created process after its completion. You
can read more about this at
[tutorials/subprocess](https://docs.deno.com/runtime/tutorials/subprocess/).

```ts
const sh = async (command: string) => {
  const process = new Deno.Command("sh", { args: ["-c", command] });
  const { code, stdout, stderr } = await process.output();

  return {
    code,
    out: new TextDecoder().decode(stdout),
    err: new TextDecoder().decode(stderr),
  };
};
```

In reface, there are components and islands. The former simply return a
Template, while the latter additionally implement a set of API handlers. In the
example below, I describe a component that will display text from the process
output:

```ts
const OutputBlock = component<{
  out: string;
  err: string;
  code: number;
  // deno-fmt-ignore
}>((props) =>
  html`
  <div class="p-1 my-1">
    ${
    props.code
      ? html`<pre class="text-danger">${props.err}</pre>`
      : html`<pre>${props.out}</pre>`
  }
  </div>`
);
```

Handling command input is a bit more complex and requires an island.
Essentially, it is the same component but with additional RPC descriptions:

```ts
const CommandInput = island<{}, { exec: { command: string } }>({
  name: "CommandInput",
  // deno-fmt-ignore
  template:({ rpc }) => html`
    <form
      class="container p-3"
      ${rpc.hx.exec()}
      hx-target="#output"
      hx-swap="afterbegin">
      <div class="row align-items-center">
        <div class="col-auto">
          <label for="command">Command:</label>
        </div>
        <div class="col">
          <input class="form-control" type="text" name="command" />
        </div>
        <div class="col-auto">
          <button class="btn btn-primary" type="submit">Run</button>
        </div>
      </div>
    </form>
  `,
  rpc: {
    exec: async ({ args }) => RESPONSE(OutputBlock(await sh(args.command))),
  },
});
```

In reface, you can describe pages. Any page is essentially a component or an
island:

```ts
const Entry = component(() =>
  html`
  <div class="container grid my-3">
    <h1>Simple Web Terminal</h1>
    <div class="row my-3">${CommandInput({})}</div>
    <div class="row my-3">
      <div class="container p-3" style="height: 500px; overflow-y: scroll">
        <div id="output"></div>
      </div>
  </div>
`
);
```

And finally, running all of this. It's important to remember that reface is
currently a wrapper around the Hono router:

```ts
const app = new Hono().route(
  "/",
  new Reface({ layout: clean({ htmx: true, jsonEnc: true, bootstrap: true }) })
    .page("/", Entry)
    .hono(),
);

Deno.serve(app.fetch);
```

Watch full [source code](./examples/ex4.ts) and try:

```sh
deno run --allow-all https://raw.githubusercontent.com/vseplet/reface/main/examples/ex4.ts
```

### License

[MIT](./LICENSE)
