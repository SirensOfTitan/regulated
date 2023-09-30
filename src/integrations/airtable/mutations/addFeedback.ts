import { AirtableBase } from "airtable/lib/airtable_base";

interface AddFeedbackInput {
  feedback: string;
  productID: string;
}

export async function addFeedback(
  client: AirtableBase,
  { feedback, productID }: AddFeedbackInput,
) {
  await client("Feedback").create({
    Feedback: feedback,
    Product: [productID],
  });
}
