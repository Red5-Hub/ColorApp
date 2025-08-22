const colorSwatchContainer = document.getElementById('color-swatch');
const colorNames = [
  'White', 'Snow', 'HoneyDew', 'MintCream', 'Azure', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige',
  'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite', 'Linen', 'LavenderBlush', 'MistyRose', 'LemonChiffon', 'LightYellow',
  'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'LightPink', 'Pink', 'BlanchedAlmond',
  'Cornsilk', 'LightCyan', 'LightBlue', 'Lavender', 'Thistle', 'Plum', 'LightSteelBlue', 'PowderBlue', 'PaleTurquoise',
  'LightSkyBlue', 'SkyBlue', 'LightSalmon', 'LightGreen', 'PaleGreen', 'Khaki', 'Aquamarine', 'Aquamarine', 'LightCoral',
  'LightGrey', 'LightSlateGray', 'Salmon', 'LightSeaGreen', 'PaleVioletRed', 'PaleTurquoise', 'PeachPuff', 'MistyRose',
  'LightGoldenrodYellow', 'LightGray', 'Silver', 'MediumAquamarine', 'MediumSpringGreen', 'MediumTurquoise', 'LightSalmon',
  'MediumSlateBlue', 'LightSteelBlue', 'MediumSeaGreen', 'SlateBlue', 'LightSkyBlue', 'SpringGreen', 'YellowGreen',
  'LemonChiffon', 'LightCyan', 'Yellow', 'CornflowerBlue', 'Chartreuse', 'LawnGreen', 'GreenYellow', 'Gold', 'LimeGreen',
  'Goldenrod', 'DodgerBlue', 'Tomato', 'HotPink', 'Orange', 'DeepPink', 'MediumPurple', 'DarkTurquoise', 'Orchid',
  'IndianRed', 'Salmon', 'DarkOrange', 'OrangeRed', 'Crimson', 'MediumOrchid', 'DarkSalmon', 'DeepSkyBlue', 'DarkKhaki',
  'Gold', 'MediumVioletRed', 'MediumOrchid', 'RoyalBlue', 'MediumSlateBlue', 'SlateBlue', 'SteelBlue', 'MediumBlue',
  'DodgerBlue', 'LightGreen', 'LightSalmon', 'LightSalmon', 'FireBrick', 'DarkGoldenrod', 'YellowGreen', 'DarkCyan',
  'LightBlue', 'MediumTurquoise', 'LightSkyBlue', 'RoyalBlue', 'SteelBlue', 'MediumSeaGreen', 'SkyBlue', 'SpringGreen',
  'Turquoise', 'LightSeaGreen', 'ForestGreen', 'LawnGreen', 'Blue', 'LightCoral', 'DeepPink', 'HotPink', 'Crimson',
  'MediumVioletRed', 'SlateBlue', 'DarkSlateGray', 'DarkSeaGreen', 'YellowGreen', 'LightSeaGreen', 'Aqua', 'Teal',
  'LightCoral', 'DarkRed', 'DarkMagenta', 'DarkOrange', 'DarkSlateBlue', 'LightPink', 'Pink', 'Fuchsia', 'DarkSalmon',
  'HotPink', 'DarkOliveGreen', 'Purple', 'Brown', 'BlueViolet', 'DarkViolet', 'MediumOrchid', 'Chocolate', 'Sienna',
  'DarkOrange', 'DarkRed', 'MediumVioletRed', 'DarkGoldenrod', 'FireBrick', 'Magenta', 'DeepPink', 'DarkSlateGray',
  'DarkMagenta', 'DarkViolet', 'DarkOrchid', 'Brown', 'Red', 'DarkOliveGreen', 'Maroon', 'Purple', 'DarkBlue',
  'BlueViolet', 'DarkSlateBlue', 'SaddleBrown', 'MediumBlue', 'DarkBlue', 'Navy', 'Indigo', 'DarkSlateGray', 'Black'
];
let currentIndex = 0;

function changeColor() {
  const colorName = colorNames[currentIndex];
  const {
    hexCode,
    rgbValues
  } = getHexAndRgbCode(colorName);
  colorSwatchContainer.innerHTML = ''; // Limpiar contenido previo
  const colorContainer = document.createElement('div');
  colorContainer.classList.add('color-container');
  colorContainer.style.backgroundColor = colorName;
  const colorInfo = document.createElement('div');
  colorInfo.classList.add('color-info');
  const colorNameElement = document.createElement('div');
  colorNameElement.classList.add('color-name');
  colorNameElement.textContent = colorName;
  const colorHexElement = document.createElement('div');
  colorHexElement.classList.add('color-hex');
  colorHexElement.textContent = hexCode;
  const colorRgbElement = document.createElement('div');
  colorRgbElement.classList.add('color-rgb');
  colorRgbElement.textContent = rgbValues.join(', ');
  colorInfo.appendChild(colorHexElement);
  colorInfo.appendChild(colorRgbElement);
  colorInfo.appendChild(colorNameElement);
  colorContainer.appendChild(colorInfo);
  colorSwatchContainer.appendChild(colorContainer);
  // Determinar el color del texto basado en el brillo del fondo
  const textColor = getContrastColor(rgbValues);
  if (textColor === 'light-text') {
    colorInfo.classList.add('light-text');
  } else {
    colorInfo.classList.add('dark-text');
  }
}

function getHexAndRgbCode(colorName) {
  const tempElement = document.createElement('div');
  tempElement.style.color = colorName;
  document.body.appendChild(tempElement);
  const computedColor = window.getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);
  // Obtener los valores RGB
  const rgbValues = getRgbValues(computedColor);
  // Obtener el código hexadecimal
  const hexCode = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
  return {
    hexCode,
    rgbValues
  };
}

function getRgbValues(color) {
  const rgb = color.substring(4, color.length - 1)
    .replace(/ /g, '')
    .split(',');
  return rgb.map(value => parseInt(value));
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function getContrastColor([r, g, b]) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? 'light-text' : 'dark-text';
}

function nextColor() {
  currentIndex = (currentIndex + 1) % colorNames.length;
  changeColor();
}

function previousColor() {
  currentIndex = (currentIndex - 1 + colorNames.length) % colorNames.length;
  changeColor();
}

function handleKeyDown(event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    nextColor();
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    previousColor();
  }
}

function handleWheel(event) {
  const delta = Math.sign(event.deltaY);
  if (delta > 0) {
    nextColor();
  } else if (delta < 0) {
    previousColor();
  }
}

function handleTouchStart(event) {
  startY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  const endY = event.changedTouches[0].clientY;
  const deltaY = endY - startY;
  if (deltaY > 50) {
    previousColor();
  } else if (deltaY < -50) {
    nextColor();
  }
}
let startY;
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('wheel', handleWheel);
colorSwatchContainer.addEventListener('touchstart', handleTouchStart);
colorSwatchContainer.addEventListener('touchend', handleTouchEnd);
// Iniciar con el primer color
changeColor();