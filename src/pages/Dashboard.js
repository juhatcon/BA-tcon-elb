import React, { useState } from 'react';
import { Button } from '@ui5/webcomponents-react/lib/Button';
import {
    Card, Text, Icon
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import '@ui5/webcomponents-icons/dist/icons/horizontal-bar-chart.js';
import '@ui5/webcomponents-icons/dist/icons/line-chart.js';

function Dashboard() {

    const [toggleCharts, setToggleCharts] = useState("lineChart");
    const [loading, setLoading] = useState(false);

    const contentTitle = toggleCharts === 'lineChart' ? 'Line Chart' : 'Bar Chart';
    //const switchToChart = toggleCharts === 'lineChart' ? 'Bar Chart' : 'Line Chart';

    const handleHeaderClick = () => {
        if (toggleCharts === "lineChart") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("barChart");
            }, 2000);
        } else {
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("lineChart");
            }, 2000);
        }
    }

    const datasets = [{
        label: "Preise",
        data: [65, 59, 80, 81, 56, 55, 40]
    }];
    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July"
    ];

    return (
        <ThemeProvider withToastContainer>
            <h2>Event Overview</h2>
            <Button onClick={() => alert('Hello World!')}
                style={spacing.sapUiLargeMarginBeginEnd}
            >Hello world!</Button>
            <Card heading="Card" style={{ width: "300px" }}
                avatar={<Icon name={toggleCharts === "lineChart" ? "line-chart" : "horizontal-bar-chart"} />}
                headerInteractive onHeaderClick={handleHeaderClick}>
                <Text style={spacing.sapUiContentPadding} >{contentTitle}</Text>
                {toggleCharts === "lineChart" ? (
                    <LineChart datasets={datasets} labels={labels} loading={loading} />
                ) : (
                        <BarChart datasets={datasets} labels={labels} loading={loading} />
                    )}
            </Card>
        </ThemeProvider>
    )
}

export default Dashboard;