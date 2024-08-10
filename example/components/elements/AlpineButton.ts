import { html } from "@vseplet/reface";

export const AlpineButton = (
  props: { url: string; data: Record<string, any> },
) => {
  return html`
    <div>waiting for data...</div>
    <button
      hx-post="${props.url}"
      hx-target="previous"
      hx-vals='${JSON.stringify(props.data)}'
      hx-ext='apifly'>
      Send Data
    </button>
  `;
};
