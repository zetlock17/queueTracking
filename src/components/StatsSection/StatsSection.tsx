import React, { FC, useState } from "react";
import styles from "./StatsSection.module.css";
import NumberStats from "../NumberStats/NumberStats";
import GraphStats from "../GraphStats/GraphStats";

interface StatsSectionProps {
    data: any;
}
 
const StatsSection: FC<StatsSectionProps> = ({ data }) => {

    return (
        <div className={styles.statsBlock}>
            <div>
                <NumberStats data={ data } />
            </div>
            <div>
                <GraphStats data={ data } />
            </div>
        </div>
    );
}
 
export default StatsSection;