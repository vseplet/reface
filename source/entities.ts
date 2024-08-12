import type { BaseAppOptions, LayoutOptions, Page } from "$types";

export const layout = <C>(
  _: (
    layoutOptions: C & LayoutOptions,
  ) => (page: string, appOptions: BaseAppOptions) => string,
) => _;

export const page = <T>(
  _: Page<T>,
) => _;

export const component = <T>(
  _: {
    render: (
      props: { data: T; apiRoute: string; componentRoute: string },
    ) => string;
    api?: (props: { data: T }) => void;
  },
) => {};

export const element = <T>(_: (props: { data: T }) => string) => {};
