const prepareNote = (input) => {
  const { id, title, category, content } = input;
  const reg = /\d{4}-\d{2}-\d{2}/;
  const searchstr = content ? content : "";
  const dateArr = searchstr.match(reg);
  const dates = dateArr ? dateArr.join(",") : "";
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
