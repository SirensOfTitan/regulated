"use client";

import Header from "app/components/general/Header";
import * as collections from "app/utils/collections";
import { Product, User, Accreditation, Link, Standard } from "app/schemas";
import { Maybe } from "app/types";
import styles from "./ProductDetails.module.css";
import Heading from "../general/Heading";
import { useMemo } from "react";
import Tag from "app/components/general/Tag";
import Container from "../general/Container";
import Alert from "../general/Alert";
import ProductHeader from "./ProductHeader";
import ProductDetailsUsers from "./ProductDetailsUsers";
import ProductDetailsAccreditations from "./ProductDetailsAccreditations";

interface LinksProps {
  links: Link[];
}

function Links({ links }: LinksProps) {
  return links.length === 0 ? null : (
    <>
      <Heading depth={2}>Links</Heading>
      {links.map((l) => (
        <p key={l.id}>
          <a href={l.url}>{l.name}</a>
        </p>
      ))}
    </>
  );
}

interface StandardsProps {
  standards: Standard[];
}

function Standards({ standards }: StandardsProps) {
  return standards.length === 0 ? null : (
    <>
      <Heading depth={2}>Standards</Heading>
      {standards.map((s) => (
        <div className={styles.standard} key={s.id}>
          <a
            href={s.website ?? "#"}
            className={styles.anchor}
            aria-label={`Link to ${s.name}'s website.`}
          />
          <div className={styles.inner}>
            <h4>{s.name}</h4>
            <p>{s.description ?? "-"}</p>
          </div>
          <div className={styles.linkIcon} />
        </div>
      ))}
    </>
  );
}

type ActionKind = Maybe<"feedback">;
interface ActionAlertProps {
  action?: ActionKind;
}
function ActionAlert({ action }: ActionAlertProps) {
  if (action == null) {
    return null;
  }

  return (
    <Alert kind="success" message="Your feedback was submitted successfully." />
  );
}

interface Props {
  product: Product;
  summary: Maybe<string>;
  allUsers: Map<string, User>;
  allAccreditations: Map<string, Accreditation>;
  allLinks: Map<string, Link>;
  allStandards: Map<string, Standard>;
  action: ActionKind;
}

export default function ProductDetails({
  allUsers,
  allAccreditations,
  allLinks,
  allStandards,
  summary,
  product,
  action,
}: Props) {
  const productUsers = product.users;
  const users = useMemo(
    () =>
      productUsers.map((u) => allUsers.get(u)).filter(collections.isNotNull),
    [allUsers, productUsers],
  );

  const productAccreditations = product.accreditations;
  const accreditations = useMemo(
    () =>
      productAccreditations
        .map((u) => allAccreditations.get(u))
        .filter(collections.isNotNull),
    [allAccreditations, productAccreditations],
  );

  const productLinks = product.links;
  const links = useMemo(
    () =>
      productLinks.map((u) => allLinks.get(u)).filter(collections.isNotNull),
    [allLinks, productLinks],
  );

  const productStandards = product.standards;
  const standards = useMemo(
    () =>
      productStandards
        .map((u) => allStandards.get(u))
        .filter(collections.isNotNull),
    [allStandards, productStandards],
  );

  return (
    <>
      <Header query="" onChangeQuery={() => null} product={product} />
      <Container className={styles.container}>
        <ActionAlert action={action} />
        <ProductHeader product={product} page="product" />
        <article className={styles.productDetails}>
          <ProductDetailsUsers users={users} />
          <Links links={links} />
          <ProductDetailsAccreditations accreditations={accreditations} />
          <Standards standards={standards} />
        </article>
      </Container>
    </>
  );
}
