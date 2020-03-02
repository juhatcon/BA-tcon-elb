import config from '../configDB';
import queryGenerator from '../models/sqlQuery';

const cosmos = require("@azure/cosmos");
const client = new cosmos.CosmosClient(config.connectionString);

const dbClient = {

    async fetchAllEvents() {
        const querySpec = queryGenerator.allEventsQuery();
        const { resources } = await client.database(config.database).container(config.containerEvents).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources;
    },

    async fetchSingleEvent(eventID) {
        const querySpec = queryGenerator.singleEventQuery(eventID);
        const { resources } = await client.database(config.database).container(config.containerEvents).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources[0];
    },

    async fetchAllEventTypsFromEvents() {
        const querySpec = queryGenerator.allEventTypsfromEventsQuery();
        const { resources } = await client.database(config.database).container(config.containerEvents).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources;
    },

    async createSingleEvent(eventBody) {
        const { item } = await client.database(config.database).container(config.containerEvents).items.upsert(eventBody, { enableCrossPartitionQuery: true });
        return item;
    },


    async fetchAllEventTypNames() {
        const querySpec = queryGenerator.namesOfAllEventTypsQuery();
        const { resources } = await client.database(config.database).container(config.containerEventtyp).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources;
    },

    async fetchAllInputAttributes(eventTyp) {
        const querySpec = queryGenerator.inputAttributesFromEventTypQuery(eventTyp);
        const { resources } = await client.database(config.database).container(config.containerEventtyp).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources[0];
    },

    async fetchSingleAttributeValues(attributeName) {
        const querySpec = queryGenerator.attributeValuesQuery(attributeName);
        const { resources } = await client.database(config.database).container(config.containerEventAttribute).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources;
    }

}

export default dbClient;