import styled from "@emotion/styled";
import { CustomButton } from "../../common.styles";
import InputsList, { InputOptionItem } from "./InputsList";
import RadioButtonsList, { RadioOptionItem } from "./RadioButtonsList";

interface CustomFormProps {
  radioOptions: RadioOptionItem[];
  inputOptions: InputOptionItem[];
  onSubmit: () => void;
  onClose: () => void;
}

const CustomForm = ({
  radioOptions,
  inputOptions,
  onSubmit,
  onClose,
}: CustomFormProps) => {
  return (
    <Container
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      <div style={{ width: "100%" }}>
        <CustomButton onClick={() => onClose()}>X</CustomButton>
        {inputOptions && <InputsList inputOptions={inputOptions} />}
        {radioOptions && (
          <RadioButtonsList optionsArray={radioOptions}></RadioButtonsList>
        )}
        <CustomButton type="submit">Submit</CustomButton>
      </div>
    </Container>
  );
};

export default CustomForm;

const Container = styled.form`
  height: 400px;
  width: 300px;
  position: absolute;
  background-color: white;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 5px solid navy;
  border-radius: 15px;
  z-index: 1;
`;
