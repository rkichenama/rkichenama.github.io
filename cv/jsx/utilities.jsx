const pad = (n, space = 2, padChar = '0') => {
  if (n == undefined) return '';
  n = n.toString();
  if (n.length >= space) { return n; }
  else { return pad(padChar + n, space, padChar); }
}
