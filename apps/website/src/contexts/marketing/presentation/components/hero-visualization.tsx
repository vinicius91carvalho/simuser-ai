"use client";

import { useEffect, useRef, useState } from "react";

// Phase timing configuration — total loop ~20s
const PHASES = [
	{ id: 1, name: "URL Input", duration: 3500 },
	{ id: 2, name: "Discovery", duration: 4000 },
	{ id: 3, name: "Personas", duration: 4500 },
	{ id: 4, name: "Recording", duration: 3500 },
	{ id: 5, name: "Experience Report", duration: 4500 },
] as const;

type PhaseId = (typeof PHASES)[number]["id"];

// Phase labels for aria-live announcements
const PHASE_LABELS: Record<PhaseId, string> = {
	1: "Phase 1: Entering URL to analyze",
	2: "Phase 2: Discovering your application flows",
	3: "Phase 3: AI personas testing your app",
	4: "Phase 4: Recording user sessions",
	5: "Phase 5: Experience report ready",
};

// ─── Phase 1: URL Input ───────────────────────────────────────────────────────

function Phase1UrlInput({ active }: { active: boolean }) {
	const TARGET_URL = "checkout.myapp.com";
	const [typedChars, setTypedChars] = useState(0);
	const [showSpinner, setShowSpinner] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	useEffect(() => {
		if (!active) {
			setTypedChars(0);
			setShowSpinner(false);
			setButtonClicked(false);
			return;
		}
		let i = 0;
		const typeInterval = setInterval(() => {
			i++;
			setTypedChars(i);
			if (i >= TARGET_URL.length) {
				clearInterval(typeInterval);
				setTimeout(() => {
					setButtonClicked(true);
					setTimeout(() => setShowSpinner(true), 400);
				}, 600);
			}
		}, 80);
		return () => clearInterval(typeInterval);
	}, [active]);

	return (
		<div className="flex h-full flex-col items-center justify-center gap-3 px-4 sm:gap-4 sm:px-8">
			<p
				className="text-[10px] font-semibold uppercase tracking-widest sm:text-xs"
				style={{ color: "hsl(270, 60%, 70%)" }}
			>
				Enter URL to Analyze
			</p>
			{/* URL Input field */}
			<div className="w-full max-w-[14rem] sm:max-w-xs">
				<div
					className="flex items-center gap-2 rounded-lg border px-3 py-2.5 sm:px-4 sm:py-3"
					style={{
						borderColor: "hsl(270, 95%, 65%)",
						backgroundColor: "hsl(270, 10%, 10%)",
					}}
				>
					<span
						className="font-mono text-xs sm:text-sm"
						style={{ color: "hsl(270, 90%, 80%)" }}
					>
						{TARGET_URL.slice(0, typedChars)}
					</span>
					<span
						className="animate-typing-cursor h-3.5 w-0.5 sm:h-4"
						style={{ backgroundColor: "hsl(270, 95%, 65%)" }}
					/>
				</div>
			</div>
			{/* Analyze button — min 44px tap target height */}
			<button
				type="button"
				className="min-h-[44px] rounded-lg px-5 py-2 text-xs font-semibold text-white sm:min-h-0 sm:px-6 sm:py-2.5 sm:text-sm"
				style={{
					backgroundColor: "hsl(270, 95%, 65%)",
					transform: buttonClicked ? "scale(0.95)" : "scale(1)",
					transition: "transform 0.15s ease",
				}}
				aria-label="Analyze URL"
			>
				{showSpinner ? (
					<span className="flex items-center gap-2">
						<span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
						Analyzing…
					</span>
				) : (
					"Analyze"
				)}
			</button>
			<p
				className="text-[10px] sm:text-xs"
				style={{ color: "hsl(270, 30%, 55%)" }}
			>
				Powered by SimUser AI
			</p>
		</div>
	);
}

// ─── Phase 2: Discovery ───────────────────────────────────────────────────────

