import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Autocomplete from 'react-autocomplete'

import '../styles/navlink.css';

import { getProfession } from '../actions/profession';

class NewAdvertisementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profession: null,
            value: '',
            skillGroups: []
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

    handleProfessionSelection(val) {
        var profession = this.props.professions.filter(profession => profession.title === val)[0];
        this.setState({
            value: val,
            profession: profession
        })
    }

    renderSkillGroupSelector(profession) {
        var skillGroups = [];
        profession['skills'].forEach(skillGroup => {
            skillGroups.push(<Col id={skillGroup.id} onClick={e => this.onSkillGroupSelected(e)}> {skillGroup.description} </Col>)
        });
        return skillGroups;
    }

    onSkillGroupSelected(e) {
        debugger;
        var skillGroup = this.state.profession.skills.filter(skillGroup => skillGroup.id === parseInt(e.currentTarget.id, 10))[0];
        this.setState({
            skillGroups: [...this.state.skillGroups, skillGroup]
        });
    }

    renderSkills(skillGroups) {
        var skills = [];
        skillGroups.forEach(skillGroup => skillGroup['skills'].forEach(skill =>
            skills.push(<Col id={skill.id}> {skill.description}</Col>)
        ));
        return <Row> {skills}</Row>;
    }

    render() {
        return (
            <Col>
                <Row className="App__Form">
                    <div className="PageSwitcher">
                        <NavLink exact to="/main" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home</NavLink>
                    </div>
                </Row>
                <Row>
                    {this.renderProfessionSelector(this.props.professions)}
                </Row>
                <Row>
                    {this.state.profession ? this.renderSkillGroupSelector(this.state.profession) : null}
                </Row>
                <Row>
                    {this.state.skillGroups.length > 0 ? this.renderSkills(this.state.skillGroups) : null}
                </Row>
            </Col>
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