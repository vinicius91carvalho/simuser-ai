"use client";

import { cn } from "@simuser/ui";
import { useTranslations } from "next-intl";
import type { UseNotifyFormReturn } from "@/contexts/engagement/presentation/hooks/use-notify-form";

interface NotifyFormFieldsProps extends UseNotifyFormReturn {
	idPrefix: string;
	formClassName?: string;
	successClassName?: string;
	onClose: () => void;
}

function CheckCircleIcon({ className }: { className: string }) {
	return (
		<svg
			role="img"
			aria-labelledby="check-circle-title"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
		>
			<title id="check-circle-title">Check circle</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
}

function CheckmarkIcon({ className }: { className: string }) {
	return (
		<svg
			role="img"
			aria-labelledby="checkmark-title"
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
		>
			<title id="checkmark-title">Checkmark</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 12.75l6 6 9-13.5"
			/>
		</svg>
	);
}

function SuccessState({
	status,
	className,
	onClose,
}: {
	status: "success" | "already";
	className?: string;
	onClose: () => void;
}) {
	const t = useTranslations("engagement.contact");

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-8 text-center",
				className,
			)}
		>
			{status === "already" ? (
				<div className="mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)]">
					<CheckCircleIcon className="h-8 w-8 text-[hsl(var(--primary))]" />
				</div>
			) : (
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.1)]">
					<CheckmarkIcon className="h-8 w-8 text-[hsl(var(--accent))]" />
				</div>
			)}
			{status === "already" ? (
				<>
					<p className="text-lg font-semibold text-[hsl(var(--foreground))]">
						{t("already.title")}
					</p>
					<p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
						{t("already.message")}
					</p>
				</>
			) : (
				<>
					<p className="text-lg font-semibold text-[hsl(var(--foreground))]">
						{t("success.title")}
					</p>
					<p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
						{t("success.message")}
					</p>
				</>
			)}
			<button
				type="button"
				onClick={onClose}
				className="mt-6 inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-transparent px-6 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))]"
			>
				{t("close")}
			</button>
		</div>
	);
}

function FormFields({
	idPrefix,
	formData,
	status,
	errorMessage,
	errors,
	setField,
	handleSubmit,
	formClassName,
}: {
	idPrefix: string;
	formData: UseNotifyFormReturn["formData"];
	status: UseNotifyFormReturn["status"];
	errorMessage: string;
	errors: UseNotifyFormReturn["errors"];
	setField: UseNotifyFormReturn["setField"];
	handleSubmit: UseNotifyFormReturn["handleSubmit"];
	formClassName?: string;
}) {
	const t = useTranslations("engagement.contact");

	const inputClassName =
		"w-full rounded-lg border bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-colors focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring)/0.3)]";

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("space-y-4", formClassName)}
			noValidate
		>
			{/* Honeypot -- hidden from real users */}
			<input
				type="text"
				name="_gotcha"
				value={formData._gotcha}
				onChange={(e) => setField("_gotcha", e.target.value)}
				tabIndex={-1}
				aria-hidden="true"
				className="absolute h-0 w-0 overflow-hidden opacity-0"
				autoComplete="off"
			/>

			<div>
				<label
					htmlFor={`${idPrefix}-firstName`}
					className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
				>
					{t("form.firstName")}
				</label>
				<input
					id={`${idPrefix}-firstName`}
					type="text"
					placeholder={t("form.firstNamePlaceholder")}
					value={formData.firstName}
					onChange={(e) => setField("firstName", e.target.value)}
					disabled={status === "loading"}
					aria-required="true"
					aria-invalid={!!errors.firstName}
					aria-describedby={
						errors.firstName ? `${idPrefix}-firstName-error` : undefined
					}
					className={cn(
						inputClassName,
						"mt-1",
						errors.firstName
							? "border-[hsl(var(--destructive))]"
							: "border-[hsl(var(--border))]",
					)}
				/>
				{errors.firstName && (
					<p
						id={`${idPrefix}-firstName-error`}
						className="mt-1 text-xs text-[hsl(var(--destructive))]"
					>
						{t(`validation.${errors.firstName}`)}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor={`${idPrefix}-email`}
					className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
				>
					{t("form.email")}
				</label>
				<input
					id={`${idPrefix}-email`}
					type="email"
					placeholder={t("form.emailPlaceholder")}
					value={formData.email}
					onChange={(e) => setField("email", e.target.value)}
					disabled={status === "loading"}
					aria-required="true"
					aria-invalid={!!errors.email}
					aria-describedby={
						errors.email ? `${idPrefix}-email-error` : undefined
					}
					className={cn(
						inputClassName,
						"mt-1",
						errors.email
							? "border-[hsl(var(--destructive))]"
							: "border-[hsl(var(--border))]",
					)}
				/>
				{errors.email && (
					<p
						id={`${idPrefix}-email-error`}
						className="mt-1 text-xs text-[hsl(var(--destructive))]"
					>
						{t(`validation.${errors.email}`)}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor={`${idPrefix}-companyName`}
					className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
				>
					{t("form.companyName")}
				</label>
				<input
					id={`${idPrefix}-companyName`}
					type="text"
					placeholder={t("form.companyNamePlaceholder")}
					value={formData.companyName}
					onChange={(e) => setField("companyName", e.target.value)}
					disabled={status === "loading"}
					aria-required="true"
					aria-invalid={!!errors.companyName}
					aria-describedby={
						errors.companyName ? `${idPrefix}-companyName-error` : undefined
					}
					className={cn(
						inputClassName,
						"mt-1",
						errors.companyName
							? "border-[hsl(var(--destructive))]"
							: "border-[hsl(var(--border))]",
					)}
				/>
				{errors.companyName && (
					<p
						id={`${idPrefix}-companyName-error`}
						className="mt-1 text-xs text-[hsl(var(--destructive))]"
					>
						{t(`validation.${errors.companyName}`)}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor={`${idPrefix}-companyWebsite`}
					className="mb-1.5 block text-sm font-medium text-[hsl(var(--foreground))]"
				>
					{t("form.companyWebsite")}
				</label>
				<input
					id={`${idPrefix}-companyWebsite`}
					type="text"
					placeholder={t("form.companyWebsitePlaceholder")}
					value={formData.companyWebsite}
					onChange={(e) => setField("companyWebsite", e.target.value)}
					disabled={status === "loading"}
					aria-required="false"
					className={cn(inputClassName, "mt-1 border-[hsl(var(--border))]")}
				/>
			</div>

			{status === "error" && errorMessage && (
				<p className="text-sm text-[hsl(var(--destructive))]">{errorMessage}</p>
			)}

			<button
				type="submit"
				disabled={status === "loading"}
				className="w-full rounded-lg bg-[hsl(var(--primary))] py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-all hover:opacity-90 disabled:opacity-50"
			>
				{status === "loading" ? t("form.submitting") : t("form.submit")}
			</button>
		</form>
	);
}

export function NotifyFormFields({
	idPrefix,
	formData,
	status,
	errorMessage,
	errors,
	setField,
	handleSubmit,
	resetForm: _resetForm,
	formClassName,
	successClassName,
	onClose,
}: NotifyFormFieldsProps) {
	if (status === "success" || status === "already") {
		return (
			<SuccessState
				status={status}
				className={successClassName}
				onClose={onClose}
			/>
		);
	}

	return (
		<FormFields
			idPrefix={idPrefix}
			formData={formData}
			status={status}
			errorMessage={errorMessage}
			errors={errors}
			setField={setField}
			handleSubmit={handleSubmit}
			formClassName={formClassName}
		/>
	);
}
