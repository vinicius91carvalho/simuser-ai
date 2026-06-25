"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Footer } from "./footer";
import { Header } from "./header";
import { PocModal } from "./poc-modal";

interface PageLayoutProps {
	children: ReactNode;
	locale: Locale;
}

export function PageLayout({ children, locale }: PageLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header locale={locale} />
			<main className="flex-1 pt-16">{children}</main>
			<Footer locale={locale} />
			<PocModal />
		</div>
	);
}
