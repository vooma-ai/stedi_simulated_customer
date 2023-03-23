import {
  FunctionsClient,
  InvokeFunctionCommand,
} from "@stedi/sdk-client-functions";
import payload from "../resources/X12/4010/204/outbound.json" assert { type: "json" };
const apiKey = "hK6Ythi.maVVEalHCkdBxG3NOtRHY6c0";
const functionName = "edi-outbound";

const client = new FunctionsClient({
  region: "us",
  apiKey: apiKey,
});

async function main() {
  const output = await client.send(
    new InvokeFunctionCommand({
      functionName: functionName,
      requestPayload: Buffer.from(JSON.stringify(payload), "utf-8"),
    })
  );

  const response = Buffer.from(output.responsePayload!).toString("utf-8");
  console.log("Function response:\n\n" + response + "\n");

  // Optional: Up to 4kb worth of the function's log output is returned in the invoke function response
  const logs = Buffer.from(output.invocationLogs!, "base64").toString("utf-8");
  console.log("Function logs:\n\n" + logs);
}

main();
