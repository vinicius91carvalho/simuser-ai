/**
 * Server-side POST handler for Loops.so contact creation.
 *
 * This is a Next.js Route Handler (server-side). It validates the request,
 * applies IP-based rate limiting, and forwards to Loops.so contacts/create
 * API using a private LOOPS_API_KEY environment variable.
 */

import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { apiRateLimit } from "@/lib/rate-limit";

export const notifySchema = z.object({
	email: z.email("Please enter a valid email address."),
	firstName: z.string().min(1, "First name is required.").optional(),
	companyName: z.string().min(1, "Company name is required.").optional(),
	companyWebsite: z.string().optional(),
	language: z.enum(["en", "pt"]).optional(),
	_gotcha: z.string().optional(),
});

export type NotifyPayload = z.infer<typeof notifySchema>;

export interface NotifyResponse {
	success: boolean;
	alreadySubscribed?: boolean;
	message?: string;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Honeypot check — bots fill hidden fields, humans don't
		if (body._gotcha) {
			return NextResponse.json({ success: true });
		}

		// Rate limit: 5 requests per minute per IP
		const forwarded = request.headers.get("x-forwarded-for");
		const ip = forwarded?.split(",")[0]?.trim() ?? "127.0.0.1";
		const { success: withinLimit } = await apiRateLimit.check(5, ip);

		if (!withinLimit) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{ status: 429 },
			);
		}

		// Validate all fields
		const result = notifySchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					error: result.error.issues[0]?.message ?? "Invalid email address.",
				},
				{ status: 400 },
			);
		}

		const { email, firstName, companyName, companyWebsite, language } =
			result.data;

		// Forward to Loops.so contacts/create API
		const loopsApiKey = process.env.LOOPS_API_KEY;

		if (!loopsApiKey) {
			console.error("LOOPS_API_KEY is not configured");
			return NextResponse.json(
				{ error: "Service temporarily unavailable." },
				{ status: 503 },
			);
		}

		const loopsResponse = await fetch(
			"https://app.loops.so/api/v1/contacts/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${loopsApiKey}`,
				},
				body: JSON.stringify({
					email,
					firstName,
					companyName,
					companyWebsite,
					language,
					source: "SimUser Website",
				}),
			},
		);

		if (!loopsResponse.ok) {
			if (loopsResponse.status === 409) {
				return NextResponse.json({
					success: true,
					alreadySubscribed: true,
				});
			}
			console.error("Loops.so error:", loopsResponse.status);
			return NextResponse.json(
				{ error: "Failed to submit. Please try again." },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json(
			{ error: "An unexpected error occurred." },
			{ status: 500 },
		);
	}
}
