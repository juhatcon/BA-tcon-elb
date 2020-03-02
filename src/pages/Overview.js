import React, { useState, useEffect } from 'react';
import { FilterBar, FlexBox, Label, AnalyticalTable, DatePicker, Button, Input, Title, Select, Option } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import MasterDetail from '../components/MasterDetail';
import '@ui5/webcomponents-icons/dist/icons/screen-split-one';
import '@ui5/webcomponents-icons/dist/icons/undo';
import '@ui5/webcomponents-icons/dist/icons/table-view';
import '../App.css';
import tableColumns from '../models/tableColumns'
import dbClient from '../models/dbClient'

function Overview({ match }) {

    useEffect(() => {
        fetchEvents();
        fetchFilter();
    }, []);


    let [events, setEvents] = useState([]);
    let [filteredEvents, setFilteredEvents] = useState([]);
    let [analyticTableVisibility, setAnalyticTableVisibility] = useState(true);
    let [undoButtonVisibility, setButtonUndoVisibility] = useState(false);
    let [detailID, setDetailID] = useState("");
    let [eventTypFilter, setEventTypFilter] = useState([]);
    let [workplaceFilter, setWorkplaceFilter] = useState([]);
    let [eventSelected, setEventSelected] = useState(false);

    const fetchFilter = async () => {
        const eventTyps = await dbClient.fetchAllEventTypsFromEvents();
        setEventTypFilter(eventTyps);
        const workplaceValues = await dbClient.fetchSingleAttributeValues("workplace");
        setWorkplaceFilter(workplaceValues);
    };


    const fetchEvents = async () => {
        const resources = await dbClient.fetchAllEvents();
        setFilteredEvents(resources);
        setEvents(resources);
    };

    const onRowSelect = async (selectedItem) => {
        setAnalyticTableVisibility(!analyticTableVisibility);
        const item = selectedItem.parameters.row.original;
        setEventSelected(true);
        setDetailID(item);
    };

    const onFilterEvents = () => {
        let newFilteredEvents = events;
        const message = document.getElementById('searchInput').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const workplace = document.getElementById('filterWorkplace').selectedOption.value;
        const eventTyp = document.getElementById('filterEventtyp').selectedOption.value;

        if (message.length > 0) {
            newFilteredEvents = newFilteredEvents.filter(event => event.message.toLowerCase().indexOf(message.toLowerCase()) > -1)
        }

        if (startDate.length > 0) {
            newFilteredEvents = newFilteredEvents.filter(event => event.eventDate > startDate)
        }

        if (endDate.length > 0) {
            newFilteredEvents = newFilteredEvents.filter(event => event.eventDate < endDate)
        }

        if (workplace.length > 0) {
            newFilteredEvents = newFilteredEvents.filter(event => event.workplace.indexOf(workplace) !== -1)
        }

        if (eventTyp.length > 0) {
            newFilteredEvents = newFilteredEvents.filter(event => event.eventTyp.indexOf(eventTyp) !== -1)
        }


        setFilteredEvents(newFilteredEvents);
        setButtonUndoVisibility(true);
    }

    const onSwitchView = (e) => {
        setEventSelected(false);
    }

    const onFilterUndo = () => {
        document.getElementById('searchInput').value = "";
        document.getElementById('startDate').value = "";
        document.getElementById('endDate').value = "";

        let saved = workplaceFilter;
        setWorkplaceFilter([]);
        setWorkplaceFilter(saved);
        saved = eventTypFilter;
        setEventTypFilter([]);
        setEventTypFilter(saved);

        setFilteredEvents(events);
        setButtonUndoVisibility(false);
    }

    return (
        <div>
            <FilterBar>
                <FlexBox direction="Column" style={spacing.sapUiSmallMarginEnd}>
                    <Label>Meldung:</Label>
                    <Input onInput={onFilterEvents} id="searchInput" />
                </FlexBox>
                <FlexBox direction="Column" style={spacing.sapUiSmallMarginEnd}>
                    <Label>Von:</Label>
                    <DatePicker className="filter" onChange={onFilterEvents} id="startDate" formatPattern="yyyy/MM/dd" />
                </FlexBox>
                <FlexBox direction="Column" style={spacing.sapUiSmallMarginEnd}>
                    <Label>Bis:</Label>
                    <DatePicker className="filter" onChange={onFilterEvents} id="endDate" formatPattern="yyyy/MM/dd" />
                </FlexBox>
                <FlexBox direction="Column" style={spacing.sapUiSmallMarginEnd}>
                    <Label>Arbeitsplatz:</Label>
                    <Select id="filterWorkplace" style={{ width: '200px' }} onChange={onFilterEvents}>
                        <Option key="default" selected ></Option>
                        {
                            workplaceFilter.map((item, i) => (
                                <Option key={item.key} value={item.text}>{item.text}</Option>
                            ))}
                    </Select>
                </FlexBox>
                <FlexBox direction="Column" style={spacing.sapUiSmallMarginEnd}>
                    <Label>Ereignistyp:</Label>
                    <Select id="filterEventtyp" style={{ width: '200px' }} onChange={onFilterEvents}>
                        <Option key="default" selected ></Option>
                        {
                            eventTypFilter.map((item, i) => (
                                <Option key={item.key} value={item.text}>{item.text}</Option>
                            ))}
                    </Select>
                </FlexBox>
                {undoButtonVisibility ?
                    <Button style={spacing.sapUiSmallMarginTop} onClick={onFilterUndo}>Undo</Button> : ""}
            </FilterBar>

            <FlexBox justifyContent="Center" className="headerTextContainer">
                <Title level="H5" style={spacing.sapUiTinyMargin}>Events({filteredEvents.length})</Title>
                <Button design="Transparent" onClick={(e) => {
                    setAnalyticTableVisibility(!analyticTableVisibility);
                    setEventSelected(false)
                }}
                    icon={analyticTableVisibility ? "screen-split-one" : "table-view"}
                    tooltip={analyticTableVisibility ? "Switch to Master Detail" : "Switch to Table"} />
            </FlexBox>
            {analyticTableVisibility ? (
                <AnalyticalTable className="anaylyticalTable" selectionMode="SingleSelect" style={spacing.sapUiTinyMarginBeginEnd}
                    id="analyticTable" columns={tableColumns} onRowSelected={onRowSelect} data={filteredEvents}
                    filterable="true" groupable="true" minRows={filteredEvents.length} visibleRows={filteredEvents.length} >
                </AnalyticalTable>
            ) :
                <MasterDetail items={filteredEvents} detailEvent={detailID} eventSelected={eventSelected} switch={onSwitchView} />
            }
        </div>
    )

}

export default Overview;