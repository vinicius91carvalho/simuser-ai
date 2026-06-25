"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
	Camera,
	CheckCircle,
	CircleAlert,
	MessageSquare,
	MousePointerClick,
	Star,
	Video,
	XCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AnimateOnScroll } from "@/contexts/shell/presentation/components/animate-on-scroll";
import { SectionLayout } from "./section-layout";

// ─── Screenshot Panel ────────────────────────────────────────────────────────

function LoginMockup() {
	return (
		<div className="flex flex-col items-center gap-2 p-4">
			{/* Logo placeholder */}
			<div
				className="mb-1 h-5 w-16 rounded"
				style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.7 }}
			/>
			{/* Email field */}
			<div
				className="h-7 w-full rounded border px-2 text-[9px] leading-7"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				email@example.com
			</div>
			{/* Password field */}
			<div
				className="h-7 w-full rounded border px-2 text-[9px] leading-7"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				••••••••
			</div>
			{/* Sign In button */}
			<div
				className="mt-1 h-7 w-full rounded text-center text-[9px] font-semibold leading-7 text-white"
				style={{ backgroundColor: "hsl(270, 95%, 65%)" }}
			>
				Sign In
			</div>
			{/* Forgot password */}
			<p className="text-[8px]" style={{ color: "hsl(270, 60%, 60%)" }}>
				Forgot password?
			</p>
		</div>
	);
}

function DashboardMockup() {
	return (
		<div className="flex flex-col gap-2 p-3">
			{/* Top nav */}
			<div
				className="flex h-5 items-center gap-2 rounded px-2"
				style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
			>
				<div
					className="h-2.5 w-8 rounded"
					style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.7 }}
				/>
				<div className="ml-auto flex gap-1">
					<div
						className="h-2 w-4 rounded"
						style={{ backgroundColor: "hsl(270, 20%, 32%)" }}
					/>
					<div
						className="h-2 w-4 rounded"
						style={{ backgroundColor: "hsl(270, 20%, 32%)" }}
					/>
				</div>
			</div>
			{/* Stat cards */}
			<div className="grid grid-cols-3 gap-1.5">
				{["42", "87", "23"].map((val) => (
					<div
						key={val}
						className="rounded p-1.5 text-center"
						style={{ backgroundColor: "hsl(270, 10%, 14%)" }}
					>
						<p
							className="text-[11px] font-bold"
							style={{ color: "hsl(270, 95%, 65%)" }}
						>
							{val}
						</p>
						<p className="text-[7px]" style={{ color: "hsl(270, 20%, 45%)" }}>
							metric
						</p>
					</div>
				))}
			</div>
			{/* Chart area */}
			<div
				className="flex items-end gap-0.5 rounded p-2"
				style={{ backgroundColor: "hsl(270, 10%, 12%)", height: "2.5rem" }}
			>
				{(
					[
						{ h: 60, color: "hsl(270, 95%, 65%)" },
						{ h: 80, color: "hsl(175, 90%, 50%)" },
						{ h: 45, color: "hsl(35, 95%, 55%)" },
						{ h: 90, color: "hsl(270, 95%, 65%)" },
						{ h: 55, color: "hsl(175, 90%, 50%)" },
						{ h: 70, color: "hsl(35, 95%, 55%)" },
						{ h: 85, color: "hsl(270, 95%, 65%)" },
					] as const
				).map((bar) => (
					<div
						key={bar.h}
						className="flex-1 rounded-t"
						style={{
							height: `${bar.h}%`,
							backgroundColor: bar.color,
							opacity: 0.7,
						}}
					/>
				))}
			</div>
		</div>
	);
}

function CheckoutMockup() {
	return (
		<div className="flex flex-col gap-2 p-3">
			<p
				className="text-[8px] font-semibold"
				style={{ color: "hsl(270, 60%, 65%)" }}
			>
				Payment Details
			</p>
			<div
				className="h-6 w-full rounded border px-2 text-[8px] leading-6"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				Card number
			</div>
			<div className="grid grid-cols-2 gap-1.5">
				<div
					className="h-6 rounded border px-2 text-[8px] leading-6"
					style={{
						borderColor: "hsl(270, 20%, 30%)",
						backgroundColor: "hsl(270, 10%, 12%)",
						color: "hsl(270, 30%, 55%)",
					}}
				>
					MM/YY
				</div>
				<div
					className="h-6 rounded border px-2 text-[8px] leading-6"
					style={{
						borderColor: "hsl(270, 20%, 30%)",
						backgroundColor: "hsl(270, 10%, 12%)",
						color: "hsl(270, 30%, 55%)",
					}}
				>
					CVV
				</div>
			</div>
			<p
				className="text-[8px] font-semibold"
				style={{ color: "hsl(270, 60%, 65%)" }}
			>
				Billing Address
			</p>
			<div
				className="h-6 w-full rounded border px-2 text-[8px] leading-6"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				Street address
			</div>
			{/* Place Order button — intentionally small to trigger warning */}
			<div
				className="mt-1 h-6 w-2/3 self-end rounded text-center text-[8px] font-semibold leading-6 text-white"
				style={{ backgroundColor: "hsl(270, 95%, 65%)" }}
			>
				Place Order
			</div>
		</div>
	);
}

