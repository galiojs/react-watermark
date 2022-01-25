import React from "react";

export interface Text {
  translateX: number;
  translateY: number;
  rotate: number;
  text: string;
  fill?: string; // Text Color. Default as "#000000".
  fontFamily?: string; // Text Font Family. Default as "monospace".
}

export interface WatermarkProps {
  style?: React.CSSProperties;
  className?: string;
  width?: number; // SVG width. Default as "180"
  height?: number; // SVG height. Default as "80"
  zIndex?: number; // Watermark div style z-index. Default as "-1".
  opacity?: number; // Watermark div style opacity. Default as ".15".
  texts: Text[];
}

export function Watermark({
  style,
  className,
  width,
  height,
  zIndex,
  opacity,
  texts,
}: WatermarkProps) {
  const [bgImageUrl, setBgImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const svgTexts = texts.map(
      ({
        translateX,
        translateY,
        rotate,
        text,
        fill = "#000000",
        fontFamily = "monospace",
      }: Text) => {
        const t =
          `<text` +
          ` fill="${fill}"` +
          ` text-anchor="middle"` +
          ` font-family="${fontFamily}"` +
          ` transform="translate(${translateX}, ${translateY}) rotate(${rotate})"` +
          `>` +
          `${text}` +
          `</text>`;
        return t;
      }
    );

    const svgStr =
      `<svg` +
      ` xmlns="http://www.w3.org/2000/svg"` +
      ` width="${width}"` +
      ` height="${height}"` +
      `>` +
      `${svgTexts}` +
      `</svg>`;

    const DOMURL = window.URL || window.webkitURL;
    const img = new Image();
    const svg = new Blob([svgStr], { type: "image/svg+xml" });
    // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
    const url = DOMURL.createObjectURL(svg);
    const ctx = document.createElement("canvas").getContext("2d");
    const onImgLoad = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
    };
    img.addEventListener("load", onImgLoad);
    img.src = url;

    setBgImageUrl(url);

    return () => {
      img.removeEventListener("load", onImgLoad);
      // See https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
      DOMURL.revokeObjectURL(url);
    };
  }, []);

  let styles: Partial<React.CSSProperties> = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity,
    zIndex,
    ...style,
  };
  if (bgImageUrl) {
    styles = { ...styles, backgroundImage: `url(${bgImageUrl})` };
  }

  return <div style={styles} className={className} />;
}

Watermark.defaultProps = {
  width: 180,
  height: 80,
  zIndex: 9999,
  opacity: 0.15,
  texts: [],
};
