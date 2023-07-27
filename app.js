import prepareNote from "./common/prepareNote.js";
import { searchIndexById } from "./common/searchIndexById.js";
import validateDialog from "./common/validateDialog.js";
import renderDialog from "./components/dialog/dialog.js";
import renderNote from "./components/note-item.js";
import { notes as initialnotes } from "./data/data.js";

const noteList = document.querySelector(".note-list");

const viewOption = document.querySelector(".view-note");

const newNoteButton = document.querySelector("[data-open-modal]");
const dialog = document.querySelector("[data-modal]");

const notes = [...initialnotes];
let state = "active";

newNoteButton.addEventListener("click", addNote);

viewOption.addEventListener("click", viewNote);

document.addEventListener("DOMContentLoaded", () => {
  renderList();
});

dialog.addEventListener("click", (e) => {
  const dialogBounding = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogBounding.left ||
    e.clientX > dialogBounding.right ||
    e.clientY < dialogBounding.top ||
    e.clientY > dialogBounding.bottom
  )
    dialog.close();
});

function addNote(event) {
  const dialogControl = renderDialog(
    { title: "", content: "", category: "" },
    dialog
  );
  dialogControl.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = dialogControl.titleEl.value;
    const category = dialogControl.categoryEl.value;
    const content = dialogControl.contentEl.value;
    const messages = validateDialog(title, category);

    if (messages.length > 0) {
      dialogControl.errorEl.innerText = messages.join(",");
    } else {
      const newNoteData = prepareNote({
        id: notes.length,
        title: title,
        category: category,
        content: content,
      });
      const res = newNote(newNoteData);
      if (res.length > 0) dialogControl.errorEl.innerText = res.join(",");
      else dialog.close();
    }
  });

  dialog.showModal();
}
function newNote(data) {
  try {
    renderNote(saveNote(data), noteList);
    return [];
  } catch {
    return ["error to create node"];
  }
}

function editNoteEl(data, el) {
  el.children[1].innerText = data.title;
  el.children[3].innerText = data.category;
  el.children[4].innerText = data.content;
  el.children[5].innerText = data.dates;
}

function noteAction(event) {
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    const toremove = item.parentElement.parentElement;
    toremove.classList.add("fall");
    removeNote(toremove);
    toremove.addEventListener("transitionend", () => {
      toremove.remove();
    });
  }
  if (item.classList[0] === "archive-btn") {
    const toarhive = item.parentElement.parentElement;
    const id = toarhive.children[0].innerText;
    const editNote = notes[searchIndexById([...notes], id)];
    if (editNote.archived) {
      toarhive.classList.remove("archived");
      editNote.archived = false;
    } else {
      toarhive.classList.add("archived");
      editNote.archived = true;
    }
    Refilter(state);
  }
  if (item.classList[0] === "edit-btn") {
    const toedit = item.parentElement.parentElement;
    const id = toedit.children[0].innerText;
    const editNote = notes[searchIndexById([...notes], id)];
    const dialogControl = renderDialog(editNote, dialog);
    dialogControl.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = dialogControl.titleEl.value;
      const category = dialogControl.categoryEl.value;
      const content = dialogControl.contentEl.value;
      const messages = validateDialog(title, category);

      if (messages.length > 0) {
        dialogControl.errorEl.innerText = messages.join(",");
      } else {
        editNote.title = title;
        editNote.category = category;
        editNote.content = content;

        editNoteEl({ ...editNote }, toedit);

        dialog.close();
      }
    });
    dialog.showModal();
  }
}

function Refilter(value) {
  const notes = [...noteList.childNodes];
  notes.forEach(function (note) {
    switch (value) {
      case "all":
        note.style.display = "flex";
        break;
      case "active":
        note.classList.contains("archived")
          ? (note.style.display = "none")
          : (note.style.display = "flex");
        break;
      case "archive":
        note.classList.contains("archived")
          ? (note.style.display = "flex")
          : (note.style.display = "none");
        break;
    }
  });
}
function viewNote(event) {
  state = event.target.value;
  Refilter(state);
}

function renderList() {
  notes.map((el) => {
    const noteRow = renderNote(el, noteList);
    noteRow.addEventListener("click", noteAction);
  });
}

function saveNote(note) {
  notes.push(note);
  return note;
}

function removeNote(note) {
  const searchKey = note.children[0].innerText;
  notes.splice(searchIndexById([...notes], searchKey), 1);
}
