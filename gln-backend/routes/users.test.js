const express = require('express');
const request = require('supertest');
const UsersApi = require('./users');

describe('user api tests', () => {

    // Setup test app
    const testApp = express();
    testApp.use(new UsersApi());

    test('getting all users', done => {
        
        request(testApp)
            .get("/users")
            .end((err, res) => {

                expect(res.status).toBe(200);
                expect(res.body).toBeDefined();
                expect(res.body.length).toBe(2);

                done();
            });
    });

    test('get user by id', done => {
        
        request(testApp)
            .get("/users/2")
            .end((err, res) => {

                expect(res.status).toBe(200);
                expect(res.body).toBeDefined();
                expect(res.body.id).toBe(2);

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