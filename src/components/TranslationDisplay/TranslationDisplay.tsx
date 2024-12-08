import React, { FC, useState } from "react";
import styles from "./TranslationDisplay.module.css";

interface TranslationProps {
  url: string;
  toggleHeaderVisibility: (isVisible: boolean) => void;
}

const TranslationDisplay: FC<TranslationProps> = ({ url, toggleHeaderVisibility }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    toggleHeaderVisibility(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    toggleHeaderVisibility(true);
  };

  return (
    <>
      <img className={styles.image} src={url} onClick={openModal} alt="Translation" />
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <img className={styles.modalContent} src={url} alt="Translation" />
        </div>
      )}
    </>
  );
};

export default TranslationDisplay;