"use client";

import { cn } from "@simuser/ui";
import { Mail } from "lucide-react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { SectionLayout } from "./section-layout";

interface FounderCTAProps {
	heading: string;
	message: string;
	className?: string;
}

export function FounderCTA({ heading, message, className }: FounderCTAProps) {
	return (
		<SectionLayout variant="muted" className={className}>
			<AnimateOnScroll variant="fade-up">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
						{heading}
					</h2>
					<p className="mb-6 text-[hsl(var(--muted-foreground))]">{message}</p>
					<div className="flex items-center justify-center gap-3">
						<a
							href="mailto:adm@simuser.ai"
							className={cn(
								"inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border))]",
								"text-[hsl(var(--muted-foreground))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]",
							)}
							aria-label="Email"
						>
							<Mail className="h-5 w-5" />
						</a>
					</div>
				</div>
			</AnimateOnScroll>
		</SectionLayout>
	);
}
