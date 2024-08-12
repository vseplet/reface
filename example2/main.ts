import { twa } from "jsr:@vseplet/reface@^0.0.8/layouts";
import {
  Context,
  Hono,
  html,
  page,
  RefaceHono,
} from "jsr:@vseplet/reface@^0.0.8";

const reface = new RefaceHono();
const hono = new Hono();
const namePattern = /^[a-zA-Z\s]{1,20}$/;

reface.page(
  "/",
  page((props) => {
    return html`
      <h1>Hello, World!</h1>
    `;
  }),
);

// hono.post("/api/contact", async (c: Context) => {
//   const name = (await c.req.formData()).get("name") as string;
//   const params = c.req.param();
//   const headers = c.req.header();
//   const query = c.req.query();
//   return c.html(
//     `${
//       !namePattern.test(name)
//         ? html`<div class="alert alert-warning" role="alert">
//         Invalid name format. Only English letters (1-20 characters) are allowed.
//       </div>`
//         : html`<div class="alert alert-success" role="alert">
//         Contact form submitted for name: ${name}
//       </div>`
//     }`,
//   );
// });

// hono.get("/", (c) => {
//   return c.html(
//     twa({ htmx: true, bootstrap: true })(
//       html`
//       <form hx-post="/api/contact" hx-target="#output" class="row g-3 m-1">
//         <div class="col-auto">
//           <input class="form-control" type="text" name="name" aria-describedby="inputGroup-sizing-default">
//         </div>
//         <div class="col-auto">
//           <button type="submit" class="btn btn-primary">Submit</button>
//         </div>
//         <div id="output" class="row-auto"></div>
//       </form>
//     `,
//       {},
//     ),
//   );
// });

// hono.route("/", reface.getRouter());

Deno.serve(hono.fetch);
