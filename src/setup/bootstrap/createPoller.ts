import { SetValueCommand } from "@stedi/sdk-client-stash";
import { PARTNERS_KEYSPACE_NAME } from "../../lib/constants.js";
import { requiredEnvVar } from "../../lib/environment.js";

import { stashClient } from "../../lib/clients/stash.js";
import { voomaDev } from "./names.js";

export const createPoller = async () => {
  const stash = stashClient();

  const sftpBucketName = requiredEnvVar("SFTP_BUCKET_NAME");
  const inboundBucketPath = `trading_partners/${voomaDev.id}/inbound`;

  const pollerConfig = {
    "remote-sftp": {
      connectionDetails: {
        protocol: "sftp",
        config: {
          host: "transfer.us.stedi.com",
          port: 22,
          username: requiredEnvVar("VOOMA_DEV_SFTP_USERNAME"),
          password: requiredEnvVar("VOOMA_DEV_SFTP_PASSWORD"),
        },
      },
      deleteAfterProcessing: false,
      destination: {
        type: "bucket",
        bucketName: sftpBucketName,
        path: inboundBucketPath,
      },
      remotePath: "/outbound",
    },
  };

  await stash.send(
    new SetValueCommand({
      keyspaceName: PARTNERS_KEYSPACE_NAME,
      key: `bootstrap|remote-poller-config`,
      value: pollerConfig,
    })
  );
};
