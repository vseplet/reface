import {
  component,
  GET,
  Hono,
  html,
  island,
  POST,
  Reface,
  RESPONSE,
  twa,
} from "jsr:@vseplet/reface@^0.0.16";

const kv = await Deno.openKv();

const ListOfEntries = island((props) => {
  return html`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">key</th>
          <th scope="col">value</th>
          <th scope="col">versionstamp</th>
        </tr>
      </thead>
      <tbody hx-get="${props.api}/entries" hx-trigger="load, every 2s" hx-target="this" style="overflow-y: auto;">
      </tbody>
    </table>

  `;
}, {
  [GET("/entries")]: async () => {
    const allEntries = await Array.fromAsync(kv.list({ prefix: [] }));
    const rows = allEntries.map((entry, index) => {
      return `
        <tr>
          <th scope="row">${index}</th>
          <td>${entry.key.join(" ")}</td>
          <td>${JSON.stringify(entry.value)}</td>
          <td>${entry.versionstamp}</td>
        </tr>
      `;
    }).join("");
    return RESPONSE(rows);
  },
});

const Alert = (type: "success" | "danger", message: string) => {
  return html`<div class="alert alert-${type}" role="alert" _="on load wait 4s then remove me">${message}</div>`;
};

const SubmitValue = island((props) => {
  return html`
    <form hx-post="${props.api}/submit" hx-target="#result" class="form-group">
      <div class="row mb-3">
        <div class="col">
          <label for="key" class="form-label">KEY</label>
          <input type="text" name="key" id="key" class="form-control" />
        </div>
        <div class="col">
          <label for="value" class="form-label">VALUE</label>
          <input type="text" name="value" id="value" class="form-control" />
        </div>
        <div class="col d-flex flex-column align-items-start">
          <div class="form-check mb-2">
            <input type="checkbox" name="isJSON" id="isJSON" class="form-check-input" />
            <label for="isJSON" class="form-check-label">JSON?</label>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </div>
      </div>
      <div id="result" class="mt-3"></div>
    </form>
  `;
}, {
  [POST("/submit")]: async (request) => {
    try {
      const isJSON = request.formData.get("isJSON") === "on";
      const key = request.formData.get("key")?.toString().split(" ");
      const value = isJSON
        ? JSON.parse(request.formData.get("value")?.toString() || "{}")
        : request.formData.get("value")?.toString();
      const result = await kv.set(key as string[], value);
      if (result.ok) {
        return RESPONSE(Alert("success", "Value submitted"));
      } else {
        return RESPONSE(Alert("danger", "Value not submitted"));
      }
    } catch (e) {
      return RESPONSE(Alert("danger", e.toString()));
    }
  },
});

const Home = component(() => {
  return html`
    <div class="container p-5" style="max-width: 50rem;">
      <h1>Simple Deno KV viewer</h1>
      <div class="mt-5">
        ${SubmitValue({})}
        <hr class="my-5" />
      </div>
      <div class="mt-5">
        ${ListOfEntries({})}
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
    }).page("/", Home).getRouter(),
  ).fetch,
);