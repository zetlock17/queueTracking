import react, { FC } from 'react';
import styles from './GraphPage.module.css';
import VisitorTrackerGraph from '../VisitorTrackerGraph/VisitorTrackerGraph';
import TrafficGraph from '../TrafficGraph/TrafficGraph';

interface GraphPageProps {
    data: any;
}
 
const GraphPage: FC<GraphPageProps> = ({data}) => {
    return (
        <div className={styles.graphWrapper}>
            <VisitorTrackerGraph cafeteria_count={data.cafeteria_count} />
            <TrafficGraph detailed_megacount={data.detailed_megacount} />
        </div>
    );
}
 
export default GraphPage;