const FLOW_NODES = [
	"Login Page",
	"Dashboard",
	"Checkout",
	"Settings",
	"Profile",
	"API Endpoints",
	"Error Pages",
	"Mobile Views",
];

// Node positions for full 8-node layout (desktop)
const NODE_POSITIONS_FULL = [
	{ x: 8, y: 8 },
	{ x: 52, y: 8 },
	{ x: 8, y: 30 },
	{ x: 52, y: 30 },
	{ x: 8, y: 52 },
	{ x: 52, y: 52 },
	{ x: 8, y: 74 },
	{ x: 52, y: 74 },
];

// Node positions for 4-node layout (mobile)
const NODE_POSITIONS_MOBILE = [
	{ x: 8, y: 15 },
	{ x: 52, y: 15 },
	{ x: 8, y: 55 },
	{ x: 52, y: 55 },
];

function Phase2Discovery({
	active,
	isMobile,
	isTablet,
}: {
	active: boolean;
	isMobile: boolean;
	isTablet: boolean;
}) {
	// Mobile shows 4 nodes, tablet shows 6, desktop shows 8
	const maxNodes = isMobile ? 4 : isTablet ? 6 : FLOW_NODES.length;
	const [visibleNodes, setVisibleNodes] = useState(0);

	useEffect(() => {
		if (!active) {
			setVisibleNodes(0);
			return;
		}
		let i = 0;
		const interval = setInterval(() => {
			i++;
			setVisibleNodes(i);
			if (i >= maxNodes) clearInterval(interval);
		}, 380);
		return () => clearInterval(interval);
	}, [active, maxNodes]);

	const nodePositions = isMobile ? NODE_POSITIONS_MOBILE : NODE_POSITIONS_FULL;
	// For tablet, use first 6 of full positions
	const activePositions =
		isTablet && !isMobile ? NODE_POSITIONS_FULL.slice(0, 6) : nodePositions;

	return (
		<div className="flex h-full flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
			{/* Counter */}
			<div
				className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[10px] sm:text-xs"
				style={{
					backgroundColor: "hsl(175, 10%, 12%)",
					color: "hsl(175, 80%, 60%)",
				}}
			>
				<span className="font-semibold">Discovering flows…</span>
				<span
					className="font-mono font-bold"
					style={{ color: "hsl(175, 90%, 50%)" }}
				>
					{visibleNodes}/{maxNodes} found
				</span>
			</div>
			{/* Flow nodes grid */}
			<div className="relative min-h-0 flex-1">
				<svg
					viewBox="0 0 100 92"
					className="h-full w-full"
					role="img"
					aria-labelledby="phase2-title"
				>
					<title id="phase2-title">
						Discovery: {visibleNodes} of {maxNodes} flows found
					</title>
					{/* Nodes */}
					{FLOW_NODES.slice(0, maxNodes).map((node, idx) => {
						const pos = activePositions[idx];
						if (!pos) return null;
						return (
							<g
								key={node}
								style={{
									opacity: idx < visibleNodes ? 1 : 0,
									transform:
										idx < visibleNodes ? "translateY(0)" : "translateY(4px)",
									transition: "opacity 0.4s ease, transform 0.4s ease",
								}}
							>
								<rect
									x={pos.x}
									y={pos.y}
									width="36"
									height="12"
									rx="2"
									fill="hsl(175, 90%, 50%)"
									fillOpacity="0.12"
									stroke="hsl(175, 90%, 50%)"
									strokeWidth="0.5"
								/>
								<text
									x={pos.x + 18}
									y={pos.y + 8}
									textAnchor="middle"
									fill="hsl(175, 80%, 65%)"
									fontSize="4"
									fontWeight="500"
								>
									{node}
								</text>
							</g>
						);
					})}
				</svg>
			</div>
		</div>
	);
}

// ─── Phase 3: Personas ────────────────────────────────────────────────────────

