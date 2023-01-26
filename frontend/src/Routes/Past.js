import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Past.module.css";

function Past() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className={styles.topRow}>
        <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
        <label className={styles.date}>2023. 01. 26</label>
        <div></div>
      </div>
      <div className={styles.container}></div>
    </div>
  );
}

export default Past;
