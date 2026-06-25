export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// This layout wraps the root redirect page only.
	// Locale pages use [locale]/layout.tsx which provides its own html/body.
	return children;
}
