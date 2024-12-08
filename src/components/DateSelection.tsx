import React, { FC } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

interface DateSelectionProps {
    onDateChange: (dateString: string) => void;
}
 
const DateSelection: FC<DateSelectionProps> = ({ onDateChange }) => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (typeof dateString === 'string') {
            onDateChange(dateString);
        }
    };

    return (
        <div>
            <DatePicker onChange={onChange} placeholder={'Выберите дату'}/>
        </div>
    );
}
 
export default DateSelection;

