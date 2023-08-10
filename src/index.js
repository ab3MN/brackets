module.exports = function check(str = '', bracketsConfig = []) {
  if (
    str.length % 2 !== 0 ||
    typeof str !== 'string' ||
    !Array.isArray(bracketsConfig)
  )
    return false;

  // Sort brackets Config'';
  const CLOSED_BRACKETS = {};
  const OPEN_BRACKETS = [];
  const SAME_BRACKETS = [];

  bracketsConfig.forEach((el) =>
    el[0] === el[1]
      ? SAME_BRACKETS.push(el[0])
      : (OPEN_BRACKETS.push(el[0]), (CLOSED_BRACKETS[el[1]] = el[0]))
  );

  // Sort str for brackets

  const brackets = [];

  for (let i = 0; i < str.length; i++) {
    if (
      OPEN_BRACKETS.includes(str[i]) ||
      (SAME_BRACKETS.includes(str[i]) && !brackets.includes(str[i]))
    ) {
      brackets.push(str[i]);
    } else if (
      CLOSED_BRACKETS[str[i]] &&
      CLOSED_BRACKETS[str[i]] !== brackets[brackets.length - 1]
    ) {
      return false;
    } else if (SAME_BRACKETS.includes(str[i]) && brackets.includes(str[i])) {
      brackets.pop();
    } else brackets.pop();
  }

  return brackets.length !== 0 ? false : true;
};
