/**
 * Конвертирует hex-представление цвета в rgb
 * @param hex - hex-код цвета
 */
export function hex2Rgb(hex: string) {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!rgb) {
    throw new Error(`Значение '${hex}' не является HEX-кодом цвета`)
  }

  return {
    r: parseInt(rgb[1], 16),
    g: parseInt(rgb[2], 16),
    b: parseInt(rgb[3], 16),
  }
}

/**
 * Возвращает контрастный цвет для указанного цвета в формате hex
 * @param hex - hex-значение исходного цвета
 * @returns - hex-значение контрастного цвета
 */
export function getContrast(hex: string) {
  const { r, g, b } = hex2Rgb(hex)

  //перевод из rgb в цветовую модель yiq
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  return yiq >= 128 ? '#000000' : '#FFFFFF'
}
