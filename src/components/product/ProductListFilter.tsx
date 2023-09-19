import * as search from "app/search";

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
    <article>
      {search.ORDER_OPTIONS.map(([order, dir]) => {
        const optionID = search.utils.packOption([order, dir]);
        const checked = filter.order === optionID;
        return (
          <section key={optionID}>
            <input
              type="radio"
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
              name="order"
              id={optionID}
              value={optionID}
            />
            <label htmlFor={optionID}>
              <OrderByLabel option={[order, dir]} />
            </label>
          </section>
        );
      })}
    </article>
  );
}
