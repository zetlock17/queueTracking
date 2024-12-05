import React, { FC } from "react";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface DateData {
    from: string;
    to: string;
}

interface DateSelectionProps {
    onSendData: (data: DateData) => void;
}

const DateSelection: FC<DateSelectionProps> = ({ onSendData }) => {
    const handleDateChange = (
        value: [Dayjs | null, Dayjs | null] | null,
        dateString: [string, string]
    ): void => {
        const [from, to] = dateString;
        onSendData({ from, to });
    };

    return (
        <div>
            <label>Выберите период:</label>
            <RangePicker
                showTime={{ format: "HH:00" }}
                format="YYYY-MM-DD HH:00"
                onChange={handleDateChange}
                placeholder={['Начало периода', 'Конец периода']}
            />
        </div>
    );
};

export default DateSelection;
