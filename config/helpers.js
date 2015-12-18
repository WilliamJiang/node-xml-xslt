'use strict';

var _ = require('lodash');
var moment = require('moment');
var promise = require('bluebird');
var constants = require('./constants');

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 * Not sure nodejs supports MDN?
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

module.exports = function (app) {

    /**
     * @returns {Array}
     * return array of xml urls: [
     *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f046b5',
     *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f4bedb',
     *  'http://ats.webmd.com/ATSFile.aspx?ID=091e9c5e80f08908'
     * ]
     */
    function get_xmlAry() {
        var ary = [];
        Object.keys(contentPane12.xmls).forEach(function (key) {
            ary.push(contentPane12.xmls[key]);
        });
        return ary;
    }


    /**
     * xhr-request call:
     * @param xmlModule, such as 'editorial1', 'editorial2', 'linklist'
     * @param callback
     */
    var get_xmlDoc = function (xmlModule, callback) {

        var xmlUrl = contentPane12.xmls[xmlModule];

        request(xmlUrl, function (error, response, xml) {
            if (!error && response.statusCode == 200) {
                contentPane12results[xmlModule] = xml;
            }
            callback();
        });
    };

    var complete_Processing = function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('A file failed to process');
        } else {
            console.log('All files have been processed successfully');

            //res.render('index', {
            //    title: contentPane12title
            //});
            //res.render('index', {
            //  title: contentPane12.title,
            //  editorial1: contentPane12.results.editorial1,
            //  editorial2: contentPane12.results.editorial2,
            //  linklist: contentPane12.results.linklist
            //});
        }
    };

    function async_fetch_xmls(res) {

        async.each(Object.keys(contentPane12.xmls), get_xmlDoc, complete_Processing);

    }

    function get_link_url(chronic_id, ref_objs) {
        var url = '';
        try {
            url = ref_objs.filter(function (obj) {
                if (obj.chronic_id == chronic_id) {
                    return obj.target[0].friendlyurl;
                }
            });
        }
        catch (e) {
        }

        return url;
    }


    function helper(req, res) {

    }

    return {
        helper: helper
    }
};