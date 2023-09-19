import * as search from "app/search";
import Dropdown from "../general/Dropdown";
import Popup from "../general/Popup";
import PopupRadioItem from "../general/PopupRadioItem";
import styles from "./ProductListFilter.module.css";

interface OrderByLabelProps {
  option: search.OrderOption;
}

function OrderByLabel({ option }: OrderByLabelProps) {
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
  onChange: (newFilter: search.Filter) => void;
}

export default function ProductListFilter({ filter, onChange }: Props) {
  return (
    <article className={styles.filterRoot}>
      <Dropdown
        className={styles.actionItem}
        action={"↕ Order by"}
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
                  value={optionID}
                  name="order"
                  label={<OrderByLabel option={[order, dir]} />}
                />
              );
            })}
          </Popup>
        }
      />
      <div className={styles.spacer} />
      <noscript>
        <input className={styles.submit} type="submit" value="Search" />
      </noscript>
    </article>
  );
}
