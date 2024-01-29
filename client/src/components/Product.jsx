import { React, useRef, useEffect, useState } from "react";
import styles from "./Product.module.css";
const style = {
  margin: "0 auto",
  border: "solid 1px grey",
  // position: "absolute",
};

const Product = ({ data }) => {
  const canvasRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // let width = 0,
  // height = 0;

  useEffect(() => {
    let c = document.getElementById(data.idProduct);
    let ctx = c.getContext("2d");
    let img = new Image(); // Создаёт новый элемент изображения
    img.src = data.imageSource; // Устанавливает путь
    // console.log(img);/
    setWidth(img.width / 3);
    setHeight(img.height / 3);
    img.onload = function () {
      // Здесь вы можете получить ширину и высоту изображения
      // setWidth(img.width);
      // setHeight(img.height);
      // canvasRef.current = { width: img.width, height: img.height };
      // canvasRef.height = img.height;
      ctx.drawImage(img, 0, 0, img.width / 3, img.height / 3);
    };

    // ctx.moveTo(0, 0);
    // ctx.lineTo(200, 100);
    // if (width > 0) {
    // console.log(width, height);
    // ctx.drawImage(img, 0, 0, width / 3, height / 3);
    // }
    // ctx.stroke();
  }, []);

  return (
    <div className={styles["card"]}>
      <h3>{data.title}</h3>
      {/* <img src={data.imageSource} alt="" /> */}
      <canvas
        className={styles["canvas"]}
        id={data.idProduct}
        ref={canvasRef}
        width={width}
        height={height}
      />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: data.bodyHtml }}
      ></div>
    </div>
  );
};

export default Product;
