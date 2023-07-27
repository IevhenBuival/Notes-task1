function sumNotesCategory(notes) {
  const CategorySet = new Set();
  notes.forEach((element) => {
    CategorySet.add(element.category);
  });
  const sumNotes = [];
  for (let item of CategorySet) {
    const filtered = notes.filter((el) => el.category === item);
    const activeCount = filtered.reduce((accumulator, currentValue) => {
      if (!currentValue.archived) return accumulator + 1;
      return accumulator;
    }, 0);
    const archivedCount = filtered.reduce((accumulator, currentValue) => {
      if (currentValue.archived) return accumulator + 1;
      return accumulator;
    }, 0);
    sumNotes.push({
      category: item,
      active: activeCount,
      archived: archivedCount,
    });
  }

  return sumNotes;
}

export default sumNotesCategory;
