"use client";

import Header from "app/components/general/Header";
import * as collections from "app/utils/collections";
import { Product, User, Accreditation, Link, Standard } from "app/schemas";
import { Maybe } from "app/types";
import styles from "./ProductDetails.module.css";
import Heading from "../general/Heading";
import { useMemo } from "react";
import TagGroup from "app/components/general/TagGroup";
import Tag from "app/components/general/Tag";
import Container from "../general/Container";
import Alert from "../general/Alert";
import ProductHeader from "./ProductHeader";
import ProductDetailsUsers from "./ProductDetailsUsers";

interface LinksProps {
  allLinks: Map<string, Link>;
  product: Product;
}

function Links({ allLinks, product }: LinksProps) {
  const links = useMemo(
    () =>
      product.links.map((p) => allLinks.get(p)).filter(collections.isNotNull),
    [allLinks, product],
  );

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
  allStandards: Map<string, Standard>;
  product: Product;
}

function Standards({ allStandards, product }: StandardsProps) {
  const standards = useMemo(
    () =>
      product.standards
        .map((p) => allStandards.get(p))
        .filter(collections.isNotNull),
    [allStandards, product],
  );

  return standards.length === 0 ? null : (
    <>
      <Heading depth={2}>Standards</Heading>
      {standards.map((s) => (
        <Tag background="primary" key={s.id}>
          {s.name}
        </Tag>
      ))}
    </>
  );
}

interface AccreditationsProps {
  allAccreditations: Map<string, Accreditation>;
  product: Product;
}

function Accreditations({ allAccreditations, product }: AccreditationsProps) {
  const accreditations = useMemo(
    () =>
      product.accreditations
        .map((p) => allAccreditations.get(p))
        .filter(collections.isNotNull),
    [allAccreditations, product],
  );

  return accreditations.length === 0 ? null : (
    <>
      <Heading depth={2}>Accreditations</Heading>
      {accreditations.map((a) => (
        <Tag background="primary" key={a.id}>
          {a.type}
        </Tag>
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
          <Heading depth={2}>Users</Heading>
          <ProductDetailsUsers users={users} />
          <Links product={product} allLinks={allLinks} />
          <Accreditations
            product={product}
            allAccreditations={allAccreditations}
          />
          <Standards allStandards={allStandards} product={product} />
        </article>
      </Container>
    </>
  );
}
