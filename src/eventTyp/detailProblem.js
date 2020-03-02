import React from 'react';
import { FlexBox, Label, Text } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import './eventTyp.css';
import PropTypes from 'prop-types';


const DetailProblem = (props) => {

    const detailEvent = props.event;

    return (
        <div>
            <FlexBox style={spacing.sapUiLargeMargin} justifyContent="Start">
                <Label>Genauere Beschreibung:</Label>
                <Text className="problemDescription">{detailEvent.problemDescription}</Text>
            </FlexBox>
        </div>
    );
}

DetailProblem.propTypes = {
    event: PropTypes.object.isRequired
}


export default DetailProblem;