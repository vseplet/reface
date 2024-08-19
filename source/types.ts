export type BaseAppOptions = {
  baseUrl?: string;
  staticPath?: string;
};

export type Layout = (page: string, appOptions: BaseAppOptions) => string;

export type ApiRequest = {
  api: string;
  route: string;
  params: { [x: string]: string };
  query: Record<string, string>;
  headers: Record<string, string>;
  formData: FormData;
};

export type ApiResponse = {
  html?: string;
  status?: number;
};

export type ApiHandlers = {
  [method: string]: ApiHandler;
};

export type ApiHandler = (req: ApiRequest) => Promise<ApiResponse>;

export type LayoutOptions = {
  title?: string;
  scripts?: {
    src: string;
    integrity?: string;
    defer?: boolean;
    async?: boolean;
    crossorigin?: string;
  }[];
  styles?: {
    href: string;
    integrity?: string;
    defer?: boolean;
    async?: boolean;
    crossorigin?: string;
  }[];
  head?: string;
};

export type ResourceScriptOptions = {};
export type ResourceStyleOptions = {};

export type PageProps = {
  route: string;
  params: {
    [x: string]: string;
  };
  headers: Record<string, string>;
  query: Record<string, string>;
};

export type Template = {
  isTemplate: boolean;
  str: TemplateStringsArray;
  args: Array<any | Template>;
};

export type TemplaterGenerator<T> = (props: T) => Template;

export type IslandProps<T> = {
  api: string;
} & T;

export type RpcDefinition = { [key: string]: any };

export type RpcCalls<R> = {
  hx: {
    [key in keyof R]: (args?: R[key]) => string;
  };
  // hs: {};
  // alpine: {};
  // js: {};
};

export type RpcHandlers<R> = {
  [key in keyof R]: (
    _: { args: R[key] },
  ) => Promise<{
    html?: string;
    status?: number;
  }>;
};

export type IslandBody<P, R> = {
  name?: string;
  template: (
    { rpc, props, api }: { rpc: RpcCalls<R>; props: P; api: string },
  ) => Template;
  rpc?: RpcHandlers<R>;
  api?: ApiHandlers;
};
