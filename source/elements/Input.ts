import { html } from "$/mod.ts";

export const Input = (props: {
  regexp: string;
  type?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
}) => {
  const id = props.id || `idInput${Math.random() * 10000 | 0}`;
  const name = props.name || `nameInput${Math.random() * 10000 | 0}`;

  return html`
    <input
      type="${props.type || "text"}"
      class="${props.className}"
      id="${id}"
      name="${name}"
      placeholder="${props.placeholder}"
      hx-trigger="input delay:2s"
      pattern="${props.regexp}"
      _="on input if ${id}.value
        and not ${id}.value.match('${props.regexp}')
        then add .shake to me then add .is-invalid to me then wait 0.5s
        then remove .shake from me else remove .is-invalid from me"/>
  `;
};
