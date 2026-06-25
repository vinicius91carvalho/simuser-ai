"use client";

import { cn } from "@simuser/ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const sectionVariants = cva("w-full", {
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
