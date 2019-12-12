import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import React from 'react';


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
    var mark = marks.findIndex(mark => mark.value === value) / 5;

    return mark;
}

export default function skillWeightAdjuster(props) {
    const classes = props.classes;
    const { skills, onChange } = props;
    return (

        <div className={classes.swaWrapper}>
            {
                skills.map(skill => {
                    return (<div className={classes.waWrapper}>
                        <Typography id="discrete-slider-restrict" gutterBottom>
                            {skill.description}
                        </Typography>
                        <Slider
                            id={skill.id}
                            onChange={onChange}
                            classes={{ root: classes.sliderRoot }}
                            defaultValue={100}
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </div>)
                })
            }
        </div>
    );

}