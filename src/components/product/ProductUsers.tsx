import { User, Product } from "app/schemas";
import { useMemo } from "react";
import * as collections from "app/utils/collections";
import TagGroup from "app/components/general/TagGroup";
import Tag from "app/components/general/Tag";
import Label from "../general/Label";

interface IconProps {
  userName: string;
}

const KIND_REGEX = /(department|bureau|administration|government|federal)/i;
function Icon({ userName }: IconProps) {
  const kind = KIND_REGEX.test(userName) ? "gov" : "industry";
  switch (kind) {
    case "industry":
      return <>🏭</>;
    case "gov":
      return <>🏛️</>;
  }
}

interface Props {
  users: Map<string, User>;
  product: Product;
}

export default function ProductUsers({ users: usersMap, product }: Props) {
  const users = product.users;
  const usedBy = useMemo(() => {
    return users
      .map((user) => usersMap.get(user))
      .filter(collections.isNotNull);
  }, [users, usersMap]);

  return (
    <Label direction="column" label={"Users"}>
      <TagGroup>
        {usedBy.map((user) => (
          <Tag
            key={user.id}
            background="alt"
            icon={<Icon userName={user.name} />}
          >
            {user.name}
          </Tag>
        ))}
      </TagGroup>
    </Label>
  );
}
