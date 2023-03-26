export function randomRgbColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},0.8)`
}

export function randomCustomRgbColor(min: number, max: number) {
  const r = Math.floor(Math.random() * randomNum(min, max));
  const g = Math.floor(Math.random() * randomNum(min, max));
  const b = Math.floor(Math.random() * randomNum(min, max));
  return `rgb(${r},${g},${b})`
}

export function randomHexColor() {
  const allStr = '0123456789abcdef';
  let str = '';
  Array.from({length: 3}).forEach(() => {
    str = `${str}${allStr[Math.floor(Math.random() * 16)]}`;
  });
  return `#${str}`;   
}

export function randomStr(num: number) {
  const allStr = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz';
  let str = '';
  Array.from({ length: num }).forEach(() => {
    str = `${str}${allStr[Math.floor(Math.random() * allStr.length)]}`
  })
}

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randomIntCode(num: number) {
  return Math.random().toString().slice(2, 2+num);
}