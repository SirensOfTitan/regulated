import { Maybe } from "app/types";

export function userSlugToImageName(slug: string): Maybe<string> {
  switch (slug) {
    case "americorps":
      return "americorps.svg";
    case "consumer-financial-protection-bureau":
      return "cfpb.png";
    case "department-of-transportation":
      return "dot.svg";
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
    case "the-white-house":
      return "white_house.jpg";
    case "university-of-washington-school-of-medicine":
      return "washington_medicine.jpg";
  }
}