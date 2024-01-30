import React, { useRef, useEffect } from "react";

const CanvasImage = ({ src }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      // Рассчитываем размеры картинки для адаптивности
      const aspectRatio = image.width / image.height;
      const maxWidth = canvas.width;
      const maxHeight = canvas.height;

      let width = maxWidth;
      let height = maxHeight;

      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }

      // Очищаем и рисуем картинку на канвасе
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        (250 - width) / 2,
        (250 - height) / 2,
        width,
        height
      );
    };

    image.src = src;
  }, [src]);

  return <canvas ref={canvasRef} width="250px" height="250px" />;
};

export default CanvasImage;
