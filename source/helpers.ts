export const css = String.raw;
export const html = (
  str: TemplateStringsArray,
  ...args: any[]
) => ({
  str,
  args,
});

export const js = String.raw;

export const salt = (name?: string) =>
  name
    ? `${name}_${Math.random() * 10000000000 | 0}`
    : "s" + (Math.random() * 10000000000 | 0);

export const GET = (path: string) => `get|${path}`;
export const POST = (path: string) => `post|${path}`;
export const PUT = (path: string) => `put|${path}`;
export const PATCH = (path: string) => `patch|${path}`;
export const DELETE = (path: string) => `delete|${path}`;
export const RESPONSE = (html?: string, status?: number) => {
  return {
    html,
    status,
  };
};
