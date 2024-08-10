import { html } from "@vseplet/reface";
import { Icon } from "@vseplet/reface/components";

export const Footer = () => {
  return html`
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-body-secondary" href="#">${
    Icon({ icon: "twitter", style: "font-size: 2rem;" })
  }</a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#">${
    Icon({ icon: "instagram", style: "font-size: 2rem;" })
  }</a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#">${
    Icon({ icon: "facebook", style: "font-size: 2rem;" })
  }</a></li>
      </ul>
    </footer>
  `;
};
