
import {
  presetIcons,
  presetUno,
  transformerVariantGroup,
  defineConfig
} from "unocss";
import { presetRadix } from "unocss-preset-radix";
// import * as radixColors from '@radix-ui/colors';
import { rules, shortcuts } from './uno-rules';
import { myPreset2 } from './myPreset2';
// import presetPrimitives from "unocss-preset-primitives";

export default defineConfig({
  rules,
  // @ts-ignore
  shortcuts,
  theme: {
    color: {
      subdued: "var(--rx-slate11)",
    },
    breakpoints: {
      xxs: '420px',
      xs: '480px',
      sm: '640px',
      md: '768px'
    }
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno({
      dark: "class"
    }),
    presetIcons(),
    myPreset2({
      prefix: 'rx',
      useP3Colors: true,
      extend: true,
        // onlyOneTheme: 'dark',
      safeListColors: ["slate11A", 'cyan8A'],
      safeListAliases: ['base'],
      aliases: {
        base: 'slate',
        accent: 'cyan',
        warning: 'yellow',
        error: 'red',
        success: 'green',
        info: 'blue'
      }
    }),
  ],
});