function ConfirmationMockup() {
	return (
		<div className="flex flex-col items-center gap-2 p-4">
			{/* Checkmark */}
			<div
				className="flex h-10 w-10 items-center justify-center rounded-full"
				style={{ backgroundColor: "hsl(145, 60%, 20%)" }}
			>
				<CheckCircle
					className="h-6 w-6"
					style={{ color: "hsl(145, 70%, 45%)" }}
				/>
			</div>
			<p
				className="text-[10px] font-bold"
				style={{ color: "hsl(145, 70%, 55%)" }}
			>
				Order Confirmed!
			</p>
			{/* Order summary lines */}
			<div
				className="w-full space-y-1 border-t pt-2"
				style={{ borderColor: "hsl(270, 20%, 22%)" }}
			>
				<div
					className="flex justify-between text-[8px]"
					style={{ color: "hsl(270, 30%, 55%)" }}
				>
					<span>Order #1234</span>
					<span>$49.00</span>
				</div>
				<div
					className="flex justify-between text-[8px]"
					style={{ color: "hsl(270, 30%, 55%)" }}
				>
					<span>SimUser Pro Plan</span>
					<span>×1</span>
				</div>
			</div>
			{/* Back to dashboard */}
			<div
				className="mt-1 h-6 w-full rounded border text-center text-[8px] leading-6"
				style={{
					borderColor: "hsl(270, 95%, 65%)",
					color: "hsl(270, 95%, 65%)",
				}}
			>
				Back to Dashboard
			</div>
		</div>
	);
}

const MOCKUP_COMPONENTS = [
	LoginMockup,
	DashboardMockup,
	CheckoutMockup,
	ConfirmationMockup,
];

const STEP_URLS = [
	"app.example.com/login",
	"app.example.com/dashboard",
	"app.example.com/checkout",
	"app.example.com/confirmation",
];

