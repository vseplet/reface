import { html } from "@vseplet/reface";
import { Header } from "$components/sections/Header.ts";
import { Hero } from "$components/sections/Hero.ts";
import { Features } from "$components/sections/Features.ts";
import { Pricing } from "$components/sections/Pricing.ts";
import { Plans } from "$components/sections/Plans.ts";
import { Footer } from "$components/sections/Footer.ts";
import { RequestForm } from "$components/sections/RequestForm.ts";
import { AlpineButton } from "$components/elements/AlpineButton.ts";

export const Home = () => {
  return html`
    <div class="container">
      ${Header()}
    </div>
    <div id="hero" class="container">
      ${Hero()}
    </div>
    <div id="features" class="container">
      ${Features()}
    </div>
    <div id="pricing" class="container">
      ${Pricing()}
      ${Plans()}
    </div>
    <div id="request" class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">${RequestForm()}</div>
      </div>
    </div>
    <div class="container">
      ${Footer()}
    </div>

    <div class="container">
      ${AlpineButton({ url: "/send", data: { name: "John" } })}
    </div>
  `;
};
