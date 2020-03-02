import React, { Component } from 'react';
import { Title, FlexBox, ObjectStatus } from '@ui5/webcomponents-react';
import './masterDetail.css';
import { ListItem } from '@material-ui/core';
import '@ui5/webcomponents-icons/dist/icons/add';
import PropTypes from 'prop-types';

class MasterListItem extends Component {
    constructor(props) {
        super(props);
        this.event = this.props.item;
        this.state = {
            hover: false
        }
    }

    onSelectItem() {
        this.props.select(this.event);
    }
    render() {

        return (
            <div id="masterItem">
                <ListItem className="masterItem" onClick={() => this.onSelectItem()} >
                    <FlexBox direction="Column" className="masterInfo">
                        <Title level="H5">{this.event.message}</Title>
                        <ObjectStatus> {this.event.eventTyp} / {this.event.workplace} </ObjectStatus>
                        <ObjectStatus>Ereignisdatum: {this.event.eventDate}</ObjectStatus>
                    </FlexBox>
                </ListItem>
            </div>
        )
    }
}

MasterListItem.propTypes = {
    item: PropTypes.object
}


export default MasterListItem;

