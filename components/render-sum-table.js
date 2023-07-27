import { createTag } from "../common/classedTagCreate.js";
import { renderField } from "../common/fieldRender.js";

const renderCategory = (el, root) => {
  const { category, active, archived } = el;
  const noteRow = createTag("div", "row text-primary rounded");
  renderField(category, "5", noteRow);
  renderField(active, "3", noteRow);
  renderField(archived, "4", noteRow);
  root.appendChild(noteRow);
};

const renderSumTable = (root, summNotes) => {
  if (root.firstElementChild) root.firstElementChild.remove();
  const wrapper = createTag("div", "");

  if (summNotes.length > 0) {
    summNotes.map((el) => {
      renderCategory(el, wrapper);
    });
  }
  root.appendChild(wrapper);
};

export default renderSumTable;