function ScreenshotPanel({ t }: { t: (key: string) => string }) {
	const steps = [
		{ status: "success" as const, key: "step1" },
		{ status: "success" as const, key: "step2" },
		{ status: "warning" as const, key: "step3" },
		{ status: "success" as const, key: "step4" },
	];

	return (
		<div className="space-y-6">
			<p className="text-[hsl(var(--muted-foreground))]">
				{t("featureShowcase.screenshots.description")}
			</p>
			<div className="grid gap-4 sm:grid-cols-2">
				{steps.map((step, idx) => {
					const MockupComponent = MOCKUP_COMPONENTS[idx];
					return (
						<AnimateOnScroll key={step.key} variant="fade-up" delay={idx * 100}>
							<div className="group relative overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
								{/* Mock browser chrome */}
								<div className="flex items-center gap-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2">
									<span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
									<span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
									<span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
									<span className="ml-2 flex-1 rounded bg-[hsl(var(--background))] px-2 py-0.5 text-[10px] text-[hsl(var(--muted-foreground))]">
										{STEP_URLS[idx]}
									</span>
								</div>
								{/* Distinct page mockup */}
								<div
									className="relative"
									style={{ backgroundColor: "hsl(270, 12%, 9%)" }}
								>
									{MockupComponent && <MockupComponent />}
									{/* Annotation overlay */}
									<div
										className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
											step.status === "success"
												? "bg-emerald-500/20 text-emerald-400"
												: "bg-amber-500/20 text-amber-400"
										}`}
									>
										{step.status === "success" ? (
											<CheckCircle className="h-3 w-3" />
										) : (
											<CircleAlert className="h-3 w-3" />
										)}
										{t(`featureShowcase.screenshots.${step.key}.status`)}
									</div>
								</div>
								{/* Step label */}
								<div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] px-4 py-2">
									<p className="text-xs font-medium text-[hsl(var(--foreground))]">
										{t(`featureShowcase.screenshots.${step.key}.label`)}
									</p>
									<p className="text-[10px] text-[hsl(var(--muted-foreground))]">
										{t(`featureShowcase.screenshots.${step.key}.note`)}
									</p>
								</div>
							</div>
						</AnimateOnScroll>
					);
				})}
			</div>
		</div>
	);
}

// ─── Video Panel Mock Screens ─────────────────────────────────────────────────

function VideoNavBar() {
	return (
		<div
			className="flex h-8 shrink-0 items-center gap-3 px-3"
			style={{ backgroundColor: "hsl(270, 20%, 14%)" }}
		>
			<div
				className="h-3 w-14 rounded"
				style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.7 }}
			/>
			<div className="flex gap-2">
				<div
					className="h-2 w-8 rounded"
					style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
				/>
				<div
					className="h-2 w-8 rounded"
					style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
				/>
				<div
					className="h-2 w-8 rounded"
					style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
				/>
			</div>
			{/* Back arrow — visible on checkout screen for abandonment cue */}
			<div
				className="ml-auto h-2 w-5 rounded"
				style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
			/>
		</div>
	);
}

function VideoSignUpMockup({
	hovered,
	clicked,
}: {
	hovered: boolean;
	clicked: boolean;
}) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-3">
			{/* Heading */}
			<div
				className="h-3 w-28 rounded"
				style={{ backgroundColor: "hsl(270, 20%, 30%)" }}
			/>
			<div
				className="mb-1 h-2 w-36 rounded"
				style={{ backgroundColor: "hsl(270, 15%, 22%)" }}
			/>
			{/* Email field */}
			<div
				className="h-6 w-full rounded border px-2 text-[8px] leading-6"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				email@example.com
			</div>
			{/* Password field */}
			<div
				className="h-6 w-full rounded border px-2 text-[8px] leading-6"
				style={{
					borderColor: "hsl(270, 20%, 30%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				••••••••
			</div>
			{/* Sign Up button — cursor target */}
			<div
				className="mt-1 h-6 w-full rounded text-center text-[8px] font-semibold leading-6 text-white transition-all duration-200"
				style={{
					backgroundColor: clicked
						? "hsl(270, 95%, 55%)"
						: hovered
							? "hsl(270, 95%, 72%)"
							: "hsl(270, 95%, 65%)",
					transform: clicked ? "scale(0.96)" : hovered ? "scale(1.02)" : "none",
					boxShadow: hovered ? "0 0 12px hsl(270, 95%, 65% / 0.4)" : "none",
				}}
			>
				Sign Up
			</div>
			{/* Already have an account */}
			<p className="text-[7px]" style={{ color: "hsl(270, 60%, 60%)" }}>
				Already have an account? Sign in
			</p>
		</div>
	);
}

function VideoPricingMockup({ hoveredCard }: { hoveredCard: number }) {
	const cards = [
		{
			borderDefault: "hsl(270, 20%, 24%)",
			bgDefault: "hsl(270, 10%, 12%)",
			accent: "hsl(270, 60%, 50%)",
			btnBg: "hsl(270, 20%, 26%)",
		},
		{
			borderDefault: "hsl(270, 95%, 65%)",
			bgDefault: "hsl(270, 15%, 14%)",
			accent: "hsl(270, 95%, 65%)",
			btnBg: "hsl(270, 95%, 65%)",
		},
		{
			borderDefault: "hsl(270, 20%, 24%)",
			bgDefault: "hsl(270, 10%, 12%)",
			accent: "hsl(270, 40%, 45%)",
			btnBg: "hsl(270, 20%, 26%)",
		},
	];
	return (
		<div className="flex flex-1 flex-col gap-2 px-3 py-3">
			{/* Heading */}
			<div
				className="mx-auto h-3 w-24 rounded"
				style={{ backgroundColor: "hsl(270, 20%, 30%)" }}
			/>
			{/* Plan cards */}
			<div className="flex gap-2">
				{cards.map((card, idx) => {
					const isHovered = hoveredCard === idx;
					return (
						<div
							key={card.accent}
							className="flex flex-1 flex-col gap-1.5 rounded border p-2 transition-all duration-200"
							style={{
								borderColor: isHovered
									? "hsl(270, 95%, 65%)"
									: card.borderDefault,
								backgroundColor: isHovered
									? "hsl(270, 15%, 16%)"
									: card.bgDefault,
								transform: isHovered ? "scale(1.03)" : "none",
								boxShadow: isHovered
									? "0 0 14px hsl(270, 95%, 65% / 0.25)"
									: "none",
							}}
						>
							<div
								className="h-2 w-10 rounded"
								style={{
									backgroundColor:
										idx === 1 ? "hsl(270, 95%, 65%)" : "hsl(270, 20%, 32%)",
									opacity: idx === 1 ? 0.8 : 1,
								}}
							/>
							<div
								className="h-3 w-8 rounded"
								style={{ backgroundColor: card.accent }}
							/>
							<div
								className="h-2 w-12 rounded"
								style={{ backgroundColor: "hsl(270, 15%, 22%)" }}
							/>
							<div
								className="mt-1 h-4 w-full rounded"
								style={{ backgroundColor: card.btnBg }}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function VideoFeatureMockup({ scrollOffset }: { scrollOffset: number }) {
	// scrollOffset 0-1: simulates content scrolling up
	const translateY = scrollOffset * -28;
	return (
		<div className="flex flex-1 flex-col overflow-hidden px-3 py-2">
			{/* Feature blocks — scrolled via translateY */}
			<div
				className="flex flex-col gap-2"
				style={{ transform: `translateY(${translateY}px)` }}
			>
				{/* Hero image area */}
				<div
					className="h-10 w-full rounded"
					style={{ backgroundColor: "hsl(270, 15%, 16%)" }}
				/>
				{/* Feature row 1 */}
				<div className="flex items-start gap-2">
					<div
						className="h-5 w-5 shrink-0 rounded"
						style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.6 }}
					/>
					<div className="flex flex-1 flex-col gap-1">
						<div
							className="h-2 w-20 rounded"
							style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
						/>
						<div
							className="h-1.5 w-full rounded"
							style={{ backgroundColor: "hsl(270, 15%, 20%)" }}
						/>
					</div>
				</div>
				{/* Feature row 2 */}
				<div className="flex items-start gap-2">
					<div
						className="h-5 w-5 shrink-0 rounded"
						style={{ backgroundColor: "hsl(175, 90%, 50%)", opacity: 0.6 }}
					/>
					<div className="flex flex-1 flex-col gap-1">
						<div
							className="h-2 w-16 rounded"
							style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
						/>
						<div
							className="h-1.5 w-5/6 rounded"
							style={{ backgroundColor: "hsl(270, 15%, 20%)" }}
						/>
					</div>
				</div>
				{/* Feature row 3 */}
				<div className="flex items-start gap-2">
					<div
						className="h-5 w-5 shrink-0 rounded"
						style={{ backgroundColor: "hsl(35, 95%, 55%)", opacity: 0.6 }}
					/>
					<div className="flex flex-1 flex-col gap-1">
						<div
							className="h-2 w-24 rounded"
							style={{ backgroundColor: "hsl(270, 20%, 28%)" }}
						/>
						<div
							className="h-1.5 w-full rounded"
							style={{ backgroundColor: "hsl(270, 15%, 20%)" }}
						/>
					</div>
				</div>
				{/* Feature row 4 (appears as scrolled into view) */}
				<div className="flex items-start gap-2">
					<div
						className="h-5 w-5 shrink-0 rounded"
						style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.4 }}
					/>
					<div className="flex flex-1 flex-col gap-1">
						<div
							className="h-2 w-18 rounded"
							style={{ backgroundColor: "hsl(270, 20%, 24%)" }}
						/>
						<div
							className="h-1.5 w-4/5 rounded"
							style={{ backgroundColor: "hsl(270, 15%, 18%)" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function VideoCheckoutMockup({ cursorNearBack }: { cursorNearBack: boolean }) {
	return (
		<div className="flex flex-1 flex-col gap-2 px-3 py-2">
			{/* Back link — cursor target for abandonment */}
			<div className="flex items-center gap-1">
				<div
					className={`h-2 w-2 rounded transition-colors duration-200`}
					style={{
						backgroundColor: cursorNearBack
							? "hsl(270, 95%, 65%)"
							: "hsl(270, 20%, 30%)",
					}}
				/>
				<div
					className={`h-1.5 w-10 rounded transition-colors duration-200`}
					style={{
						backgroundColor: cursorNearBack
							? "hsl(270, 95%, 65%)"
							: "hsl(270, 20%, 26%)",
					}}
				/>
			</div>
			{/* Card number */}
			<div
				className="h-5 w-full rounded border px-2 text-[7px] leading-5"
				style={{
					borderColor: "hsl(270, 20%, 28%)",
					backgroundColor: "hsl(270, 10%, 12%)",
					color: "hsl(270, 30%, 50%)",
				}}
			>
				Card number
			</div>
			{/* Expiry + CVV */}
			<div className="grid grid-cols-2 gap-1.5">
				<div
					className="h-5 rounded border px-2 text-[7px] leading-5"
					style={{
						borderColor: "hsl(270, 20%, 28%)",
						backgroundColor: "hsl(270, 10%, 12%)",
						color: "hsl(270, 30%, 50%)",
					}}
				>
					MM/YY
				</div>
				<div
					className="h-5 rounded border px-2 text-[7px] leading-5"
					style={{
						borderColor: "hsl(270, 20%, 28%)",
						backgroundColor: "hsl(270, 10%, 12%)",
						color: "hsl(270, 30%, 50%)",
					}}
				>
					CVV
				</div>
			</div>
			{/* Complete Order button — dimmed (not clicked) */}
			<div
				className="h-5 w-full rounded text-center text-[7px] font-semibold leading-5 text-white"
				style={{ backgroundColor: "hsl(270, 30%, 40%)" }}
			>
				Complete Order
			</div>
		</div>
	);
}

// ─── Video Panel ─────────────────────────────────────────────────────────────

// Per-screen cursor positions: { x, y, action, time }
// Screens: 0-25 = sign-up, 25-50 = pricing, 50-75 = features, 75-100 = checkout
const CURSOR_PATH = [
	// Screen 1: Sign-up (0-25%)
	// Start at center, move to email field
	{ x: 50, y: 30, action: "move", time: 0 },
	// Hover over email field
	{ x: 50, y: 45, action: "move", time: 5 },
	// Move down to password field
	{ x: 50, y: 52, action: "move", time: 9 },
	// Move to Sign Up button, dwell, then click
	{ x: 50, y: 63, action: "move", time: 14 },
	{ x: 50, y: 63, action: "click", time: 20 },

	// Screen 2: Pricing (25-50%)
	// Move to first pricing card (left)
	{ x: 22, y: 55, action: "move", time: 26 },
	// Dwell on first card
	{ x: 22, y: 55, action: "move", time: 31 },
	// Move to middle/pro card
	{ x: 50, y: 55, action: "move", time: 35 },
	// Dwell then click pro card
	{ x: 50, y: 55, action: "click", time: 42 },

	// Screen 3: Features (50-75%)
	// Move into feature content area
	{ x: 45, y: 42, action: "move", time: 51 },
	// Scroll down through features
	{ x: 45, y: 55, action: "scroll", time: 58 },
	{ x: 45, y: 68, action: "scroll", time: 68 },

	// Screen 4: Checkout (75-100%)
	// Move to Complete Order area
	{ x: 50, y: 75, action: "move", time: 76 },
	// Dwell near order button
	{ x: 50, y: 75, action: "move", time: 82 },
	// Move to back link (abandonment)
	{ x: 15, y: 25, action: "move", time: 88 },
	// Click back link
	{ x: 15, y: 25, action: "click", time: 95 },
];

const VIDEO_MARKERS = [
	{ key: "marker1", position: 10 },
	{ key: "marker2", position: 35 },
	{ key: "marker3", position: 55 },
	{ key: "marker4", position: 80 },
];

function VideoPanel({ t }: { t: (key: string) => string }) {
	const [progress, setProgress] = useState(0); // 0-100
	const [cursorPos, setCursorPos] = useState({ x: 50, y: 30 });
	const [clickActive, setClickActive] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isTabVisible, setIsTabVisible] = useState(true);

	// Detect prefers-reduced-motion
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const handler = (e: MediaQueryListEvent) =>
			setPrefersReducedMotion(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	// Pause animation when browser tab is hidden
	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsTabVisible(!document.hidden);
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () =>
			document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, []);

	useEffect(() => {
		// Don't animate if reduced motion or tab is hidden
		if (prefersReducedMotion || !isTabVisible) return;

		let startTime: number | null = null;
		const LOOP_DURATION = 8000; // 8 seconds

		const tick = (ts: number) => {
			if (!startTime) startTime = ts;
			const elapsed = (ts - startTime) % LOOP_DURATION;
			const pct = (elapsed / LOOP_DURATION) * 100;
			setProgress(pct);

			// Update cursor position based on progress
			let pathIdx = 0;
			for (let i = 0; i < CURSOR_PATH.length; i++) {
				if (pct >= (CURSOR_PATH[i]?.time ?? 0)) pathIdx = i;
			}
			const current = CURSOR_PATH[pathIdx];
			const next = CURSOR_PATH[(pathIdx ?? 0) + 1];
			if (current && next) {
				const segPct = (pct - current.time) / (next.time - current.time);
				setCursorPos({
					x: current.x + (next.x - current.x) * segPct,
					y: current.y + (next.y - current.y) * segPct,
				});
				// Click flash at segment boundaries
				if (
					pct >= current.time &&
					pct < current.time + 2 &&
					current.action === "click"
				) {
					setClickActive(true);
					setTimeout(() => setClickActive(false), 200);
				}
			} else if (current) {
				setCursorPos({ x: current.x, y: current.y });
			}

			rafHandle = requestAnimationFrame(tick);
		};

		let rafHandle = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafHandle);
	}, [prefersReducedMotion, isTabVisible]);

	// Derive active screen (0-3) from progress
	const activeScreen = Math.min(3, Math.floor(progress / 25));

	// Scroll offset for features screen (progress 50-75 mapped to 0-1)
	const featureScrollOffset =
		activeScreen === 2 ? Math.max(0, (progress - 50) / 25) : 0;

	// Screen 1: Sign-up button interaction
	const signUpHovered = activeScreen === 0 && progress > 10;
	const signUpClicked = activeScreen === 0 && progress > 18 && progress < 25;

	// Screen 2: Which pricing card is cursor hovering (0=starter, 1=pro, -1=none)
	const pricingHoveredCard = activeScreen === 1 ? (progress < 33 ? 0 : 1) : -1;

	// Screen 4: Cursor near back link
	const cursorNearBack = activeScreen === 3 && progress > 85;

	return (
		<div className="space-y-6">
			<p className="text-[hsl(var(--muted-foreground))]">
				{t("featureShowcase.video.description")}
			</p>
			<AnimateOnScroll variant="fade-up">
				<div className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
					{/* Mock video player with animated mock webpage */}
					<div className="relative flex aspect-video items-stretch overflow-hidden bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--card))]">
						{/* Mock webpage */}
						<div
							className="relative flex flex-1 flex-col overflow-hidden"
							style={{ backgroundColor: "hsl(270, 12%, 9%)" }}
						>
							{/* Persistent nav bar — full width */}
							<VideoNavBar />

							{/* Constrained content area — keeps mockup proportionate on desktop */}
							<div className="relative mx-auto w-full max-w-sm flex-1">
								{/* Screen layers — crossfade via opacity */}
								{/* Screen 1: Sign-Up */}
								<div
									className="absolute inset-0 flex flex-col transition-opacity duration-300"
									style={{ opacity: activeScreen === 0 ? 1 : 0 }}
									aria-hidden={activeScreen !== 0}
								>
									<VideoSignUpMockup
										hovered={signUpHovered}
										clicked={signUpClicked}
									/>
								</div>

								{/* Screen 2: Pricing */}
								<div
									className="absolute inset-0 flex flex-col transition-opacity duration-300"
									style={{ opacity: activeScreen === 1 ? 1 : 0 }}
									aria-hidden={activeScreen !== 1}
								>
									<VideoPricingMockup hoveredCard={pricingHoveredCard} />
								</div>

								{/* Screen 3: Features */}
								<div
									className="absolute inset-0 flex flex-col overflow-hidden transition-opacity duration-300"
									style={{ opacity: activeScreen === 2 ? 1 : 0 }}
									aria-hidden={activeScreen !== 2}
								>
									<VideoFeatureMockup scrollOffset={featureScrollOffset} />
								</div>

								{/* Screen 4: Checkout */}
								<div
									className="absolute inset-0 flex flex-col transition-opacity duration-300"
									style={{ opacity: activeScreen === 3 ? 1 : 0 }}
									aria-hidden={activeScreen !== 3}
								>
									<VideoCheckoutMockup cursorNearBack={cursorNearBack} />
								</div>

								{/* Cursor — hidden when prefers-reduced-motion */}
								{!prefersReducedMotion && (
									<div
										className="pointer-events-none absolute z-10 transition-all duration-150 ease-out"
										style={{
											left: `${cursorPos.x}%`,
											top: `${cursorPos.y}%`,
											transform: "translate(-2px, -2px)",
										}}
									>
										{/* Arrow cursor SVG */}
										<svg
											width="16"
											height="20"
											viewBox="0 0 16 20"
											fill="none"
											className="drop-shadow-md"
											role="img"
											aria-label="cursor"
										>
											<title>cursor</title>
											<path
												d="M1 1L1 15L5 11L9 19L12 17.5L8 10L14 10L1 1Z"
												fill="white"
												stroke="hsl(270, 20%, 20%)"
												strokeWidth="1.2"
											/>
										</svg>
										{/* Click ripple */}
										{clickActive && (
											<div
												className="absolute left-1 top-1 h-5 w-5 animate-ping rounded-full"
												style={{ backgroundColor: "hsl(270, 95%, 65% / 0.5)" }}
											/>
										)}
									</div>
								)}
							</div>
						</div>
						{/* Duration badge */}
						<div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
							{t("featureShowcase.video.duration")}
						</div>
						{/* Session recorded badge */}
						<div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white">
							<span className="h-2 w-2 animate-soft-pulse rounded-full bg-white" />
							{t("featureShowcase.video.recordedBadge")}
						</div>
					</div>
					{/* Timeline bar */}
					<div className="relative border-t border-[hsl(var(--border))] px-4 py-3">
						<div className="relative h-2 rounded-full bg-[hsl(var(--muted))]">
							<div
								className="h-full rounded-full"
								style={{
									width: `${progress}%`,
									background:
										"linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))",
									transition: "width 0.05s linear",
								}}
							/>
							{/* Timeline markers — appear progressively */}
							{VIDEO_MARKERS.map((marker) => (
								<div
									key={marker.key}
									className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300"
									style={{
										left: `${marker.position}%`,
										borderColor:
											progress >= marker.position
												? "hsl(var(--primary))"
												: "hsl(var(--muted-foreground))",
										backgroundColor:
											progress >= marker.position
												? "hsl(var(--card))"
												: "hsl(var(--muted))",
										opacity: progress >= marker.position - 5 ? 1 : 0.3,
									}}
								/>
							))}
						</div>
					</div>
					{/* Timeline events list — highlight current */}
					<div className="grid gap-2 border-t border-[hsl(var(--border))] px-4 py-3 sm:grid-cols-2">
						{VIDEO_MARKERS.map((marker, idx) => {
							const isActive =
								progress >= marker.position &&
								(idx === VIDEO_MARKERS.length - 1 ||
									progress < (VIDEO_MARKERS[idx + 1]?.position ?? 100));
							return (
								<div
									key={marker.key}
									className={`flex items-start gap-2 rounded px-2 py-1 text-xs transition-colors duration-200 ${
										isActive
											? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
											: ""
									}`}
								>
									<MousePointerClick
										className={`mt-0.5 h-3 w-3 shrink-0 ${
											isActive
												? "text-[hsl(var(--primary))]"
												: "text-[hsl(var(--muted-foreground))]"
										}`}
									/>
									<span
										className={
											isActive
												? "text-[hsl(var(--primary))]"
												: "text-[hsl(var(--muted-foreground))]"
										}
									>
										{t(`featureShowcase.video.${marker.key}`)}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</AnimateOnScroll>
		</div>
	);
}

// ─── Persona Review Panel ─────────────────────────────────────────────────────

type Severity = "pass" | "warning" | "fail";

function SeverityIcon({ severity }: { severity: Severity }) {
	if (severity === "pass") {
		return <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />;
	}
	if (severity === "warning") {
		return <CircleAlert className="h-3.5 w-3.5 shrink-0 text-amber-400" />;
	}
	return <XCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />;
}

function severityColor(severity: Severity): string {
	if (severity === "pass") return "text-emerald-400";
	if (severity === "warning") return "text-amber-400";
	return "text-red-400";
}

type PersonaFindings = Record<string, { severity: Severity; text: string }>;

function PersonaReviewPanel({ t }: { t: (key: string) => string }) {
	const personas = [
		{
			key: "persona1",
			accentColor: "hsl(270, 95%, 65%)",
			icon: "A",
			findingKeys: ["usability", "navigation", "helpText", "onboarding"],
		},
		{
			key: "persona2",
			accentColor: "hsl(175, 90%, 50%)",
			icon: "C",
			findingKeys: ["efficiency", "bulkActions", "search", "customization"],
		},
		{
			key: "persona3",
			accentColor: "hsl(35, 95%, 55%)",
			icon: "M",
			findingKeys: ["ariaLabels", "contrast", "keyboard", "screenReader"],
		},
	];

	// Build findings from i18n — severity embedded in the key structure
	const getFindings = (
		personaKey: string,
		findingKeys: string[],
	): PersonaFindings => {
		const findings: PersonaFindings = {};
		for (const fk of findingKeys) {
			findings[fk] = {
				severity: t(
					`featureShowcase.personaReview.${personaKey}.findings.${fk}.severity`,
				) as Severity,
				text: t(
					`featureShowcase.personaReview.${personaKey}.findings.${fk}.text`,
				),
			};
		}
		return findings;
	};

	return (
		<div className="space-y-6">
			<p className="text-[hsl(var(--muted-foreground))]">
				{t("featureShowcase.personaReview.description")}
			</p>
			<div className="grid gap-4 sm:grid-cols-3">
				{personas.map((persona, idx) => {
					const findings = getFindings(persona.key, persona.findingKeys);
					return (
						<AnimateOnScroll
							key={persona.key}
							variant="fade-up"
							delay={idx * 150}
						>
							<div className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
								{/* Persona header */}
								<div className="mb-4 flex items-center gap-3">
									<div
										className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
										style={{ backgroundColor: persona.accentColor }}
									>
										{persona.icon}
									</div>
									<div>
										<p className="text-sm font-semibold text-[hsl(var(--foreground))]">
											{t(`featureShowcase.personaReview.${persona.key}.name`)}
										</p>
										<p className="text-xs text-[hsl(var(--muted-foreground))]">
											{t(`featureShowcase.personaReview.${persona.key}.type`)}
										</p>
									</div>
								</div>
								{/* NPS Score */}
								<div className="mb-4 flex items-center justify-between rounded-lg bg-[hsl(var(--muted)/0.5)] px-3 py-2">
									<span className="text-xs text-[hsl(var(--muted-foreground))]">
										{t("featureShowcase.personaReview.npsLabel")}
									</span>
									<div className="flex items-center gap-1">
										<Star
											className="h-3.5 w-3.5"
											style={{ color: persona.accentColor }}
										/>
										<span className="text-sm font-bold text-[hsl(var(--foreground))]">
											{t(`featureShowcase.personaReview.${persona.key}.nps`)}
										</span>
									</div>
								</div>
								{/* Analysis findings */}
								<div className="mb-4 space-y-2">
									{persona.findingKeys.map((fk) => {
										const finding = findings[fk];
										if (!finding) return null;
										return (
											<div key={fk} className="flex items-start gap-2">
												<SeverityIcon severity={finding.severity} />
												<div className="min-w-0 flex-1">
													<p
														className={`text-[10px] font-medium ${severityColor(finding.severity)}`}
													>
														{t(
															`featureShowcase.personaReview.categoryLabels.${fk}`,
														)}
													</p>
													<p className="text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">
														{finding.text}
													</p>
												</div>
											</div>
										);
									})}
								</div>
								{/* Summary quote */}
								<div
									className="relative rounded-lg border-l-2 bg-[hsl(var(--muted)/0.3)] px-3 py-2"
									style={{ borderColor: persona.accentColor }}
								>
									<MessageSquare className="mb-1 h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
									<p className="text-xs italic leading-relaxed text-[hsl(var(--muted-foreground))]">
										{t(`featureShowcase.personaReview.${persona.key}.quote`)}
									</p>
								</div>
							</div>
						</AnimateOnScroll>
					);
				})}
			</div>
		</div>
	);
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function FeatureShowcaseSection() {
	const t = useTranslations("marketing.home");

	return (
		<SectionLayout>
			<AnimateOnScroll variant="fade-in">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
						{t("featureShowcase.heading")}
					</h2>
					<p className="mx-auto max-w-2xl text-[hsl(var(--muted-foreground))]">
						{t("featureShowcase.subheading")}
					</p>
				</div>
			</AnimateOnScroll>

			<Tabs.Root defaultValue="screenshots" className="w-full">
				<AnimateOnScroll variant="fade-in">
					<Tabs.List
						className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4"
						aria-label={t("featureShowcase.tabsLabel")}
					>
						<Tabs.Trigger
							value="screenshots"
							className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-all data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))]"
						>
							<Camera className="h-4 w-4" />
							<span className="hidden sm:inline">
								{t("featureShowcase.tabs.screenshots")}
							</span>
							<span className="sm:hidden">
								{t("featureShowcase.tabs.screenshotsShort")}
							</span>
						</Tabs.Trigger>
						<Tabs.Trigger
							value="video"
							className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-all data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))]"
						>
							<Video className="h-4 w-4" />
							<span className="hidden sm:inline">
								{t("featureShowcase.tabs.video")}
							</span>
							<span className="sm:hidden">
								{t("featureShowcase.tabs.videoShort")}
							</span>
						</Tabs.Trigger>
						<Tabs.Trigger
							value="persona"
							className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-all data-[state=active]:border-[hsl(var(--primary))] data-[state=active]:bg-[hsl(var(--primary)/0.1)] data-[state=active]:text-[hsl(var(--primary))]"
						>
							<Star className="h-4 w-4" />
							<span className="hidden sm:inline">
								{t("featureShowcase.tabs.persona")}
							</span>
							<span className="sm:hidden">
								{t("featureShowcase.tabs.personaShort")}
							</span>
						</Tabs.Trigger>
					</Tabs.List>
				</AnimateOnScroll>

				<div className="relative">
					<Tabs.Content
						value="screenshots"
						forceMount
						className="transition-opacity duration-300 ease-out data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-x-0 data-[state=inactive]:top-0 data-[state=inactive]:opacity-0"
					>
						<ScreenshotPanel t={t} />
					</Tabs.Content>
					<Tabs.Content
						value="video"
						forceMount
						className="transition-opacity duration-300 ease-out data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-x-0 data-[state=inactive]:top-0 data-[state=inactive]:opacity-0"
					>
						<VideoPanel t={t} />
					</Tabs.Content>
					<Tabs.Content
						value="persona"
						forceMount
						className="transition-opacity duration-300 ease-out data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-x-0 data-[state=inactive]:top-0 data-[state=inactive]:opacity-0"
					>
						<PersonaReviewPanel t={t} />
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</SectionLayout>
	);
}
