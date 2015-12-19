describe('Node XML Server Async.js testing: ', function () {
    var async, mapIterator;

    beforeEach(function () {
        async = require('async');

        //https://github.com/caolan/async/blob/master/test/test-async.js
        mapIterator = function (call_order, x, callback) {
            setTimeout(function () {
                call_order.push(x);
                callback(null, x * 2);
            }, x * 25);
        }
    });

    afterEach(function () {
    });

    it("should async.map return an array", function () {
        var call_order = [];
        async.map([1, 3, 2], mapIterator.bind(this, call_order), function (err, results) {
            expect(results).toEqual([2, 6, 4]);
        });
    });

    it("should async counter return array.length", function () {
        var count = 0;
        async.each([1, 3, 2], function (val, callback) {
            count++;
            callback();
        });
        expect(count).toBe(3);
    });

    it("should callback be called.", function () {
        async.each([1, 2, 3, 4, 5], function (item, callback) {
                // Call an asynchronous function, often a save() to DB
                item.someAsyncCall(function () {
                    console.log('Async call is done, alert via callback: ', item);
                    callback('callback is called?');
                });
            },
            function (err) {
                console.log('All tasks are done now');
            })
    });

    /**
     * I need to run multiple tasks that doesn't depend on each other and when they all finish do something else
     */
    it("should async.parallel works", function() {});

    /**
     * I need to run multiple tasks that depends on each other and when they all finish do something else
     */
    it("should async.series works", function() {});

    /**
     * I need to iterate over a collection, perform an asynchronous task for each item, and when they're all done do something else
     */
    /*
    it("should async.forEach works", function(req, res) {
        var messageIds = req.params.messageIds.split(',');
        async.forEach(messageIds, function(messageId, callback) { //The second argument (callback) is the "task callback" for a specific messageId
            db.delete('messages', messageId, callback); //When the db has deleted the item it will call the "task callback". This way async knows which items in the collection have finished
        }, function(err) {
            if (err) return next(err);
            //Tell the user about the great success
            res.json({
                success: true,
                message: messageIds.length+' message(s) was deleted.'
            });
        });
    });
    */
    /**
     * I need to perform some parallel tasks, some serial tasks and iterate over a collection performing an asynchrounous task for each item
     * async.series([
     *   function(callback) {},
     *   function(callback) { async.parallel([] ... }
     * ], function(err) {}
     */
});
