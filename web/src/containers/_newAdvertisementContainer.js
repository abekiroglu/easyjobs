import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Autocomplete from 'react-autocomplete'
import { DateInput } from '../components/dateInput';
import '../styles/navlink.css';

import { getProfession } from '../actions/profession';
import { stat } from 'fs';
import { select } from '../../node_modules/redux-saga/effects';

class NewAdvertisementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profession: null,
            value: '',
            availableSkillGroups: [],
            selectedSkillGroups: [],
            availableSkills: [],
            selectedSkills: []
        };
    }

    componentDidMount() {
        const { getProfessions } = this.props;
        getProfessions();
    }

    renderProfessionSelector(professions) {
        return (
            <Col>
                <Row> Type a profession name: </Row>
                {professions ?
                    <Row>
                        <Autocomplete
                            getItemValue={(item) => item.title}
                            items={this.props.professions}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.title}
                                </div>
                            }
                            shouldItemRender={(item, value) => value && item.title.toUpperCase().includes(value.toLocaleUpperCase())}
                            value={this.state.value}
                            onChange={e => this.handleProfessionSelection(e.target.value)}
                            onSelect={value => this.handleProfessionSelection(value)}
                        />
                    </Row> : null}
            </Col>
        );
    }

    renderSkillGroupSelector(profession) {
        console.log(this.state)
        if (profession) {
            var render = [];
            var skillGroups;

            if (this.state.availableSkillGroups.length === 0 && this.state.selectedSkillGroups.length === 0) {
                skillGroups = profession['skills'];
                this.setState({
                    availableSkillGroups: skillGroups
                });

            } else {
                skillGroups = [...this.state.availableSkillGroups]
            }

            var i;
            for (i = 0; i < skillGroups.length; i++) {
                render.push(<Col id={skillGroups[i].id} onClick={e => this.onSkillGroupSelected(e)}> {skillGroups[i].description} </Col>)
            }

            return render;
        } else {
            return null;
        }
    }

    renderSkillSelector(skillGroups) {
        var render = [];
        let subRender = (skillGroup) => {
            var subRender = [];
            var skills = skillGroup['skills'];
            var j;
            for (j = 0; j < skills.length; j++) {
                subRender.push(<Col id={skills[j].id} onClick={e => this.onSkillSelected(e)}> {skills[j].description} </Col>);
            }

            return <Row id={`${skillGroup.id}`}> {subRender} </Row>;
        }

        var i;
        for (i = 0; i < skillGroups.length; i++) {
            render.push(subRender(skillGroups[i]));
        }
        return render;
    }

    handleProfessionSelection(val) {
        var profession = this.props.professions.filter(profession => profession.title === val)[0];
        this.setState({
            value: val,
            profession: profession
        })
    }

    onSkillGroupSelected(e) {
        var selectedSkillGroup = this.state.profession.skills.filter(skillGroup => skillGroup.id === parseInt(e.currentTarget.id, 10))[0];
        var availableSkillGroups = this.state.availableSkillGroups.filter(skillGroup => skillGroup.id !== parseInt(e.currentTarget.id, 10))

        this.setState({
            selectedSkillGroups: [...this.state.selectedSkillGroups, selectedSkillGroup],
            availableSkillGroups: availableSkillGroups
        });
    }

    onSkillSelected(e) {
        var selectedSkillGroup = this.state.selectedSkillGroups.filter(skillGroup => skillGroup.id === parseInt(e.currentTarget.parentElement.id, 10))[0];
        var selectedSkill = selectedSkillGroup.skills.filter(skill => skill.id === parseInt(e.currentTarget.id, 10))[0];
        var modifiedSkillGroups = [];

        var i;
        for (i = 0; i < this.state.selectedSkillGroups.length; i++) {
            var modifiedSkills = this.state.selectedSkillGroups[i]['skills'].filter(skill => skill.id !== selectedSkill.id);
            var modifiedSkillGroup = { ...this.state.selectedSkillGroups[i] };
            modifiedSkillGroup['skills'] = modifiedSkills;
            modifiedSkillGroups.push(modifiedSkillGroup);
        }

        this.setState({
            selectedSkills: [...this.state.selectedSkills, selectedSkill],
            selectedSkillGroups: modifiedSkillGroups
        })
    }

    renderSelectedSkillGroups(skillGroups) {
        var render = []
        debugger;
        var i;
        for (i = 0; i < skillGroups.length; i++) {
            render.push(<Col style={{ backgroundColor: '#E45353' }} id={`sg-select-${skillGroups[i].id}`}> {skillGroups[i].description} </Col>);
        }

        return render;
    }
    renderSelectedSkills(skills) {
        var render = []

        var i;
        for (i = 0; i < skills.length; i++) {
            render.push(<Col style={{ backgroundColor: '#E45353' }} id={`s-select-${skills[i].id}`}> {skills[i].description} </Col>);
        }
        return render;
    }

    render() {
        return (
            <Row>
                <Row className="App__Form">
                    <div className="PageSwitcher">
                        <NavLink exact to="/main" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home</NavLink>
                    </div>
                </Row>
                <Col lg='5'>                       <Row>
                    <Col lg="5" className="text-center text-md-left">
                        <div className="login-form-div">
                            <h5>Description of Job:</h5>
                        </div>
                    </Col>
                    <Col lg="5" className="text-center text-md-right">
                        {/* <div className="login-form-div">
                    <TextBoxInput onChange={this.onDescriptionChange} />
                    </div> */}


                    </Col>
                </Row>
                    <Row>
                        <Col lg="5" className="text-center text-md-left">
                            <h5>Valid Until:</h5>
                        </Col>
                        <Col lg="5" className="text-center text-md-right">
                            <DateInput onChange={this.onValidUntilChange} />
                        </Col>
                    </Row> </Col>
                <Col lg='7'>
                    <Row>
                        {this.renderProfessionSelector(this.props.professions)}
                    </Row>
                    <Row>
                        {this.renderSkillGroupSelector(this.state.profession)}
                    </Row>
                    {this.state.selectedSkillGroups.length > 0 ? this.renderSkillSelector(this.state.selectedSkillGroups) : null}
                    <Row>
                        {this.state.selectedSkillGroups.length > 0 ? this.renderSelectedSkillGroups(this.state.selectedSkillGroups) : null}
                    </Row>
                    <Row>
                        {this.state.selectedSkills.length > 0 ? this.renderSelectedSkills(this.state.selectedSkills) : null}
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        professions: state.profession.professions,
        error: state.profession.error,
        isLoading: state.profession.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfessions: bindActionCreators(getProfession.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementContainer);