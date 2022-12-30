import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Responde aqui!" />
          <meta name="author" content="Vitor Pereira" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700;900&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut" href="./images/favicon.png" type="image/png" />
        </Head>
        <body className="w-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
