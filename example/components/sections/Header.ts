import { html } from "@vseplet/reface";

export const Header = () => {
  return html`
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src="/public/vite.svg" alt="Logo" width="40" height="32">
        <span class="fs-4">Simple header</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
        <li class="nav-item"><a href="#features" class="nav-link">Features</a></li>
        <li class="nav-item"><a href="#pricing" class="nav-link">Pricing</a></li>
      </ul>
    </header>
  `;
};
