const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import 'reflect-metadata';
import bodyParser from 'body-parser';
import {importSchema} from 'graphql-import';
import {makeExecutableSchema} from 'graphql-tools';
import {collectiveResolver} from './resolvers/collectiveResolver';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const collectiveSchema = importSchema(`${__dirname}/schemas/collectiveSchema.graphql`);
const schema = makeExecutableSchema({
    typeDefs: [collectiveSchema],
    resolvers: collectiveResolver,
    logger: console
});

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: schema}));
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

module.exports = app;
