// deno-lint-ignore-file no-unused-vars
import { layout } from "$/helpers.ts";
import { alpinejs, htmx, hyperscript, jsonEnc } from "$/resources/scripts.ts";
import { bootstrapIcons } from "$/resources/icons.ts";
import { bluma, bootstrap } from "$/resources/styles.ts";

/**
 * TWA is a layout for building TWA (Telegram Web Apps)
 * @param config - Layout configuration
 * @returns Layout function
 */
export const clean = layout<{
  hyperscript?: boolean;
  alpine?: boolean;
  bootstrap?: boolean;
  bootstrapIcons?: boolean;
  htmx?: boolean;
  jsonEnc?: boolean;
  bluma?: boolean;
}>((options) => {
  return (page: string) => {
    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${options.htmx ? htmx : ""}
          ${options.alpine ? alpinejs : ""}
          ${options.bootstrap ? bootstrap : ""}
          ${options.bootstrapIcons ? bootstrapIcons : ""}
          ${options.jsonEnc ? jsonEnc : ""}
          ${options.bluma ? bluma : ""}
          ${options.hyperscript ? hyperscript : ""}
          <title>${options.title || "Reface Clean"}</title>
          ${options.head || ""}
        </head>
        <body>
          ${page}
        </body>
      </html>
    `;
  };
});
