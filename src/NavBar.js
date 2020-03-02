import React from 'react';
import './App.css';
import { useHistory } from 'react-router-dom';
import { ShellBar} from "@ui5/webcomponents-react";
import '@ui5/webcomponents-icons/dist/icons/add';
import "@ui5/webcomponents-icons/dist/icons/bbyd-dashboard";
import '@ui5/webcomponents-icons/dist/icons/filter-fields';
import { Popover } from '@ui5/webcomponents-react/lib/Popover';

const NavBar = () => {
    const history = useHistory();

    const handleClickOverview = () => {
        closePopover();
        history.push("../");
    };

    const handleClickDashboard = () => {
        closePopover();
        history.push("/dashboard");
    };
    const handleClickCreate = () => {
        closePopover();
        history.push("/create");
    };

    const closePopover = () => {
        const popover = document.getElementById("product-switch-popover");
        popover.close();
    };

    return (
        <div>
            <ShellBar primaryTitle="Mini Enterprise Logbook" showProductSwitch="true"
                onProductSwitchClick={(e) => {
                    document.getElementById('product-switch-popover').openBy(e.getParameter('targetRef'));
                }}>
            </ShellBar>
            <Popover {...{ id: 'product-switch-popover' }} placementType="Bottom">
                <ui5-list separators="None">
                    <ui5-li onClick={handleClickDashboard} icon="bbyd-dashboard">Dashboard</ui5-li>
                    <ui5-li onClick={handleClickOverview} icon="filter-fields">Timeline</ui5-li>
                    <ui5-li onClick={handleClickCreate} icon="add">Create</ui5-li>
                </ui5-list>
            </Popover>
        </div>
    )
}
export default NavBar;