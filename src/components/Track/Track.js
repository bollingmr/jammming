import React from "react";
import styles from "./Track.module.css";

function Track({ track }) {
  return (
    <div className={styles.track}>
      <div className={styles.trackIcon}>
        <img
          src={track.icon}
          alt="Track Icon"
        />
      </div>
      <div className={styles.trackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
        <p>{track.album}</p>
      </div>
      <button className={styles.trackAction}>+</button>
    </div>
  );
}

export default Track;
