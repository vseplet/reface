import type {
  ApiHandlers,
  IslandProps,
  Template,
  TemplaterGenerator,
} from "$/types.ts";

import { Reface } from "./Reface.ts";

const component = <T>(
  generate: TemplaterGenerator<T>,
): TemplaterGenerator<T> => generate;

const island = <T>(
  generate: (props: IslandProps<T>) => Template,
  api?: ApiHandlers,
): TemplaterGenerator<T> => {
  const name = Reface.addIsland(generate, api);
  return (props: T) => generate({ ...props, api: `/api/${name}` });
};

export { component, island, Reface };
export * from "$/helpers.ts";
export * from "$/types.ts";
export * from "$/layouts/mod.ts";
export * from "@hono/hono";
