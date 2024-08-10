export type BaseAppOptions = {
  baseUrl?: string;
  staticPath?: string;
};

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
