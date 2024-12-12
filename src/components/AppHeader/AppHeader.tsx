import React, { FC, useEffect, useState } from "react";
import DateSelection from "../DateSelection";
import PlaceSelection from "../PlaceSelection";
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from "./AppHeader.module.css";
import TrafficSummary from "../TrafficSummary/TrafficSummary";

interface AppHeaderProps {
    onDateChange: (dateString: string) => void;
    onPlaceChange: (place: string) => void;
    megacount: any | null;
    isCamerasPage: boolean;
    togglePage: () => void;
}

const AppHeader: FC<AppHeaderProps> = ({ onDateChange, onPlaceChange, megacount, isCamerasPage, togglePage }) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const closeDrawer = () => {
        setIsDrawerVisible(false);
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <div className={styles.header}>
            {windowWidth > 768 ? (
                <>
                    <div className={styles.leftColumn}>
                        <DateSelection onDateChange={onDateChange} />
                        <PlaceSelection onPlaceChange={onPlaceChange} />
                    </div>
                    {megacount && (
                        <div className={styles.centerColumn}>
                            <div className={styles.stats}>
                                <TrafficSummary megacount={megacount}/> 
                            </div>
                        </div>
                    )}
                    <div className={styles.rightColumn}>
                        <div className={styles.time}>{currentDateTime}</div>
                        <div className={styles.buttonWrapper}>
                            {megacount && (
                                <Button onClick={togglePage} color="primary" variant="outlined">
                                    {isCamerasPage ? "Статистика" : "Камеры"}
                                </Button>
                            )}
                            <Button onClick={handleAccountClick} color="primary" variant="outlined">
                                Профиль
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.leftColumn}>
                        <DateSelection onDateChange={onDateChange} />
                        <PlaceSelection onPlaceChange={onPlaceChange} />
                    </div>
                    <Button 
                        icon={<MenuOutlined />} 
                        onClick={showDrawer} 
                        shape="circle"
                        size="large"
                    />
                    <Drawer
                        title={currentDateTime}
                        placement="right"
                        onClose={closeDrawer}
                        visible={isDrawerVisible}
                        width={250}
                        className={styles.drawer}
                    >
                        <TrafficSummary megacount={megacount}/>
                        <Button onClick={() => { togglePage(); closeDrawer(); }} color="primary" variant="outlined" style={{ width: '100%'}}>
                            {isCamerasPage ? "Статистика" : "Камеры"}
                        </Button>
                        <Button onClick={handleAccountClick} color="primary" variant="outlined" style={{ width: '100%' }}>
                            Профиль
                        </Button>
                    </Drawer>
                </>
            )}
        </div>
    );
}

export default AppHeader;