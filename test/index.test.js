'use strict';

const alexaTest = require('alexa-skill-test-framework');
const myHandler = require('../index');
const describe = require('mocha').describe;

alexaTest.initialize(
    myHandler,
    'amzn1.ask.skill.fad17529-17ec-440c-843e-02e1e625183e',
    'amzn1.ask.account.AM3B227HF3FAM1B261HK7FFM3A2'
);

const textResources = require('../i18n');
alexaTest.initializeI18N(textResources);

const supportedLocales = ['de-DE'];

// perform each test in each supported language
for (let i = 0; i < supportedLocales.length; ++i) {
    const locale = supportedLocales[i];

    // set the language
    alexaTest.setLocale(locale);

    // callback function that asserts if the provided string is not a fact from the list
    const assertIfNotFact = function (context, suspectedFact) {
        const facts = context.t('FACTS');
        for (let i = 0; i < facts.length; i++) {
            if (suspectedFact === '<speak> ' + context.t('GET_FACT_MESSAGE') + facts[i] + ' </speak>') return;
        }
        context.assert({ message: '\'' + suspectedFact + '\' is not a kempten fact.' });
    };

    describe('Kempten Fact Skill (' + locale + ')', function () {
        // tests the behavior of the skill's LaunchRequest
        describe('LaunchRequest', function () {
            alexaTest.test([
                {
                    request: alexaTest.getLaunchRequest(), shouldEndSession: true, repromptsNothing: true,
                    saysCallback: assertIfNotFact
                }
            ]);
        });

        // tests the behavior of the skill's GetNewFactIntent
        describe('GetNewFactIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('GetNewFactIntent'),
                    saysCallback: assertIfNotFact, shouldEndSession: true, repromptsNothing: true,
                    hasCardTitle: alexaTest.t('SKILL_NAME')
                }
            ]);
        });

        // tests the behavior of the skill's AMAZON.HelpIntent
        describe('AMAZON.HelpIntent into GetNewFactIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                    says: alexaTest.t('HELP_MESSAGE'), shouldEndSession: false, reprompts: alexaTest.t('HELP_MESSAGE')
                },
                {
                    request: alexaTest.getIntentRequest('GetNewFactIntent'),
                    saysCallback: assertIfNotFact, shouldEndSession: true, repromptsNothing: true
                }
            ]);
        });
        describe('AMAZON.HelpIntent into AMAZON.CancelIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                    says: alexaTest.t('HELP_MESSAGE'), shouldEndSession: false, reprompts: alexaTest.t('HELP_MESSAGE')
                },
                {
                    request: alexaTest.getIntentRequest('AMAZON.CancelIntent'),
                    says: alexaTest.t('STOP_MESSAGE'), shouldEndSession: true, repromptsNothing: true
                }
            ]);
        });
        describe('AMAZON.HelpIntent into AMAZON.StopIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('AMAZON.HelpIntent'),
                    says: alexaTest.t('HELP_MESSAGE'), shouldEndSession: false, reprompts: alexaTest.t('HELP_MESSAGE'),
                },
                {
                    request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
                    says: alexaTest.t('STOP_MESSAGE'), shouldEndSession: true, repromptsNothing: true
                }
            ]);
        });

        // tests the behavior of the skill's AMAZON.CancelIntent
        describe('AMAZON.CancelIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('AMAZON.CancelIntent'),
                    says: alexaTest.t('STOP_MESSAGE'), shouldEndSession: true, repromptsNothing: true
                }
            ]);
        });

        // tests the behavior of the skill's AMAZON.StopIntent
        describe('AMAZON.StopIntent', function () {
            alexaTest.test([
                {
                    request: alexaTest.getIntentRequest('AMAZON.StopIntent'),
                    says: alexaTest.t('STOP_MESSAGE'), shouldEndSession: true, repromptsNothing: true
                }
            ]);
        });
    });
}
