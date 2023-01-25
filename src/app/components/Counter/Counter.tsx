import { FC, useEffect } from "react";
import { useState } from "react";
import { CustomButton, CustomText } from "../../common.styles";
import BackButton from "../BackButton";
import { CounterContainer, CounterItem } from "./Counter.styled";

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
      <BackButton width="100px" />
      <CustomText color="white" weight="600">
        Ex 1 - Counters by Hooks{" "}
      </CustomText>
      <span style={{ display: "flex" }}>
        <CounterItem>
          <CustomText color="white" weight="600">
            Manual Counter
          </CustomText>
          <CustomText color="white">
            {"pressed " + manualCounter + " times"}
          </CustomText>
        </CounterItem>
        <CounterItem>
          <CustomText color="white" weight="600">
            Auto Counter
          </CustomText>
          <CustomText color="white">{autoCounter + " sec"}</CustomText>
        </CounterItem>
      </span>

      <CustomButton onClick={() => setManualCounter(manualCounter + 1)}>
        Increase the manual counter by pressing here
      </CustomButton>
    </CounterContainer>
  );
};

export default Counter;
