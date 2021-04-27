import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "prompt",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "78ch",
    margin: "12px 0px",
    "& input:valid + fieldset": {
      borderWidth: 1,
    },
    "& label.Mui-focused": {
      color: "#616569",
      fontFamily: "prompt",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#616569",
        borderWidth: 1,
      },
      fontFamily: "prompt",
    },
    "& .MuiFormHelperText-root": {
      fontFamily: "prompt",
      margin: "4px 0px",
    },
  },
}));

const DescriptionBox = (props) => {
  const classes = useStyles();
  const { delChoice, index } = props;
  const [checkState, setCheckState] = useState(false);
  const [value, setValue] = useState("");

  const GreenCheckbox = withStyles({
    root: {
      "&$checked": {
        color: "#00C62B",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const handleChange = () => {
    setCheckState(!checkState);
  };

  const OnClickDelChoice = () => {
    delChoice(index);
  };

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checkState}
            onChange={handleChange}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
        }
      />
      {checkState ? (
        <div className={classes.root}>
          <TextField
            required
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            className={classes.textField}
            value={value}
            onChange={onChangeValue}
            helperText="This answer is correct"
          />
        </div>
      ) : (
        <div className={classes.root}>
          <TextField
            required
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            className={classes.textField}
            value={value}
            onChange={onChangeValue}
          />
        </div>
        // <ValidationTextField
        // //   required
        //   label="Description"
        //   variant="outlined"
        //   size="small"
        //   value={value}
        //   onChange={onChangeValue}
        // />
      )}

      <IconButton aria-label="delete" onClick={() => OnClickDelChoice()}>
        <DeleteOutlineIcon />
      </IconButton>
    </div>
  );
};

export default DescriptionBox;
