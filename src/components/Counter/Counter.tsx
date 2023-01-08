import styled from "@emotion/styled";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { CustomButton, CustomText } from "../../app/common";
import { CounterContainer } from "./common";

type Props = {
  name?: string;
  age?: number;
};

const Counter: FC<Props> = ({ name, age }) => {
  const [manualCounter, setManualCounter] = useState(0);
  const [autoCounter, setAutoCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoCounter(autoCounter + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoCounter]);

  return (
    <CounterContainer>
      <CustomText
        fontFamily="'Montserrat', sans-serif"
        color="white"
        weight="600"
      >
        Ex 1 - Counters by Hooks{" "}
      </CustomText>
      <span style={{ display: "flex" }}>
        <CounterItem>
          <CustomText
            fontFamily="'Montserrat', sans-serif"
            color="white"
            weight="600"
          >
            Manual Counter
          </CustomText>
          <CustomText color="white" fontFamily="'Montserrat', sans-serif">
            {"pressed " + manualCounter + " times"}
          </CustomText>
        </CounterItem>
        <CounterItem>
          <CustomText
            fontFamily="'Montserrat', sans-serif"
            color="white"
            weight="600"
          >
            Auto Counter
          </CustomText>
          <CustomText color="white" fontFamily="'Montserrat', sans-serif">
            {autoCounter + " sec"}
          </CustomText>
        </CounterItem>
      </span>

      <CustomButton onClick={() => setManualCounter(manualCounter + 1)}>
        Increase the manual counter by pressing here
      </CustomButton>
    </CounterContainer>
  );
};

export default Counter;

const CounterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  height: 50px;
  width: 300px;
  border: solid 1px black;
  border-radius: 20px;
  background-color: #159cd8;
`;
