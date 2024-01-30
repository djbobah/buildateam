import { React, useRef, useEffect, useState } from "react";
import styles from "./Product.module.css";
import CanvasImage from "./CanvasImage";

const Product = ({ data, ind }) => {
  return (
    <div className={styles["card"]}>
      <h3>{data.title}</h3>

      <CanvasImage
        className={styles["canvas__canvas"]}
        src={data.imageSource}
      />
      <div
        className="card__content"
        dangerouslySetInnerHTML={{ __html: data.bodyHtml }}
      ></div>
    </div>
  );
};

export default Product;
