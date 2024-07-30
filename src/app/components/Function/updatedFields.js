//changed key values
import deepDiff from "deep-diff"
function convertToNestedObject(differences) {
  const result = {};

  differences.forEach((diff) => {
    const path = diff.path.join(".");
    const keys = path.split(".");

    let currentObj = result;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        // Only set the value if it's not undefined
        if (diff.rhs !== undefined) {
          currentObj[key] = diff.rhs;
        }
      } else {
        currentObj[key] =
          currentObj[key] ||
          (Number.isNaN(parseInt(keys[index + 1])) ? {} : []); // If the next key is a number, initialize an array
        currentObj = currentObj[key];
      }
    });
  });

  return result;
}

export function getUpdatedFields(oldObject, newObject) {
  const differences = deepDiff(oldObject, newObject);

  if (!differences) {
    // No differences found, objects are identical
    return null;
  }

  return convertToNestedObject(differences);
}
