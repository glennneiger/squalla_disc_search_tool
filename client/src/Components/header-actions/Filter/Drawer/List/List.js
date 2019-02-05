import React, { Component } from "react";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  GridList,
  withStyles
} from "@material-ui/core";
import SelectInputText from "./Select/SelectInputText";
import SelectInputNumber from "./Select/SelectInputNumber";

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      width: 75
    },
    [theme.breakpoints.down("sm")]: {
      width: 50,
      fontSize: ".75em"
    }
  },
  gridList: {
    flexWrap: "nowrap"
  }
});

class ListComponent extends Component {
  searchByNameHandler = () => {
    let input = document.getElementById("name-search");
    let filter = input.value.toUpperCase();
    let cards = document.querySelectorAll("#disc-card");

    for (let i = 0; i < cards.length; i++) {
      let name =
        cards[i].lastChild.firstChild.firstChild.firstChild.textContent;
      if (name.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  };

  render() {
    const {
      classes,
      toggleRatings,
      toggleRatingsStatus,
      selections,
      handlers,
      submitButton,
      clearButton
    } = this.props;

    let { values } = this.props.values;
    let collectedValues = {};
    let listContent = [];

    if (Object.keys(values).length > 0) {
      for (let i = 0; i < values.length; i++) {
        if (values[i].name === "discTypes") {
          collectedValues.discTypes = values[i].data;
        }
        if (values[i].name === "manufactures") {
          collectedValues.manufactures = values[i].data;
        }
        if (values[i].name === "stability") {
          collectedValues.stability = values[i].data;
        }
        if (values[i].name === "speed") {
          collectedValues.speed = values[i].data;
        }
        if (values[i].name === "glide") {
          collectedValues.glide = values[i].data;
        }
        if (values[i].name === "turn") {
          collectedValues.turn = values[i].data;
        }
        if (values[i].name === "fade") {
          collectedValues.fade = values[i].data;
        }
      }
      listContent = (
        <List component="ul">
          <ListItem>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={toggleRatingsStatus}
                    onChange={toggleRatings}
                    value="checkedA"
                  />
                }
                label={
                  toggleRatingsStatus === false
                    ? "Infinite Ratings"
                    : "Manufacture Ratings"
                }
              />
            </FormGroup>
          </ListItem>
          <ListItem>
            <TextField
              className={classes.textField}
              label="Search by name"
              id="name-search"
              onChange={this.searchByNameHandler}
            />
          </ListItem>
          <ListItem>
            <SelectInputText
              values={collectedValues.manufactures}
              handleChange={handlers.manufacture}
              selection={selections.manufacture}
              data="Manufacture"
            />
          </ListItem>
          <ListItem>
            <SelectInputText
              values={collectedValues.discTypes}
              handleChange={handlers.type}
              selection={selections.discType}
              data="Type"
            />
          </ListItem>
          <ListItem>
            <SelectInputText
              values={collectedValues.stability}
              handleChange={handlers.stability}
              selection={selections.stability}
              data="Stability"
            />
          </ListItem>
          <GridList cellHeight={86} spacing={0} className={classes.gridList}>
            <ListItem>
              <SelectInputNumber
                values={collectedValues.speed}
                handleChange={handlers.speed}
                selection={selections.speed}
                data="Speed"
              />
            </ListItem>
            <ListItem>
              <SelectInputNumber
                values={collectedValues.glide}
                handleChange={handlers.glide}
                selection={selections.glide}
                data="Glide"
              />
            </ListItem>
          </GridList>
          <GridList cellHeight={86} spacing={0} className={classes.gridList}>
            <ListItem>
              <SelectInputNumber
                values={collectedValues.turn}
                handleChange={handlers.turn}
                selection={selections.turn}
                data="Turn"
              />
            </ListItem>
            <ListItem>
              <SelectInputNumber
                values={collectedValues.fade}
                handleChange={handlers.fade}
                selection={selections.fade}
                data="Fade"
              />
            </ListItem>
          </GridList>
          <ListItem style={{ width: "90%", margin: "auto" }}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={submitButton}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={clearButton}
            >
              Clear
            </Button>
          </ListItem>
        </List>
      );
    }

    return listContent;
  }
}

const mapStateToProps = state => ({
  values: state.values
});

export default connect(mapStateToProps)(withStyles(styles)(ListComponent));
