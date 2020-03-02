import React, { useState, useEffect } from 'react';
import { FormItem, Input, InputType, Select, Option, Title, DatePicker } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/save.js';
import '@ui5/webcomponents-icons/dist/icons/database.js';
import '../App.css';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CreateWurf from "../eventTyp/createWurf";
import CreateProblem from "../eventTyp/createProblem";
import dbClient from '../models/dbClient'

function Create() {
    const history = useHistory();

    useEffect(() => {
        fetchAttributes();
    }, []);

    let [eventTypList, setEventTyps] = useState([]);
    let [workplaceList, setWorkplaces] = useState([]);
    let [departmentList, setDepartment] = useState([]);
    let [renderState, setRenderState] = useState();

    const fetchAttributes = async () => {
        const eventTypList = await dbClient.fetchAllEventTypNames();
        const wpList = await dbClient.fetchSingleAttributeValues("workplace");
        const depList = await dbClient.fetchSingleAttributeValues("department");
        setDepartment(depList);
        setWorkplaces(wpList);
        setRenderState(eventTypList[0].text);
        setEventTyps(eventTypList);
    };

    const onHandleSave = async (newEvent) => {
        const createNewEvent = getEventInformation(newEvent);
        const result = await dbClient.createSingleEvent(createNewEvent);
        console.log(result);
        history.push("/");
        window.location.reload(false);
    }

    const getEventInformation = (newEvent) => {
        const eventTyp = document.getElementById('selectEventTyp');
        newEvent.eventTyp = eventTyp.selectedOption.value;

        const workplace = document.getElementById('selectWorkplace');
        newEvent.workplace = workplace.selectedOption.value;

        const department = document.getElementById('selectDepartment');
        newEvent.department = department.selectedOption.value;

        const causingDep = document.getElementById('selectCausingDep');
        newEvent.causingDepartment = causingDep.selectedOption.value;

        const message = document.getElementById('inputMessage');
        newEvent.message = message.value;

        const date = document.getElementById('eventDate');
        newEvent.eventDate = date.value;

        return newEvent;
    }

    const renderSwitch = (eventTyp) => {
        switch (eventTyp) {
            case "Wurf-Buchung":
                return (
                    <div>
                        <CreateWurf save={onHandleSave} />
                    </div>);
            case "Problem":
                return (
                    <div>
                        <CreateProblem save={onHandleSave} />
                    </div>);
            default:
                return <Title>Keine Vorlage zu diesem Eventtyp bekannt </Title>;
        }

    }

    const onHandleTypChange = (event) => {
        setRenderState(event.parameters.selectedOption.value);
    }

    return (
        <div>
            <div className="headerTextContainer">
                <Title level="H5" style={spacing.sapUiSmallMargin}>Neues Ereignis erstellen</Title>
            </div>
            <div style={{ width: '80vw', marginLeft: "3vw" }} >
                <Grid container spacing={2} direction="row" style={spacing.sapUiTinyMargin}>
                    <Grid item xs={6}>
                        <FormItem labelText="Eventtyp:">
                            <Select id="selectEventTyp" onChange={onHandleTypChange} className="formItem" >
                                {eventTypList.map((item, i) => (
                                    <Option key={item.key} value={item.text}>{item.text}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Grid>
                    <Grid item xs={6}>
                        <FormItem labelText="Arbeitsplatz:">
                            <Select id="selectWorkplace" className="formItem" >
                                {workplaceList.map((item, i) => (
                                    <Option key={item.key} value={item.text}>{item.text}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" style={spacing.sapUiTinyMargin}>
                    <Grid item xs={6}>
                        <FormItem labelText="Abteilung:">
                            <Select id="selectDepartment">
                                {departmentList.map((item, i) => (
                                    <Option key={item.key} value={item.text}>{item.text}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Grid>
                    <Grid item xs={6}>
                        <FormItem labelText="Verursachende Abteilung:">
                            <Select id="selectCausingDep">
                                {departmentList.map((item, i) => (
                                    <Option key={item.key} value={item.text}>{item.text}</Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={spacing.sapUiTinyMarginBegin}>
                    <Grid item xs={12}>
                        <FormItem labelText="Meldung:">
                            <Input id="inputMessage" type={InputType.Text} className="formItem" />
                        </FormItem>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" style={spacing.sapUiTinyMargin}>
                    <Grid item xs={6}>
                        <FormItem labelText="Ereignisdatum:">
                            <DatePicker id="eventDate" formatPattern="yyyy/MM/dd"/>
                        </FormItem>
                    </Grid>
                </Grid>
            </div>
            <p className="simpleBorderLine" />
            {renderSwitch(renderState)}
        </div>
    )
}

export default Create;