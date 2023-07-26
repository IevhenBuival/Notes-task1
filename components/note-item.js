const renderField = function (text, size, root) {
  const noteField = document.createElement("div");
  noteField.classList.add("col-" + size);
  noteField.classList.add("border");
  noteField.classList.add("rounded");
  noteField.classList.add("border-primary");
  noteField.classList.add("bg-white");
  noteField.classList.add("text-truncate");
  noteField.innerText = text;
  root.appendChild(noteField);
  return noteField;
};

const renderBtnField = function (text, size, root) {
  const noteField = document.createElement("div");
  noteField.classList.add("col-" + size);
  noteField.classList.add("border");
  noteField.classList.add("rounded");
  noteField.classList.add("border-primary");
  noteField.classList.add("text-truncate");
  noteField.classList.add("bg-info");
  noteField.classList.add("d-flex");
  noteField.classList.add("px-0");
  //noteField.classList.add("justify-content-between");
  //noteField.classList.add("align-items-start");
  //  noteRow.classList.add("align-items-center");
  //  noteRow.classList.add("justify-content-center");

  noteField.innerText = text;
  root.appendChild(noteField);
  return noteField;
};

const renderNote = function (note, root) {
  const noteRow = document.createElement("div");
  noteRow.classList.add("note");
  noteRow.classList.add("container-fluid");
  noteRow.classList.add("row");
  noteRow.classList.add("w-100");

  noteRow.classList.add("text-primary");
  noteRow.classList.add("rounded");

  const noteLi = document.createElement("div");
  noteLi.innerText = note.id;
  noteLi.classList.add("note-item");
  noteRow.appendChild(noteLi);
  renderField(note.title, "1", noteRow);
  renderField(note.created_at.toISOString(), "2", noteRow);
  renderField(note.category, "1", noteRow);
  renderField(note.content, "5", noteRow);
  renderField(note.dates, "2", noteRow);

  const actionField = renderBtnField("", "1", noteRow);

  const editButton = document.createElement("button");
  editButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>';
  editButton.classList.add("edit-btn");
  editButton.classList.add("border");
  editButton.classList.add("flex-btn");

  actionField.appendChild(editButton);

  const archiveButton = document.createElement("button");
  archiveButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM96 48c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm-6.3 71.8c3.7-14 16.4-23.8 30.9-23.8h14.8c14.5 0 27.2 9.7 30.9 23.8l23.5 88.2c1.4 5.4 2.1 10.9 2.1 16.4c0 35.2-28.8 63.7-64 63.7s-64-28.5-64-63.7c0-5.5 .7-11.1 2.1-16.4l23.5-88.2zM112 336c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z"/></svg>';
  archiveButton.classList.add("archive-btn");
  archiveButton.classList.add("border");
  archiveButton.classList.add("flex-btn");
  actionField.appendChild(archiveButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>';
  trashButton.classList.add("trash-btn");
  trashButton.classList.add("border");
  trashButton.classList.add("flex-btn");
  actionField.appendChild(trashButton);

  root.appendChild(noteRow);
  return noteRow;
};

export default renderNote;
