import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import SlideView from "components/SlideView/SlideView.js"
import { getProfession } from "redux/actions/profession"
import SkillPicker from './SkillPicker.js'
import ProfessionPicker from './ProfessionPicker.js'
import { debug } from 'util';

class NewAdvertisementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            selectedProfession: null,
            selectedSGs: [],
            selectedSkills: [],
            availableSGs: [],
            availableSkills: []
        };
    }

    componentDidMount() {
        const { getProfessions } = this.props;
        getProfessions();
    }

    onSlideViewChange = (e, newVal) => {
        this.setState({
            page: newVal
        })
    }

    onNavigateBefore = e => {
        const { page } = this.state;
        if (page > 1) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    onNavigateNext = e => {
        const { page } = this.state;
        if (page < 3) {
            this.setState({
                page: this.state.page + 1
            }, () => this.getView())
        }
    }

    handleProfessionChange = option => {
        const availableSGs = option.value.skills;
        const sgArr = [];
        availableSGs.forEach(sg => {
            sgArr.push(sg);
        });

        this.setState({
            selectedProfession: option,
            availableSGs: sgArr
        }, () => this.onNavigateNext());
    };

    availableSGs() {
        const { availableSGs } = this.state;
        debugger;
        var sArr = []
        availableSGs.forEach(sg => {
            sArr.push([sg.id, sg.description, sg.skills.length]);
        });
        return sArr;
    }
    selectedSGs() {
        const { selectedSGs } = this.state;

        var sArr = []
        selectedSGs.forEach(sg => {
            sArr.push([sg.id, sg.description, sg.skills.length]);
        });
        return sArr;
    }
    availableSkills() {
        const { availableSkills } = this.state;

        var sArr = []
        availableSkills.forEach(s => {
            sArr.push([s.id, s.description]);
        });
        return sArr;
    }
    selectedSkills() {
        const { selectedSkills } = this.state;

        var sArr = []
        selectedSkills.forEach(s => {
            sArr.push([s.id, s.description]);
        });
        return sArr;
    }

    onClickSkillAdd = e => {
        const { availableSkills, selectedSkills } = this.state;

        var id = parseInt(e.currentTarget.parentElement.parentElement.id);
        var aS = [...availableSkills];

        var idx = aS.map(s => { return s.id }).indexOf(id);
        var sS = aS.splice(idx, 1)[0];

        this.setState({
            availableSkills: aS,
            selectedSkills: [...selectedSkills, sS]
        })
    }

    onClickSGAdd = e => {
        const { availableSGs, selectedSGs, availableSkills } = this.state;

        var aSG = [...availableSGs];
        var id = parseInt(e.currentTarget.parentElement.parentElement.id);

        var idx = availableSGs.map(sg => { return sg.id }).indexOf(id);
        var sSG = aSG.splice(idx, 1)[0];

        var aS = sSG.skills;

        this.setState({
            selectedSGs: [...selectedSGs, sSG],
            availableSGs: aSG,
            availableSkills: [...availableSkills, ...aS]
        })
    }

    onClickSkillRemove = e => {
        const { availableSkills, selectedSkills } = this.state;
        debugger;
        var id = parseInt(e.currentTarget.parentElement.parentElement.id);
        var sS = [...selectedSkills];

        var idx = sS.map(s => { return s.id }).indexOf(id);
        var aS = sS.splice(idx, 1)[0];

        this.setState({
            availableSkills: [...availableSkills, aS],
            selectedSkills: sS
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

        debugger;
        var aS = [...availableSkills];
        var sS = [...selectedSkills];
        aS = aS.filter(skill => !aSG.skills.map(skills => skills.id).includes(skill.id));
        sS = sS.filter(skill => !aSG.skills.map(skills => skills.id).includes(skill.id));
        debugger;
        this.setState({
            selectedSGs: sSG,
            availableSGs: [...availableSGs, aSG],
            availableSkills: aS,
            selectedSkills: sS
        })
    }


    renderForm() {
        return <div> sas </div>;
    }

    getView() {
        const { page } = this.state;
        switch (page) {
            case 1:
                return <ProfessionPicker
                    professions={this.props.professions}
                    selectedProfession={this.state.selectedProfession}
                    handleProfessionChange={this.handleProfessionChange} />

            case 2:
                return <SkillPicker
                    classes={this.props.classes}
                    onClickSkillAdd={this.onClickSkillAdd}
                    onClickSGAdd={this.onClickSGAdd}
                    onClickSkillRemove={this.onClickSkillRemove}
                    onClickSGRemove={this.onClickSGRemove}
                    availableSGs={this.availableSGs()}
                    selectedSGs={this.selectedSGs()}
                    availableSkills={this.availableSkills()}
                    selectedSkills={this.selectedSkills()} />
            case 3:
                return null;
            default:
                break;
        }
    }

    render() {
        const { classes, professions } = this.props;
        const { page } = this.state;

        const view = professions ? this.getView() : null;

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary" plain>
                            <h4 className={classes.cardTitleWhite}>New Advertisement</h4>
                            <p className={classes.cardCategoryWhite}>
                                {page === 1 ? 'Choose a profession' : null}
                                {page === 2 ? 'Choose Skills' : null}
                                {page === 3 ? 'Fill in the details' : null}
                            </p>
                        </CardHeader>
                        <CardBody>
                            <SlideView
                                view={view}
                                value={page}
                                onChange={this.onSlideViewChange}
                                onNavigateBefore={this.onNavigateBefore}
                                onNavigateNext={this.onNavigateNext} />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}



const mapStateToProps = state => {
    return {
        company: state.company.company,
        professions: state.profession.professions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfessions: bindActionCreators(getProfession.request, dispatch)
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewAdvertisementPage));