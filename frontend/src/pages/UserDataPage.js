import React, { useEffect, useState } from 'react';
import { Table } from 'antd';


const columns = [
  {
    title: 'Information',
    dataIndex: 'info',
    key: 'info',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const StatisticsPage = () => {

  const [statisticsData, setStatisticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats/all/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const { totalUsers, scrolledUsersCount } = data;
        const formattedData = [
          {
            key: '1',
            info: 'Number of users who accessed the initial page',
            value: totalUsers,
          },
          {
            key: '2',
            info: 'Number of users who scrolled to the image',
            value: `${scrolledUsersCount}`,
          },
        ];
        setStatisticsData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  

  return (
    <div>
      <h2>Statistics</h2>
      <Table
        columns={columns}
        dataSource={statisticsData}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

export default StatisticsPage;