import { component, html } from "@vseplet/reface";
import {
  PageProps,
  TemplaterGenerator,
} from "jsr:@vseplet/reface@^0.0.22/types";
import { Footer } from "$/components/Footer.ts";
import { Header } from "$/components/Header.ts";

// deno-fmt-ignore
export const wrapper = (page: TemplaterGenerator<PageProps>) => component<PageProps>((props) => html`
  <div class="container" style="max-width: 40rem;">
    ${Header({})}
    ${page(props)}
    ${Footer({})}
  </div>
`);
