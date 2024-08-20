import { component, html, PageProps } from "@vseplet/reface";
import { RandomJoke } from "$/islands/RandomJoke.ts";
import { Hero } from "$/components/Hero.ts";

export const Home = component((props: PageProps) =>
  html`
    <div class="container d-flex justify-content-center align-items-center">
      <!-- <pre>${RandomJoke({ interval: 5 })}</pre> -->
      ${Hero({})}
    </div>
  `
);
