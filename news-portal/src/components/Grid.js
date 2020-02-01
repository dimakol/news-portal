import React from 'react';
import News from './News/News';
import Weather from './Weather/Weather';
import Finance from './Finance/Finance';
import Sports from './Sports/Sports';
import Subscribe from './Subscribe/Subscribe';

/* A grid containing tile components */
const grid = (props) => {
    return (
        <div className="row margin-15">
            <News response={props.newsInfo} />
            <Weather response={props.weatherInfo} />
            <Finance response={props.financeInfo} />
            <Sports response={props.sportsInfo} />
            <Subscribe />
        </div>
    )
};

export default grid;