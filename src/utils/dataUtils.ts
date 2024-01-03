export function flattenObject(obj: object) {
  let newObj: { [key: string]: object | string | number | boolean } = {};
  Object.keys(obj).forEach((key) => {
    const objVal = obj[key];
    if (typeof objVal === "object" && objVal !== null) {
      newObj = {
        ...newObj,
        ...flattenObject(
          objVal as { [key: string]: object | string | number | boolean }
        ),
      };
    } else {
      newObj = {
        ...newObj,
        [key]: objVal,
      };
    }
  });

  return newObj;
}
