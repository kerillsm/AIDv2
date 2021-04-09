

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pie} from '@nivo/pie'



class PieProfile extends Component {

    render() {
        console.log('PieProfile',this.props);
        return (
            <div>
                <Pie
                    width={400}
                    height={250}
                    data={this.props.data}
                    margin={{
                        "top": 20,
                        "right": 50,
                        "bottom": 20,
                        "left": 50
                    }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors="d320"
                    colorBy="id"
                    borderColor="inherit:darker(0.6)"
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor="inherit"
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
        );
    }
}

PieProfile.propTypes = {};
PieProfile.defaultProps = {};

export default PieProfile;



