const renderDialogForm = (data, root) => {
  if (root.firstElementChild) root.firstElementChild.remove();
  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  const label = document.createElement("label");
  label.innerText = "Create new note";
  form.appendChild(label);
  const input = document.createElement("input");
  form.appendChild(input);

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("formmethod", "dialog");

  button.classList.add("data-close-modal");
  button.innerText = "Close";
  form.appendChild(button);
  root.appendChild(form);
  return { closeButton: button };
};

export default renderDialogForm;
/*
<form name="new-note ">
<div>
  <input type="text" class="note-input" />
  <button class="note-button" type="submit">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path
        d="M184 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H96c-35.3 0-64 28.7-64 64v16 48V448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H376V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H184V24zM80 192H432V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H184c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V256c0-13.3-10.7-24-24-24z"
      />
    </svg>
  </button>
</div>
</form>*/
