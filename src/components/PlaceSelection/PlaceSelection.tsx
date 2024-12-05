import React, { FC } from "react";
import { Select } from 'antd';

interface OptionType {
  value: string;
  label: string;
}

interface PlaceSelectionProps {
  onSelectPlace: (value: string) => void;
}

const PlaceSelection: FC<PlaceSelectionProps> = ({ onSelectPlace }) => {
  const options: OptionType[] = [
    { value: 'B', label: 'Столовая B' },
    { value: 'E', label: 'Столовая E' },
    { value: 'F', label: 'Столовая F' },
  ];

  const onChangeSelect = (value: string): void => {
    onSelectPlace(value);
  };

  return (
    <div>
      <label>Выберите место:</label>
      <Select
        showSearch
        placeholder="Выбор места"
        optionFilterProp="label"
        onChange={onChangeSelect}
        options={options}
      />
    </div>
  );
};

export default PlaceSelection;
