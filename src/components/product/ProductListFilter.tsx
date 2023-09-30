import * as search from "app/search";
import Dropdown from "app/components/general/Dropdown";
import Popup from "app/components/general/Popup";
import PopupRadioItem from "app/components/general/PopupRadioItem";
import styles from "./ProductListFilter.module.css";
import * as collections from "app/utils/collections";
import { Accreditation, Product, User } from "app/schemas";
import { useEffect, useMemo, useState } from "react";
import Container from "app/components/general/Container";
import { useClient } from "../hooks/useClient";

function getOrderByLabel(option: search.OrderOption) {
  const [order, direction] = option;
  if (order === "productName" && direction === "asc") {
    return "Product name (A-Z)";
  } else if (order === "productName" && direction === "desc") {
    return "Product name (Z-A)";
  } else if (order === "numberOfAccreditations" && direction === "asc") {
    return "Number of accreditations (ASC)";
  } else if (order === "numberOfAccreditations" && direction === "desc") {
    return "Number of accreditations (DESC)";
  } else if (order === "numberOfUsers" && direction === "asc") {
    return "Number of users (ASC)";
  } else if (order === "numberOfUsers" && direction === "desc") {
    return "Number of users (DESC)";
  }
}

interface Props {
  filter: search.Filter;
  accreditations: Map<string, Accreditation>;
  products: Product[];
  users: Map<string, User>;
  onChange: (newFilter: search.Filter) => void;
}

export default function ProductListFilter({
  filter,
  onChange,
  accreditations: accreditationsMap,
  products: products,
  users: usersMap,
}: Props) {
  const accreditations = useMemo(
    () =>
      Array.from(accreditationsMap, ([, value]) => value).filter(
        (v) => v.includeInFilter,
      ),
    [accreditationsMap],
  );

  const users = useMemo(
    () =>
      [...new Set(Array.from(usersMap, ([, value]) => value.type))].filter(
        collections.isNotNull,
      ),
    [usersMap],
  );

  const packedOrder = filter.order;
  const unpackedOrder = useMemo(
    () => (packedOrder == null ? null : search.utils.unpackOption(packedOrder)),
    [packedOrder],
  );

  const isClient = useClient();

  const allUseCases = useMemo(
    () => [...new Set(products.flatMap((product) => product.usecases).sort())],
    [products],
  );

  return (
    <article className={styles.filterRoot}>
      <Container className={styles.filterContainer}>
        <Dropdown
          className={styles.actionItem}
          anchor={`↕ ${
            unpackedOrder == null ? "Order by" : getOrderByLabel(unpackedOrder)
          }`}
          popup={
            <Popup title="Order by">
              {search.ORDER_OPTIONS.map(([order, dir]) => {
                const optionID = search.utils.packOption([order, dir]);
                const checked = filter.order === optionID;
                return (
                  <PopupRadioItem
                    key={optionID}
                    onChange={(ev) => {
                      ev.preventDefault();
                      if (ev.target.value !== optionID) {
                        return;
                      }

                      onChange({
                        ...filter,
                        order: optionID,
                      });
                    }}
                    checked={checked}
                    type="radio"
                    value={optionID}
                    name="order"
                    label={getOrderByLabel([order, dir])}
                  />
                );
              })}
            </Popup>
          }
        />
        <Dropdown
          className={styles.actionItem}
          anchor={`📋 Accreditations ${
            filter.accreditations?.size ? `(${filter.accreditations.size})` : ""
          }`}
          popup={
            <Popup title="Accreditations">
              {accreditations.map((acc) => {
                return (
                  <PopupRadioItem
                    key={`${acc.id}:${filter.accreditations?.has(acc.id)}`}
                    type="checkbox"
                    label={acc.type}
                    onChange={(ev) => {
                      ev.preventDefault();

                      const newAccreditations = new Set(
                        filter?.accreditations ?? [],
                      );

                      if (ev.target.checked) {
                        newAccreditations.add(acc.id);
                      } else {
                        newAccreditations.delete(acc.id);
                      }

                      onChange({
                        ...filter,
                        accreditations: newAccreditations,
                      });
                    }}
                    name="accreditations"
                    value={acc.id}
                    checked={filter.accreditations?.has(acc.id) ?? false}
                  />
                );
              })}
            </Popup>
          }
        />
        <Dropdown
          className={styles.actionItem}
          anchor={`👨‍👩‍👧‍👦 Users ${
            filter.users?.size ? `(${filter.users.size})` : ""
          }`}
          popup={
            <Popup title="Users">
              {users.map((type) => {
                return (
                  <PopupRadioItem
                    key={`${type}:${filter.users?.has(type)}`}
                    type="checkbox"
                    label={type}
                    onChange={(ev) => {
                      ev.preventDefault();

                      const newUsers = new Set(filter?.users ?? []);

                      if (ev.target.checked) {
                        newUsers.add(type);
                      } else {
                        newUsers.delete(type);
                      }

                      onChange({
                        ...filter,
                        users: newUsers,
                      });
                    }}
                    name="users"
                    value={type}
                    checked={filter.users?.has(type) ?? false}
                  />
                );
              })}
            </Popup>
          }
        />
        <Dropdown
          className={styles.actionItem}
          anchor={`🛠 ${filter.usecase == null ? "Use cases" : filter.usecase}`}
          popup={
            <Popup title="Use Cases">
              {allUseCases.map((type) => {
                return (
                  <PopupRadioItem
                    key={`${type}:${filter.usecase == type}`}
                    type="radio"
                    label={type}
                    onChange={(ev) => {
                      ev.preventDefault();
                      const newValue = ev.target.checked ? type : null;

                      onChange({
                        ...filter,
                        usecase: newValue,
                      });
                    }}
                    name="usecases"
                    value={type}
                    checked={filter.usecase === type ?? false}
                  />
                );
              })}
            </Popup>
          }
        />
        <div className={styles.spacer} />
        {!isClient || search.queries.isFilterEmpty(filter) ? null : (
          <button
            type="button"
            className={styles.clear}
            onClick={(ev) => {
              ev.preventDefault();
              onChange({});
            }}
          >
            Clear filters
          </button>
        )}
        <noscript>
          <input className={styles.submit} type="submit" value="Search" />
        </noscript>
      </Container>
    </article>
  );
}
