module.exports = {
  dateTrim: (dateStr) => {
    dateStr = dateStr.split("");
    dateStr.length = 10;
    dateStr = dateStr.join("").split("-");
    dateStr = [dateStr[1] + "/", dateStr[2] + "/", dateStr[0]].join("");

    return dateStr;
  },
};
