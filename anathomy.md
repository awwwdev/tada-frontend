should I use:
- postrocessor 
- shortcut 


[preprocessor]: 
catch if radix-color-name is used, add it to the --theme-- 
con not add to theme. So, we need to add to an object (radixColorsUsed)

<!-- temproray add it like :root {-- } in temprorary theme rule. then remove it on next preflight? -->

[preflight]: 
add css and set values for css variables (colors in the theme) based on (radixColorsUsed)



UnoCSS Anathomy:

[extendTheme]
[preflights]
[transformers]
[shortcuts]
[variants]
[preprocessors]
[rules]
[postprocessors]