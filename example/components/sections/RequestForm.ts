import { html } from "@vseplet/reface";
import { Input } from "@vseplet/reface/components";

export const RequestForm = () => {
  const inputEmail = Input({
    placeholder: "Enter your email",
    regexp: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    name: "email",
    className: "form-control",
  });

  const inputCompany = Input({
    placeholder: "Enter your company name",
    regexp: "^[a-zA-Z]+$",
    name: "company",
    className: "form-control",
  });

  return html`
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h2 class="display-4 fw-normal text-body-emphasis">Request a demo</h2>
    </div>

    <form
      hx-target="#response"
      hx-post="/api/contact-form"
      hx-ext="submitjson">

      <div class="mb-3">
        <label class="form-label">Email address</label>
        ${inputEmail}
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Company name</label>
        ${inputCompany}
      </div>

      <div class="mb-3">
        <label class="form-label">Comments</label>
        <textarea
          name="comment"
          class="form-control"
          placeholder="Leave a comment here"
          style="height: 100px"></textarea>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-full">
        Submit
      </button>
    </form>

    <div id="response"></div>
  `;
};
