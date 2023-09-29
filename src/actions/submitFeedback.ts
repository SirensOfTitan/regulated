"use server";

import { z } from "zod";
import { Maybe } from "app/types";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

interface Payload {
  errorMessage: Maybe<string>;
  nonce: string;
}

const formSchema = z.object({
  feedback: z.string(),
  productSlug: z.string(),
});

type SubmitFeedbackResponse = void | Payload;
export async function submitFeedback(
  _prevState: unknown,
  formData: FormData,
): Promise<SubmitFeedbackResponse> {
  const baseError = {
    nonce: randomUUID(),
  };

  const parsedData = formSchema.safeParse({
    feedback: formData.get("feedback"),
    productSlug: formData.get("productSlug"),
  });

  if (!parsedData.success) {
    return {
      ...baseError,
      errorMessage: "The data submitted was malformed, please try again.",
    };
  }

  redirect(`/products/${parsedData.data.productSlug}?action=feedback`);
}
