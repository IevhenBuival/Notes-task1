import { createTag } from "../../common/classedTagCreate.js";
import { renderLabel, renderSelect } from "./render.helper.js";

const renderDialogForm = (data, root) => {
  if (root.firstElementChild) root.firstElementChild.remove();
  const formContainer = createTag("div", "container text-primary w-100");
  const formTitle = createTag("div", "text-center");
  const editMode = data.title ? true : false;
  const titleText = editMode ? "Edit note" : "Add new note";

  formTitle.innerHTML = `<h2>${titleText}</h2>`;
  formContainer.appendChild(formTitle);

  const form = createTag("form", "text-primary");
  form.setAttribute("method", "dialog");
  form.setAttribute("id", "form");
  renderLabel("Name:", "title", form);

  const input = createTag("input", "form-control mb-1");
  input.setAttribute("type", "text");
  input.setAttribute("id", "title");
  input.setAttribute("placeholder", "Enter note name");
  if (editMode) input.setAttribute("value", data.title);
  form.appendChild(input);

  renderLabel("Category:", "category", form);
  const select = renderSelect("category", form, data.category);

  const textarea = createTag("textarea", "form-control my-3");
  textarea.setAttribute("id", "content");
  textarea.setAttribute("rows", 4);
  if (editMode) textarea.innerText = data.content;
  const textareaDiv = createTag("form", "form-floating");
  textareaDiv.appendChild(textarea);
  renderLabel("Note:", "content", textareaDiv, "text-primary");
  form.appendChild(textareaDiv);
  if (editMode) {
    if (data.dates)
      renderLabel(
        "dates: " + data.dates,
        "dates",
        form,
        "d-block text-primary m-1"
      );
    renderLabel(
      data.archived ? "This note is archived" : "This note is active",
      "arhived",
      form,
      "d-block m-1 " + (data.archived ? "text-danger" : "text-success")
    );

    renderLabel(
      "created at: " + data.created_at,
      "arhived",
      form,
      "d-block text-primary m-1"
    );
  }

  const errorDiv = createTag("div", "bg-info text-danger");
  errorDiv.setAttribute("id", "dialogerror");
  form.appendChild(errorDiv);

  const buttonsDiv = createTag("div", "mb-4 text-center mt-3 d-flex");

  const buttonCancel = createTag(
    "button",
    "btn btn-secondary mx-3 data-close-modal"
  );

  buttonCancel.setAttribute("formmethod", "dialog");
  buttonCancel.setAttribute("type", "button");
  buttonCancel.innerText = "Cancel";

  const buttonSubmit = createTag("button", "btn btn-primary");
  buttonSubmit.setAttribute("type", "submit");
  buttonSubmit.innerText = "Save";
  buttonsDiv.appendChild(buttonSubmit);
  buttonsDiv.appendChild(buttonCancel);
  form.appendChild(buttonsDiv);

  const formColWrapper = createTag("div", "col-lg-8");

  formColWrapper.appendChild(form);
  const formRowWrapper = createTag("div", "row justify-content-center my-2");
  formRowWrapper.appendChild(formColWrapper);
  formContainer.appendChild(formRowWrapper);

  root.appendChild(formContainer);

  buttonCancel.addEventListener("click", () => {
    root.close();
  });
  return {
    form: form,
    titleEl: input,
    categoryEl: select,
    contentEl: textarea,
    errorEl: errorDiv,
  };
};

export default renderDialogForm;
