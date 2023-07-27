export const createTag = (tag, classes) => {
  const classesArray = classes.split(" ");
  const formContainer = document.createElement(tag);
  if (classes)
    classesArray.forEach((classname) => formContainer.classList.add(classname));
  return formContainer;
};
