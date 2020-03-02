import React, { useEffect, useState } from 'react';
import { Form, FormItem, Input, Title} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import Event from "../models/event";
import './eventTyp.css';
import SaveFooter from "./saveFooter"
import dbClient from '../models/dbClient'
import PropTypes from 'prop-types';

function CreateWurf(props) {
    useEffect(() => {
        fetchInputAttributes();
    }, []);

    let [inputAttributeList, setInputAttributeTyps] = useState([]);

    const fetchInputAttributes = async () => {
        const attributeList = await dbClient.fetchAllInputAttributes("Wurf-Buchung");
        setInputAttributeTyps(attributeList.inputAttribute);
    }

    let newEvent = new Event();

    const onHandleSave = () => {
        inputAttributeList.map( item  => (
            newEvent[item] = document.getElementById(item).value
        ));
        props.save(newEvent);
    }


    return (
        <div >
            <Title level="H5" style={spacing.sapUiSmallMargin}>Attribute für Eventtyp: Wurf-Buchung</Title>
            <Form style={{ width: '90vw', justifyContent: "flex-start", marginBottom: '7vh'}}>
                {inputAttributeList.map((item, i) => (
                    <FormItem key={i} labelText={item} style={spacing.sapUiTinyMargin}>
                        <Input id={item}></Input>
                    </FormItem>
                ))}
            </Form>
            <SaveFooter save={onHandleSave}/>
        </div>
    );
}


CreateWurf.propTypes = {
    save: PropTypes.func.isRequired
}

export default CreateWurf;