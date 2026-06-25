"use client";

import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type {
	NotifyPayload,
	NotifyResponse,
} from "@/contexts/engagement/api/notify-handler";

export type FormStatus = "idle" | "loading" | "success" | "already" | "error";

export interface NotifyFormData {
	firstName: string;
	email: string;
	companyName: string;
	companyWebsite: string;
	_gotcha: string;
}

export const INITIAL_FORM_DATA: NotifyFormData = {
	firstName: "",
	email: "",
	companyName: "",
	companyWebsite: "",
	_gotcha: "",
};

function validateForm(
	data: NotifyFormData,
): Partial<Record<keyof NotifyFormData, string>> {
	const errors: Partial<Record<keyof NotifyFormData, string>> = {};

	if (!data.firstName || data.firstName.trim().length < 1) {
		errors.firstName = "required";
	}

	if (!data.email) {
		errors.email = "required";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		errors.email = "invalidEmail";
	}

	if (!data.companyName || data.companyName.trim().length < 1) {
		errors.companyName = "required";
	}

	return errors;
}

export interface UseNotifyFormOptions {
	onSuccess?: () => void;
	initialEmail?: string;
}

export interface UseNotifyFormReturn {
	formData: NotifyFormData;
	status: FormStatus;
	errorMessage: string;
	errors: Partial<Record<keyof NotifyFormData, string>>;
	setField: <K extends keyof NotifyFormData>(field: K, value: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	resetForm: () => void;
}

/**
 * Shared hook for the notify/waitlist form used by ContactModal and
 * GetStartedPage. Handles validation, submission to Loops.so via
 * submitNotifyForm, and status tracking. Pass `onSuccess` to trigger
 * side-effects (e.g. confetti) when a new subscriber is created.
 */
export function useNotifyForm({
	onSuccess,
	initialEmail,
}: UseNotifyFormOptions = {}): UseNotifyFormReturn {
	const locale = useLocale();
	const language = locale.startsWith("pt") ? "pt" : "en";

	const [formData, setFormData] = useState<NotifyFormData>(() =>
		initialEmail
			? { ...INITIAL_FORM_DATA, email: initialEmail }
			: INITIAL_FORM_DATA,
	);
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const [errors, setErrors] = useState<
		Partial<Record<keyof NotifyFormData, string>>
	>({});

	useEffect(() => {
		if (initialEmail) {
			setFormData((prev) => ({ ...prev, email: initialEmail }));
		}
	}, [initialEmail]);

	const setField = useCallback(
		<K extends keyof NotifyFormData>(field: K, value: string) => {
			setFormData((prev) => ({ ...prev, [field]: value }));
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		},
		[],
	);

	const resetForm = useCallback(() => {
		setFormData(INITIAL_FORM_DATA);
		setErrors({});
		setStatus("idle");
		setErrorMessage("");
	}, []);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			// Honeypot check -- bots fill hidden fields; humans do not
			if (formData._gotcha) {
				return;
			}

			const validationErrors = validateForm(formData);
			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			}

			setStatus("loading");
			setErrorMessage("");

			try {
				const payload: NotifyPayload = {
					email: formData.email,
					firstName: formData.firstName,
					companyName: formData.companyName,
					companyWebsite: formData.companyWebsite,
					language: language as "en" | "pt",
					_gotcha: "",
				};

				const response = await fetch("/api/notify", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				});

				const result: NotifyResponse = await response.json();

				if (result.success) {
					if (result.alreadySubscribed) {
						setStatus("already");
					} else {
						setStatus("success");
						onSuccess?.();
					}
				} else {
					setStatus("error");
					setErrorMessage(
						result.message ?? "Something went wrong. Please try again.",
					);
				}
			} catch {
				setStatus("error");
				setErrorMessage("An unexpected error occurred. Please try again.");
			}
		},
		[formData, language, onSuccess],
	);

	return {
		formData,
		status,
		errorMessage,
		errors,
		setField,
		handleSubmit,
		resetForm,
	};
}
