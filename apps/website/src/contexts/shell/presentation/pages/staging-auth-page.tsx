"use client";

import { cn } from "@simuser/ui";
import { Lock } from "lucide-react";
import { useCallback, useState } from "react";

/**
 * Simple client-side password gate for staging environment.
 * NOT a security measure — just prevents casual access.
 * EN-only (not localized per PRD).
 */
export function StagingAuthPageContent() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			// Simple client-side check — not a security measure
			if (password === "simuser2026") {
				setIsAuthenticated(true);
				setError("");
				// Store in sessionStorage so the gate persists during the session
				try {
					sessionStorage.setItem("staging-auth", "true");
				} catch {
					// SSR or sessionStorage not available
				}
			} else {
				setError("Incorrect password. Please try again.");
			}
		},
		[password],
	);

	if (isAuthenticated) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center">
				<div className="text-center">
					<div className="mb-4 text-4xl">&#9989;</div>
					<h1 className="mb-2 text-2xl font-bold text-[hsl(var(--foreground))]">
						Access Granted
					</h1>
					<p className="text-[hsl(var(--muted-foreground))]">
						You can now browse the staging environment.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-[60vh] items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)]">
						<Lock className="h-8 w-8 text-[hsl(var(--primary))]" />
					</div>
					<h1 className="mb-2 text-2xl font-bold text-[hsl(var(--foreground))]">
						Staging Access
					</h1>
					<p className="text-sm text-[hsl(var(--muted-foreground))]">
						This is a staging environment. Enter the password to continue.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="staging-password"
							className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
						>
							Password
						</label>
						<input
							id="staging-password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setError("");
							}}
							placeholder="Enter staging password"
							className={cn(
								"w-full rounded-lg border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]",
								error
									? "border-[hsl(var(--destructive))]"
									: "border-[hsl(var(--border))]",
							)}
						/>
						{error && (
							<p className="mt-1 text-xs text-[hsl(var(--destructive))]">
								{error}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full rounded-lg bg-[hsl(var(--primary))] py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90"
					>
						Enter
					</button>
				</form>
			</div>
		</div>
	);
}
