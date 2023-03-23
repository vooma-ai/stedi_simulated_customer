import { ensureGuideExists } from "../support/guide.js";
import { createSampleStashRecords } from "./bootstrap/createStashRecords.js";
import { StashStorage } from "../lib/migration/stashStorage.js";
import { migrator } from "../lib/migration/config.js";
import { createProfiles } from "./bootstrap/createProfiles.js";
import { updateResourceMetadata } from "../support/bootstrapMetadata.js";
import { guide204Id } from "./bootstrap/names.js";
import { createPoller } from "./bootstrap/createPoller.js";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const guide204 = await ensureGuideExists(guide204Id);

  await updateResourceMetadata({ GUIDE_IDS: [guide204] });
  await createProfiles();
  await createSampleStashRecords({ guide204 });
  await createPoller();

  // Record all migrations as run (as this file always creates the latest state)
  const migrationStore = new StashStorage({});
  const allMigrations = await migrator.migrations({});
  const appliedMigrations = await migrationStore.executed();
  for (const { name } of allMigrations) {
    if (appliedMigrations.includes(name)) continue;
    await migrationStore.logMigration({ name });
  }
})();
