module.exports = {
  dateTrim: (dateStr) => {
    dateStr = dateStr.split("");
    dateStr.length = 10;
    dateStr = dateStr.join("").split("-");
    dateStr = [dateStr[1] + "/", dateStr[2] + "/", dateStr[0]].join("");

    return dateStr;
  },
  nameTrim: (fullName) => {
    let nameSplit = fullName.split(" ");
    let firstName = nameSplit[0];
    let lastName = nameSplit.filter((ln) => ln != firstName).join(" ");

    return { firstName, lastName };
  },
  sortUser: (arr, order) => {
    return order == "asc"
      ? arr.sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
      : arr.sort((a, b) => (a.first_name > b.first_name ? -1 : 1));
  }
};
