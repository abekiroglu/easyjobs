import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomInput from "components/CustomInput/CustomInput.js";
import { TextField } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import { getProfession } from "redux/actions/profession";
import { getAdvr } from "redux/actions/advertisement";
import { select } from '../../../node_modules/redux-saga/effects';
import RemoveIcon from '@material-ui/icons/Remove';
import { getAdvrs } from 'redux/actions/company';

class AdvertisementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAd: null,
            action: null,
            selectedSGs: [],
            availableSGs: [],
            selectedSkills: [],
            availableSkills: [],
            adId: null
        };
    }

    componentDidMount() {
        const { getProfessions, getAdvertisements } = this.props;
        getProfessions();
        getAdvertisements();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.adId !== this.state.adId) {
            const { getAdvertisement } = this.props;
            let payload = {
                advertisementId: parseInt(this.state.adId)
            }
            getAdvertisement(payload);
        }
        if (this.props.advertisement !== prevProps.advertisement) {
            this.setState({
                selectedAd: this.props.advertisement
            })
        }

    }

    getAdvertisementsAsArray = () => {
        const { advertisements } = this.props;
        var adsArr = []
        advertisements.forEach(obj => {
            adsArr.push([obj.id, obj.publishDate, obj.validUntil, obj.description, obj.requirements.length, obj.comments.length]);
        });
        return adsArr;
    }
    getSelectedAdvertisementAsArray = () => {
        const { selectedAd } = this.state;
        return [[selectedAd.id, selectedAd.publishDate, selectedAd.validUntil, selectedAd.description, selectedAd.requirements.length, selectedAd.comments.length]];
    }
    onClickView = e => {
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        this.setState({
            selectedAd: null,
            adId: adId,
            action: 'view'
        })
    }
    onClickEdit = e => {
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        this.setState({
            selectedAd: null,
            adId: adId,
            action: 'edit'
        })
    }
    onClickDelete = e => {
        const { advertisements } = this.props;
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        var selectedAd = advertisements.filter(ad => ad.id === parseInt(adId))[0];
        this.setState({
            selectedAd: selectedAd,
            action: 'delete'
        })
    }

    onDescriptionChange = e => {
        var newDescription = e.currentTarget.value;
        this.setState({
            selectedAd: {
                ...this.state.selectedAd,
                description: newDescription
            }
        })
    }
    onDateChange = e => {
        var modifiedDate = e.currentTarget.value.split('-');
        modifiedDate = `${modifiedDate[2]}-${modifiedDate[1]}-${modifiedDate[0]}`
        this.setState({
            selectedAd: {
                ...this.state.selectedAd,
                validUntil: modifiedDate
            }
        })
    }
    toStandardDate(date, pattern) {
        var patternArr = pattern.split('-');
        var dateArr = date.split('-');
        var day;
        var month;
        var year;

        var i;
        for (i = 0; i < patternArr.length; i++) {
            if (patternArr[i] === 'dd') {
                day = dateArr[i];
            } else if (patternArr[i] === 'MM') {
                month = dateArr[i];
            } else if (patternArr[i] === 'yyyy') {
                year = dateArr[i];
            }
        }

        return `${year}-${month}-${day}`;
    }

    getAvailableSkillGroups = () => {
        const { advertisement, professions } = this.props
        const profession = professions.filter(p => p.id === advertisement.professionId)[0];
        const professionSkillGroups = profession['skills'];
        var selectedSGs = [];
        // {sgid, sid}
        var professionSkills = []
        // [...id]
        const adSkills = advertisement.requirements.map(req => req.skill.id);
        var i;
        for (i = 0; i < professionSkillGroups.length; i++) {
            var sg = professionSkillGroups[i];
            var skills = sg.skills.map(s => s.id);

            var j;
            for (j = 0; j < sg.skills.length; j++) {
                let obj = {
                    sgid: sg.id,
                    sid: skills[j]
                }
                professionSkills.push(obj);
            }
        }
        selectedSGs = professionSkills.filter(ps => adSkills.includes(ps.sid)).map(sg => sg.sgid);
        selectedSGs = selectedSGs.filter((id, idx) => selectedSGs.indexOf(id) === idx);
        selectedSGs = professionSkillGroups.filter(sg => !selectedSGs.includes(sg.id));
        var sgArr = []
        selectedSGs.forEach(obj => {
            sgArr.push([obj.id, obj.description, obj.skills.length]);
        });
        return sgArr;
    }
    getSelectedSkillGroups = () => {
        const { advertisement, professions } = this.props
        const profession = professions.filter(p => p.id === advertisement.professionId)[0];
        const professionSkillGroups = profession['skills'];
        var selectedSGs = [];
        // {sgid, sid}
        var professionSkills = []
        // [...id]
        const adSkills = advertisement.requirements.map(req => req.skill.id);
        var i;
        for (i = 0; i < professionSkillGroups.length; i++) {
            var sg = professionSkillGroups[i];
            var skills = sg.skills.map(s => s.id);

            var j;
            for (j = 0; j < sg.skills.length; j++) {
                let obj = {
                    sgid: sg.id,
                    sid: skills[j]
                }
                professionSkills.push(obj);
            }
        }

        selectedSGs = professionSkills.filter(ps => adSkills.includes(ps.sid)).map(sg => sg.sgid);
        selectedSGs = selectedSGs.filter((id, idx) => selectedSGs.indexOf(id) === idx);
        selectedSGs = professionSkillGroups.filter(sg => selectedSGs.includes(sg.id));
        var sgArr = []
        selectedSGs.forEach(obj => {
            sgArr.push([obj.id, obj.description, obj.skills.length]);
        });
        return sgArr;
    }

    getAvailableSkills = () => {
        const { advertisement, professions } = this.props
        const profession = professions.filter(p => p.id === advertisement.professionId)[0];
        const professionSkillGroups = profession['skills'];
        var availableSkills = [];
        // {sgid, sid}
        var professionSkills = []
        // [...id]
        const adSkills = advertisement.requirements.map(req => req.skill.id);
        var i;
        for (i = 0; i < professionSkillGroups.length; i++) {
            var sg = professionSkillGroups[i];
            var skills = sg.skills;

            var j;
            for (j = 0; j < sg.skills.length; j++) {
                professionSkills.push(skills[j]);
            }
        }

        var selectedSGs = professionSkills.filter(ps => adSkills.includes(ps.id)).map(sg => sg.sgid);
        selectedSGs = selectedSGs.filter((id, idx) => selectedSGs.indexOf(id) === idx);
        selectedSGs = professionSkillGroups.filter(sg => selectedSGs.includes(sg.id));

        availableSkills = professionSkills.filter(ps => !adSkills.includes(ps.id));
        var sArr = []
        availableSkills.forEach(obj => {
            sArr.push([obj.id, obj.description]);
        });
        return sArr;
    }
    getSelectedSkills = () => {
        const { advertisement, professions } = this.props
        const profession = professions.filter(p => p.id === advertisement.professionId)[0];
        const professionSkillGroups = profession['skills'];
        var selectedSkills = [];
        // {sgid, sid}
        var professionSkills = []
        // [...id]
        const adSkills = advertisement.requirements.map(req => req.skill.id);
        var i;
        for (i = 0; i < professionSkillGroups.length; i++) {
            var sg = professionSkillGroups[i];
            var skills = sg.skills;

            var j;
            for (j = 0; j < sg.skills.length; j++) {
                professionSkills.push(skills[j]);
            }
        }
        selectedSkills = professionSkills.filter(ps => adSkills.includes(ps.id));

        var sArr = []
        selectedSkills.forEach(obj => {
            sArr.push([obj.id, obj.description]);
        });
        return sArr;
    }

    render() {
        const { classes, advertisement, professions, advertisements } = this.props;
        const actions = [<EditIcon onClick={this.onClickEdit} />,
        <DeleteIcon onClick={this.onClickDelete} />];
        const skillAddAction = [<AddIcon onClick={this.onClickEdit} />];
        const skillRemoveAction = [<RemoveIcon onClick={this.onClickDelete} />]
        const skillGroupAddAction = [<AddIcon onClick={this.onClickEdit} />];
        const skillGroupRemoveAction = [<RemoveIcon onClick={this.onClickDelete} />]
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info" plain>
                            <h4 className={classes.cardTitleDark}>Your Advertisements</h4>
                            <p className={classes.cardCategoryDark}>
                                Sorted by publishment order
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="info"
                                tableHead={["Id", "Published At",
                                    "Valid Until", "Description",
                                    "Requirements", "Comments"]}
                                tableData={advertisements ? this.getAdvertisementsAsArray() : []}
                                actions={actions}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                {this.state.selectedAd && this.state.action === 'edit' ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary" plain>
                                <h4 className={classes.cardTitleWhite}>Edit Advertisement</h4>
                                <p className={classes.cardCategoryWhite}>Spaces can be left empty</p>
                            </CardHeader>
                            <CardBody>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Id", "Published At",
                                        "Valid Until", "Description",
                                        "Requirements", "Comments"]}
                                    tableData={this.getSelectedAdvertisementAsArray()}
                                />
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            id="date"
                                            label="Valid Until"
                                            type="date"
                                            defaultValue={this.toStandardDate(this.state.selectedAd.validUntil, "dd-MM-yyyy")}
                                            className={classes.textField}
                                            style={{ marginTop: 27, marginBottom: 35 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{ onChange: this.onDateChange }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Type a new advertisement description"
                                            id="about-ad"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 5,
                                                onChange: this.onDescriptionChange,
                                                value: this.state.selectedAd.description
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="success" plain>
                                                <h4 className={classes.cardTitleDark}>Available Skill Groups</h4>
                                            </CardHeader>
                                            <CardBody>
                                                {advertisement && professions ?
                                                    <Table
                                                        tableHeaderColor="success"
                                                        tableHead={["Id", "Description", "Skills"]}
                                                        tableData={this.getAvailableSkillGroups()}
                                                        actions={skillGroupAddAction}
                                                    />
                                                    : null}

                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="warning" plain>
                                                <h4 className={classes.cardTitleDark}>Selected Skill Groups</h4>
                                            </CardHeader>
                                            <CardBody>
                                                {advertisement && professions ?
                                                    <Table
                                                        tableHeaderColor="warning"
                                                        tableHead={["Id", "Description", "Skills"]}
                                                        tableData={this.props.professions ? this.getSelectedSkillGroups() : []}
                                                        actions={skillGroupRemoveAction}
                                                    />
                                                    : null}
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="success" plain>
                                                <h4 className={classes.cardTitleDark}>Available Skills</h4>
                                            </CardHeader>
                                            <CardBody>
                                                {advertisement && professions ?
                                                    <Table
                                                        tableHeaderColor="success"
                                                        tableHead={["Id", "Description"]}
                                                        tableData={this.props.professions ? this.getAvailableSkills() : []}
                                                        actions={skillAddAction}
                                                    />
                                                    : null}
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="warning" plain>
                                                <h4 className={classes.cardTitleDark}>Selected Skills</h4>
                                            </CardHeader>
                                            <CardBody>
                                                {advertisement && professions ?
                                                    <Table
                                                        tableHeaderColor="warning"
                                                        tableHead={["Id", "Description"]}
                                                        tableData={this.props.professions ? this.getSelectedSkills() : []}
                                                        actions={skillRemoveAction}
                                                    />
                                                    : null}
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                    :
                    null}
            </GridContainer>
        );
    }
}



const mapStateToProps = state => {
    return {
        professions: state.profession.professions,
        advertisement: state.advertisement.advertisement,
        advertisements: state.company.advertisements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfessions: bindActionCreators(getProfession.request, dispatch),
        getAdvertisement: bindActionCreators(getAdvr.request, dispatch),
        getAdvertisements: bindActionCreators(getAdvrs.request, dispatch)
    };
};


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    cardCategoryDark: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(114, 114, 114)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleDark: {
        color: "#727272",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdvertisementPage));