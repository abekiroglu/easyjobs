import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import React from 'react';
import Select from 'react-select';

const marks = [
    {
        value: 0,
        label: 'Not important',
    },
    {
        value: 25,
        label: 'Slighly important',
    },
    {
        value: 50,
        label: 'Important',
    },
    {
        value: 75,
        label: 'Very Important',
    },
    {
        value: 100,
        label: 'Necessary',
    },
];

function valuetext(value) {
    return `${value}`;
}

function valueLabelFormat(value) {
    return marks.findIndex(mark => mark.value === value) + 1;
}

export default function renderProfessionPicker(props) {
    const { skills } = props;

    return (

        <div>
            {
                skills.map()
            }
            <Typography id="discrete-slider-restrict" gutterBottom>
                Restricted values
            </Typography>
            <Slider
                defaultValue={1}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </div>
    );

}