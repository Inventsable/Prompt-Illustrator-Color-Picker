# PromptColorPicker

Script that can trigger opening the color picker then programmatically simulate a Set Color command for selected artwork.

Made by request on Adobe Forums: [Add Keyboard Shortcut to Foreground Color Picker](https://community.adobe.com/t5/illustrator-discussions/add-keyboard-shortcut-for-the-foreground-color-picker/td-p/12612546)

## Notes

- The script is not infallible and does shallow collection instead of being truly recursive. If `get()` were written to recursively collect any text or path contained in any group or compound path (of any depth) it would work. Right now it's limited at the 2nd depth just for brevity.
- This assumes an RGB Colorspace, due to needing a valid color to prompt the color picker open with. In the case that multiple colors are selected as fill (and Illustrator displays the grey No-Color/Multiple color indicator) the script would normally error out, in which case a try/catch is used and a null `RGBColor()` is assigned to the prompt.
- Color is only applied when rewriting another color. The script doesn't replicate a No-Color item assigned to color because this would require better collection logic to exclude all compound paths, otherwise you could assign the color to masks and compounds instead of their contents.
- You could much more easily load, invoke and unload .aia text as an Action with the Set Color command, if you could insert the parameters in dynamically. This solves the need for any recursive collection logic and virtually all the above notes
