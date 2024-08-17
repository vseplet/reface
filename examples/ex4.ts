import {
  component,
  Hono,
  html,
  island,
  POST,
  Reface,
  RESPONSE,
  twa,
} from "jsr:@vseplet/reface@^0.0.19";

const sh = async (command: string) => {
  const process = new Deno.Command("sh", {
    args: ["-c", command],
  });

  const { code, stdout, stderr } = await process.output();

  return {
    code,
    stdout: new TextDecoder().decode(stdout),
    stderr: new TextDecoder().decode(stderr),
  };
};

const OutputBlock = component<{ stdout: string; stderr: string; code: number }>(
  (props) => {
    return html`
    <div class="p-1 my-1">
      <pre>${props.stdout}</pre>
    </div>
  `;
  },
);

const CommandInput = island<{ output: string }>((props) => {
  return html`
    <form
      class="container p-3"
      hx-post="${props.api}/command"
      hx-target="#${props.output}"
      hx-swap="afterbegin"
    >
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
  `;
}, {
  [POST("/command")]: async (req) => {
    const command = req.formData.get("command");
    if (command === null) return RESPONSE();

    return RESPONSE(OutputBlock(await sh(command.toString())));
  },
});

const CommandOutput = component(() => {
  return html`
    <div class="container p-3" style="height: 500px; overflow-y: scroll">
      <div id="output"></div>
    </div>
  `;
});

const Entry = component(() => {
  return html`
    <div class="container grid my-3">
      <h1>Simple Web Terminal</h1>
      <div class="row my-3">
        ${CommandInput({ output: "output" })}
      </div>
      <div class="row my-3">
        ${CommandOutput({})}
      </div>
    </div>
  `;
});

Deno.serve(
  new Hono().route(
    "/",
    new Reface({
      layout: twa({
        htmx: true,
        hyperscript: true,
        bootstrap: true,
      }),
    }).page("/", Entry).getRouter(),
  ).fetch,
);
