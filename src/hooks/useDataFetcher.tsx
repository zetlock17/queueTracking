import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
  images: string[];
  data: any;
}

let testData: Data = {
  images: ["../../accets/imgTest1.jpg", "../../accets/imgTest2.jpg"],
  data: {
      from: {
          year: "2024",
          month: "12",
          day: "1",
          hour: "7",
          minute: "00",
      },
      to: {
          year: "2024",
          month: "12",
          day: "1",
          hour: "9",
          minute: "00",
      },
      measurement: [
          {
              from: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "7",
                  minute: "00",
              },
              to: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "7",
                  minute: "30",
              },
              value: [
                  {
                      label: "fw",
                      value: 10
                  },
                  {
                      label: "bw",
                      value: 1
                  }
              ]
          },
          {
              from: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "7",
                  minute: "30",
              },
              to: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "8",
                  minute: "00",
              },
              value: [
                  {
                      label: "fw",
                      value: 20
                  },
                  {
                      label: "bw",
                      value: 1
                  }
              ]
          },
          {
              from: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "8",
                  minute: "00",
              },
              to: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "8",
                  minute: "30",
              },
              value: [
                  {
                      label: "fw",
                      value: 11
                  },
                  {
                      label: "bw",
                      value: 1
                  }
              ]
          },
          {
              from: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "8",
                  minute: "30",
              },
              to: {
                  year: "2024",
                  month: "12",
                  day: "1",
                  hour: "9",
                  minute: "00",
              },
              value: [
                  {
                      label: "fw",
                      value: 14
                  },
                  {
                      label: "bw",
                      value: 1
                  }
              ]
          },
      ]
  },
}

interface DataFetcherProps {
  url: string;
  params: {
    date: {
        from: string;
        to: string;
    }
    place: string;
  }
  onDataFetched: (data: Data) => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ url, params, onDataFetched }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>(url, { params });
        onDataFetched(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
      onDataFetched(testData); {/* удалить потом */}
    };

    fetchData();
  }, [url, params, onDataFetched]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return null;
};

export default DataFetcher;
