import type { WebhookEvent } from "@clerk/remix/api.server";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Webhook } from "svix";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET)
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
      );

    const headers = request.headers;
    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: No Svix Headers", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error: Invalid Webhook", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    console.log(`WebhookId: ${evt.data.id}`);
    console.log(`WebhookType: ${evt.type}`);
    console.log("WebhookBody:", body);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      console.log(evt.data);
    }

    if (evt.type === "user.deleted") {
      console.log(evt.data);
    }

    return json("success", { status: 200 });
  } catch (err) {
    return json("failed", { status: 400 });
  }
}
