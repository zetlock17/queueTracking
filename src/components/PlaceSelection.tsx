import { Button, Dropdown } from 'antd';
import React, { FC, useState } from 'react';

interface PlaceSelectionProps {
    onPlaceChange: (place: string) => void;
}
 
const PlaceSelection: FC<PlaceSelectionProps> = ({ onPlaceChange }) => {   
    const [selectedPlace, setSelectedPlace] = useState<string>("Выберите место");

    const items: { key: string, label: string }[] = [
        { key: '1', label: 'Столовая B' },
        { key: '2', label: 'Столовая E' },
        { key: '3', label: 'Столовая F' },
    ];

    const handleMenuClick = (e: any) => {
        const selectedItem = items.find(item => item.key === e.key);
        if (selectedItem) {
            setSelectedPlace(selectedItem.label);
            onPlaceChange(selectedItem.label);
        }
    };

    return (
        <div>
            <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottom">
                <Button>{selectedPlace}</Button>
            </Dropdown>
        </div>
    );
}
 
export default PlaceSelection;