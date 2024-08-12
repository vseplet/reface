// deno-lint-ignore-file no-unused-vars
import { htmx } from "$/resources/scripts.ts";
import { html, layout } from "$/mod.ts";
import type { BaseAppOptions } from "$types";

/**
 * TWA is a layout for building TWA (Telegram Web Apps)
 * @param config - Layout configuration
 * @returns Layout function
 */
export const clean = layout<{
  htmx?: boolean;
}>((options) => {
  return (page: string, appOptions: BaseAppOptions) => {
    return html`
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${options.htmx ? htmx : ""}
        <script src="${appOptions.staticPath}/script.js"></script>
        <link rel="stylesheet" href="${appOptions.staticPath}/style.css">
        <title>${options.title || "Reface Clean"}</title>
      </head>
      <body>
        ${page}
      </body>
    </html>
    `;
  };
});
