import React, { useEffect, useState } from 'react';
import { Form, FormItem, Text } from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import './eventTyp.css';
import dbClient from '../models/dbClient'
import PropTypes from 'prop-types';


function DetailWurf(props) {

    const detailEvent = props.event;

    useEffect(() => {
        fetchInputAttributes();
    }, []);

    let [inputAttributeList, setInputAttributeTyps] = useState([]);

    const fetchInputAttributes = async () => {
        const attributeList = await dbClient.fetchAllInputAttributes("Wurf-Buchung");
        setInputAttributeTyps(attributeList.inputAttribute);
    }

    return (
        <Form style={{ marginTop: '2vh' }}>
            {inputAttributeList.map((item, i) => (
                <FormItem key={i} labelText={item} style={spacing.sapUiTinyMargin}>
                    <Text id={item}>{detailEvent[item]}</Text>
                </FormItem>
            ))}
        </Form>
    );
}

DetailWurf.propTypes = {
    event: PropTypes.object.isRequired
}


export default DetailWurf;