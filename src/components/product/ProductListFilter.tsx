import * as search from "app/search";
import Dropdown from "../general/Dropdown";
import Popup from "../general/Popup";
import PopupRadioItem from "../general/PopupRadioItem";
import styles from "./ProductListFilter.module.css";
import { Accreditation, User } from "app/schemas";
import { useEffect, useMemo, useState } from "react";

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
  users: Map<string, User>;
  onChange: (newFilter: search.Filter) => void;
}

export default function ProductListFilter({
  filter,
  onChange,
  accreditations: accreditationsMap,
  users: usersMap,
}: Props) {
  const accreditations = useMemo(
    () => Array.from(accreditationsMap, ([, value]) => value),
    [accreditationsMap],
  );

  const users = useMemo(
    () => Array.from(usersMap, ([, value]) => value),
    [usersMap],
  );

  const packedOrder = filter.order;
  const unpackedOrder = useMemo(
    () => (packedOrder == null ? null : search.utils.unpackOption(packedOrder)),
    [packedOrder],
  );

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <article className={styles.filterRoot}>
      <Dropdown
        className={styles.actionItem}
        action={`↕ ${
          unpackedOrder == null ? "Order by" : getOrderByLabel(unpackedOrder)
        }`}
        popup={
          <Popup>
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
        action={`👩‍⚖️ Accreditations ${
          filter.accreditations?.size ? `(${filter.accreditations.size})` : ""
        }`}
        popup={
          <Popup>
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
        action={`👨‍👩‍👧‍👦 Users ${
          filter.users?.size ? `(${filter.users.size})` : ""
        }`}
        popup={
          <Popup>
            {users.map((user) => {
              return (
                <PopupRadioItem
                  key={`${user.id}:${filter.users?.has(user.id)}`}
                  type="checkbox"
                  label={user.name}
                  onChange={(ev) => {
                    ev.preventDefault();

                    const newUsers = new Set(filter?.users ?? []);

                    if (ev.target.checked) {
                      newUsers.add(user.id);
                    } else {
                      newUsers.delete(user.id);
                    }

                    onChange({
                      ...filter,
                      users: newUsers,
                    });
                  }}
                  name="users"
                  value={user.id}
                  checked={filter.users?.has(user.id) ?? false}
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
    </article>
  );
}
