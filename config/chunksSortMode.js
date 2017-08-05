module.exports = ({names: [a]}, {names: [b]}) => {
  if (a === 'vendor') return -1;
  if (b === 'vendor') return 1;
  return a === b ? 0 : a > b ? 1 : -1;
};
