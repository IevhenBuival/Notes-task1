export const datasRegExp = (content) => {
  const reg = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  const searchstr = content ? content : "";
  const dateArr = searchstr.match(reg);
  const dates = dateArr ? dateArr.join(",") : "";
  return dates;
};
export const dataFormat = (data) => {
  const dates =
    "" + data.getMonth() + "/" + data.getDay() + "/" + data.getFullYear();

  return dates;
};
