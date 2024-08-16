import type {
  ApiHandlers,
  ApiRequest,
  BasePageProps,
  Layout,
  TemplaterGenerator,
} from "$types";
import { type Context, Hono } from "@hono/hono";
import { clean } from "$/layouts/clean.ts";
import { render } from "$/helpers.ts";

export class Reface {
  private router = new Hono();
  private layout: Layout;

  static islandApiHandlers: Record<string, ApiHandlers> = {};
  static islandTemplateGenerators: Record<
    string,
    TemplaterGenerator<any>
  > = {};

  static addIsland(
    templater: TemplaterGenerator<any>,
    api?: ApiHandlers,
  ): string {
    const name = crypto.randomUUID();
    this.islandTemplateGenerators[name] = templater;
    if (api) {
      this.islandApiHandlers[name] = api;
    }
    return name;
  }

  constructor(
    private options: {
      layout?: Layout;
    },
  ) {
    this.layout = options.layout || clean({ htmx: true });
  }

  page(route: string, generate: TemplaterGenerator<BasePageProps>): Reface {
    this.router.get(route, async (c: Context) => {
      const template = generate({
        route,
        params: c.req.param(),
        query: c.req.query(),
        headers: c.req.header(),
      });

      const html = render(template);
      console.log(html);

      return c.html(this.layout(html, {}));
    });

    return this;
  }

  partial(route: string, generate: TemplaterGenerator<any>): Reface {
    this.router.get(`/partial${route}`, async (c: Context) => {
      const template = generate({
        /* TODO: подумать, что сюда можно запихнуть */
      });

      const html = render(template);
      return c.html(html);
    });

    return this;
  }

  getRouter() {
    for (const [name, handlers] of Object.entries(Reface.islandApiHandlers)) {
      for (const [str, handler] of Object.entries(handlers)) {
        const [method, path] = str.split("|");
        const route = `/api/${name}${path}`;
        // @ts-ignore
        this.router[method](
          route,
          async (c: Context) => {
            const request: ApiRequest = {
              route,
              params: c.req.param(),
              query: c.req.query(),
              headers: c.req.header(),
            };

            const response = await handler(request);
            return c.html(response.html || "", {
              status: response.status || 200,
            });
          },
        );
      }
    }
    return this.router;
  }
}
