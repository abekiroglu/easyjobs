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
import {
    getAdvr,
    deleteAdvr,
    updateAdvr,
    getRecommendedUsers,
    clearRecommendations
} from "redux/actions/advertisement";
import RemoveIcon from '@material-ui/icons/Remove';
import { getAdvrs } from 'redux/actions/company';
import { isEqual } from 'lodash';
import SkillWeightAdjuster from './SkillWeightAdjuster.js';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import SaveIcon from '@material-ui/icons/Save';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Col, Row } from 'reactstrap'
import ExpandableTable from "components/ExpandableTable/ExpandableTable.js";
import RecommendedUserDetails from "components/RecommendedUserDetails/RecommendedUserDetails.js"

class AdvertisementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAd: null,
            action: 'view',
            selectedSGs: [],
            availableSGs: [],
            selectedSkills: [],
            availableSkills: [],
            adId: null,
            header: 'Your Advertisements',
            title: 'Sorted by publishment order',
            color: 'info'
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
        if (prevState.adId !== this.state.adId && this.state.action === 'hire') {
            const { getRecommendedUsers } = this.props;
            let payload = {
                advertisementId: parseInt(this.state.adId)
            }
            getRecommendedUsers(payload);
        }
        if (this.props.advertisement !== prevProps.advertisement && this.state.action === 'hire') {
            const { advertisement } = this.props;
            this.setState({
                selectedAd: advertisement
            })
        }
        if (this.props.advertisement !== prevProps.advertisement && this.state.action === 'edit') {
            const { advertisement, professions } = this.props;
            const profession = professions.filter(p => p.id === advertisement.professionId)[0];
            var selectedSGs = [];
            var selectedSkills = [];
            var availableSGs = [];
            var availableSkills = [];

            let contains = (sg, req) => {
                var i;
                for (i = 0; i < sg.skills.length; i++) {
                    if (isEqual(sg.skills[i], req.skill)) {
                        return true;
                    }
                }
                return false;
            }

            let containsSG = (sg, selectedSGs) => {
                var i;
                for (i = 0; i < selectedSGs.length; i++) {
                    if (selectedSGs[i].id === sg.id) {
                        return true
                    }
                }
                return false;
            }

            let containsSkill = (skill, selectedSkills) => {
                var i;
                for (i = 0; i < selectedSkills.length; i++) {
                    if (selectedSkills[i].skill.id === skill.id) {
                        return true
                    }
                }
                return false;
            }

            var i;
            for (i = 0; i < advertisement.requirements.length; i++) {
                const req = advertisement.requirements[i];
                selectedSkills.push({
                    ...req,
                    display: [req.skill.id, req.skill.description]
                });
                var selectedSG = profession.skills.filter(sg => contains(sg, req))[0];
                selectedSGs.push(selectedSG);
            }
            availableSGs = profession.skills.filter(sg => !containsSG(sg, selectedSGs)).map(sg => { return { ...sg, display: [sg.id, sg.description, sg.skills.length] } });
            selectedSGs = selectedSGs.filter((v, i) => selectedSGs.indexOf(v) === i).map(sg => { return { ...sg, display: [sg.id, sg.description, sg.skills.length] } });
            var allSkills = [];
            selectedSGs.map(sg => sg.skills).forEach(sArr => {
                allSkills = allSkills.concat(sArr);
            });
            availableSkills = allSkills.filter(s => !containsSkill(s, selectedSkills)).map(s => { return { id: -1, weight: 1, skill: { ...s }, display: [s.id, s.description] } })

            this.setState({
                selectedAd: this.props.advertisement,
                selectedSGs: selectedSGs,
                selectedSkills: selectedSkills,
                availableSGs: availableSGs,
                availableSkills: availableSkills
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

    onClickHire = e => {
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;

        this.setState({
            selectedAd: null,
            adId: adId,
            action: 'hire',
            header: 'View Suitable Candidates',
            title: 'Sorted by id ascending',
            color: 'info'
        })
    }

    onClickEdit = e => {
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        this.setState({
            selectedAd: null,
            adId: adId,
            action: 'edit',
            header: 'Edit Advertisement',
            title: 'Spaces can be left empty',
            color: 'info'
        })
    }

    onClickDelete = e => {
        const { advertisements, deleteAdvertisement } = this.props;

        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        let payload = {
            advertisementId: adId
        }
        deleteAdvertisement(payload);

        var selectedAd = advertisements.filter(ad => ad.id === parseInt(adId))[0];
        this.setState({
            selectedAd: selectedAd
        })
    }

    onClickReturn = e => {
        const { clearRecommendations } = this.props;
        clearRecommendations();
        this.setState({
            selectedAd: null,
            action: 'view',
            selectedSGs: [],
            availableSGs: [],
            selectedSkills: [],
            availableSkills: [],
            adId: null,
            header: 'Your Advertisements',
            title: 'Sorted by publishment order',
            color: 'info'
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

    onTitleChange = e => {
        var newTitle = e.currentTarget.value;
        this.setState({
            selectedAd: {
                ...this.state.selectedAd,
                title: newTitle
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

    _getAvailableSkillGroups = () => {
        var display = [];
        this.state.availableSGs.forEach(sg => {
            display.push(sg.display);
        })
        return display;
    }
    _getSelectedSkillGroups = () => {
        var display = [];
        this.state.selectedSGs.forEach(sg => {
            display.push(sg.display);
        })
        return display;
    }

    _getAvailableSkills = () => {
        var display = [];
        this.state.availableSkills.forEach(s => {
            display.push(s.display);
        })
        return display;
    }

    onSkillWeightChange(e, newVal) {
        const { selectedSkills } = this.state
        var rArr = [...selectedSkills];
        var id = parseInt(e.currentTarget.id);
        var weight = newVal / 100;
        var idx = rArr.map(r => { return r.skill.id }).indexOf(id);
        if (idx !== -1) {
            rArr[idx] = { ...rArr[idx], weight: weight };
        }
        this.setState({
            selectedSkills: rArr
        })
        return null;
    }

    _getSelectedSkills = (classes) => {
        var display = [];
        this.state.selectedSkills.forEach(s => {
            display.push([...s.display,
            <SkillWeightAdjuster
                classes={classes}
                skills={[{ id: s.skill.id, weight: s.weight }]}
                onChange={(e, newVal) => { this.onSkillWeightChange(e, newVal) }}
                tags={tags}
            />]);
        })

        return display;
    }

    onClickSkillAdd = e => {
        const { availableSkills, selectedSkills } = this.state;

        var id = parseInt(e.currentTarget.parentElement.parentElement.id);
        var aS = [...availableSkills];
        var idx = aS.map(s => { return s.skill.id }).indexOf(id);
        var sS = aS.splice(idx, 1)[0];
        this.setState({
            availableSkills: aS,
            selectedSkills: [...selectedSkills, sS]
        })
    }

    onClickSkillRemove = e => {
        const { availableSkills, selectedSkills } = this.state;

        var id = parseInt(e.currentTarget.parentElement.parentElement.id);
        var sS = [...selectedSkills];

        var idx = sS.map(s => { return s.skill.id }).indexOf(id);
        var aS = sS.splice(idx, 1)[0];

        this.setState({
            availableSkills: [...availableSkills, aS],
            selectedSkills: sS
        })
    }

    onClickSGAdd = e => {
        const { availableSGs, selectedSGs, availableSkills } = this.state;

        var aSG = [...availableSGs];
        var id = parseInt(e.currentTarget.parentElement.parentElement.id);

        var idx = availableSGs.map(sg => { return sg.id }).indexOf(id);
        var sSG = aSG.splice(idx, 1)[0];

        var aS = sSG.skills.map(s => { return { id: -1, weight: 1, skill: { ...s }, display: [s.id, s.description] } });

        this.setState({
            selectedSGs: [...selectedSGs, sSG],
            availableSGs: aSG,
            availableSkills: [...availableSkills, ...aS]
        })
    }

    onClickSGRemove = e => {
        const {
            availableSGs,
            selectedSGs,
            availableSkills,
            selectedSkills } = this.state;

        var sSG = [...selectedSGs];
        var id = parseInt(e.currentTarget.parentElement.parentElement.id);

        var idx = selectedSGs.map(sg => { return sg.id }).indexOf(id);
        var aSG = sSG.splice(idx, 1)[0];

        var aS = [...availableSkills];
        var sS = [...selectedSkills];

        aS = aS.filter(s => !aSG.skills.map(skills => skills.id).includes(s.skill.id));
        sS = sS.filter(s => !aSG.skills.map(skills => skills.id).includes(s.skill.id));

        this.setState({
            selectedSGs: sSG,
            availableSGs: [...availableSGs, aSG],
            availableSkills: aS,
            selectedSkills: sS
        })
    }

    onClickSave() {
        const { selectedAd, selectedSkills } = this.state;
        const { updateAdvertisement } = this.props;

        var newRequirements = [];
        var deletedRequirements = [];
        var updatedRequirements = [];
        var validUntil = selectedAd.validUntil;
        var description = selectedAd.description;
        var title = selectedAd.title;

        const prevSkills = selectedAd.requirements;
        prevSkills.forEach(r => {
            var idx = selectedSkills.map(s => { return s.skill.id }).indexOf(r.skill.id);
            if (idx === -1) {
                // deleted skills
                deletedRequirements.push({ skillId: r.skill.id, weight: 0.0 });
            } else {
                // already available skills
                var alreadyAvailableSkill = selectedSkills.splice(idx, 1)[0];
                //is weight changed?
                if (alreadyAvailableSkill.weight !== r.weight) {
                    updatedRequirements.push({ weight: alreadyAvailableSkill.weight, skillId: r.skill.id });
                }
            }
        })
        // added skills
        selectedSkills.forEach(s => {
            newRequirements.push({ weight: s.weight, skillId: s.skill.id });
        })

        let payload = {
            advertisementId: selectedAd.id,
            body: {
                newRequirements: newRequirements,
                deletedRequirements: deletedRequirements,
                updatedRequirements: updatedRequirements,
                validUntil: validUntil,
                description: description,
                title: title
            }
        }
        updateAdvertisement(payload);
    }

    setSort(orderBy, order) {
        this.setState({
            title: `Sorted by ${orderBy} ${order}ending`
        })
    }

    expandableTableArgs() {
        const { recommendedUsers, professions } = this.props;
        var details = [...recommendedUsers];
        const advertisement = this.state.selectedAd;
        var profession = professions.filter(p => p.id === advertisement.professionId)[0];
        details = details.map(detail => {
            var user = { ...detail };
            var picture = user.picture;
            delete user.picture;
            user.matchRate = Math.round(user.matchRate * 100)
            return { header: user, body: advertisement, picture: picture, profession: profession }
        })

        return {
            tableHead: Object.keys(recommendedUsers[0]).filter(key => key !== "picture"),
            tableData: details
        }
    }

    render() {
        const { classes, advertisement, professions, advertisements } = this.props;
        const actions = [
            <PersonAddIcon onClick={this.onClickHire} />,
            <EditIcon onClick={this.onClickEdit} />,
            <DeleteIcon onClick={this.onClickDelete} />];
        const skillAddAction = [<AddIcon onClick={this.onClickSkillAdd} />];
        const skillRemoveAction = [<RemoveIcon onClick={this.onClickSkillRemove} />]
        const skillGroupAddAction = [<AddIcon onClick={this.onClickSGAdd} />];
        const skillGroupRemoveAction = [<RemoveIcon onClick={this.onClickSGRemove} />]
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={this.state.color} plain>
                            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Col lg={7} >
                                    <h4 className={classes.cardTitleDark}>{this.state.header}</h4>
                                    <p className={classes.cardCategoryDark}>
                                        {this.state.title}
                                    </p>
                                </Col>
                                <Col lg={1}>
                                    {this.state.action !== 'view' ?
                                        <Button
                                            onClick={this.onClickReturn}
                                            color='transparent'>
                                            <ArrowBackIcon style={{ color: 'rgb(255, 94, 94)' }} />
                                            <div style={{ color: 'rgb(255, 94, 94)' }}>
                                                Return
                                        </div>
                                        </Button>
                                        : null}
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {this.state.action === 'view' ?
                                <Table
                                    tableHeaderColor="info"
                                    tableHead={["Id", "Published At",
                                        "Valid Until", "Description",
                                        "Requirements", "Comments"]}
                                    tableData={advertisements ? this.getAdvertisementsAsArray() : []}
                                    actions={actions}
                                />
                                : this.state.selectedAd && this.state.action === 'edit' ?
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Job Title"
                                                id="job-title"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    multiline: true,
                                                    rows: 1,
                                                    onChange: this.onTitleChange,
                                                    value: this.state.selectedAd.title
                                                }}
                                            />
                                        </GridItem>
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
                                                            tableData={this._getAvailableSkillGroups()}
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
                                                            tableData={this.props.professions ? this._getSelectedSkillGroups() : []}
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
                                                            tableData={this.props.professions ? this._getAvailableSkills() : []}
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
                                                            tableData={this.props.professions ? this._getSelectedSkills(classes) : []}
                                                            actions={skillRemoveAction}
                                                        />
                                                        : null}
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                    : this.state.action === 'hire' && this.props.recommendedUsers ?
                                        <ExpandableTable
                                            setSort={(orderBy, order) => { this.setSort(orderBy, order) }}
                                            tableHeaderColor="info"
                                            tableBody={RecommendedUserDetails}
                                            {...this.expandableTableArgs()}
                                        />
                                        : null}
                        </CardBody>
                        {this.state.selectedAd && this.state.action === 'edit' ?
                            <CardFooter>
                                <div />
                                <Button
                                    color={'primary'}
                                    onClick={e => { this.onClickSave() }}>
                                    <SaveIcon />
                                    <div>
                                        Update Advertisement
                                        </div>
                                </Button>
                            </CardFooter>
                            : null}
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}



const mapStateToProps = state => {
    return {
        professions: state.profession.professions,
        advertisement: state.advertisement.advertisement,
        advertisements: state.company.advertisements,
        recommendedUsers: state.advertisement.recommendedUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfessions: bindActionCreators(getProfession.request, dispatch),
        getAdvertisement: bindActionCreators(getAdvr.request, dispatch),
        getAdvertisements: bindActionCreators(getAdvrs.request, dispatch),
        deleteAdvertisement: bindActionCreators(deleteAdvr.request, dispatch),
        updateAdvertisement: bindActionCreators(updateAdvr.request, dispatch),
        getRecommendedUsers: bindActionCreators(getRecommendedUsers.request, dispatch),
        clearRecommendations: bindActionCreators(clearRecommendations.request, dispatch)
    };
};

const tags = [
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
    },
    swaWrapper: {
        display: 'grid',
        justifyContent: 'center'
    },
    waWrapper: {
        width: '300px'
    },
    sliderRoot: {
        color: 'rgb(167, 67, 186)'
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdvertisementPage));