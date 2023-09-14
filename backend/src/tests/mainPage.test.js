const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const User = require('../models/User');

const mainPageRouter = require('../routes/mainPage');



jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("GET /api/stats/all", () => {

    test("Should respond with a 200 status code if user logged in and not create a new user", async () => {
        const mockUser = { userUid: 'User 1', hasScrolledToImage: true }
          User.findOne.mockResolvedValue(mockUser);

          app.use('/api', mainPageRouter);

          const service = { userUid: "User 1" }
          const response = await request(app).post('/api/start').send(service);
      
          expect(User.create).not.toHaveBeenCalled()
      })

      test("Should respond with a 200 and create new user if user does not exist", async () => {

        User.findOne.mockResolvedValue(null);

        app.use('/api', mainPageRouter);

        const service = { userUid: "User 1" }
        const response = await request(app).post('/api/start').send(service);
    
        expect(User.create).toHaveBeenCalled()
      })

      test("Should fail if no userUid provided", async () => {


        app.use('/api', mainPageRouter);

        const service = { name: "User 1" }
        const response = await request(app).post('/api/start').send(service);
    
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('userUid is required');
      })
  
})