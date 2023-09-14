import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import ApiHandler from '../gateways/ApiHandler';

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
  const apiHandler = new ApiHandler('http://localhost:4000');

  useEffect(() => {
    apiHandler.fetchStatisticsData()
        .then((formattedData) => {
          setStatisticsData(formattedData);
          setLoading(false);
        })
        .catch((error) => {
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
