const request = require('supertest');
const express = require('express');
const app = express();
const User = require('../models/User');

const userStatsRouter = require('../routes/userStats');

jest.mock('../models/User', () => ({
  find: jest.fn(),
}));

describe("GET /api/stats/all", () => {

    test("Should respond with a 200 status code and return user stats", async () => {
        const mockUsers = [
            { uid: 'User 1', hasScrolledToImage: true },
            { uid: 'User 2', hasScrolledToImage: false },
          ];
          User.find.mockResolvedValue(mockUsers);

          app.use('/api/stats', userStatsRouter);

          const response = await request(app).get('/api/stats/all');
      
          expect(response.statusCode).toBe(200);
          expect(response.body.totalUsers).toBe(mockUsers.length);
          expect(response.body.scrolledUsersCount).toBe(
            mockUsers.filter((user) => user.hasScrolledToImage).length
          );
      })

      test("Should handle database error and respond with 500", async () => {
          User.find.mockImplementation(new Error("Database error"))

          app.use('/api/stats', userStatsRouter);

          const response = await request(app).get('/api/stats/all');
      
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBe('Internal server error');
      })
  
})