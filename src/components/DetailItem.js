import React from 'react';
import { Title, FlexBox, Label} from '@ui5/webcomponents-react'
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import './masterDetail.css';
import { Grid } from '@material-ui/core';
import DetailDefault from '../eventTyp/detailDefault'
import DetailWurf from '../eventTyp/detailWurf'
import DetailProblem from '../eventTyp/detailProblem'
import PropTypes from 'prop-types';

const DetailItem = (props) => {

    const detailEvent = props.event;

    const renderSwitch = () => {
        switch (detailEvent.eventTyp) {
            case "Wurf-Buchung":
                return (
                    <div>
                        <DetailWurf event={detailEvent} />
                    </div>);
            case "Problem":
                return (
                    <div>
                        <DetailProblem event={detailEvent} />
                    </div>);
            default:
                return <DetailDefault event={detailEvent}/>
        }

    }

    return (

        <div>
            <div className="titleHeader">
                <Title level="H6">Details</Title>
            </div>
            <FlexBox alignItems="Start" direction="Column" className="detailHeader" style={spacing.sapUiContentPadding}>
                <Title level="H4" style={spacing.sapUiSmallMarginBegin}>{detailEvent.message}</Title>
                <Grid container spacing={2} direction="row" justify="flex-start" style={spacing.sapUiTinyMarginBegin}>
                    <Grid item xs={3}>
                        <FlexBox direction="Column">
                            <Label className="information">Ereignis: {detailEvent.eventTyp}</Label>
                        </FlexBox>
                    </Grid>
                    <Grid item xs={3}>
                        <FlexBox direction="Column">
                            <Label className="information">Ereignisdatum: {detailEvent.eventDate}</Label>
                        </FlexBox>
                    </Grid>
                    <Grid item xs={5}>
                        <FlexBox direction="Column">
                            <Label className="information">Meldung: {detailEvent.message}</Label>
                        </FlexBox>
                    </Grid>
                </Grid>
            </FlexBox>
            {renderSwitch()}
            
        </div >
    );
}

DetailItem.propTypes = {
    event: PropTypes.object
}


export default DetailItem;