export type BaseAppOptions = {
  baseUrl?: string;
  staticPath?: string;
};

export type Layout = (page: string, appOptions: BaseAppOptions) => string;

export type Page<T> = (props: PageProps<T>) => string;

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
};

export type ResourceScriptOptions = {};
export type ResourceStyleOptions = {};

export type PageProps<T> = {
  data: T;
  route: string;
  params: { [x: string]: string };
  headers: Record<string, string>;
  query: Record<string, string>;
};

export type ComponentProps<T> = {};
