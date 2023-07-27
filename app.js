import prepareNote from "./common/prepareNote.js";
import sumNotesCategory from "./common/sumNotesCategory.js";
import validateDialog from "./common/validateDialog.js";
import renderDialog from "./components/dialog/dialog.js";
import renderNote from "./components/note-item.js";
import renderSumTable from "./components/render-sum-table.js";
import { notes as initialNotes } from "./data/data.js";
import { searchIndexById } from "./common/searchIndexById.js";
import { datasRegExp } from "./common/data.helpers.js";

const notes = [...initialNotes];

function addNewNote(note) {
  const data = prepareNote(note);
  notes.push(data);
  return data;
}

function removeNote(searchKey) {
  notes.splice(searchIndexById([...notes], searchKey), 1);
}

const sumNotes = sumNotesCategory([...notes]);
let state = "active";

const noteList = document.querySelector(".note-list");
const viewOption = document.querySelector(".view-note");
const newNoteButton = document.querySelector("[data-open-modal]");
const dialog = document.querySelector("[data-modal]");
const noteSummary = document.querySelector(".note-summary");

document.addEventListener("DOMContentLoaded", () => {
  renderList();
  renderSumTable(noteSummary, sumNotes);
});

newNoteButton.addEventListener("click", addNote);
viewOption.addEventListener("click", viewNote);

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
      const res = newNote({
        id: notes.length,
        title: title,
        category: category,
        content: content,
      });
      renderSumTable(noteSummary, sumNotesCategory([...notes]));
      if (res.length > 0) dialogControl.errorEl.innerText = res.join(",");
      else dialog.close();
    }
  });
  dialog.showModal();
}

function newNote(data) {
  try {
    renderNote(addNewNote(data), noteList);
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
    const searchKey = toremove.children[0].innerText;
    removeNote(searchKey);
    toremove.addEventListener("transitionend", () => {
      toremove.remove();
      renderSumTable(noteSummary, sumNotesCategory([...notes]));
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
    renderSumTable(noteSummary, sumNotesCategory([...notes]));
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
        editNote.dates = datasRegExp(content);
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
