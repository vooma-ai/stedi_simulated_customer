import { CreateX12ProfileCommand } from "@stedi/sdk-client-partners";

import { PartnerProfileSchema } from "../../lib/types/PartnerRouting.js";
import { SetValueCommand } from "@stedi/sdk-client-stash";
import { PARTNERS_KEYSPACE_NAME } from "../../lib/constants.js";
import { partnersClient } from "../../lib/clients/partners.js";
import { stashClient } from "../../lib/clients/stash.js";
import { voomaDev, simCustomer } from "./names.js";

export const createProfiles = async () => {
  const profiles = [
    {
      id: voomaDev.id,
      partnerName: voomaDev.partnerName,
      partnerInterchangeQualifier: voomaDev.partnerInterchangeQualifier,
      partnerInterchangeId: voomaDev.x12Id,
      acknowledgmentRequestedCode: "0",
      partnerApplicationId: `${voomaDev.x12Id}_APP`,
    },
    {
      id: simCustomer.id,
      partnerName: simCustomer.partnerName,
      partnerInterchangeQualifier: simCustomer.partnerInterchangeQualifier,
      partnerInterchangeId: simCustomer.x12Id,
      acknowledgmentRequestedCode: "0",
      partnerApplicationId: `${simCustomer.x12Id}_APP`,
    },
  ];

  if (process.env["USE_BETA"] === "true") {
    const partners = partnersClient();
    console.log("[BETA] Creating X12 Trading Partner Profile in Partners API");

    for (const profile of profiles) {
      try {
        await partners.send(new CreateX12ProfileCommand(profile));
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "name" in error &&
          error.name === "ResourceConflictException"
        )
          console.log("Partner profile already exists");
        else throw error;
      }
    }
  } else {
    console.log("Creating X12 Trading Partner Profile in Stash");
    const stash = stashClient();

    for (const profile of profiles) {
      const parseResult = PartnerProfileSchema.safeParse(profile);

      if (!parseResult.success) throw new Error(parseResult.error.message);
      // throw new Error(`Invalid profile for ${profile.id}`);

      await stash.send(
        new SetValueCommand({
          keyspaceName: PARTNERS_KEYSPACE_NAME,
          key: `profile|${profile.id}`,
          value: parseResult.data,
        })
      );
    }
  }
};
