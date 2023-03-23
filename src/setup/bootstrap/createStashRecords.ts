import { SetValueCommand } from "@stedi/sdk-client-stash";
import { PARTNERS_KEYSPACE_NAME } from "../../lib/constants.js";
import { requiredEnvVar } from "../../lib/environment.js";
import { PartnershipInput } from "../../lib/types/PartnerRouting.js";

import { savePartnership } from "../../lib/savePartnership.js";
import { stashClient } from "../../lib/clients/stash.js";
import { simCustomer, voomaDev } from "./names.js";

type CreateSampleStashRecordsInput = {
  guide204: string;
};

export const createSampleStashRecords = async ({
  guide204,
}: CreateSampleStashRecordsInput) => {
  const stash = stashClient();

  const sftpBucketName = requiredEnvVar("SFTP_BUCKET_NAME");
  const outboundBucketPath = `trading_partners/${voomaDev.id}/outbound`;

  const partnership: PartnershipInput = {
    transactionSets: [],
  };

  // Inbound 204s
  partnership.transactionSets.push({
    description: "Inbound Vooma 204",
    guideId: guide204,
    destinations: [
      {
        destination: {
          type: "webhook",
          url: requiredEnvVar("DESTINATION_WEBHOOK_URL"),
        },
      },
    ],
    acknowledgmentConfig: {
      acknowledgmentType: "997",
    },
    receivingPartnerId: simCustomer.id,
    sendingPartnerId: voomaDev.id,
    usageIndicatorCode: "T",
  });

  // Outbound 997s
  partnership.transactionSets.push({
    description: "Outbound 997 Acknowledgments",
    destinations: [
      {
        destination: {
          bucketName: sftpBucketName,
          path: outboundBucketPath,
          type: "bucket",
        },
      },
    ],
    transactionSetIdentifier: "997",
    usageIndicatorCode: "T",
  });

  await savePartnership(
    `partnership|${simCustomer.id}|${voomaDev.id}`,
    partnership
  );

  await stash.send(
    new SetValueCommand({
      keyspaceName: PARTNERS_KEYSPACE_NAME,
      key: `lookup|ISA|${voomaDev.partnerInterchangeQualifier}/${voomaDev.x12Id}`,
      value: {
        partnerId: voomaDev.id,
      },
    })
  );
  await stash.send(
    new SetValueCommand({
      keyspaceName: PARTNERS_KEYSPACE_NAME,
      key: `lookup|ISA|${simCustomer.partnerInterchangeQualifier}/${simCustomer.x12Id}`,
      value: {
        partnerId: simCustomer.id,
      },
    })
  );
};
