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
      <Container>
        <ActionAlert action={action} />
        <article className={styles.productDetails}>
          {summary == null ? null : (
            <section className={styles.summary}>
              <Heading depth={2}>About</Heading>
              {summary}
            </section>
          )}
          <hr />
          <Heading depth={2}>Users</Heading>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.type ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Heading depth={2}>Links</Heading>
          {links.map((l) => (
            <p key={l.id}>
              <a href={l.url}>{l.name}</a>
            </p>
          ))}
          <Heading depth={2}>Accreditations</Heading>
          <TagGroup>
            {accreditations.map((a) => (
              <Tag background="primary" key={a.id}>
                {a.type}
              </Tag>
            ))}
          </TagGroup>
          <Heading depth={2}>Standards</Heading>
          <TagGroup>
            {standards.map((a) => (
              <Tag background="primary" key={a.id}>
                {a.name}
              </Tag>
            ))}
          </TagGroup>
        </article>
      </Container>
    </>
  );
}
