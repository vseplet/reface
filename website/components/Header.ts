import { component, html } from "@vseplet/reface";

// deno-fmt-ignore
export const Header = component(() => html`
  <header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li class="nav-item"><a href="#" class="nav-link">Tutorial</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Showcase</a></li>
      <li class="nav-item"><a href="#" class="nav-link">About</a></li>
      <li class="nav-item"><a href="#" class="nav-link">FAQ</a></li>
      <li class="nav-item"><a href="#" class="nav-link">GitHub</a></li>
    </ul>
  </header>
`);
