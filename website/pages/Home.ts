import { component, html, PageProps } from "@vseplet/reface";
import { RandomJoke } from "$/components/RandomJoke.ts";

export const Home = component((props: PageProps) =>
  html`
    <div class="container d-flex my-3 h-100 justify-content-center align-items-center">
      <pre>${RandomJoke({ interval: 5 })}</pre>
    </div>
  `
);
