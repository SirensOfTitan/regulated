import * as utils from "./utils";

export const defaultClient = utils.createClient({
  apiKey: process.env.AIRTABLE_KEY ?? "",
  base: "appRtHJYCVdddgqjT",
});
