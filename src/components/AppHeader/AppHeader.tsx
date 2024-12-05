import React, {FC} from "react";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
    
}
 
const AppHeader: FC<AppHeaderProps> = () => {
    return (
        <div className={styles.header}>
            <h2>Камеры из харчевен</h2>
        </div>
    );
}
 
export default AppHeader;