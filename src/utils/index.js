import { colorTemperature2rgb, rgb2colorTemperature } from "color-temperature";
import tinycolor from 'tinycolor2';
import { textContrast } from 'text-contrast';

export const convertHSBToColor = state => {
  // Lamp supports HSL
  if (state.hue) {
    const h = Math.round(state.hue / 182.041667);
    const s = Math.round(state.sat / 2.54);
    const v = Math.round(state.bri / 2.54);

    const color = tinycolor({ h, s, v});
    return color.toHexString();
  }

  // Lamp supports CT
  if (state.ct) {
    const rgb = colorTemperature2rgb(1e6/state.ct);
    const color = tinycolor({r: rgb.red, g: rgb.green, b: rgb.blue });
    // color.darken(100 - Math.round(state.bri / 2.54));
    return color.lighten(15).toHexString();
  }

  return "#FFFFFF"
};


export const convertHSVToHSB = color => {
  const hue = Math.round(color.hsv.h * 182.041667);
  const sat = Math.round(color.hsv.s * 254);
  const bri = Math.round(color.hsv.v * 253) + 1;

  return { hue, sat, bri };
}

export const convertHSVToCT = color => {
  const { r, g, b } = color.rgb;
  return { 
    ct: Math.round(803.7 - (rgb2colorTemperature({ red: r, green: g, blue: b }) / 10)),
    bri: Math.round(color.hsv.v * 253) + 1
  };
}

export const compatibleText = color => {
  if (!color) {
    return "black";
  }
  return textContrast.isDark(color) ? "white" : "black"
}

export const isAdjustable = state => {
  if (state.hue || state.ct) return true;
  return false;
}