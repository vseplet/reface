import { html } from "@vseplet/reface";
import { Icon } from "@vseplet/reface/components";

const IconCheck = Icon({ icon: "check", style: "font-size: 2rem;" });

export const Plans = () => {
  return html`
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h2 class="display-4 fw-normal text-body-emphasis">Compare plans</h2>
    </div>
    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th style="width: 34%;"></th>
            <th style="width: 22%;">Free</th>
            <th style="width: 22%;">Pro</th>
            <th style="width: 22%;">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Public</th>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Private</th>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Permissions</th>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Sharing</th>
            <td></td>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Unlimited members</th>
            <td></td>
            <td>${IconCheck}</td>
            <td>${IconCheck}</td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Extra security</th>
            <td></td>
            <td></td>
            <td>${IconCheck}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};
