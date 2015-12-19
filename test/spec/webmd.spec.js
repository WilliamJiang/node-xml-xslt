describe("controllers webmd", function () {

    var webmd;

    beforeEach(function () {
        webmd = require('../../controllers/webmd');
    });

    it("should be defined", function () {
        expect(webmd).toBeDefined();
    });

    it("webmd should have webmd_page method", function () {
        expect(webmd.webmd_page).toBeDefined();
    });

    it("webmd should have get_available_modules method", function () {
        expect(webmd.get_available_modules).toBeDefined();
    });
});