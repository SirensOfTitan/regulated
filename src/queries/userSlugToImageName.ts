import { Maybe } from "app/types";

export function userSlugToImageName(slug: string): Maybe<string> {
  switch (slug) {
    case "americorps":
      return "americorps.svg";
    case "bain-company":
      return "bain.svg";
    case "carta":
      return "carta.svg";
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
    case "department-of-education":
      return "dept-of-edu.svg";
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
    case "department-of-transportation":
      return "dot.svg";
    case "department-of-veterans-affairs":
      return "va.svg";
    case "environmental-protection-agency":
      return "epa.svg";
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
    case "government-of-chile":
      return "chile.svg";
    case "government-of-india":
      return "government-of-india.svg";
    case "government-of-the-united-kingdom":
      return "uk.svg";
    case "harvard-medical-school":
      return "harvard.svg";
    case "intuit":
      return "intuit.svg";
    case "kaiser-permanente":
      return "kaiser.svg";
    case "keybank":
      return "keybank.svg";
    case "nasdaq":
      return "nasdaq.svg";
    case "national-aeronautics-and-space-administration":
      return "nasa.svg";
    case "national-health-service-uk":
      return "uk_nhs.svg";
    case "national-science-foundation":
      return "nsf.png";
    case "office-of-personnel-management":
      return "opm.svg";
    case "pwc":
      return "pricewaterhousecoopers.svg";
    case "royal-bank-of-canada":
      return "rbc_royal_bank.svg";
    case "small-business-administration":
      return "sba.svg";
    case "smithsonian-institution":
      return "smithsonian.svg";
    case "social-security-administration":
      return "ssa.svg";
    case "state-of-arizona":
      return "arizona.svg";
    case "state-of-california":
      return "state-of-california.svg";
    case "state-of-colorado":
      return "state-of-colorado.svg";
    case "state-of-hawaii":
      return "hawaii.svg";
    case "state-of-iowa":
      return "iowa.svg";
    case "state-of-missouri":
      return "missouri.svg";
    case "state-of-new-jersey":
      return "nj.svg";
    case "state-of-oklahoma":
      return "oklahoma.svg";
    case "state-of-tennessee":
      return "tennessee.svg";
    case "state-of-vermont":
      return "vermont.svg";
    case "state-of-washington":
      return "washington-state.svg";
    case "stripe":
      return "stripe.svg";
    case "the-white-house":
      return "whitehouse.svg";
    case "united-healthcare":
      return "united-healthcare.svg";
    case "united-states-agency-for-international-development":
      return "usaid.svg";
    case "united-states-house-of-representatives":
      return "congress-house.svg";
    case "united-states-senate":
      return "congress-senate.svg";
    case "university-of-washington-school-of-medicine":
      return "washington_medicine.jpg";
  }
}
