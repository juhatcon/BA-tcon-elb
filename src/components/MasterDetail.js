import React, { useState } from 'react';
import { FlexBox, List, Title} from '@ui5/webcomponents-react';
import DetailItem from './DetailItem';
import MasterListItem from './MasterListItem';
import './masterDetail.css';
import { spacing } from '@ui5/webcomponents-react-base';
import PropTypes from 'prop-types';

function MasterDetail(props) {

    const emptyEvent = { "attributes": [] };

    const eventList = props.items;

    const [detailEvent, setDetailEvent] = useState(emptyEvent);
    const [renderDetail, setRender] = useState(false);

    const onItemSelect = (event) => {
        setDetailEvent(event);
        setRender(true);
        props.switch(true);
    }

    return (
        <FlexBox>
            <section className="master">
                <List mode="SingleSelect">
                    {eventList.map((item, i) => (
                        <MasterListItem key={item.id} item={item} select={onItemSelect}></MasterListItem>
                    ))}
                </List>
            </section>
            <section className="detail" >
                {props.eventSelected ? (<DetailItem event={props.detailEvent}></DetailItem>)
                    : (renderDetail ? (<DetailItem event={detailEvent}></DetailItem>)
                        : (<Title level="H4" style={spacing.sapUiLargeMargin}>Wählen Sie ein Ereignis aus</Title>))}
            </section>
        </FlexBox>
    )
}

MasterDetail.propTypes = {
    switch: PropTypes.func,
    eventSelected: PropTypes.bool,
    detailEvent: PropTypes.object,
    items: PropTypes.array
}



export default MasterDetail;