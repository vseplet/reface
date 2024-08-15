import { clean } from "$/layouts/clean.ts";
import { Hono } from "@hono/hono";
import type { ApiHandlers, BaseAppOptions, Layout, Page } from "$types";

class RefaceHono<T> {
  #router: Hono;

  #components: {
    route: string;
  }[] = [];

  #handlers: {
    route: string;
  }[] = [];

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

  load(to: "page" | "api" | "component") {
    return this;
  }

  add(
    args: {
      route: string;
      page: Page<T>;
      api?: ApiHandlers<T>;
      components?: {
        [route: string]: {
          route: string;
          api?: ApiHandlers<T>;
          component: (props: { data: T }) => string;
        };
      };
      options?: {
        layout?: Layout;
      };
    },
  ) {
    this.#pages.push({
      route: args.route,
      page: args.page,
      layout: args.options?.layout || this.#options.layout,
    });

    this.#router.get(args.route, (c) => {
      return c.html(this.#options.layout(
        args.page({
          route: args.route,
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
