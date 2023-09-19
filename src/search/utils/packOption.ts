import { OrderOption, PackedOrderOption } from "../types";

export function packOption(option: OrderOption): PackedOrderOption {
  return option.join("-") as PackedOrderOption;
}
