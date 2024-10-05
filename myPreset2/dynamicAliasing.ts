import { RuleContext } from "unocss/index";
import { Alias, Alpha, P3, RadixHue, Token } from "./types";
import { RADIX_HUES } from './consts';

// 🔴 test dynamic aliasing
// 🔴 dynamic aliasing => how to add color to the theme?
// alias-danger-is-red => bg-danger5 => replace-virtual-with:danger:bg-virtualcolor5
// change slector and CSSEntries🔴
//  use a shortcut to catch all dynamic aliases and return replace-blue-with-alias:from-blue9, then replace css var names with alias var name
// 🔴 dynamic aliasing (in porgress)

function virtualColorToAliasVariant({ prefix }) {
  return {
    name: "replace virtual color ",
    match: (matcher) => {
      const match = matcher.match(
        /^(.*)replace-virtualcolor-with-([A-Za-z]+):(.*)-([A-Za-z]+)(1|2|3|4|5|6|7|8|9|10|11|12)(A)$/
      );
      if (!match) return;
      const [token, alias, prop, _alias, shade, alpha] = match;
      // console.log("🚀 ~ matcher:", matcher)
      return {
        matcher: matcher.replaceAll(`replace-virtualcolor-with-${alias}:`, ""),
        selector: (selector) => {
          return `${prop}-${alias}${shade}${alpha}`;
        },
        body: (cssEntries) => {
          let newCssEntries: [string, string | number][] = [];
          for (const entry of cssEntries) {
            const property: string = entry[0];
            let value = entry[1] ?? "";
            if (typeof value === "number") {
              newCssEntries.push([property, value]);
            } else {
              // non alpha colors
              value.replaceAll(`var(--${prefix}-virtualcolor`, `var(--${prefix}-${alias}`);
              value.replaceAll(`var(--${prefix}-P3-virtualcolor`, `var(--${prefix}-P3-${alias}`);
              newCssEntries.push([property, value]);
            }
          }
          return newCssEntries;
        },
      };
    },
  };
}

const createRule = ({ prefix, aliasesInUse }) => [
  /^alias-([A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])-is-([A-Za-z]+)$/,
  ([token, alias, hue, p3, alpha]: [Token, Alias, RadixHue, P3, Alpha], context: RuleContext) => {
    // discard mismatched rules
    if (!RADIX_HUES.includes(hue as RadixHue)) return;
    addHueToAnAliasInUse({ alias, hue });

    // add colors that are used by this alies
    for (const possibleHue of aliasesInUse[alias].possibleHues) {
      for (const shadeAlpha of Object.keys(aliasesInUse[alias].shadesInUse)) {
        const { shade: sh, alpha: a } = aliasesInUse[alias].shadesInUse[shadeAlpha];
        addColorToColorsInUse({ shade: sh, alpha: a, hue: possibleHue });
      }
    }
    const { shadesInUse } = aliasesInUse[alias];
    const cssEntries: [string, string][] = [];
    for (const shadeAlpha of Object.keys(shadesInUse)) {
      cssEntries.push([`--${prefix}-${alias}${shadeAlpha}`, `var(--${prefix}-${hue}${shadeAlpha})`]);
      cssEntries.push([`--${prefix}-P3-${alias}${shadeAlpha}`, `var(--${prefix}-P3-${hue}${shadeAlpha})`]);
    }
    return cssEntries;
  },
];

const extendTheme = ({ prefix }) => {
  return {
    // for dynamic aliasing
    virtualcolor: {
      "1": `var(--${prefix}-virtualcolor1)`,
      "2": `var(--${prefix}-virtualcolor2)`,
      "3": `var(--${prefix}-virtualcolor3)`,
      "4": `var(--${prefix}-virtualcolor4)`,
      "5": `var(--${prefix}-virtualcolor5)`,
      "6": `var(--${prefix}-virtualcolor6`,
      "7": `var(--${prefix}-virtualcolor7)`,
      "8": `var(--${prefix}-virtualcolor8)`,
      "9": `var(--${prefix}-virtualcolor9)`,
      "10": `var(--${prefix}-virtualcolor10)`,
      "11": `var(--${prefix}-virtualcolor11)`,
      "12": `var(--${prefix}-virtualcolor12)`,

      "1A": `var(--${prefix}-virtualcolor1A)`,
      "2A": `var(--${prefix}-virtualcolor2A)`,
      "3A": `var(--${prefix}-virtualcolor3A)`,
      "4A": `var(--${prefix}-virtualcolor4A)`,
      "5A": `var(--${prefix}-virtualcolor5A)`,
      "6A": `var(--${prefix}-virtualcolor6A)`,
      "7A": `var(--${prefix}-virtualcolor7A)`,
      "8A": `var(--${prefix}-virtualcolor8A)`,
      "9A": `var(--${prefix}-virtualcolor9A)`,
      "10A": `var(--${prefix}-virtualcolor10A)`,
      "11A": `var(--${prefix}-virtualcolor11A)`,
      "12A": `var(--${prefix}-virtualcolor12A)`,
    },
  };
};
