import React, { FC, useEffect, useState } from "react";
import DateSelection from "../DateSelection";
import PlaceSelection from "../PlaceSelection";
import { Button, Drawer } from 'antd'; // Импортируем Drawer
import { MenuOutlined } from '@ant-design/icons'; // Импортируем иконку для кнопки
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
    onDateChange: (dateString: string) => void;
    onPlaceChange: (place: string) => void;
}

const AppHeader: FC<AppHeaderProps> = ({ onDateChange, onPlaceChange }) => {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Состояние для видимости меню
    const navigate = useNavigate(); // Используем useNavigate для навигации

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        // Очистка слушателя при размонтировании компонента
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
        setIsDrawerVisible(true); // Открыть меню
    };

    const closeDrawer = () => {
        setIsDrawerVisible(false); // Закрыть меню
    };

    const handleAccountClick = () => {
        navigate('/account'); // Навигация на страницу /account
    };

    return (
        <div className={styles.header}>
            <div className={styles.leftColumn}>
                <DateSelection onDateChange={onDateChange} />
                <PlaceSelection onPlaceChange={onPlaceChange} />
            </div>
            {windowWidth > 768 ? (
                <div className={styles.rightColumn}>
                    <div className={styles.time}>{currentDateTime}</div>
                    <Button onClick={handleAccountClick} color="primary" variant="outlined">
                        Профиль
                    </Button>
                </div>
            ) : (
                <div>
                    {/* Кнопка для открытия бокового меню на мобильных устройствах */}
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
                    >
                        <Button onClick={handleAccountClick} color="primary" variant="outlined" style={{ width: '100%' }}>
                            Профиль
                        </Button>
                    </Drawer>
                </div>
            )}
        </div>
    );
}

export default AppHeader;
