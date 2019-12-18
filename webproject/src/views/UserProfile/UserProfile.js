import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { TextField } from "@material-ui/core"
import Table from "components/Table/Table.js";
import { uploadImage, updateProfileCompany } from "redux/actions/company";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      foundedDate: '',
      description: '',
      image: null,
      fileUrl: ''
    };
  }

  onDescriptionChange = e => {
    this.setState({
      description: e.currentTarget.value
    })
  };
  onCompanyNameChange = e => {
    this.setState({
      name: e.currentTarget.value
    })
  };
  onDateChange = e => {
    this.setState({
      foundedDate: e.currentTarget.value
    })
  };
  onFileChange = e => {
    this.setState({
      image: e.target.files[0],
      fileUrl: URL.createObjectURL(e.target.files[0])
    })
  };
  onClickUpdate = e => {
    const { description, name, foundedDate, image } = this.state;
    const { updateProfileCompany, uploadImage, company } = this.props;

    var modifiedDate;
    if (foundedDate !== '') {
      modifiedDate = foundedDate.split('-');
      modifiedDate = `${modifiedDate[2]}-${modifiedDate[1]}-${modifiedDate[0]}`
    }
    let payload = { id: company.id, body: {} };

    if (modifiedDate) {
      payload['body']['foundedDate'] = modifiedDate;
    }
    if (description !== '') {
      payload['body']['description'] = description
    }
    if (name !== '') {
      payload['body']['name'] = name;
    }
    if (Object.keys(payload['body']).length > 0) {
      updateProfileCompany(payload);
    }
    if (image) {
      uploadImage(image);
    }
  }

  getCommentsAsArray = () => {
    const { company } = this.props;
    var commentsArr = [];
    company.comments.forEach(obj => {
      commentsArr.push([obj.id, obj.commentedAt, obj.content, obj.rating]);
    });
    return commentsArr;
  }

  render() {
    const { classes, company } = this.props;
    if (company) {
      var dateStr = company.foundedDate.split('-');

      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary" plain>
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>Change the desired parts of your profile</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Company Name"
                        id="companyName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.onCompanyNameChange,
                          defaultValue: company.name
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                      <TextField
                        id="date"
                        label="Foundation Date"
                        type="date"
                        className={classes.textField}
                        defaultValue={`${dateStr[2]}-${dateStr[1]}-${dateStr[0]}`}
                        style={{ marginTop: 27, marginBottom: 35 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          onChange: this.onDateChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4}>
                      {!this.state.image ? <h5> Choose a picture </h5> :
                        <div>
                          <h5> Preview: </h5>
                          <CardAvatar profile>
                            <img src={this.state.fileUrl} />
                          </CardAvatar>
                        </div>
                      }
                      <Button
                        color="info"
                        variant="contained"
                        component="label"
                        style={{ marginBottom: 35 }}
                      >
                        Upload File
                      <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={this.onFileChange}
                        />
                      </Button>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>About</InputLabel>
                      <CustomInput
                        labelText="Type a short explanation about your company."
                        id="about-company"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          onChange: this.onDescriptionChange,
                          defaultValue: company.description
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="success" onClick={this.onClickUpdate}>Update Profile</Button>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardAvatar profile>
                  {this.props.company ? <img src={this.props.company.picture} alt="..." /> : null}
                </CardAvatar>
                <CardBody profile>
                  {this.props.company ?
                    <div>
                      <h6 className={classes.cardCategory}>{this.props.company.name}</h6>
                      <h4 className={classes.cardTitle}>{this.props.company.foundedDate}</h4>
                      <p className={classes.description}>
                        {this.props.company.description}
                      </p>
                    </div>
                    : null}

                </CardBody>
              </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Comments about your Company
                </h4>
                <p className={classes.cardCategoryWhite}>
                  Sorted by latest
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Id", "Commented At", "Content", "Rating"]}
                  tableData={this.props.company ? this.getCommentsAsArray() : []}
                />
              </CardBody>
            </Card>
          </GridItem> */}
          </GridContainer>
        </div >
      );
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    company: state.company.company,
    error: state.company.error,
    firebaseUser: state.company.firebaseUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfileCompany: bindActionCreators(updateProfileCompany.request, dispatch),
    uploadImage: bindActionCreators(uploadImage.request, dispatch)
  };
};

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile));