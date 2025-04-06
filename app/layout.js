import "./globals.css";

export const metadata = {
  title: "Xcloak",
  description: "Unseen. Unowned.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
