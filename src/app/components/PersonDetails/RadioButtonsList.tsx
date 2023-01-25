import styled from "@emotion/styled";
import { useState } from "react";
import { CustomAvatarIcon } from "../../common.styles";

export interface Option {
  optionDescription: string;
  isChecked?: boolean;
  optionIcon?: string;
  onClick: () => void;
}

export interface OptionsList {
  optionsArray: Option[];
}

const RadioButtonsList = ({ optionsArray }: OptionsList) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <Container>
      {optionsArray.map((optionItem, idx) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          key={idx}
        >
          <CustomAvatarIcon
            src={optionItem.optionIcon}
            alt=""
            sizeOfAvatar={20}
            style={{ backgroundColor: "white" }}
          />
          <input
            type={"radio"}
            value={optionItem.optionDescription}
            checked={optionItem.optionDescription === selectedOption}
            onClick={() => setSelectedOption(optionItem.optionDescription)}
            readOnly
          />
          <label>{optionItem.optionDescription}</label>
        </div>
      ))}
    </Container>
  );
};

export default RadioButtonsList;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
