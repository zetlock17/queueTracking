import React, { FC, useState, useEffect } from "react";
import { processNumberStats } from "../DataHandler";
import styles from "./NumberStats.module.css";

interface NumberStatsProps {
    data: any;
}

interface ProcessedStats {
    fw: number;
    bw: number;
}
 
const NumberStats: FC<NumberStatsProps> = ({ data }) => {
    let defaultData: ProcessedStats = {
        fw: 0,
        bw: 0
    }

    const [processedStats, setProcessedStats] = useState<ProcessedStats>(defaultData);

    useEffect(() => {
        const result = processNumberStats({ data });
        setProcessedStats(result);
    }, [data]);

    console.log(processedStats);

    return (
        <div className={styles.container}>
            <span className={styles.peopleNow}>Людей в помещении: <span className={styles.number}>{processedStats.fw - processedStats.bw}</span></span>
            <div>
                <div className={styles.spanParent}><span >Вошло людей: <span className={styles.number}>{processedStats.fw}</span></span></div>
                <div className={styles.spanParent}><span>Вышло людей: <span className={styles.number}>{processedStats.bw}</span></span></div>
            </div>
        </div>
    );
}
 
export default NumberStats;