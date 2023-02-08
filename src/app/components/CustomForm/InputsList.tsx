import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent } from "react";
import RegularDatePicker from "../Helpers/DatePicker";
import { InputType } from "../utils";

export interface InputOptionItem {
  type: string;
  value: string | number | Dayjs;
  inputName: string;
  required: boolean;
  pattern: string;
  title: string;
  resetValue: () => void;
  onChange: (e: any) => void;
}

export interface InputList {
  inputOptions: InputOptionItem[];
}

const InputsList = ({ inputOptions }: InputList) => {
  return (
    // <Container>
    //   {inputOptions.map((input, idx) => (
    //     <span key={idx}>
    //       {input.type === InputType.Date ? (
    //         <RegularDatePicker
    //           onChange={input.onChange}
    //           datePickerName={input.inputName}
    //           value={input.value as Dayjs}
    //         />
    //       ) : (
    //         <TextField
    //           // style={{ margin: "5px" }}
    //           id={"outlined-" + input.type}
    //           label={input.inputName || ""}
    //           required={input.required}
    //           onChange={(e: ChangeEvent<HTMLInputElement>) => {
    //             input.onChange(e);
    //           }}
    //           inputProps={{
    //             className: "input",
    //             pattern: input.pattern,
    //             title: input.title,
    //           }}
    //           defaultValue={input.value || ""}
    //         />
    //       )}
    //     </span>
    //   ))}
    // </Container>
    <Container>
      {inputOptions.map((input, idx) =>
        input.type === InputType.Date ? (
          <RegularDatePicker
            key={idx}
            onChange={input.onChange}
            datePickerName={input.inputName}
            value={input.value as Dayjs}
          />
        ) : (
          <TextField
            // style={{ margin: "5px" }}
            id={"outlined-" + input.type}
            label={input.inputName || ""}
            required={input.required}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              input.onChange(e);
            }}
            inputProps={{
              className: "input",
              pattern: input.pattern,
              title: input.title,
            }}
            defaultValue={input.value || ""}
          />
        )
      )}
    </Container>
  );
};

export default InputsList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
