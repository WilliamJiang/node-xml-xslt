var request = require("request");
var base_url = "http://localhost:3000/webmd";

describe("Node XML Server request.js testing: ", function () {
    /**
     * Node.js is an asynchronous environment, so there is a chance that the it
     * block will finish before the expectation. To mitigate this problem,
     * we will use the done callback — a callback available only in Jasmine-node,
     * and not in pure Jasmine — to synchronize it with its expect:
     */
    describe("GET /", function () {
        it("returns status code 200", function (done) {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("return WebMD", function (done) {
            request.get(base_url, function (error, response, body) {
                expect(body).toContain("WebMD");
                done();
            });
        });
    });
});