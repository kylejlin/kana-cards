export default (baseClass, modifierName) => {
  const modifiers = modifierName === "" ? [] : modifierName.split(" ");
  const modifierClasses = modifiers.map(
    modifier => baseClass + "--" + modifier,
  );
  return baseClass + ["", ...modifierClasses].join(" ");
};
