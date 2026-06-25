/**
 * Inline SVG logo mark for SimUser AI.
 * Renders the brand icon (layered user silhouettes with AI accents)
 * as an inline SVG so it inherits color context and avoids extra network requests.
 */
export function LogoMark({
	size = 32,
	className,
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width={size}
			height={size}
			className={className}
			aria-hidden="true"
			role="img"
		>
			<defs>
				<linearGradient id="lm-brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#8B5CF6" />
					<stop offset="100%" stopColor="#0DD9B0" />
				</linearGradient>
			</defs>
			{/* Background rounded square */}
			<rect width="512" height="512" rx="108" fill="#0C0917" />
			{/* Subtle gradient border */}
			<rect
				x="4"
				y="4"
				width="504"
				height="504"
				rx="104"
				fill="none"
				stroke="url(#lm-brandGrad)"
				strokeWidth="3"
				opacity="0.4"
			/>
			{/* Primary user silhouette */}
			<circle cx="280" cy="168" r="52" fill="url(#lm-brandGrad)" />
			<path
				d="M280 232 C230 232, 176 268, 176 328 L176 344 C176 356, 186 364, 198 364 L362 364 C374 364, 384 356, 384 344 L384 328 C384 268, 330 232, 280 232Z"
				fill="url(#lm-brandGrad)"
			/>
			{/* Secondary sim user (ghost behind) */}
			<circle cx="208" cy="186" r="44" fill="#0DD9B0" opacity="0.35" />
			<path
				d="M208 240 C166 240, 120 270, 120 322 L120 336 C120 346, 128 354, 138 354 L278 354 C288 354, 296 346, 296 336 L296 322 C296 270, 250 240, 208 240Z"
				fill="#0DD9B0"
				opacity="0.3"
			/>
			{/* Tertiary ghost user (furthest back) */}
			<circle cx="160" cy="202" r="32" fill="#8B5CF6" opacity="0.18" />
			<path
				d="M160 242 C130 242, 96 264, 96 302 L96 312 C96 320, 102 326, 110 326 L210 326 C218 326, 224 320, 224 312 L224 302 C224 264, 190 242, 160 242Z"
				fill="#8B5CF6"
				opacity="0.15"
			/>
			{/* AI circuit nodes */}
			<circle cx="368" cy="400" r="10" fill="#0DD9B0" opacity="0.8" />
			<circle cx="408" cy="370" r="6" fill="#0DD9B0" opacity="0.5" />
			<circle cx="398" cy="420" r="7" fill="#8B5CF6" opacity="0.6" />
			<line
				x1="368"
				y1="400"
				x2="408"
				y2="370"
				stroke="#0DD9B0"
				strokeWidth="2"
				opacity="0.4"
			/>
			<line
				x1="368"
				y1="400"
				x2="398"
				y2="420"
				stroke="#8B5CF6"
				strokeWidth="2"
				opacity="0.4"
			/>
			<line
				x1="408"
				y1="370"
				x2="398"
				y2="420"
				stroke="url(#lm-brandGrad)"
				strokeWidth="1.5"
				opacity="0.3"
			/>
			{/* AI sparkle */}
			<path
				d="M420 160 L426 172 L438 178 L426 184 L420 196 L414 184 L402 178 L414 172Z"
				fill="url(#lm-brandGrad)"
				opacity="0.5"
			/>
		</svg>
	);
}
