import css from "./Home.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The page you are looking for does not exist.",

  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "The page you are looking for does not exist.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://notehub.com/404",
        width: 1200,
        height: 630,
        alt: "NoteHub application preview",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
