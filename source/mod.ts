import type {
  Island,
  RpcDefinition,
  Style,
  TemplaterGenerator,
} from "$/types.ts";

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

export const inlineStyle = <P = undefined>(
  _: P extends undefined ? () => Style : (prop: P) => Style,
) => {
  return (props: P) => {
    const data = _(props);

    let result = "";

    for (let i = 0; i < data.str.length; i++) {
      result += data.str[i];

      if (i < data.args.length) {
        result += data.args[i];
      }
    }

    // return result;
    return `style="${result}"`.trim().replace(/\n/g, "");
  };
};

export { component, island, Reface };
export * from "$/helpers.ts";
export * from "$/types.ts";
export * from "$/layouts/mod.ts";
