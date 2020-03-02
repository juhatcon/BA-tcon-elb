import React from 'react';
import { Button, FlexBox } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import './eventTyp.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SaveFooter = props => {

    const useStyles = makeStyles(theme => ({
        appBar: {
            top: "auto",
            bottom: 0,
            marginTop: " 5vh"
        }
    }));
    const classes = useStyles();
    const history = useHistory();

    const onHandleSave = () => {
        props.save();
    }

    const onHandleCancel = () => {
        history.goBack();
    }


    return (
        <AppBar position="fixed" color="transparent" className={classes.appBar} style={spacing.sapUiLargeMarginTop}>
            <FlexBox className="footerBar" justifyContent="SpaceBetween" >
                <Button className="saveButton" design="Transparent" icon="save" onClick={onHandleCancel}>Abbrechen</Button>
                <Button className="saveButton" design="Transparent" icon="save" onClick={onHandleSave}>Speichern</Button>
            </FlexBox>
        </AppBar>
    );
}

SaveFooter.propTypes = {
    save: PropTypes.func.isRequired
}

export default SaveFooter;