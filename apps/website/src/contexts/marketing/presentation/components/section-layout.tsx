"use client";

import { cn } from "@simuser/ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

// overflow-x-clip trims sub-pixel horizontal bleed (e.g. flex-gap rounding in
// step cards) so mobile has no stray horizontal scroll. Unlike overflow:hidden
// it doesn't create a scroll container, so sticky/fixed elements are unaffected.
const sectionVariants = cva("w-full overflow-x-clip", {
	variants: {
		variant: {
			default: "bg-[hsl(var(--background))]",
			muted: "bg-[hsl(var(--muted))]",
			dark: "bg-[hsl(var(--card))]",
		},
		padding: {
			default: "py-16 sm:py-20 lg:py-24",
			compact: "py-10 sm:py-12 lg:py-16",
			none: "",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "default",
	},
});

interface SectionLayoutProps extends VariantProps<typeof sectionVariants> {
	children: ReactNode;
	id?: string;
	className?: string;
}

export function SectionLayout({
	children,
	variant,
	padding,
	id,
	className,
}: SectionLayoutProps) {
	return (
		<section
			id={id}
			className={cn(sectionVariants({ variant, padding }), className)}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
		</section>
	);
}
