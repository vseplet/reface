import type {
  ApiHandlers,
  BaseComponentProps,
  BasePageProps,
  Component,
  Layout,
  LayoutOptions,
  Page,
} from "$types";

export const layout = <C>(
  _: (
    layoutOptions: C & LayoutOptions,
  ) => Layout,
) => _;

export const component = <T>(
  struct: (
    props: T & BaseComponentProps,
  ) => {
    str: TemplateStringsArray;
    args: any[];
  },
  api?: ApiHandlers<T>,
  name?: string,
): Component<T> =>
(props: T) => {
  return {
    isComponent: true,
    struct: (baseProps: BaseComponentProps) =>
      struct({ ...props, ...baseProps }),
    api,
    name,
  };
};

export const page = <T>(
  struct: (
    props: T & BaseComponentProps & BasePageProps,
  ) => {
    str: TemplateStringsArray;
    args: any[];
  },
  api?: ApiHandlers<T>,
  name?: string,
): Page<T> =>
(props: T) => {
  return {
    isPage: true,
    struct: (baseProps: BaseComponentProps & BasePageProps) =>
      struct({ ...props, ...baseProps }),
    api,
    name,
  };
};

export const element = <T>(
  struct: (props: T) => {
    str: TemplateStringsArray;
    args: any[];
  },
) =>
(props: T) => {
  return {
    isElement: true,
    struct: () => struct({ ...props }),
  };
};
