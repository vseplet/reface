import type { Island, RpcDefinition, TemplaterGenerator } from "$/types.ts";

import { Reface } from "./Reface.ts";

const component = <T>(
  generate: TemplaterGenerator<T>,
): TemplaterGenerator<T> => generate;

const island = <
  P,
  R extends RpcDefinition = { [key: string]: any },
>(
  _: Island<P, R>,
): TemplaterGenerator<P> => Reface.addIsland(_);

export { component, island, Reface };
export * from "$/helpers.ts";
export * from "$/types.ts";
export * from "$/layouts/mod.ts";
