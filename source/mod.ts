import { Hono } from "@hono/hono";
import type { BaseAppOptions, Layout, Page } from "$types";
import { clean } from "$/layouts/clean.ts";
import { component, element, layout, page } from "./entities.ts";
import { css, html, js, salt } from "$/helpers.ts";

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
