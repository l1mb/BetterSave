import React from "react";

interface ImageContainerProps {
  width: string;
  height: string;
  src: string;
  alt: string;
}

function ImageContainer({ src, alt, height, width }: ImageContainerProps) {
  return (
    <div className={`relative ${width} ${height}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default ImageContainer;
