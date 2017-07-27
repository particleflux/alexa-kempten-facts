'use strict';

const alexaTest = require('alexa-skill-test-framework');
const myHandler = require('../index');
const describe = require('mocha').describe;

alexaTest.initialize(
    myHandler,
    'amzn1.ask.skill.fad17529-17ec-440c-843e-02e1e625183e',
    'amzn1.ask.account.AM3B227HF3FAM1B261HK7FFM3A2'
);

describe('direct launch', function () {

    alexaTest.test([
        {
            request: alexaTest.getIntentRequest('GetNewFactIntent'),
            shouldEndSession: true
        }
    ]);
});

