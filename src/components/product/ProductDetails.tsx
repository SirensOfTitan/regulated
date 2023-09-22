"use client";

import Header from "app/components/general/Header";
import * as collections from "app/utils/collections";
import { Product, User, Accreditation, Standard } from "app/schemas";
import { Maybe } from "app/types";
import styles from "./ProductDetails.module.css";
import Heading from "../general/Heading";
import { useMemo } from "react";
import TagGroup from "app/components/general/TagGroup";
import Tag from "app/components/general/Tag";

interface Props {
  product: Product;
  summary: Maybe<string>;
  allUsers: Map<string, User>;
  allAccreditations: Map<string, Accreditation>;
  allStandards: Map<string, Standard>;
}

export default function ProductDetails({
  allUsers,
  allAccreditations,
  allStandards,
  summary,
  product,
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
    </>
  );
}
