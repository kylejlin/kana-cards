export default function modifierNameToClassName(
  baseClass: string,
  modifierName: string
): string {
  const modifiers = modifierName === "" ? [] : modifierName.split(" ");
  const modifierClasses = modifiers.map(
    (modifier) => baseClass + "--" + modifier
  );
  return baseClass + ["", ...modifierClasses].join(" ");
}
