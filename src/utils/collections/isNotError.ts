export function isNotError<TInput>(input: TInput | Error): input is TInput {
  return !(input instanceof Error);
}
