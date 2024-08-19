import type { IslandBody, RpcDefinition, TemplaterGenerator } from "$/types.ts";

import { Reface } from "./Reface.ts";

const component = <T>(
  generate: TemplaterGenerator<T>,
): TemplaterGenerator<T> => generate;

const island = <
  P,
  R extends RpcDefinition = { [key: string]: any },
>(
  _: IslandBody<P, R>,
): TemplaterGenerator<P> => Reface.addNewIsland(_);

export { component, island, Reface };
export * from "$/helpers.ts";
export * from "$/types.ts";
export * from "$/layouts/mod.ts";