const PERSONAS = [
	{
		name: "Sarah",
		type: "New User",
		color: "hsl(270, 95%, 65%)",
		initials: "S",
	},
	{
		name: "Marcus",
		type: "Power User",
		color: "hsl(175, 90%, 50%)",
		initials: "M",
	},
	{
		name: "Alex",
		type: "Security Eng",
		color: "hsl(35, 95%, 55%)",
		initials: "A",
	},
];

function Phase3Personas({
	active,
	isMobile,
}: {
	active: boolean;
	isMobile: boolean;
}) {
	// Mobile: show 2 personas, desktop: all 3
	const maxPersonas = isMobile ? 2 : PERSONAS.length;
	const [visiblePersonas, setVisiblePersonas] = useState(0);
	const [notification, setNotification] = useState<string | null>(null);

	useEffect(() => {
		if (!active) {
			setVisiblePersonas(0);
			setNotification(null);
			return;
		}
		const t1 = setTimeout(() => setVisiblePersonas(1), 300);
		const t2 = setTimeout(() => setVisiblePersonas(2), 900);
		const t3 = !isMobile ? setTimeout(() => setVisiblePersonas(3), 1500) : null;
		const t4 = setTimeout(() => {
			setNotification("Screenshot captured");
		}, 2200);
		const t5 = setTimeout(() => {
			setNotification("Bug found: missing alt text");
		}, 3200);
		const t6 = setTimeout(() => setNotification(null), 4000);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			if (t3) clearTimeout(t3);
			clearTimeout(t4);
			clearTimeout(t5);
			clearTimeout(t6);
		};
	}, [active, isMobile]);

	return (
		<div className="relative flex h-full flex-col gap-2 px-3 py-2 sm:px-4 sm:py-3">
			{/* Notification toast — always rendered, opacity/transform controlled for smooth transition */}
			<div
				className="absolute right-3 top-2 z-20 rounded-lg px-2.5 py-1 text-[10px] font-medium text-white shadow-lg sm:right-4 sm:top-3 sm:text-xs"
				style={{
					backgroundColor: notification?.includes("Bug")
						? "hsl(0, 80%, 45%)"
						: "hsl(145, 60%, 35%)",
					opacity: notification ? 1 : 0,
					transform: notification ? "translateY(0)" : "translateY(-4px)",
					transition: "opacity 0.3s ease, transform 0.3s ease",
					pointerEvents: notification ? "auto" : "none",
				}}
			>
				{notification || ""}
			</div>
			<p
				className="text-[10px] font-semibold sm:text-xs"
				style={{ color: "hsl(270, 60%, 70%)" }}
			>
				AI Personas Testing Your App
			</p>
			<div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
				{PERSONAS.slice(0, Math.min(visiblePersonas, maxPersonas)).map(
					(persona) => (
						<div
							key={persona.name}
							className="animate-slide-in-right flex items-center gap-2 rounded-lg border px-2.5 py-1.5 sm:gap-3 sm:px-3 sm:py-2"
							style={{
								borderColor: persona.color,
								backgroundColor: "hsl(270, 10%, 10%)",
							}}
						>
							<div
								className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8"
								style={{ backgroundColor: persona.color }}
							>
								{persona.initials}
							</div>
							<div>
								<p className="text-xs font-semibold text-white sm:text-sm">
									{persona.name}
								</p>
								<p
									className="text-[10px]"
									style={{ color: "hsl(270, 30%, 60%)" }}
								>
									{persona.type}
								</p>
							</div>
							<div
								className="ml-auto h-1.5 w-1.5 animate-soft-pulse rounded-full"
								style={{ backgroundColor: persona.color }}
							/>
						</div>
					),
				)}
			</div>
			{/* Mock browser interactions */}
			<div
				className="rounded-lg border p-1.5 text-[9px] sm:p-2 sm:text-[10px]"
				style={{
					borderColor: "hsl(270, 20%, 25%)",
					backgroundColor: "hsl(270, 10%, 8%)",
					color: "hsl(270, 30%, 55%)",
				}}
			>
				<div className="flex gap-1">
					<span className="font-mono">→</span>
					<span>Clicking elements, taking screenshots…</span>
				</div>
			</div>
		</div>
	);
}

