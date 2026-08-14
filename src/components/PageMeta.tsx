import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | ALFF HOMES`;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}

export { PageMeta };
