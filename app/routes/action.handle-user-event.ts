import { db } from "@/database/db.server";
import type { WebhookEvent } from "@clerk/react-router/api.server";
import { Webhook } from "svix";

import { data } from "react-router";
import type { Route } from "./+types/action.handle-user-event";

export async function action({ request }: Route.ActionArgs) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET)
      throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");

    const headers = request.headers;
    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: No Webhook Headers", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance
    const webhook = new Webhook(WEBHOOK_SECRET);

    let event: WebhookEvent;

    // Verify the payload with the headers
    try {
      event = webhook.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error: Webhook Verification Failed", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    console.log(`WebhookId: ${event.data.id}`);
    console.log(`WebhookType: ${event.type}`);
    console.log("WebhookBody:", body);

    if (event.type === "user.created" || event.type === "user.updated") {
      console.log(event.data.id);

      const client = await db.user.findUnique({
        where: {
          userAuthId: event.data.id,
        },
      });

      if (!client)
        await db.user.create({
          data: {
            userAuthId: event.data.id,
          },
        });
    }

    if (event.type === "user.deleted") {
      const deleteAllInvoices = db.invoice.deleteMany({
        where: {
          userId: event.data.id,
        },
      });

      const deleteUser = db.user.delete({
        where: {
          userAuthId: event.data.id,
        },
      });

      await db.$transaction([deleteAllInvoices, deleteUser]);
    }

    return data("Webhook Request Success", { status: 200 });
  } catch (err) {
    return data("Webhook Request Failed", { status: 400 });
  }
}
