import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { parseRsvp } from "@/lib/rsvp";

// Where RSVPs go:
//  - RSVP_WEBHOOK_URL set  → POSTed there as JSON (Formspree, Google Apps Script, Zapier, Make, …)
//  - otherwise             → appended to data/rsvps.jsonl (fine for `npm run dev` or a VPS;
//                            serverless hosts like Vercel have a read-only filesystem, so set the webhook there)
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real guests never fill the hidden "website" field.
  if (typeof body.website === "string" && body.website) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = parseRsvp(body);
  if (!data) return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });

  const record = { ...data, submittedAt: new Date().toISOString() };

  try {
    const webhook = process.env.RSVP_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "rsvps.jsonl"), JSON.stringify(record) + "\n");
    }
  } catch (err) {
    console.error("Failed to store RSVP:", err);
    return NextResponse.json({ error: "We couldn't save your RSVP. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
