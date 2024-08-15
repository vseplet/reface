import { clean } from "$/layouts/clean.ts";
import { type Context, Hono } from "@hono/hono";
import type {
  ApiHandler,
  ApiHandlers,
  ApiRequest,
  BaseAppOptions,
  Layout,
  Page,
} from "$types";

export class RefaceHono<T> {
  #router: Hono;

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

  add(
    pageArgs: {
      route: string;
      page: Page<T>;
      options?: {
        layout?: Layout;
      };
    },
  ) {
    //@ts-ignore
    const page = pageArgs.page({});
    const pageStruct = page.struct({
      api: {
        base: "",
        page: "",
        me: "",
      },
      route: "",
      params: {},
      headers: {},
      query: {},
    });

    const pageRender = (
      str: TemplateStringsArray,
      args: any[],
      cmpCounter = 0,
    ): string => {
      return str.reduce((acc, part, i) => {
        const arg = args[i];
        if (arg?.isComponent) {
          const componentStruct = arg.struct({
            api: {
              me: `/api${
                pageArgs.route == "/" ? "" : pageArgs.route
              }/c${cmpCounter}`,
              base: "",
              page: "",
            },
          });
          cmpCounter++;
          return acc + part +
            pageRender(
              componentStruct.str,
              componentStruct.args,
              cmpCounter,
            );
        } else if (arg?.isElement) {
          const elementStruct = arg.struct();
          return acc + part +
            pageRender(
              elementStruct.str,
              elementStruct.args,
              cmpCounter,
            );
        }
        return acc + part + (arg || "");
      }, "");
    };

    this.#router.get(pageArgs.route, async (c: Context) => {
      return c.html(
        this.#options.layout(
          pageRender(pageStruct.str, pageStruct.args),
          this.#options,
        ),
      );
    });

    const addApiRoute = (
      method: string,
      route: string,
      handler: ApiHandler<T>,
    ) => {
      console.log(route);
      //@ts-ignore
      this.#router[method](route, async (c: Context) => {
        const request: ApiRequest<T> = {
          //@ts-ignore
          data: {},
          route,
          params: c.req.param(),
          query: c.req.query(),
          headers: c.req.header(),
        };

        const response = await handler(request);
        return c.html(response?.html || "", {
          status: response?.status || 200,
        });
      });
    };

    const recursiveComponentsApi = (
      route: string,
      args: any[],
      counter = 0,
    ) => {
      args.forEach((arg) => {
        if (arg.isComponent) {
          const childArgs = arg.struct({
            api: {
              me: `/api${route == "/" ? "" : route}/c${counter}`,
              base: "",
              page: "",
            },
          }).args;

          const componentApi = arg.api;

          if (componentApi) {
            for (const key in componentApi) {
              const [method, path] = key.split("|");
              addApiRoute(
                method,
                `/api${route == "/" ? "" : route}/c${counter}${path}`,
                componentApi[key],
              );
            }
            counter++;
          }
          recursiveComponentsApi(route, childArgs, counter);
        }
      });
    };

    const pageApi = (route: string, api?: ApiHandlers<T>) => {
      if (api) {
        for (const key in api) {
          const [method, path] = key.split("|");
          addApiRoute(
            method,
            `/api${route == "/" ? "" : route}${path}`,
            api[key],
          );
        }
      }

      recursiveComponentsApi(pageArgs.route, pageStruct.args);
    };

    pageApi(pageArgs.route, page.api);
    return this;
  }

  getRouter() {
    return this.#router;
  }
}
