import React from 'react';
import Select from 'react-select';

export default function renderProfessionPicker(props) {


    const options = props.professions.map(profession => {
        return { value: profession, label: profession.title }
    })

    return <Select
        value={props.selectedProfession}
        onChange={props.handleProfessionChange}
        options={options} />;

}