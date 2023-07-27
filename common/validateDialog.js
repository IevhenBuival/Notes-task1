function validateDialog(title, category) {
  const messages = [];

  if (title === "" || title == null) {
    messages.push("Note's name is required");
  }
  if (category === "" || category == null) {
    messages.push("Note's category is required");
  }

  return messages;
}

export default validateDialog;
