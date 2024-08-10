import { RefaceLayout } from "./entities/Layout.ts";
import { Hono } from "@hono/hono";
import { BaseAppOptions } from "$types";

const css = String.raw;
const html = String.raw;
const js = String.raw;
const salt = (name?: string) =>
  name ? `${name}_${crypto.randomUUID()}` : crypto.randomUUID();

export const RefacePage = <T>(
  _: {
    render: (props: { data: T; pageRoute: string }) => string;
  },
) => {};

export const RefaceComponent = <T>(
  _: {
    render: (
      props: { data: T; apiRoute: string; componentRoute: string },
    ) => string;
    api?: (props: { data: T }) => void;
  },
) => {};

export const RefaceElement = <T>(_: (props: { data: T }) => string) => {};

export class RefaceApp<T> {
  constructor(
    config: BaseAppOptions & {
      layout: typeof RefaceLayout<T>;
    },
  ) {
  }

  getHonoRouter() {
    return new Hono();
  }
}

// RefaceComponent<{ a: string; b: number }>({
//   render: ({ data, componentRoute }) => {
//     return html`
//       <div>
//         <h1>Hello ${data}</h1>
//       </div>
//     `;
//   },
// });

export { css, html, js, RefaceLayout, salt };
export * from "@hono/hono";
// Layout -> Page  -> Component -> Element
