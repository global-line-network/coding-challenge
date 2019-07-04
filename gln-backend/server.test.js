const server = require('./server');

describe('server test', () => {
    afterAll(() => {
        server.close();
    });

    test("that server is up", () => {
        expect(server).toBeDefined();
    });
});