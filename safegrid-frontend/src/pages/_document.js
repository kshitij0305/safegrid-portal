import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="SafeGrid - Connecting Talent & Opportunity with Trust" />
        <meta property="og:title" content="SafeGrid Portal" />
        <meta property="og:description" content="A secure platform for jobs, employers, and employees." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
