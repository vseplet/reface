// deno-lint-ignore-file no-unused-vars
import {
  alpinejs,
  htmx,
  hyperscript,
  telegramWebApp,
} from "$/resources/scripts.ts";
import { bluma, bootstrap } from "$/resources/styles.ts";
import { bootstrapIcons } from "$/resources/icons.ts";
import { html, RefaceLayout } from "$/mod.ts";

/**
 * TWA is a layout for building TWA (Telegram Web Apps)
 * @param config - Layout configuration
 * @returns Layout function
 */
export const twa = RefaceLayout<{
  hyperscript?: boolean;
  alpine?: boolean;
  bootstrap?: boolean;
  bootstrapIcons?: boolean;
  htmx?: boolean;
  bluma?: boolean;
}>((config) => {
  return (page: string) => {
    return html`
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${config.htmx ? htmx : ""}
        ${config.alpine ? alpinejs : ""}
        ${config.hyperscript ? hyperscript : ""}
        ${config.bootstrap ? bootstrap : ""}
        ${config.bootstrapIcons ? bootstrapIcons : ""}
        ${config.bluma ? bluma : ""}
        ${telegramWebApp}

        <script src="/public/script.js"></script>
        <link rel="stylesheet" href="/public/style.css">
        <title>${config.title || "Reface TWA"}</title>
      </head>

      <body>
        ${page}
      </body>
    </html>
    `;
  };
});
