import React from 'react';
import { TabContainer, Tab, Title} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import '@ui5/webcomponents-icons/dist/icons/database.js';
import { makeStyles } from '@material-ui/core/styles';
import './eventTyp.css';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

const DetailDefault = (props) => {

    const detailEvent = props.event;

    const useStyles = makeStyles({
        table: {
            width: 400,
        }
    });
    const classes = useStyles();


    return (
        <TabContainer >
                <Tab text="Attributes" icon="database" >
                    {detailEvent.attributes.length === 0 ? (<Title level="H5" style={spacing.sapUiLargeMargin}>Keine Attribute vorhanden</Title>)
                        : (
                            <div className="attributeTable">
                                <Table className={classes.table} size="small" >
                                    <TableBody>
                                        {detailEvent.attributes.map(row => (
                                            <TableRow key={row.name}>
                                                <TableCell align="center">{row.value}:</TableCell>
                                                <TableCell align="left">{row.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                </Tab>
            </TabContainer>
    );
}

DetailDefault.propTypes = {
    event: PropTypes.object
} 

export default DetailDefault;