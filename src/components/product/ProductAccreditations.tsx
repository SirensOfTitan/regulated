import { Accreditation, Product } from "app/schemas";
import { useMemo } from "react";
import * as collections from "app/utils/collections";
import TagGroup from "app/components/general/TagGroup";
import Tag from "app/components/general/Tag";
import Label from "../general/Label";

interface IconProps {
  kind: "gov" | "industry";
}
function Icon({ kind }: IconProps) {
  switch (kind) {
    case "industry":
      return <>🏭</>;
    case "gov":
      return <>🏛️</>;
  }
}

interface Props {
  accreditations: Map<string, Accreditation>;
  product: Product;
}

export default function ProductAccreditations({
  accreditations: accreditationsMap,
  product,
}: Props) {
  const accreditations = product.accreditations;
  const usedBy = useMemo(() => {
    return accreditations
      .map((user) => accreditationsMap.get(user))
      .filter(collections.isNotNull);
  }, [accreditations, accreditationsMap]);

  return (
    <Label direction="column" label={"Accreditations"}>
      <TagGroup>
        {usedBy.map((accreditation) => (
          <Tag
            key={accreditation.id}
            background="alt"
            icon={<Icon kind={accreditation.kind} />}
          >
            {accreditation.type}
          </Tag>
        ))}
      </TagGroup>
    </Label>
  );
}
