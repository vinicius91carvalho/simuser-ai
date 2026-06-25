"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useConfetti } from "@/contexts/engagement/presentation/hooks/use-confetti";
import { useNotifyForm } from "@/contexts/engagement/presentation/hooks/use-notify-form";
import { NotifyFormFields } from "./notify-form-fields";

interface ContactModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
	const t = useTranslations("engagement.contact");
	const { fireConfetti } = useConfetti();
	const form = useNotifyForm({ onSuccess: fireConfetti });

	const handleOpenChange = useCallback(
		(isOpen: boolean) => {
			onOpenChange(isOpen);
			if (!isOpen) {
				// Reset form state after close animation
				setTimeout(() => {
					form.resetForm();
				}, 200);
			}
		},
		[onOpenChange, form.resetForm],
	);

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
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
						{t("title")}
					</Dialog.Title>
					<Dialog.Description className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">
						{t("description")}
					</Dialog.Description>

					<NotifyFormFields
						{...form}
						idPrefix="contact"
						onClose={() => handleOpenChange(false)}
					/>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
