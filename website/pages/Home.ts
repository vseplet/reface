import { component, html, PageProps } from "@vseplet/reface";
import { RandomJoke } from "$/components/RandomJoke.ts";

export const Home = component((props: PageProps) =>
  html`
    <div class="container grid my-3">
      <h1>Hello, Reface!</h1>
      <pre>${RandomJoke({ interval: 5 })}</pre>
    </div>
  `
);
