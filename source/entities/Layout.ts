import type { LayoutOptions } from "$types";

export const RefaceLayout = <C>(
  _: (config: C & LayoutOptions) => (page: string) => string,
) => {};
