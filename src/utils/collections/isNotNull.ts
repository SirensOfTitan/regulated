export function isNotNull<TInput>(
  input: TInput | null | undefined,
): input is TInput {
  return input != null;
}
