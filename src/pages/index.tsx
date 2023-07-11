import React from "react";
import Link from "next/link";
import styles from "../styles/index.module.css";

const Index = () => (
  <div className={styles.container}>
    <div className={styles.titleBox}>
      <h1 className={styles.title}>
        Cryptic <br /> Crypto
      </h1>
    </div>
    <p className={styles.tagline}>謎を解いてAIが管理するトークンを奪い取れ！</p>
    <div className={styles.verticalLine} />
    <div className={styles.buttonBox}>
      <Link href="/puzzle">
        <button className={styles.button}>謎を解く</button>
      </Link>
    </div>
  </div>
);

export default Index;
