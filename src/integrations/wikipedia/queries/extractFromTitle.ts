import * as schemas from "../schemas";

export async function extractFromTitle(title: string, options: RequestInit) {
  const result = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    options,
  );
  const jsonResponse = await result.json();

  try {
    return schemas.extractFromTitle().parse(jsonResponse).extract;
  } catch (e) {
    return null;
  }
}
