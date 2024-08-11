import { RefaceLayout } from "./entities/Layout.ts";
import { Hono } from "@hono/hono";
import type { BaseAppOptions, Layout } from "$types";
import { clean } from "$/layouts/clean.ts";

const css = String.raw;
const html = String.raw;
const js = String.raw;
const salt = (name?: string) =>
  name ? `${name}_${crypto.randomUUID()}` : crypto.randomUUID();

const RefacePage = <T>(
  _: {
    render: (props: { data: T; pageRoute: string }) => string;
  },
) => {};

const RefaceComponent = <T>(
  _: {
    render: (
      props: { data: T; apiRoute: string; componentRoute: string },
    ) => string;
    api?: (props: { data: T }) => void;
  },
) => {};

const RefaceElement = <T>(_: (props: { data: T }) => string) => {};

class RefaceHono<T> {
  #router: Hono;
  #defaultLayout: Layout;
  #components: typeof RefaceComponent<T>[] = [];
  #pages: {
    route: string;
    page: typeof RefacePage<T>;
    layout: Layout;
  }[] = [];

  constructor(
    config?: BaseAppOptions & {
      layout: Layout;
    },
  ) {
    this.#router = new Hono();
    this.#defaultLayout = config?.layout || clean({ htmx: true });
  }

  component(component: typeof RefaceComponent<T>) {
    this.#components.push(component);
    return this;
  }

  page(
    route: string,
    page: typeof RefacePage<T>,
    options?: {
      layout?: Layout;
    },
  ) {
    this.#pages.push({
      route,
      page,
      layout: options?.layout || this.#defaultLayout,
    });
    return this;
  }

  getRouter() {
    return this.#router;
  }
}

export {
  css,
  html,
  js,
  RefaceComponent,
  RefaceElement,
  RefaceHono,
  RefaceLayout,
  RefacePage,
  salt,
};

export * from "@hono/hono";
// Layout -> Page  -> Component -> Element
