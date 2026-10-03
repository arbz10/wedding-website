"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  src: string;
  className?: string;
  children?: ReactNode;
};

// Shows `src` as a cover background once it has loaded; until then (or if the
// file doesn't exist yet) the CSS placeholder gradient on `.photo` stays visible.
export default function Photo({ src, className = "", children }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  const style = loaded ? ({ "--img": `url("${src}")` } as CSSProperties) : undefined;

  return (
    <div className={`photo ${loaded ? "has-img" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
