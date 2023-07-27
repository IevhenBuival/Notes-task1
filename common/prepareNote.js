import { datasRegExp } from "./data.helpers.js";

const prepareNote = (input) => {
  const { id, title, category, content } = input;

  const dates = datasRegExp(content);
  return {
    id: id,
    title: title,
    category: category,
    content: content,
    created_at: new Date(),
    dates: dates,
    archived: false,
  };
};

export default prepareNote;
