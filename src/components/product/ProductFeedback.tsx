"use client";

import * as actions from "app/actions";
import { Product } from "app/schemas";
import Header from "app/components/general/Header";
import Container from "app/components/general/Container";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
// @ts-ignore-next-line -- false positive
import { experimental_useFormState as useFormState } from "react-dom";
import Alert from "app/components/general/Alert";
import ProductHeader from "./ProductHeader";
import styles from "./ProductFeedback.module.css";

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
      <Container className={styles.container}>
        {state.errorMessage == null ? null : (
          <Alert key={state.nonce} message={state.errorMessage} kind="error" />
        )}
        <form action={formAction} className={styles.form}>
          <ProductHeader product={product} page="feedback" />
          <div className={styles.feedback}>
            <textarea name="feedback" minLength={3} required disabled={pending} />
          </div>
          <input type="hidden" name="productSlug" value={product.slug} />
        </form>
      </Container>
    </>
  );
}
