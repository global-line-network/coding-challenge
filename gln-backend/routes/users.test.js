const express = require('express');
const request = require('supertest');
const userRoute = require('./users');

describe('user api tests', () => {

    // Setup test app
    const testApp = express();
    testApp.use(userRoute);

    test('getting all users', done => {
        
        request(testApp)
            .get("/users")
            .expect(200)
            .end((err, res) => {

                expect(res.status).toBe(200);

                done();
            });
    });

    test('get user by id', done => {
        
        request(testApp)
            .get("/users/1")
            .expect(200)
            .end((err, res) => {

                expect(res.status).toBe(200);

                done();
            });
    });

    test('update user by id', done => {

        const testUser = {
            id: 1,
            name: 'Test guy'
        };
        
        request(testApp)
            .put("/users/1")
            .send(testUser)
            .expect(200)
            .end((err, res) => {

                expect(res.status).toBe(200);

                done();
            });
    });

    test('delete user by id', done => {
        
        request(testApp)
            .delete("/users/1")
            .expect(200)
            .end((err, res) => {

                expect(res.status).toBe(200);

                done();
            });
    });
});