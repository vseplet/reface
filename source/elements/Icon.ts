import { html } from "$/mod.ts";

export const Icon = (props: { icon: string; style?: string }) => {
  return html`
    <i class="${`bi bi-${props.icon}`}" style="${props.style}"></i>
  `;
};
