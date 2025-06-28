import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Helmet>
      <title>Algo-Brief</title>
      <meta
        property="og:title"
        content="Algobrief - Smart AI Trading Platform"
      />
      <meta
        property="og:description"
        content="Get real-time market insights and trade smarter with Algobrief."
      />
      <meta
        property="og:image"
        content="https://ik.imagekit.io/b0oee7on0/AlgoBrief/Screenshot%202025-06-28%20020244.png?updatedAt=1751056578708"
      />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>

    <App />
  </>
);
