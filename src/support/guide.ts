import { serializeError } from "serialize-error";

import {
  CreateGuideCommand,
  CreateGuideInput,
  ListGuidesCommand,
  PublishGuideCommand,
  ResourceConflictException,
} from "@stedi/sdk-client-guides";

import path from "node:path";
import fs from "node:fs";
import { guidesClient } from "../lib/clients/guides.js";

const guides = guidesClient();

export const parseGuideId = (fullGuideId: string): string => {
  return fullGuideId.split("_")[1];
};

export const ensureGuideExists = async (guideName: string): Promise<string> => {
  const foundGuideId = await findGuideIdByName(guideName);
  return parseGuideId(foundGuideId);
};

const createGuide = async (guide: CreateGuideInput): Promise<string> => {
  const createGuideResponse = await guides.send(new CreateGuideCommand(guide));

  if (!createGuideResponse.id)
    throw new Error(`Error creating guide (id not found in response)`);

  if (!createGuideResponse.publishedAt) {
    await publishGuide(createGuideResponse.id);
  }

  return createGuideResponse.id;
};

const publishGuide = async (guideId: string): Promise<unknown> => {
  return await guides.send(
    new PublishGuideCommand({
      id: guideId,
    })
  );
};

const findGuideIdByName = async (
  guideName: string,
  pageToken?: string
): Promise<string> => {
  const guidesList = await guides.send(
    new ListGuidesCommand({
      nextPageToken: pageToken,
    })
  );

  const foundGuide = guidesList.items?.find(
    (guide) => guide.name === guideName
  );

  if (!foundGuide?.id && !guidesList.nextPageToken) {
    throw new Error(`Failed to look up existing guide by name: ${guideName}`);
  }

  return (
    foundGuide?.id ??
    (await findGuideIdByName(guideName, guidesList.nextPageToken))
  );
};
