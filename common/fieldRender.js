import { createTag } from "./classedTagCreate.js";

export const renderField = function (text, size, root) {
  const noteField = createTag(
    "div",
    "col-" + size + " border rounded border-primary bg-white text-truncate"
  );
  noteField.innerText = text;
  root.appendChild(noteField);
  return noteField;
};
