import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  clean,
  component,
  html,
  island,
  Reface,
  RESPONSE,
} from "jsr:@vseplet/reface@0.1.24";

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
    </div>
  `
);

const sh = async (command: string) => {
  const process = new Deno.Command("sh", { args: ["-c", command] });
  const { code, stdout, stderr } = await process.output();

  return {
    code,
    out: new TextDecoder().decode(stdout),
    err: new TextDecoder().decode(stderr),
  };
};

const CommandInput = island<{ exec: { command: string } }, void>({
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

// deno-fmt-ignore
const Entry = component(() => html`
  <div class="container grid my-3">
    <h1>Simple Web Terminal</h1>
    <div class="row my-3">${CommandInput()}</div>
    <div class="row my-3">
      <div class="container p-3" style="height: 500px; overflow-y: scroll">
        <div id="output"></div>
      </div>
  </div>
`);

const app = new Hono().route(
  "/",
  new Reface({ layout: clean({ htmx: true, jsonEnc: true, bootstrap: true }) })
    .page("/", Entry)
    .hono(),
);

Deno.serve(app.fetch);
