export const css = String.raw;

export const html = String.raw;

export const js = String.raw;

export const salt = (name?: string) =>
  name ? `${name}_${crypto.randomUUID()}` : crypto.randomUUID();
