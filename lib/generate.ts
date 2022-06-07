export default (length: number = 52): string => {
  const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return new Array(length).fill(symbols).map(x => x[Math.floor(Math.random() * x.length)]).join('');
}