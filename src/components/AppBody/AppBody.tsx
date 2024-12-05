import React, { FC, useState } from "react";
import { Button } from "antd";
import DateSelection from "../DateSelection/DateSelection";
import PlaceSelection from "../PlaceSelection/PlaceSelection";
import DataFetcher from "../../hooks/useDataFetcher";
import styles from "./AppBody.module.css";
import TranslationDisplay from "../TranslationDisplay/TranslationDisplay";
import StatsSection from "../StatsSection/StatsSection";

interface AppBodyProps {}

interface DateData {
    from: string;
    to: string;
}

interface Data {
    images: string[];
    data: any;
}

const AppBody: FC<AppBodyProps> = () => {
    const [dateData, setDateData] = useState<DateData | null>(null);
    const [placeData, setPlaceData] = useState<string | null>(null);
    const [data, setData] = useState<Data | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDateData = (data: DateData) => {
        console.log("Selected date data:", data);
        setDateData(data);
    };

    const handleSelectPlace = (value: string) => {
        console.log("Selected place data:", value);
        setPlaceData(value);
    };

    const handleClick = () => {
        if (!dateData || !placeData || !dateData.from || !dateData.to) {
            setErrorMessage("Заполните поля.");
            return;
        }

        setErrorMessage(null);
        setIsFetching(true);
        setData(null);
        console.log("Fetching data with:");
        console.log("Date:", dateData);
        console.log("Place:", placeData);
    };

    const handleDataFetched = (fetchedData: Data) => {
        setData(fetchedData);
        setIsFetching(false);
    };

    const params = dateData && placeData
        ? { date: { from: dateData.from, to: dateData.to }, place: placeData }
        : undefined;

    return (
        <div className={styles.body}>
            <div className={styles.cameras}>
                <div className={`${styles.leftColumn} ${styles.border}`}>
                    <DateSelection onSendData={handleDateData} />
                    <PlaceSelection onSelectPlace={handleSelectPlace} />
                    <Button type="primary" onClick={handleClick}>
                        Получить данные
                    </Button>
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </div>
                <div className={styles.rightColumn}>
                    {isFetching && params && (
                        <div className={styles.border}>
                            <DataFetcher
                                url="https://api.example.com/data"
                                params={params}
                                onDataFetched={handleDataFetched}
                            />
                        </div>
                    )}
                    {!isFetching && data && data.images && (
                        <div className={`${styles.border} ${styles.dataContainer}`}>
                            {data.images.map((url, index) => (
                                <TranslationDisplay key={index} url={url} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {!isFetching && data && data.data && (
                <div className={`${styles.border} ${styles.stats}`}>
                    <StatsSection data={data.data} />
                </div>
            )}
        </div>
    );
};

export default AppBody;
