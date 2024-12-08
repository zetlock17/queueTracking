import React, { FC } from 'react';
import styles from './TrafficSummary.module.css';

interface TrafficSummaryProps {
    megacount: {
        id: number;
        date: string;
        entrance: number;
        exit: number;
    }
}
 
const TrafficSummary: FC<TrafficSummaryProps> = ({megacount}) => {
    return (
        <div className={styles.container}>
            <span><b>Сейчас людей: {megacount.entrance - megacount.exit}</b></span>
            <span>Вошло: {megacount.entrance}</span>
            <span>Вышло: {megacount.exit}</span>
        </div>
    );
}
 
export default TrafficSummary;