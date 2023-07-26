import renderDialog from "./components/dialog.js";
import renderNote from "./components/note-item.js";
import { notes as initialnotes } from "./data/data.js";
const noteInput = document.querySelector(".note-input");

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
  dialogControl.closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.showModal();
}
function newNote(event) {
  event.preventDefault();

  renderNote(saveNote({ title: noteInput.value }), noteList);
  noteInput.value = "";
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
    toarhive.classList.add("archived");
    Refilter(state);
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
  const index = notes.findIndex((el) => {
    if (el.content === searchKey) return true;
    return false;
  });
  notes.splice(index, 1);
}
