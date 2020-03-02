import React from 'react';
import { FlexBox, Label, TextArea } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import Event from "../models/event";
import './eventTyp.css';
import SaveFooter from "./saveFooter"
import PropTypes from 'prop-types';

function CreateProblem(props) {

    let newEvent = new Event();

    const onHandleSave = () => {
        newEvent["problemDescription"] = document.getElementById("problemInput").value;
        props.save(newEvent);
    }


    return (
        <div >
            <FlexBox style={spacing.sapUiLargeMargin}>
                <Label style={spacing.sapUiSmallMargin}>Beschreibung:</Label>
                <TextArea className="inputArea" id="problemInput" growing={true} maxLength={1000}
                showExceededText={true} growingMaxLines={13}/>
            </FlexBox>
            <SaveFooter save={onHandleSave}></SaveFooter>
        </div>
    );
}

CreateProblem.propTypes = {
    save: PropTypes.func.isRequired
}

export default CreateProblem;