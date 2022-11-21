module.exports = {
  truncate: (str, limit) => {
    if (str.length < limit) {
      return str;
    }
    let newStr = str.slice(0, limit);
    newStr = newStr.slice(0, newStr.lastIndexOf(" "));
    newStr = newStr.length > 0 ? newStr : str.slice(0, limit);
    return newStr + "...";
  },
};
