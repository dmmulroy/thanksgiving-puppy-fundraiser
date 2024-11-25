import "./globals.css";
export const metadata = {
	title: "NRGRR - Vote for Puppy names",
	description: "NRGRR - Vote for Puppy names",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
