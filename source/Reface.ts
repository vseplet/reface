// deno-lint-ignore-file require-await no-explicit-any
import type {
  Island,
  Layout,
  PageProps,
  RefaceRequest,
  RestHandlers,
  RpcCalls,
  RpcHandlers,
  TemplaterGenerator,
} from "$types";

import { type Context, Hono } from "@hono/hono";
import { render } from "$/helpers.ts";

export class Reface {
  private layout: Layout;
  private static islandsCount = 0;
  private static islandRestHandlers: Record<string, RestHandlers> = {};
  private static islandTemplateGenerators: Record<
    string,
    TemplaterGenerator<any>
  > = {};
  private static islandRpcHandlers: Record<string, RpcHandlers<any>> = {};

  private pages: Record<string, any> = {};

  // static addIsland(
  //   templater: TemplaterGenerator<any>,
  //   api?: RestHandlers,
  // ): string {
  //   const name = `c${this.islandsCount++}`;
  //   this.islandTemplateGenerators[name] = templater;

  //   if (api) {
  //     this.islandRestHandlers[name] = api;
  //   }
  //   return name;
  // }

  static addIsland<P, R>(body: Island<P, R>) {
    const name = body.name || `c${this.islandsCount++}`;

    if (body.rest) {
      this.islandRestHandlers[name] = body.rest;
    }

    const rpc: RpcCalls<any> = { hx: {} };

    if (body.rpc) {
      this.islandRpcHandlers[name] = body.rpc;
      Object.keys(body.rpc).map((key) => {
        rpc.hx[key] = (args?: any) =>
          `hx-ext='json-enc' hx-post='/rpc/${name}/${key}'` +
          (args ? ` hx-vals='${JSON.stringify(args)}'` : "");
      });
    }

    return (props: P) =>
      body.template({
        rpc,
        props,
        // api: `/api/${name}`,
        rest: {
          hx: (islandName, method, route: string) =>
            islandName === "self"
              ? `hx-${method}='/api/${name}${route}'`
              : `hx-${method}='/api/${islandName}${route}'`,
        },
      });
  }

  constructor(
    private options: {
      layout: Layout;
    },
  ) {
    this.layout = options.layout;
  }

  page(route: string, generate: TemplaterGenerator<PageProps>): Reface {
    this.pages[route] = async (c: Context) => {
      const template = generate({
        route,
        params: c.req.param(),
        query: c.req.query(),
        headers: c.req.header(),
      });
      const html = render(template);
      return c.html(this.layout(html));
    };

    return this;
  }

  partial(route: string, generate: TemplaterGenerator<any>): Reface {
    throw new Error("Not implemented");
    // this.router.get(`/partial${route}`, async (c: Context) => {
    //   const template = generate({
    //     /* TODO: подумать, что сюда можно запихнуть */
    //   });

    //   const html = render(template);
    //   return c.html(html);
    // });

    return this;
  }

  hono() {
    const router = new Hono();
    // create component routes
    // create page routes
    for (const [route, handler] of Object.entries(this.pages)) {
      router.get(route, handler);
    }
    // create partial routes
    // create rest routes
    for (const [name, handlers] of Object.entries(Reface.islandRestHandlers)) {
      for (const [str, handler] of Object.entries(handlers)) {
        const [method, path] = str.split("|");
        const route = `/api/${name}${path}`;
        const api = `/api/${name}`;
        // @ts-ignore
        router[method](
          route,
          async (c: Context) => {
            const contentType = c.req.header("content-type");
            const formData = contentType &&
                (contentType.includes("multipart/form-data") ||
                  contentType.includes("application/x-www-form-urlencoded"))
              ? await c.req.formData()
              : new FormData();

            const request: RefaceRequest = {
              api,
              route,
              params: c.req.param(),
              query: c.req.query(),
              headers: c.req.header(),
              formData,
            };

            const response = await handler(request);
            return c.html(response.html || "", {
              status: response.status || 200,
            });
          },
        );
      }
    }
    // create rpc routes
    for (const [name, handlers] of Object.entries(Reface.islandRpcHandlers)) {
      for (const [key, handler] of Object.entries(handlers)) {
        router.post(`/rpc/${name}/${key}`, async (c: Context) => {
          const args = await c.req.json();
          const response = await handler({ args });
          return c.html(response.html || "", {
            status: response.status || 200,
          });
        });
      }
    }

    return router;
  }

  oak() {
    throw new Error("Not implemented");
  }

  express() {
    throw new Error("Not implemented");
  }
}
