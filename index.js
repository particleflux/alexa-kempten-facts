/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple languages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.fad17529-17ec-440c-843e-02e1e625183e';

const languageStrings = {
    'de-DE': {
        translation: {
            FACTS: [
                'Kempten ist die größte Stadt im Allgäu',
                'Kempten ist die älteste Stadt in Deutschland',
                '96% aller Deutschen kennen Kempten',
                'Kempten ist ein attraktives Urlaubsziel mit mehr als 3 Millionen Übernachtungen pro Jahr',
                'In Kempten und Umgebung gibt es circa 50 Schulen',
                'Kempten ist in der Region mit den meisten Sonnen-Stunden pro Jahr in Deutschland',
                'Die Hochschule Kempten hat ein Glockenkompetenzzentrum',
                'Die Hochschule Kempten ist eine der größten Fachhochschulen in Bayern',
                'Die höchste Erhebung in Kempten ist der Maria-berg mit 915 Meter über dem Meeresspiegel',
                'Kempten besteht insgesamt aus 155 Ortsteilen',
                'Kempten wird in den Medien auch als Allgäumetropole, Illerstadt, oder Hauptstadt des Allgäus bezeichnet',
                'Die Stadtfarben von Kempten sind schwarz und silber bzw weiß',
                'In Südafrika gibt es eine Stadt, die in Anlehnung an Kempten Kempton Park genannt wurde',
                'Der Flugzeugkonstrukteur Claude Dornier wurde in Kempten geboren',
                'Neben dem Forum Allgäu befindet sich seit über 10 Jahren ein Großes Loch. Es war dort ein Einkaufszentrum geplant',
                'Im März 2017 wurde ein Apfelbaum gestohlen, indem dieser komplett ausgegraben und mitgenommen wurde',
                'Der Kemptener Stadtpark ist Nistplatz für hunderte von Saatkrähen',
                'Das Eiscafe Venezia in der Fussgängerzone wird vom amtierenden deutschen Eismeister betrieben',
                'Der ehemalige Chef-Drogenfahnder der Kriminalpolizei in Kempten wurde wegen Kokainbesitz verurteilt',
                'Kempten ist der Firmensitz von Abt Sportsline, einem Tuner-Betrieb für Autos der Marken Volkswagen, Audi, Skoda und Seat',
                'Kempten ist Standort der Allgäuer Festwoche - Erlebnismesse und Sommerfest',
                '1996 gab es eine Unterwasserhochzeit im Kemptener Stadtbad, mit Pressluftflaschen und Bleigürteln',
                'Richter Alexander Hold, von der gleichnamigen Fernsehserie, ist in Kempten geboren',
                'Die Bücherserie Kommissar Kluftinger spielt in Kempten',
                'Ein Kemptener Rentner hatte sein Auto nach einem halben Jahr wieder bekommen, nachdem er vergessen hatte wo er geparkt hat'
            ],
            SKILL_NAME: 'Kempten Fakten',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über Kempten“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!'
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random fact from the facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
