"use server";

import * as airtable from "app/integrations/airtable";
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

  const product = await airtable.queries.recordFromSlug(
    airtable.defaultClient,
    {
      slug: parsedData.data.productSlug,
      tableName: "Products",
    },
  );

  if (product == null) {
    return {
      ...baseError,
      errorMessage:
        "Could not find the product you're submitting feedback for.",
    };
  }

  await airtable.mutations.addFeedback(airtable.defaultClient, {
    productID: product.id,
    feedback: parsedData.data.feedback,
  });

  redirect(`/products/${parsedData.data.productSlug}?action=feedback`);
}
