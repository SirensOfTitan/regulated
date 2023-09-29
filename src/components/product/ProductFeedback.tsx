"use client";

import { Maybe } from "app/types";
import * as actions from "app/actions";
import { Product } from "app/schemas";
import Header from "app/components/general/Header";
import Container from "app/components/general/Container";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// @ts-ignore-next-line -- false positive
import { experimental_useFormState as useFormState } from "react-dom";
import Alert from "app/components/general/Alert";

interface Props {
  product: Product;
}

const initialState = {
  errorMessage: null,
  nonce: null,
};

export default function ProductFeedback({ product }: Props) {
  const [state, formAction] = useFormState(
    actions.submitFeedback,
    initialState,
  );
  const { pending } = useFormStatus();
  return (
    <>
      <Header query="" onChangeQuery={() => null} product={product} />
      <Container>
        {state.errorMessage == null ? null : (
          <Alert key={state.nonce} message={state.errorMessage} kind="error" />
        )}
        <form action={formAction}>
          <textarea name="feedback" />
          <input type="hidden" name="productSlug" value={product.slug} />
          <button type="submit" disabled={pending}>
            Submit
          </button>
        </form>
      </Container>
    </>
  );
}
