import React from "react";
import Image from "next/image";

interface ImageContainerProps {
  width: string;
  height: string;
  src: string;
  alt: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  height,
  width,
}) => (
  <div className={`relative ${width} ${height}`}>
    <Image src={src} alt={alt} layout="fill" />
  </div>
);

export default ImageContainer;
