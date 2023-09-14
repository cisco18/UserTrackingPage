class ApiHandler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchStatisticsData() {
    try {
      const response = await fetch(`${this.baseUrl}/api/stats/all/`);
      const data = await response.json();

      const {totalUsers, scrolledUsersCount} = data;

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

      return formattedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async updateProfile(scrollMessage) {
    try {
      await fetch(`${this.baseUrl}/api/profile/update/`, {
        method: 'PUT',
        body: JSON.stringify(scrollMessage),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async start(loginMessage) {
    try {
      const response = await fetch(`${this.baseUrl}/api/start/`, {
        method: 'POST',
        body: JSON.stringify(loginMessage),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      console.error('Error starting:', error);
      throw error;
    }
  }
}

export default ApiHandler;
