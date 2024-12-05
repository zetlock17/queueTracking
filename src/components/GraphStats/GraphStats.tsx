import React, { FC, useState, useEffect } from "react";
import processGraphStats from "../DataHandler";
import GraphView from "../GraphView/GraphView";

// const testData = [
//   { hour: '00:00', visitors: 10 },
//   { hour: '01:00', visitors: 100 },
//   { hour: '02:00', visitors: 15 },
//   // Добавьте больше данных по часам
// ];

interface GraphStatsProps {
    data: any;
}

interface ProcessedStat {
    date: object;
    time: string;
    visitors: number;
}

type ProcessedStats = ProcessedStat[];
const GraphStats: FC<GraphStatsProps> = ({data}) => {
    const defaultData: ProcessedStats = [];
    const [processedStats, setProcessedStats] = useState<ProcessedStats>(defaultData);

    useEffect(() => {
        const result = processGraphStats({ data });
        setProcessedStats(result);
    }, [data]);

    console.log(processedStats);

    return (
        <div>
            <GraphView data={processedStats} />
        </div>
    );
}
 
export default GraphStats;