import React, { FC } from 'react';
import styles from './CamerasPage.module.css';
import TranslationDisplay from '../TranslationDisplay/TranslationDisplay';

interface CamerasPageProps {
    images: string[];
    toggleHeaderVisibility: (isVisible: boolean) => void;
}

const CamerasPage: FC<CamerasPageProps> = ({ images, toggleHeaderVisibility }) => {
    return (
        <div className={styles.camerasWrapper}>
            {images.map((image, index) => (
                <TranslationDisplay key={index} url={image} toggleHeaderVisibility={toggleHeaderVisibility} />
            ))}
        </div>
    );
}

export default CamerasPage;