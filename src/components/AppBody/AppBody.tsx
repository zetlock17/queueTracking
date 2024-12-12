import React, { FC, useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import DataFetcher from "../../hooks/useDataFetcher";
import CamerasPage from "../CamerasPage/CamerasPage";
import GraphPage from "../GraphPage/GraphPage";
import styles from "./AppBody.module.css";

interface AppBodyProps {}

const AppBody: FC<AppBodyProps> = () => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedPlace, setSelectedPlace] = useState<string>("");
    const [fetchData, setFetchData] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [isCamerasPage, setIsCamerasPage] = useState<boolean>(false);

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

    const togglePage = () => {
        setIsCamerasPage(!isCamerasPage);
    };

    return (
        <div>
            {isHeaderVisible && <AppHeader onDateChange={handleDateChange} onPlaceChange={handlePlaceChange} megacount={data ? data.megacount : null} isCamerasPage={isCamerasPage} togglePage={togglePage} />}
            <div>
                {fetchData && (
                    <DataFetcher
                        params={{ date: selectedDate, place: selectedPlace }}
                        onDataFetched={handleDataFetched}
                    />
                )}
                {data && (
                    <div className={styles.border}>
                        {isCamerasPage ? (
                            <CamerasPage images={data.images} toggleHeaderVisibility={toggleHeaderVisibility} />
                        ) : (
                            <GraphPage data={data} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppBody;