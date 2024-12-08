import React, { FC, useState, useEffect } from "react";
import styles from "./AppBody.module.css";
import AppHeader from "../AppHeader/AppHeader";
import DataFetcher from "../../hooks/useDataFetcher";
import TranslationDisplay from "../TranslationDisplay/TranslationDisplay";
import VisitorTrackerGraph from "../VisitorTrackerGraph/VisitorTrackerGraph";
import TrafficGraph from "../TrafficGraph/TrafficGraph";
import TrafficSummary from "../TrafficSummary/TrafficSummary";

interface AppBodyProps {}

const AppBody: FC<AppBodyProps> = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedPlace, setSelectedPlace] = useState<string>("");
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

    const handleDateChange = (dateString: string) => {
        setSelectedDate(dateString);
    };

    const handlePlaceChange = (place: string) => {
        setSelectedPlace(place);
    };

    const handleDataFetched = (fetchedData: any) => {
        setData(fetchedData);
        console.log(fetchedData);
    };

    useEffect(() => {
        if (selectedDate && selectedPlace) {
            setFetchData(true);
        }
    }, [selectedDate, selectedPlace]);

    const toggleHeaderVisibility = (isVisible: boolean) => {
        setIsHeaderVisible(isVisible);
    };

    return (
        <div>
            {isHeaderVisible && <AppHeader onDateChange={handleDateChange} onPlaceChange={handlePlaceChange} />}
            <div>
                {fetchData && (
                    <DataFetcher
                        params={{ date: selectedDate, place: selectedPlace }}
                        onDataFetched={handleDataFetched}
                    />
                )}
                {data && (
                    <div className={styles.main}>
                        <div className={`${styles.rightColumn} ${styles.border}`}>
                            <TrafficSummary megacount={data.megacount} />
                            <VisitorTrackerGraph cafeteria_count={data.cafeteria_count} />
                            <TrafficGraph detailed_megacount={data.detailed_megacount} />
                        </div>
                        <div className={styles.leftColumn}>
                            {data.images.map((image: string, index: number) => (
                                <TranslationDisplay key={index} url={image} toggleHeaderVisibility={toggleHeaderVisibility} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppBody;