import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

export interface InputOptionItem {
  type: string;
  value: string | number;
  inputName: string;
  required: boolean;
  onChange: (value: any) => void;
}

export interface InputList {
  inputOptions: InputOptionItem[];
}

const InputsList = ({ inputOptions }: InputList) => {
  return (
    <Container>
      {inputOptions.map((input, idx) => (
        <TextField
          key={idx}
          style={{ margin: "5px" }}
          id={"outlined-" + input.type}
          label={input.inputName || ""}
          required={input.required}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            input.onChange(e.target.value)
          }
          defaultValue={input.value || ""}
        />
      ))}
    </Container>
  );
};

export default InputsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
