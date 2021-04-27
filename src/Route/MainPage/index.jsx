import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { HeaderBox, ButtonBox, Header, QBox } from "./style";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import QuestionBox from "../../modules/QuestionBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "prompt",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    width: "100%",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const [delId, setDelId] = useState(null);
  const [dupId, setDupId] = useState(null);
  const [valueNaire, setValueNaire] = useState("");
  const [question, setQuestion] = useState([{ order: 0 }]);

  useEffect(() => {
    if (delId !== null) {
      const withoutDel = question.filter((item, index) => item.order !== delId);
      setQuestion(withoutDel);
    }
  }, [delId]);

  useEffect(() => {
    if (dupId !== null) {
      const oldQuestion = [...question];
      oldQuestion.push(question[dupId - 1]);

      setQuestion(oldQuestion);
    }
  }, [dupId]);

  const ButtonSolid = withStyles({
    root: {
      backgroundColor: "#FF5C00",
      color: "#ffffff",
      width: "180px",
      height: "42px",
      borderRadius: "8px",
      "&:focus": {
        backgroundColor: "#FF5C00",
      },
      "&:hover": {
        backgroundColor: "#FF5C00",
      },
    },
  })(Button);

  const ButtonLine = withStyles({
    root: {
      borderColor: "#FF5C00",
      color: "#FF5C00",
      width: "89px",
      height: "42px",
      borderRadius: "8px",
      marginRight: "12px",
      "&:focus": {
        borderColor: "#FF5C00",
      },
      "&:hover": {
        borderColor: "#FF5C00",
      },
    },
  })(Button);

  const ButtonAddQ = withStyles({
    root: {
      borderColor: "#FF5C00",
      color: "#FF5C00",
      width: "100%",
      height: "48px",
      borderRadius: "8px",
      "&:focus": {
        borderColor: "#FF5C00",
      },
      "&:hover": {
        borderColor: "#FF5C00",
      },
    },
  })(Button);

  const onClickAddQuestion = () => {
    const newQuestion = Math.max.apply(
      Math,
      question.map((data) => data.order)
    );
    setQuestion((arr) => [...arr, { order: newQuestion + 1 }]);
  };

  const onChangeValue = (event) => {
    setValueNaire(event.target.value);
  };

  return (
    <div>
      <HeaderBox style={{ height: "64px" }}>
        <div style={{ margin: "24px" }}>Foxbith Questionaire</div>
      </HeaderBox>
      <HeaderBox style={{ height: "72px", position: "relative" }}>
        <ButtonBox>
          <ButtonLine variant="outlined" size="large" color="primary">
            cancel
          </ButtonLine>
          <ButtonSolid variant="contained" size="large" color="primary">
            save
          </ButtonSolid>
        </ButtonBox>
      </HeaderBox>

      <Container
        fixed
        style={{
          backgroundColor: "#fff",
          height: "100%",
          margin: "24px auto",
          padding: "0px 0px",
          borderRadius: "8px",
        }}
      >
        <QBox>
          <Container
            fixed
            style={{
              height: "144px",
              padding: "24px",
            }}
          >
            <Header>Questionaire Detail</Header>
            <div className={classes.root}>
              <TextField
                label="Name"
                required
                variant="outlined"
                size="small"
                className={classes.textField}
                value={valueNaire}
                onChange={onChangeValue}
              />
            </div>
          </Container>
        </QBox>

        {question.map((data, index) => (
          <QuestionBox
            key={index}
            questionOrder={index + 1}
            delId={setDelId}
            duppId={setDupId}
            orderDisplay={data.order}
          />
        ))}

        <Container
          fixed
          style={{
            height: "fit-content",
            padding: "24px",
          }}
        >
          <ButtonAddQ
            variant="outlined"
            size="large"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => onClickAddQuestion()}
          >
            add question
          </ButtonAddQ>
        </Container>
      </Container>
    </div>
  );
};

export default MainPage;
