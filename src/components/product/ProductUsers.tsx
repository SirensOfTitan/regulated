import { User, Product } from "app/schemas";
import { useMemo } from "react";
import * as collections from "app/utils/collections";
import styles from "./ProductUsers.module.css";
import Image from "next/image";
import Label from "../general/Label";
import { Maybe } from "app/types";

function slugToImageName(slug: string): Maybe<string> {
  switch (slug) {
    case "americorps":
      return "americorps.svg";
    case "consumer-financial-protection-bureau":
      return "cfpb.png";
    case "department-of-agriculture":
      return "ag.svg";
    case "department-of-commerce":
      return "commerce.svg";
    case "department-of-defense":
      return "dod.svg";
    case "department-of-energy":
      return "energy.svg";
    case "department-of-health-and-human-services":
      return "health_human.svg";
    case "department-of-homeland-security":
      return "homeland_security.svg";
    case "department-of-housing-and-urban-development":
      return "housing.svg";
    case "department-of-justice":
      return "doj.svg";
    case "department-of-labor":
      return "labor.svg";
    case "department-of-state":
      return "state.svg";
    case "department-of-the-interior":
      return "interior.svg";
    case "department-of-the-treasury":
      return "treasury.svg";
    case "federal-communications-commission":
      return "fcc.svg";
    case "federal-reserve":
      return "fed.svg";
    case "federal-trade-commission":
      return "ftc.svg";
    case "general-services-administration":
      return "gsa.svg";
    case "government-of-canada":
      return "canada.svg";
    case "government-of-the-united-kingdom":
      return "uk.svg";
    case "national-aeronautics-and-space-administration":
      return "nasa.svg";
    case "small-business-administration":
      return "sba.svg";
    case "smithsonian-institution":
      return "smithsonian.svg";
    case "social-security-administration":
      return "ssa.svg";
    case "state-of-iowa":
      return "iowa.svg";
    case "state-of-new-jersey":
      return "nj.svg";
    case "university-of-washington-school-of-medicine":
      return "washington_medicine.jpg";
  }
}

interface Props {
  users: Map<string, User>;
  product: Product;
}

export default function ProductUsers({ users: usersMap, product }: Props) {
  const users = product.users;
  const usedByLogos = useMemo(
    () =>
      users
        .map((userID) => {
          const user = usersMap.get(userID);
          if (user == null) {
            return null;
          }

          const logo = slugToImageName(user.slug);
          if (logo == null) {
            return null;
          }

          return (
            <Image
              key={user.id}
              className={styles.image}
              fill
              src={`/users/${logo}`}
              alt={`Logo for ${user.name}`}
            />
          );
        })
        .filter(collections.isNotNull)
        .slice(0, 4),
    [users, usersMap],
  );

  const remainingLogos = users.length - usedByLogos.length;

  return (
    <Label direction="column" label={"Users"} className={styles.users}>
      <div className={styles.usedContainer}>
        {usedByLogos}
        {remainingLogos <= 0 ? null : (
          <div className={styles.remaining}>+{remainingLogos}</div>
        )}
        <div className={styles.spacer} />
      </div>
    </Label>
  );
}
