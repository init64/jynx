import axios from 'axios';

export const generate = (length: number = 52): string => {
  const symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return new Array(length).fill(symbols).map(x => x[Math.floor(Math.random() * x.length)]).join('');
};

export const IsUrlImage = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.headers['content-type'].includes('image');
  } catch (e) {
    return false;
  }
};