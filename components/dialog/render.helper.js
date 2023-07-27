import { createTag } from "../../common/classedTagCreate.js";

const renderOption = (value, root, selected = false) => {
  const optionTask = createTag("option", "text-primary");
  optionTask.setAttribute("value", value);
  if (selected) optionTask.setAttribute("selected", "selected");
  optionTask.innerText = value;
  root.appendChild(optionTask);
};

const helper = {
  renderLabel: (title, inputId, root, classNane = "form-label") => {
    const label = createTag("label", classNane);
    label.setAttribute("for", inputId);
    label.innerText = title;
    root.appendChild(label);
  },
  renderSelect: (id, root, value) => {
    const select = createTag("select", "form-select");
    select.setAttribute("id", id);

    renderOption(
      "Task",
      select,
      value === "" || value === "Task" ? true : false
    );
    renderOption(
      "Random Thought",
      select,
      value === "Random Thought" ? true : false
    );
    renderOption("Idea", select, value === "Idea" ? true : false);

    root.appendChild(select);
    return select;
  },
};

export const renderLabel = helper.renderLabel;
export const renderSelect = helper.renderSelect;
