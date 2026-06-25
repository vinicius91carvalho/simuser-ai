"use client";

import { useState } from "react";
import { ContactModal } from "@/contexts/engagement/presentation/components/contact-modal";
import { CTASection } from "./cta-section";

interface ContactCTASectionProps {
	title: string;
	subtitle?: string;
	ctaLabel: string;
	secondaryLabel?: string;
	secondaryOnClick?: () => void;
}

export function ContactCTASection({
	title,
	subtitle,
	ctaLabel,
	secondaryLabel,
	secondaryOnClick,
}: ContactCTASectionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<CTASection
				title={title}
				subtitle={subtitle}
				primaryCTA={{
					label: ctaLabel,
					onClick: () => setIsModalOpen(true),
				}}
				secondaryCTA={
					secondaryLabel
						? { label: secondaryLabel, onClick: secondaryOnClick }
						: undefined
				}
			/>
			<ContactModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</>
	);
}
