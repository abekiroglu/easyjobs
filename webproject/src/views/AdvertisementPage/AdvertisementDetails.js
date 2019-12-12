import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import React from 'react';
import CustomInput from "components/CustomInput/CustomInput.js"

export default function advertisementDetails(props) {
    const {classes, onDescriptionChange, onValidUntilChange} = props;
    return (

        <div>
                    <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{ onChange: onDescriptionChange }}
                    />
                    <CustomInput
                    labelText="Valid Until"
                    id="validUntil"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{ onChange: onValidUntilChange }}
                    />
        </div>
    );

}