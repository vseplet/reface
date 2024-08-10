import { html } from "@vseplet/reface";
import { Icon } from "@vseplet/reface/components";

const IconRight = Icon({ icon: "chevron-right", style: "font-size: 1em" });

export const Features = () => {
  return html`
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h2 class="display-4 fw-normal text-body-emphasis">Features</h2>
    </div>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          ${Icon({ icon: "collection", style: "font-size: 1em" })}
        </div>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          ${IconRight}
        </a>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          ${Icon({ icon: "people-fill", style: "font-size: 1em" })}
        </div>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          ${IconRight}
        </a>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          ${Icon({ icon: "toggles2", style: "font-size: 1em" })}
        </div>
        <h3 class="fs-2 text-body-emphasis">Featured title</h3>
        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
        <a href="#" class="icon-link">
          Call to action
          ${IconRight}
        </a>
      </div>
    </div>
  </div>
  `;
};
