import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function renderSkillPicker(props) {
    const { classes } = props;
    const skillAddAction = [<AddIcon onClick={props.onClickSkillAdd} />];
    const skillGroupAddAction = [<AddIcon onClick={props.onClickSGAdd} />];
    const skillRemoveAction = [<RemoveIcon onClick={props.onClickSkillRemove} />]
    const skillGroupRemoveAction = [<RemoveIcon onClick={props.onClickSGRemove} />]
    debugger;
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="success" plain>
                        <h4 className={classes.cardTitleDark}>Available Skill Groups</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="success"
                            tableHead={["Id", "Description", "Skills"]}
                            tableData={props.availableSGs}
                            actions={skillGroupAddAction}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="warning" plain>
                        <h4 className={classes.cardTitleDark}>Selected Skill Groups</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="warning"
                            tableHead={["Id", "Description", "Skills"]}
                            tableData={props.selectedSGs}
                            actions={skillGroupRemoveAction}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="success" plain>
                        <h4 className={classes.cardTitleDark}>Available Skills</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="success"
                            tableHead={["Id", "Description"]}
                            tableData={props.availableSkills}
                            actions={skillAddAction}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="warning" plain>
                        <h4 className={classes.cardTitleDark}>Selected Skills</h4>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="warning"
                            tableHead={["Id", "Description"]}
                            tableData={props.selectedSkills}
                            actions={skillRemoveAction}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>);
}