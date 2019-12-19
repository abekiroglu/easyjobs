import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import React from 'react';


const marks = [
    {
        value: 0,
        label: 'Good to have',
    },
    {
        value: 25,
        label: '',
    },
    {
        value: 50,
        label: '',
    },
    {
        value: 75,
        label: '',
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
    var mark = `${value}%`;

    return mark;
}

export default function skillWeightAdjuster(props) {
    const classes = props.classes;
    const { skills, onChange, tags } = props;
    return (

        <div className={classes.swaWrapper}>
            {
                skills.map(skill => {
                    return (<div className={classes.waWrapper}>
                        {skill.description ?
                            <Typography id="discrete-slider-restrict" gutterBottom>
                                {skill.description}
                            </Typography>
                            : null}
                        <Slider
                            id={skill.id}
                            onChange={onChange}
                            classes={{ root: classes.sliderRoot }}
                            defaultValue={skill.weight ? skill.weight * 100 : 0}
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            valueLabelDisplay="auto"
                            marks={tags ? tags : marks}
                        />
                    </div>)
                })
            }
        </div>
    );

}