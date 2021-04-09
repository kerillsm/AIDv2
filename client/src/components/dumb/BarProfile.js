import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from '@nivo/bar'
import {withRouter} from 'react-router-dom'




function BarProfile(props) {
    const height = props.data.length<5?75*props.data.length:50*props.data.length
    console.log('высота',height);
    let fun=id=>{
        return props.history.push(`/profile/goal/${id.data.id}`)
    }
    return (
        <div>
            {props.data.length && <Bar
                data={props.data}

                width={700}
                height={height}
                indexBy="title"
                animate={true}
                margin={{top:0, right: 10, bottom: 30, left: 250}}
                maxValue={100}
                keys={["Passed","Left"]}
                padding={0.3}
                labelTextColor="inherit:darker(3)"
                labelSkipWidth={16}
                labelSkipHeight={16}
                layout="horizontal"
                colors={["d320"]}
                colorBy ={({ id, data }) => {
                    return data[`${id}Color`]}}
                axisTop={{
		    "orient": "top",
            "tickSize": 5,
            "tickPadding": 2,
            "tickRotation": 0,
            "legend": "Progress, %",
            "legendPosition": "left",
            "legendOffset": 36
				}}
                axisBottom={null}
                onClick={(id)=>fun(id)}
            />}
        </div>
    );
}

BarProfile.propTypes = {};
BarProfile.defaultProps = {};

export default withRouter(BarProfile);
