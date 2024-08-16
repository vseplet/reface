import type { Template } from "$types";

export const html = (
  str: TemplateStringsArray,
  ...args: any[]
) => ({
  isTemplate: true,
  str,
  args,
});

export const salt = (name?: string) =>
  name
    ? `${name}_${Math.random() * 10000000000 | 0}`
    : "s" + (Math.random() * 10000000000 | 0);

export const render = (
  template: Template,
): string => {
  return template.str.reduce((acc, part, i) => {
    const arg = template.args[i];
    if (arg?.isTemplate) {
      return acc + part + render(arg);
    }
    return acc + part + (arg || "");
  }, "");
};

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
