import styles from "./Tag.module.css";
import x_btn from "../../../assets/x_btn.png";
import type React from "react";
import type { Tag as TagType } from "../../../types";


interface TagProps {
  tagName: TagType;
  remove: (tag: string) => void;
  isRemovable: boolean;
}

export const Tag: React.FC<TagProps> = ({ tagName, remove, isRemovable }) => {
  return (
    <div className={styles.tag}>
      <div className={styles.tag_content}>
        <span>{tagName}</span>
        {isRemovable && (
          <button
            type="button"
            className={styles.xBtn}
            onClick={() => remove(tagName)}
            aria-label={`Remove ${tagName}`}
          >
            <img src={x_btn} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
