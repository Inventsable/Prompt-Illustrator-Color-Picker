# PromptColorPicker

Script that can trigger opening the color picker then programmatically simulate a Set Color command for selected artwork.

Made by request on Adobe Forums: [Add Keyboard Shortcut to Foreground Color Picker](https://community.adobe.com/t5/illustrator-discussions/add-keyboard-shortcut-for-the-foreground-color-picker/td-p/12612546)

## Notes

- The script is not infallible and does shallow collection instead of being truly recursive. If `get()` were written to recursively collect any text or path contained in any group or compound path (of any depth) it would work. Right now it's limited at the 2nd depth just for brevity.
- This assumes an RGB Colorspace, due to needing a valid color to prompt the color picker open with. In the case that multiple colors are selected as fill (and Illustrator displays the grey No-Color/Multiple color indicator) the script would normally error out, in which case a try/catch is used and a null `RGBColor()` is assigned to the prompt.
