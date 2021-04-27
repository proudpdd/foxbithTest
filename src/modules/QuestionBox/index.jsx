import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { styled, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import DescriptionBox from "../DescriptionBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "prompt",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    marginBottom: "12px",
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

const QuestionBox = (props) => {
  const classes = useStyles();
  const { questionOrder, delId, duppId, orderDisplay } = props;
  const [choice, setChoice] = useState([{ order: 0 }, { order: 1 }]);
  const [delChoiceId, setDelChoiceId] = useState(null);
  const [value, setValue] = useState("");
    // console.log(orderDisplay);

  useEffect(() => {
    if (delChoiceId !== null) {
      const withoutDel = choice.filter((item) => item.order !== delChoiceId);
      setChoice(withoutDel);
    }
  }, [delChoiceId]);

  const ButtonAdd = styled(Button)({
    color: "#FF5C00",
  });

  const AddChoice = () => {
    const newQuestion = Math.max.apply(
      Math,
      choice.map((data) => data.order)
    );
    setChoice((arr) => [...arr, { order: newQuestion + 1 }]);
  };

  const DeleteQuestion = () => {
    delId(orderDisplay);
  };

  const Duplicate = () => {
    duppId(questionOrder);
  };

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ borderBottom: "1px solid #c4c4c4", backgroundColor: "#fff" }}>
      <Container
        fixed
        style={{
          padding: "24px",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", marginBottom: '20px' }}>Question {questionOrder}</div>

          <div className={classes.root}>
            <TextField
              required
              label="Question"
              variant="outlined"
              size="small"
              value={value}
              onChange={onChangeValue}
              className={classes.textField}
            />
          </div>
        </div>

        {choice.map((data, index) => (
          <DescriptionBox
            key={index}
            delChoice={setDelChoiceId}
            index={data.order}
          />
        ))}

        <ButtonAdd
          size="large"
          startIcon={<AddIcon />}
          onClick={() => AddChoice()}
        >
          add choice
        </ButtonAdd>
        <div style={{ border: "0.5px solid #C2C9D1", margin: "25px 0" }}></div>
        <Button
          size="large"
          startIcon={<FileCopyOutlinedIcon />}
          onClick={() => Duplicate()}
        >
          <div style={{ fontWeight: "bold" }}>duplicate</div>
        </Button>
        <Button
          size="large"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => DeleteQuestion()}
        >
          <div style={{ fontWeight: "bold" }}>delete</div>
        </Button>
      </Container>
    </div>
  );
};

export default QuestionBox;
