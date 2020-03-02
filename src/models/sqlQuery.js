const SQLQuery = {
    allEventsQuery: function () {
        let querySpec = {
            query: "SELECT * FROM events e ORDER BY e.eventDate DESC"
        };
        return querySpec;
    },

    singleEventQuery: function (eventID) {
        let querySpec = {
            query: "SELECT * FROM events e WHERE e.id = @id",
            parameters: [
                {
                    name: "@id",
                    value: eventID
                }
            ]
        };
        return querySpec;
    },

    allEventTypsfromEventsQuery: function () {
        let querySpec = {
            query: "SELECT e.eventTyp AS text, e.eventTyp AS key FROM events e GROUP BY e.eventTyp",
        };
        return querySpec;
    },

    namesOfAllEventTypsQuery: function () {
        let querySpec = {
            query: "SELECT t.name AS text, t.id AS key FROM eventTyps t ORDER BY t.name"
        };
        return querySpec;
    },

    attributeValuesQuery: function (attributeName) {
        let querySpec = {
            query: "SELECT v AS text, v AS key FROM attributes a JOIN v IN a.values WHErE a.name = @attributeName",
            parameters: [
                {
                    name: "@attributeName",
                    value: attributeName
                }
            ]
        };
        return querySpec;
    },

    inputAttributesFromEventTypQuery: function (eventTyp) {
        let querySpec = {
            query: "SELECT t.inputAttribute FROM eventTyp t WHERE t.name = @eventTyp",
            parameters: [
                {
                    name: "@eventTyp",
                    value: eventTyp
                }
            ]
        };
        return querySpec;
    },



}

export default SQLQuery;