// ─── Phase 4: Recording ───────────────────────────────────────────────────────

function Phase4Recording({
	active,
	isMobile,
}: {
	active: boolean;
	isMobile: boolean;
}) {
	const [timelineProgress, setTimelineProgress] = useState(0);

	const TIMELINE_EVENTS = [
		{ label: "Click", position: 15 },
		{ label: "Navigate", position: 40 },
		{ label: "Scroll", position: 62 },
		{ label: "Error", position: 85 },
	];

	useEffect(() => {
		if (!active) {
			setTimelineProgress(0);
			return;
		}
		const start = Date.now();
		const duration = 3200;
		const animate = (handle: { id: number }) => {
			const elapsed = Date.now() - start;
			const pct = Math.min((elapsed / duration) * 100, 100);
			setTimelineProgress(pct);
			if (pct < 100) {
				handle.id = requestAnimationFrame(() => animate(handle));
			}
		};
		const handle = { id: 0 };
		handle.id = requestAnimationFrame(() => animate(handle));
		return () => cancelAnimationFrame(handle.id);
	}, [active]);

	return (
		<div className="flex h-full flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
			{/* Video player mock */}
			<div
				className="relative flex-1 rounded-lg border"
				style={{
					borderColor: "hsl(270, 20%, 25%)",
					backgroundColor: "hsl(270, 10%, 8%)",
				}}
			>
				{/* REC badge */}
				<div
					className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:gap-1.5 sm:px-2 sm:text-xs"
					style={{ backgroundColor: "hsl(0, 80%, 45%)" }}
				>
					<span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-white sm:h-2 sm:w-2" />
					REC
				</div>
				{/* Mock webpage inside video frame */}
				<div className="absolute inset-x-3 inset-y-8 flex flex-col gap-1 overflow-hidden sm:inset-x-4 sm:inset-y-10 sm:gap-1.5">
					{/* Nav bar mock */}
					<div
						className="flex h-3.5 items-center gap-2 rounded px-2 sm:h-4"
						style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
					>
						<div
							className="h-2 w-10 rounded sm:w-12"
							style={{ backgroundColor: "hsl(270, 95%, 65%)", opacity: 0.6 }}
						/>
						<div
							className="h-2 w-5 rounded sm:w-6"
							style={{ backgroundColor: "hsl(270, 30%, 40%)" }}
						/>
						<div
							className="h-2 w-5 rounded sm:w-6"
							style={{ backgroundColor: "hsl(270, 30%, 40%)" }}
						/>
					</div>
					{/* Content blocks */}
					<div className="flex gap-1.5">
						<div
							className="h-7 w-10 rounded sm:h-8 sm:w-12"
							style={{ backgroundColor: "hsl(270, 20%, 15%)" }}
						/>
						<div className="flex flex-1 flex-col gap-1">
							<div
								className="h-2 w-full rounded"
								style={{ backgroundColor: "hsl(270, 20%, 20%)" }}
							/>
							<div
								className="h-2 w-3/4 rounded"
								style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
							/>
						</div>
					</div>
					<div className="flex gap-1.5">
						<div
							className="h-7 w-10 rounded sm:h-8 sm:w-12"
							style={{ backgroundColor: "hsl(175, 20%, 15%)" }}
						/>
						<div className="flex flex-1 flex-col gap-1">
							<div
								className="h-2 w-full rounded"
								style={{ backgroundColor: "hsl(175, 20%, 20%)" }}
							/>
							<div
								className="h-2 w-2/3 rounded"
								style={{ backgroundColor: "hsl(175, 20%, 18%)" }}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Timeline — hidden on mobile for simplicity, shown on tablet+ */}
			{!isMobile && (
				<div className="space-y-1.5">
					<div
						className="relative h-2.5 w-full overflow-visible rounded-full"
						style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
					>
						<div
							className="h-full rounded-full"
							style={{
								width: `${timelineProgress}%`,
								background:
									"linear-gradient(to right, hsl(270, 95%, 65%), hsl(175, 90%, 50%))",
								transition: "width 0.05s linear",
							}}
						/>
						{/* Marker dots on timeline */}
						{TIMELINE_EVENTS.map((ev) => (
							<div
								key={ev.label}
								className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 transition-all duration-300"
								style={{
									left: `${ev.position}%`,
									backgroundColor:
										timelineProgress >= ev.position
											? "hsl(270, 95%, 65%)"
											: "hsl(270, 20%, 25%)",
									opacity: timelineProgress >= ev.position - 5 ? 1 : 0.3,
								}}
							>
								{timelineProgress >= ev.position && (
									<span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] text-white/80">
										{ev.label}
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			)}
			{/* Progress bar on mobile (simpler) */}
			{isMobile && (
				<div
					className="h-2 w-full overflow-hidden rounded-full"
					style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
				>
					<div
						className="h-full rounded-full"
						style={{
							width: `${timelineProgress}%`,
							background:
								"linear-gradient(to right, hsl(270, 95%, 65%), hsl(175, 90%, 50%))",
							transition: "width 0.05s linear",
						}}
					/>
				</div>
			)}
		</div>
	);
}

// ─── Phase 5: Experience Report ───────────────────────────────────────────────

function Phase5Report({
	active,
	isMobile,
}: {
	active: boolean;
	isMobile: boolean;
}) {
	const [npsValue, setNpsValue] = useState(0);
	const [showGrade, setShowGrade] = useState(false);
	const [visibleQuotes, setVisibleQuotes] = useState(0);
	const [visibleChecks, setVisibleChecks] = useState(0);

	const CHECKS = [
		{ label: "Accessibility", status: "Pass", color: "hsl(145, 70%, 45%)" },
		{
			label: "Performance: 2.1s LCP",
			status: "Pass",
			color: "hsl(145, 70%, 45%)",
		},
		{
			label: "Security: No issues",
			status: "Pass",
			color: "hsl(145, 70%, 45%)",
		},
		{
			label: "Mobile: 2 bugs found",
			status: "Warn",
			color: "hsl(35, 95%, 55%)",
		},
	];

	const QUOTES = [
		{
			text: '"Onboarding needs a guided tour."',
			persona: "Ana",
			color: "hsl(270, 95%, 65%)",
		},
		{
			text: '"Bulk actions are buried too deep."',
			persona: "Carlos",
			color: "hsl(175, 90%, 50%)",
		},
	];

	useEffect(() => {
		if (!active) {
			setNpsValue(0);
			setShowGrade(false);
			setVisibleQuotes(0);
			setVisibleChecks(0);
			return;
		}
		const start = Date.now();
		const npsTarget = 7.2;
		const npsDuration = 1400;
		const animateNps = (handle: { id: number }) => {
			const elapsed = Date.now() - start;
			const pct = Math.min(elapsed / npsDuration, 1);
			setNpsValue(Math.round(npsTarget * pct * 10) / 10);
			if (pct < 1) {
				handle.id = requestAnimationFrame(() => animateNps(handle));
			} else {
				setNpsValue(npsTarget);
			}
		};
		const handle = { id: 0 };
		handle.id = requestAnimationFrame(() => animateNps(handle));

		const t1 = setTimeout(() => setShowGrade(true), 1600);
		// On mobile: skip quotes to save space, just show checks
		const t2 = !isMobile ? setTimeout(() => setVisibleQuotes(1), 2100) : null;
		const t3 = !isMobile ? setTimeout(() => setVisibleQuotes(2), 2700) : null;
		const t4 = setTimeout(() => setVisibleChecks(1), isMobile ? 2000 : 3000);
		const t5 = setTimeout(() => setVisibleChecks(2), isMobile ? 2400 : 3300);
		const t6 = setTimeout(() => setVisibleChecks(3), isMobile ? 2800 : 3600);
		const t7 = setTimeout(() => setVisibleChecks(4), isMobile ? 3200 : 3900);

		return () => {
			cancelAnimationFrame(handle.id);
			clearTimeout(t1);
			if (t2) clearTimeout(t2);
			if (t3) clearTimeout(t3);
			clearTimeout(t4);
			clearTimeout(t5);
			clearTimeout(t6);
			clearTimeout(t7);
		};
	}, [active, isMobile]);

	return (
		<div className="flex h-full flex-col gap-2 overflow-hidden px-3 py-2 sm:gap-2.5 sm:px-4 sm:py-3">
			<div className="flex items-center justify-between">
				<p className="text-[10px] font-bold text-white sm:text-xs">
					Experience Report
				</p>
				<p
					className="text-[9px] sm:text-[10px]"
					style={{ color: "hsl(270, 30%, 55%)" }}
				>
					2026-03-15
				</p>
			</div>
			{/* NPS gauge */}
			<div
				className="rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2"
				style={{ backgroundColor: "hsl(270, 10%, 10%)" }}
			>
				<div className="mb-1.5 flex items-center justify-between">
					<span
						className="text-[10px] sm:text-xs"
						style={{ color: "hsl(270, 30%, 60%)" }}
					>
						NPS Score
					</span>
					<span
						className="font-mono text-xs font-bold sm:text-sm"
						style={{ color: "hsl(270, 95%, 65%)" }}
					>
						{npsValue.toFixed(1)}
					</span>
				</div>
				<div
					className="relative h-2 overflow-hidden rounded-full"
					style={{ backgroundColor: "hsl(270, 20%, 18%)" }}
				>
					<div
						className="h-full rounded-full"
						style={{
							width: `${(npsValue / 10) * 100}%`,
							background:
								"linear-gradient(to right, hsl(270, 95%, 65%), hsl(175, 90%, 50%))",
							transition: "width 0.05s linear",
						}}
					/>
				</div>
			</div>
			{/* Grade badge */}
			{showGrade && (
				<div className="animate-scale-up flex items-center gap-2">
					<div
						className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white sm:h-10 sm:w-10 sm:text-base"
						style={{ backgroundColor: "hsl(35, 95%, 55%)" }}
					>
						B+
					</div>
					<div>
						<p className="text-[10px] font-semibold text-white sm:text-xs">
							Overall Grade
						</p>
						<p
							className="text-[9px] sm:text-[10px]"
							style={{ color: "hsl(270, 30%, 55%)" }}
						>
							Based on 7 personas
						</p>
					</div>
				</div>
			)}
			{/* Quotes — hidden on mobile to save space */}
			{!isMobile && (
				<div className="flex flex-col gap-1.5">
					{QUOTES.slice(0, visibleQuotes).map((q) => (
						<div
							key={q.persona}
							className="animate-slide-in-right rounded border-l-2 px-2 py-1 text-[10px] italic"
							style={{
								borderColor: q.color,
								backgroundColor: "hsl(270, 10%, 10%)",
								color: "hsl(270, 40%, 65%)",
							}}
						>
							{q.text}
						</div>
					))}
				</div>
			)}
			{/* Checklist */}
			<div className="flex flex-col gap-1">
				{CHECKS.slice(0, visibleChecks).map((check) => (
					<div
						key={check.label}
						className="flex items-center gap-1.5 text-[9px] sm:text-[10px]"
					>
						<span style={{ color: check.color }}>✓</span>
						<span className="text-white/80">{check.label}</span>
						<span
							className="ml-auto font-semibold"
							style={{ color: check.color }}
						>
							{check.status}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── Reduced-Motion Static View ───────────────────────────────────────────────

function ReducedMotionView() {
	return (
		<div className="flex h-full w-full flex-col items-stretch justify-center gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
			{/* Left: URL + Discovery snapshot */}
			<div className="flex flex-1 flex-col gap-2">
				<div
					className="rounded-lg border px-3 py-2 text-[10px]"
					style={{
						borderColor: "hsl(270, 95%, 65%)",
						backgroundColor: "hsl(270, 10%, 10%)",
					}}
				>
					<p
						className="mb-1 font-semibold"
						style={{ color: "hsl(270, 60%, 70%)" }}
					>
						1. URL Input
					</p>
					<p className="font-mono" style={{ color: "hsl(270, 90%, 80%)" }}>
						checkout.myapp.com
					</p>
				</div>
				<div
					className="rounded-lg border px-3 py-2 text-[10px]"
					style={{
						borderColor: "hsl(175, 90%, 50%)",
						backgroundColor: "hsl(175, 10%, 10%)",
					}}
				>
					<p
						className="mb-1 font-semibold"
						style={{ color: "hsl(175, 80%, 60%)" }}
					>
						2. Discovery
					</p>
					<p style={{ color: "hsl(175, 50%, 60%)" }}>8 flows found</p>
				</div>
			</div>
			{/* Center: Personas */}
			<div className="flex flex-1 flex-col gap-1.5">
				<p
					className="text-[10px] font-semibold"
					style={{ color: "hsl(270, 60%, 70%)" }}
				>
					3. Personas Testing
				</p>
				{[
					{ initials: "S", color: "hsl(270, 95%, 65%)", name: "Sarah" },
					{ initials: "M", color: "hsl(175, 90%, 50%)", name: "Marcus" },
					{ initials: "A", color: "hsl(35, 95%, 55%)", name: "Alex" },
				].map((p) => (
					<div key={p.name} className="flex items-center gap-2">
						<div
							className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
							style={{ backgroundColor: p.color }}
						>
							{p.initials}
						</div>
						<span className="text-[10px] text-white/70">{p.name}</span>
					</div>
				))}
			</div>
			{/* Right: Report card */}
			<div
				className="flex flex-1 flex-col gap-1.5 rounded-lg border px-3 py-2 text-[10px]"
				style={{
					borderColor: "hsl(270, 20%, 25%)",
					backgroundColor: "hsl(270, 10%, 10%)",
				}}
			>
				<p className="font-semibold text-white">5. Experience Report</p>
				<div className="flex items-center justify-between">
					<span style={{ color: "hsl(270, 30%, 60%)" }}>NPS</span>
					<span
						className="font-mono font-bold"
						style={{ color: "hsl(270, 95%, 65%)" }}
					>
						7.2
					</span>
				</div>
				<div className="flex items-center gap-2">
					<div
						className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
						style={{ backgroundColor: "hsl(35, 95%, 55%)" }}
					>
						B+
					</div>
					<span className="text-white/70">Overall Grade</span>
				</div>
			</div>
		</div>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HeroVisualization() {
	const [phase, setPhase] = useState<number>(0); // 0-indexed
	const [transitioning, setTransitioning] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	// Responsive breakpoint detection
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	// Detect prefers-reduced-motion
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
		const handler = (e: MediaQueryListEvent) =>
			setPrefersReducedMotion(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	// Detect responsive breakpoints
	useEffect(() => {
		const checkBreakpoints = () => {
			const w = window.innerWidth;
			setIsMobile(w < 640);
			setIsTablet(w >= 640 && w < 1024);
		};
		checkBreakpoints();
		window.addEventListener("resize", checkBreakpoints);
		return () => window.removeEventListener("resize", checkBreakpoints);
	}, []);

	// Intersection Observer — pause animation when not visible
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry?.isIntersecting ?? false),
			{ threshold: 0.1 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Phase cycling — only advance when visible and not reduced-motion
	useEffect(() => {
		if (!isVisible || prefersReducedMotion) return;
		const phaseDuration = PHASES[phase]?.duration ?? 4000;
		const timer = setTimeout(() => {
			setTransitioning(true);
			setTimeout(() => {
				setPhase((prev) => (prev + 1) % PHASES.length);
				setTransitioning(false);
			}, 500);
		}, phaseDuration);
		return () => clearTimeout(timer);
	}, [phase, isVisible, prefersReducedMotion]);

	const currentPhaseId = ((phase % PHASES.length) + 1) as PhaseId;
	const currentPhaseLabel = PHASE_LABELS[currentPhaseId];

	// Aspect ratio: mobile uses 4/3 for more vertical space; tablet+ uses 16/9
	const aspectClass = isMobile ? "aspect-[4/3]" : "aspect-[16/9]";

	if (prefersReducedMotion) {
		return (
			<div
				ref={containerRef}
				className={`relative mx-auto ${aspectClass} w-full max-w-3xl overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl shadow-[hsl(var(--primary)/0.1)]`}
				role="img"
				aria-label="Animated demonstration of SimUser AI workflow: URL input, discovery, persona testing, session recording, and experience report"
			>
				{/* Window chrome */}
				<div className="flex h-8 items-center gap-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3">
					<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--destructive)/0.6)]" />
					<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--secondary)/0.6)]" />
					<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent)/0.6)]" />
					<div className="ml-3 flex-1">
						<div className="mx-auto h-4 w-48 rounded bg-[hsl(var(--background))] px-2 text-center font-mono text-[10px] leading-4 text-[hsl(var(--muted-foreground))]">
							simuser.ai/dashboard
						</div>
					</div>
				</div>
				{/* Static composite view */}
				<div style={{ height: "calc(100% - 2rem)" }}>
					<ReducedMotionView />
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className={`relative mx-auto ${aspectClass} w-full max-w-3xl overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl shadow-[hsl(var(--primary)/0.1)]`}
			role="img"
			aria-label="Animated demonstration of SimUser AI workflow: URL input, discovery, persona testing, session recording, and experience report"
		>
			{/* Hidden aria-live region for screen readers */}
			<span className="sr-only" aria-live="polite" aria-atomic="true">
				{currentPhaseLabel}
			</span>

			{/* Window chrome */}
			<div className="flex h-8 items-center gap-1.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3">
				<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--destructive)/0.6)]" />
				<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--secondary)/0.6)]" />
				<div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent)/0.6)]" />
				<div className="ml-3 flex-1">
					<div className="mx-auto h-4 w-32 rounded bg-[hsl(var(--background))] px-2 text-center font-mono text-[10px] leading-4 text-[hsl(var(--muted-foreground))] sm:w-48">
						simuser.ai/dashboard
					</div>
				</div>
			</div>

			{/* Phase content area */}
			<div
				className="relative"
				style={{ height: "calc(100% - 2rem - 1.75rem)" }}
			>
				<div
					style={{
						opacity: transitioning ? 0 : 1,
						transition: "opacity 0.5s ease",
						height: "100%",
					}}
				>
					{currentPhaseId === 1 && <Phase1UrlInput active={!transitioning} />}
					{currentPhaseId === 2 && (
						<Phase2Discovery
							active={!transitioning}
							isMobile={isMobile}
							isTablet={isTablet}
						/>
					)}
					{currentPhaseId === 3 && (
						<Phase3Personas active={!transitioning} isMobile={isMobile} />
					)}
					{currentPhaseId === 4 && (
						<Phase4Recording active={!transitioning} isMobile={isMobile} />
					)}
					{currentPhaseId === 5 && (
						<Phase5Report active={!transitioning} isMobile={isMobile} />
					)}
				</div>
			</div>

			{/* Phase indicator dots — decorative, touch-friendly padding */}
			<div
				className="absolute bottom-0 left-0 right-0 flex h-7 items-center justify-center gap-2 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]"
				aria-hidden="true"
			>
				{PHASES.map((p, idx) => (
					<div
						key={p.id}
						className="rounded-full transition-all duration-300"
						style={{
							width: idx === phase ? "1.5rem" : "0.5rem",
							height: "0.5rem",
							backgroundColor:
								idx === phase ? "hsl(270, 95%, 65%)" : "hsl(270, 20%, 35%)",
						}}
					/>
				))}
			</div>

			{/* Glow effect */}
			<div className="animate-glow-pulse pointer-events-none absolute -inset-px rounded-xl border border-[hsl(var(--primary)/0.3)]" />
		</div>
	);
}
