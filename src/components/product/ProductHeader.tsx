import { Product } from "app/schemas/types";
import { ReactNode, useMemo } from "react";
import styles from "./ProductHeader.module.css";
import Heading from "../general/Heading";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Maybe } from "app/types";
import Image from "next/image";
import Link from "next/link";

function slugToImageName(slug: string): Maybe<string> {
  switch (slug) {
    case "adobe-creative-cloud":
      return "adobe-creative-cloud.svg";
    case "akamai":
      return "akamai.svg";
    case "amazon-web-services":
      return "aws.svg";
    case "american-heart-association-precision-medicine-platform":
      return "american-heart-association.svg";
    case "appian":
      return "appian.svg";
    case "arcgis":
      return "arcgis.png";
    case "asana":
      return "asana.svg";
    case "ask-sage":
      return "asksage.png";
    case "atlassian-confluence-and-jira-cloud":
      return "atlassian.svg";
    case "betterup":
      return "betterup.jpg";
    case "box":
      return "box.svg";
    case "cisco-webex":
      return "cisco-webex.svg";
    case "community":
      return "community.jpg";
    case "docusign":
      return "docusign.svg";
    case "figma":
      return "figma.svg";
    case "lucid":
      return "lucid.svg";
    case "palantir":
      return "palantir.svg";
    case "recorded-future":
      return "recorded-future.png";
    case "salesforce":
      return "salesforce.svg";
    case "servicenow":
      return "servicenow.svg";
    case "slack":
      return "slack.svg";
    case "snowflake":
      return "snowflake.svg";
    case "surveymonkey":
      return "surveymonkey.svg";
    case "tanium-cloud":
      return "tanium.png";
    case "trello":
      return "trello.svg";
    case "twilio":
      return "twilio.svg";
    case "wordpress":
      return "wordpress.svg";
    case "workday":
      return "workday.svg";
    case "zendesk":
      return "zendesk.svg";
    default:
      return null;
  }
}

interface LetterMarkProps {
  name: string;
}
function LetterMark({ name }: LetterMarkProps) {
  return (
    <div className={styles.letterMark} aria-hidden={true}>
      {`${name[0]}`.toUpperCase()}
    </div>
  );
}

interface Props {
  logo?: ReactNode;
  product: Product;
  page: "product" | "feedback";
}

export default function ProductHeader({ product, page }: Props) {
  const slug = product.slug;
  const logo = useMemo(() => slugToImageName(slug), [slug]);

  const { pending } = useFormStatus();
  return (
    <section className={styles.productHeader}>
      <div className={styles.logo}>
        {logo == null ? (
          <LetterMark name={product.name} />
        ) : (
          <Image
            className={styles.image}
            src={`/products/${logo}`}
            fill
            alt={`Logo for ${product.name}`}
          />
        )}
      </div>
      <div className={styles.basic}>
        <Heading className={styles.name} depth={1}>
          {product.name}
        </Heading>
        {product.description}
      </div>
      <div className={styles.actions}>
        {product.website == null ? null : (
          <a className={styles.button} href={product.website}>
            🔗 Visit website
          </a>
        )}
        <div className={styles.spacer} />
        {page !== "product" ? null : (
          <Link
            className={styles.button}
            href={`/products/${product.slug}/feedback`}
          >
            ✍️ Suggest changes
          </Link>
        )}
        {page !== "feedback" ? null : (
          <button disabled={pending} className={styles.button} type="submit">
            👏 Submit feedback
          </button>
        )}
      </div>
      <div className={styles.actionsFill} />
    </section>
  );
}
