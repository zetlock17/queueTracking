import React, { FC, useEffect, useState } from "react";
import DateSelection from "../DateSelection";
import PlaceSelection from "../PlaceSelection";
import { Button } from 'antd';
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
    onDateChange: (dateString: string) => void;
    onPlaceChange: (place: string) => void;
}
 
const AppHeader: FC<AppHeaderProps> = ({ onDateChange, onPlaceChange }) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString();
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div className={styles.header}>
            <div className={styles.leftColumn}>
                <DateSelection onDateChange={onDateChange} />
                <PlaceSelection onPlaceChange={onPlaceChange} />
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.time}>{currentDateTime}</div>
                <Button color="primary" variant="outlined">
                    Аккаунт
                </Button>
            </div>
        </div>
    );
}
 
export default AppHeader;