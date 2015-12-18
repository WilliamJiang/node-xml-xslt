(function () {
    'use strict';

    describe('this is a test: ', function () {
        var test = null;
        beforeEach(function () {
            test = function () {
            };
        });

        it("should work", function () {
            expect(test).toBeDefined();
        });

    });
}).call(this);