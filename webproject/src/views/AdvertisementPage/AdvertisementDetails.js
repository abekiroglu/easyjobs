import React from 'react';
import CustomInput from "components/CustomInput/CustomInput.js"
import TextField from '@material-ui/core/TextField'
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import Button from "components/CustomButtons/Button.js"
import { Typography } from '../../../node_modules/@material-ui/core';

export default function advertisementDetails(props) {
    const { classes, onDescriptionChange, onValidUntilChange, onTitleChange, onClickSave, color, description, title } = props;

    return (

        <div>
            <CustomInput
                labelText="Job Title"
                id="job-title"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    onChange: onTitleChange,
                    defaultValue: title
                }}
            />
            <TextField
                id="date"
                label="Valid Until"
                type="date"
                defaultValue={`${new Date().getUTCFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
                className={classes.textField}
                style={{ marginTop: 27, marginBottom: 35 }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ onChange: onValidUntilChange }}
            />
            <InputLabel style={{ color: "#AAAAAA" }}>Description</InputLabel>
            <CustomInput
                labelText="Type a short explanation about the job."
                id="about-job"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    multiline: true,
                    rows: 5,
                    onChange: onDescriptionChange,
                    defaultValue: description
                }}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button color={color} onClick={onClickSave} disabled={color === 'danger'}>
                    <SaveIcon />
                    <Typography>
                        Publish
                </Typography>
                </Button>
            </div>
        </div>
    );

}