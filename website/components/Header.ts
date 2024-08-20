import { component, html } from "@vseplet/reface";

// deno-fmt-ignore
export const Header = component(() => html`
  <header class="container d-flex justify-content-between py-5">
    <ul class="nav nav-pills">
      <!-- <li class="nav-item"><a href="#" class="nav-link">Showcase</a></li> -->
      <li class="nav-item"><a href="#" class="nav-link">About</a></li>
      <li class="nav-item"><a href="#" class="nav-link">FAQ</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Tutorial</a></li>
    </ul>

    <ul class="nav nav-pills">
      <li class="nav-item">
        <a href="https://github.com/vseplet/reface" class="nav-link" style="color: #333;">
          <i class="bi bi-github h4"></i>
        </a>
      </li>

      <li class="nav-item">
        <a href="https://discord.gg/gT4gvVwqb8" class="nav-link" style="color: #7289da;">
          <i class="bi bi-discord h4"></i>
        </a>
      </li>
    </ul>
  </header>
`);
