import { Hono } from "@hono/hono";
import type { BaseAppOptions, Layout, LayoutOptions, Page } from "$types";
import { clean } from "$/layouts/clean.ts";

const css = String.raw;

const html = String.raw;

const js = String.raw;

const salt = (name?: string) =>
  name ? `${name}_${crypto.randomUUID()}` : crypto.randomUUID();

const layout = <C>(
  _: (
    layoutOptions: C & LayoutOptions,
  ) => (page: string, appOptions: BaseAppOptions) => string,
) => _;

const page = <T>(
  _: Page<T>,
) => _;

const component = <T>(
  _: {
    render: (
      props: { data: T; apiRoute: string; componentRoute: string },
    ) => string;
    api?: (props: { data: T }) => void;
  },
) => {};

const element = <T>(_: (props: { data: T }) => string) => {};

class RefaceHono<T> {
  #router: Hono;

  #pages: {
    route: string;
    page: Page<T>;
    layout: Layout;
  }[] = [];

  #options: BaseAppOptions & {
    layout: Layout;
  };

  constructor(
    options?: BaseAppOptions & {
      layout?: Layout;
    },
  ) {
    this.#options = {
      ...options,
      layout: options?.layout || clean({ htmx: true }),
    };
    this.#router = new Hono();
  }

  page(
    route: string,
    page: Page<T>,
    options?: {
      layout?: Layout;
    },
  ) {
    this.#pages.push({
      route,
      page,
      layout: options?.layout || this.#options.layout,
    });

    this.#router.get(route, (c) => {
      return c.html(this.#options.layout(
        page({
          data: {} as T,
          route,
          params: c.req.param(),
          headers: c.req.header(),
          query: c.req.query(),
        }),
        this.#options,
      ));
    });

    return this;
  }

  getRouter() {
    return this.#router;
  }
}

export { component, css, element, html, js, layout, page, RefaceHono, salt };

export * from "@hono/hono";
// Layout -> Page  -> Component -> Element
