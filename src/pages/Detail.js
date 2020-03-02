import React, { useState, useEffect } from 'react';
import '../App.css';
import DetailItem from '../components/DetailItem';
import { Title } from '@ui5/webcomponents-react'
import { spacing } from "@ui5/webcomponents-react-base";
import dbClient from '../models/dbClient'

function Detail({ match }) {
    useEffect(() => {
        fetchDetails();
    }, []);

    const example = { "attributes": [] };
    const eventID = match.params.id;
    let [renderEvent, setRenderEvent] = useState(false);
    let [detailEvent, setDetailEvent] = useState(example);

    const fetchDetails = async () => {
        const event = await dbClient.fetchSingleEvent(eventID);
        if (event !== undefined) {
            setDetailEvent(event);
            setRenderEvent(true);
        }
    };

    return (
        <div>
            {renderEvent ?
                (<DetailItem event={detailEvent}></DetailItem>)
                : (<Title level="H3" style={spacing.sapUiLargeMargin}>Kein Ereignis unter dieser ID vorhanden</Title>)}
        </div>

    )
}

export default Detail;