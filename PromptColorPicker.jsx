/**
 * This isn't as simple of an issue as it may seem. While the below script does work decently well, there are a few caveats:
 *   - It won't assign color to anything that doesn't already have a color already.
 *     If this weren't the case, it would paint CompoundPathItems with a fill color and cover their children PathItems.
 *   - It isn't truly recursive beyond the 2nd depth. Complicated nested compound paths or groups will have deep descendents ignored.
 */

function get(type, parent, deep) {
  if (arguments.length == 1 || !parent) {
    parent = app.activeDocument;
    deep = true;
  }
  var result = [];
  if (!parent[type]) return result;
  for (var i = 0; i < parent[type].length; i++) {
    result.push(parent[type][i]);
    if (parent[type][i][type] && deep)
      result = [].concat(result, get(type, parent[type][i], deep));
    else if (
      /(compound|group)/i.test(parent[type][i].typename) &&
      parent[type][i].pathItems
    )
      result = [].concat(result, get("pathItems", parent[type][i], deep));
  }
  return result;
}
Array.prototype.filter = function (callback) {
  var filtered = [];
  for (var i = 0; i < this.length; i++)
    if (callback(this[i], i, this)) filtered.push(this[i]);
  return filtered;
};
Array.prototype.forEach = function (callback) {
  for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};

function openColorPickerAndSetColor() {
  var bool = app.isFillActive(),
    color;
  try {
    color = app.showColorPicker(
      app.activeDocument["default" + (bool ? "Fill" : "Stroke") + "Color"]
    );
  } catch (err) {
    // Specified value greater error, meaning there's more than one active fill/stroke color.
    // How to best handle this? No simple way unless we just create a null color instead:
    color = app.showColorPicker(new RGBColor());
  }
  var readProp, setProp, root;
  get("selection")
    .filter(function (item) {
      return /(path|textframe)/i.test(item.typename);
    })
    .filter(function (item) {
      if (/textframe/i.test(item.typename)) {
        return !/(nocolor|null)/i.test(
          item.textRange.characterAttributes[
            (bool ? "fill" : "strok") + "Color"
          ] + ""
        );
      } else return item[(bool ? "fille" : "stroke") + "d"];
    })
    .forEach(function (item) {
      root = /textframe/i.test(item.typename)
        ? item.textRange.characterAttributes
        : item;
      setProp = (bool ? "fill" : "stroke") + "Color";
      root[setProp] = color;
    });
}
openColorPickerAndSetColor();
