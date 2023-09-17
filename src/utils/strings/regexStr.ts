function escapeRegexp(str: string): string {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

export function regexStr(
  literals: TemplateStringsArray,
  ...variables: string[]
): string {
  const escapedVariables = variables.map((variable) => escapeRegexp(variable));

  let result = "";
  let variableIndex = 0;
  for (const literal of literals) {
    result += literal;
    if (variableIndex < escapedVariables.length) {
      result += escapedVariables[variableIndex];
      variableIndex += 1;
    }
  }

  return result;
}
