import {
  component,
  GET,
  Hono,
  html,
  island,
  type PageProps,
  Reface,
  render,
  RESPONSE,
  twa,
} from "jsr:@vseplet/reface@^0.0.16";

const DirLink = component<{ to: string; api: string; name: string }>(
  // deno-fmt-ignore
  (props) => html`
    <div><strong><a
      href="#"
      hx-get="${props.api}/dir"
      hx-vals=${JSON.stringify({ to: props.to })}
      hx-target="#dir-view"
      hx-swap="innerHTML">
      ${props.name}/
    </a></strong></div>
  `,
);

const FileLink = component<{ to: string; api: string; name: string }>(
  // deno-fmt-ignore
  (props) =>html`
    <div>
      <a
        style="color: green;"
        href="#"
        hx-get="${props.api}/file"
        hx-vals=${JSON.stringify({ path: props.to })}
        hx-target="#file-view"
        hx-swap="innerHTML">
        ${props.name}
      </a>
    </div>
  `,
);

const UpButton = component<{ route: string; to: string; current: string }>(
  // deno-fmt-ignore
  (props) => html`
    <button type="button" class="btn btn-primary"
      hx-get="${props.route}"
      hx-vals=${JSON.stringify({ to: props.to, current: props.current })}
      hx-target="#dir-view"
      hx-swap="innerHTML"
    >⭠</button>
  `,
);

const DownButton = component<{ route: string; to: string }>(
  // deno-fmt-ignore
  (props) => html`
    <button type="button" class="btn btn-success"
      hx-get="${props.route}"
      hx-vals=${JSON.stringify({ to: props.to })}
      hx-target="#dir-view"
      hx-swap="innerHTML"
    >⭢</button>
  `,
);

const TreeView = component<
  { to: string; api: string; route: string; current?: string }
>(
  // deno-fmt-ignore
  (props) => html`
    <div>
      <strong>${props.to}</strong>
      <hr class="my-2">
      ${Array.from(Deno.readDirSync(props.to)).map((entry) =>
        entry.isDirectory
          ? DirLink({to: props.to + "/" + entry.name, api: props.api, name: entry.name})
          : FileLink({to: props.to + "/" + entry.name, api: props.api, name: entry.name})
      ).map(render).join(" ")}
      <hr class="my-2">
      ${UpButton({route: props.route, to: props.to.split("/").slice(0, -1).join("/"), current: props.to})}
      ${props.current ? DownButton({route: props.route, to: props.current}) : ""}
    </div>
  `,
);

// deno-fmt-ignore
const Home = island<PageProps>((props) => html`
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="border p-3 h-100">
          <div
            id="dir-view"
            hx-get="${props.api}/dir"
            hx-vals=${JSON.stringify({ to: Deno.cwd() })}
            hx-trigger="load"
            hx-target="this">
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border p-3 h-100">
          <div id="file-view"></div>
        </div>
      </div>
    </div>
  </div>`, {
  [GET("/dir")]: async (req) => RESPONSE(
    TreeView({
      to: req.query.to,
      api: req.api,
      route: req.route,
      current: req.query.current,
    })
  ),
  [GET("/file")]: async (req) => RESPONSE(html`
    <div>
      <strong>${req.query.path}</strong>
      <hr class="my-2">
      <pre>${Deno.readTextFileSync(req.query.path)}</pre>
    </div>
  `),
});

Deno.serve(
  new Hono().route(
    "/",
    new Reface({
      layout: twa({
        htmx: true,
        bootstrap: true,
      }),
    }).page("/", Home).getRouter(),
  ).fetch,
);
