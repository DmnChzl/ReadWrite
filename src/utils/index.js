export const printVersion = version => {
  const whiteSpace = `\x1B[m `;

  const colorGreenBgPink = str => `\x1B[38;2;0;220;130;48;2;255;35;125m${str}`;
  const colorDarkBgGreen = str => `\x1B[38;2;25;25;25;48;2;0;220;130m${str}`;

  const _read = colorGreenBgPink('_') + colorDarkBgGreen('read');
  const _write = colorGreenBgPink('_') + colorDarkBgGreen('write');
  const _version = colorGreenBgPink('_') + colorDarkBgGreen(`v${version}`);

  console.log(_read + whiteSpace + _write + whiteSpace + _version);
};

/**
 * Get Width Ratio
 *
 * @param {number} innerWidth Width Size
 * @returns {number}
 */
export const getWidthRatio = innerWidth => {
  if (innerWidth >= 1024) {
    // lg:
    return 4;
  } else if (innerWidth >= 768 && innerWidth < 1024) {
    // md:
    return 3;
  } else {
    // sm:
    return 2;
  }
};
