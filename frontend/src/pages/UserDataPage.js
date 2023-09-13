import React from 'react';

const StatisticsPage = ({ totalUsers, scrollPercentage }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of users who accessed the initial page</td>
            <td>{totalUsers}</td>
          </tr>
          <tr>
            <td>Percentage of users who scrolled to the image</td>
            <td>{scrollPercentage}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;