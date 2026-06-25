"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SEEN_KEY = "simuser-poc-notice-seen";

/**
 * Site-wide "this is a proof of concept" notice. Auto-opens once per browser
 * session (sessionStorage flag) on first load. There is no backend here — the
 * original SimUser AI site lived at simuser.ai; this is a static GitHub Pages
 * mirror, so nothing you submit goes anywhere.
 */
export function PocModal() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem(SEEN_KEY)) {
			return;
		}
		sessionStorage.setItem(SEEN_KEY, "1");
		setOpen(true);
	}, []);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-2xl data-[state=open]:animate-scale-up">
					<Dialog.Close asChild>
						<button
							type="button"
							className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
							aria-label="Close"
						>
							<X className="h-4 w-4" />
						</button>
					</Dialog.Close>

					<Dialog.Title className="mb-1 text-xl font-bold text-[hsl(var(--foreground))]">
						This is only a proof of concept
					</Dialog.Title>
					<Dialog.Description className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
						The first rule of this demo: it&apos;s only a demo.
					</Dialog.Description>

					<div className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
						<p>
							SimUser AI was once live at{" "}
							<span className="font-medium text-[hsl(var(--foreground))]">
								simuser.ai
							</span>
							. That site is gone — what you&apos;re looking at is a static
							snapshot of the marketing pages, rehosted on GitHub Pages so the
							work isn&apos;t lost.
						</p>
						<p>
							There&apos;s no backend behind it. Forms don&apos;t submit
							anywhere, no data is collected, and nothing here is for sale.
						</p>
					</div>

					<Dialog.Close asChild>
						<button
							type="button"
							className="mt-6 w-full rounded-lg bg-[hsl(var(--primary))] py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90"
						>
							Got it — let me look around
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
