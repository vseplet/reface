import type { BaseAppOptions, LayoutOptions } from "$types";

export const RefaceLayout = <C>(
  _: (
    layoutOptions: C & LayoutOptions,
  ) => (page: string, appOptions: BaseAppOptions) => string,
) => _;
