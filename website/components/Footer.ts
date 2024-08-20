import { component, html } from "@vseplet/reface";

// deno-fmt-ignore
export const Footer = component(() => html`
  <footer class="py-3 my-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Tutorial</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Showcase</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQ</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">GitHub</a></li>
    </ul>
    <p class="text-center text-body-secondary">2024, Crafted with ♥️ by Vsevolod Pletnev</p>
  </footer>
`);
