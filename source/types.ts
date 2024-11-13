export type Layout = (page: string) => string;

export type RefaceRequest = {
  api: string;
  route: string;
  params: { [x: string]: string };
  query: Record<string, string>;
  headers: Record<string, string>;
  formData: FormData;
};

export type RefaceResponse = {
  html?: string;
  status?: number;
};

export type RestHandlers = {
  [method: string]: RestHandler;
};

export type RestHandler = (
  req: RefaceRequest,
  // log: (...args: any[]) => void; TODO: add luminous logger
) => Promise<RefaceResponse>;

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

export type Style = {
  isStyle: boolean;
  str: TemplateStringsArray;
  args: Array<any | Template>;
};

export type TemplateGenerator<T> = (props: T) => Template;
// export type TemplateGenerator<T> = T extends void ? () => Template
//   : (props: T) => Template;

export type RpcDefinition = { [key: string]: any };

export type RpcCalls<R> = {
  hx: {
    [key in keyof R]: (args?: R[key]) => string;
  };
};

export type RpcHandlers<R> = {
  [key in keyof R]: (
    _: {
      args: R[key];
      // req: RefaceRequest; TODO: add req
      // log: (...args: any[]) => void; TODO: add luminous logger
    },
  ) => Promise<{
    html?: string;
    status?: number;
  }>;
};

export type Island<R, P> = {
  name?: string;
  template: (
    args: {
      props: P;
      rpc: RpcCalls<R>;
      // log: (...args: any[]) => void; TODO: add luminous logger
      rest: {
        hx: (
          name: string | "self",
          method: "get" | "post" | "put" | "delete" | "patch",
          route: string,
        ) => string;
      };
      partial?: (name: string) => string; // TODO: add partial
      island?: (name: string) => string; // TODO: add island
    },
  ) => Template;
  rpc?: RpcHandlers<R>;
  rest?: RestHandlers;
};
