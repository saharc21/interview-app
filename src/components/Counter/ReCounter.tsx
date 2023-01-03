import React, { ChangeEvent, useState } from "react";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CustomButton, CustomInput, CustomText } from "../../app/common";
import { CounterContainer } from "./common";

export function ReCounter() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementByNumber = (number: number) => {
    dispatch(incrementByAmount(number));
  };

  return (
    <CounterContainer>
      <CustomText
        fontFamily="'Montserrat', sans-serif"
        color="white"
        weight="600"
      >
        Counter with global state by Redux
      </CustomText>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <CustomButton
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment by 1
          </CustomButton>
          <CustomButton
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement by 1
          </CustomButton>
        </div>
        <CustomInput
          type="number"
          placeholder="Enter number to increment"
          value={userNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserNumber(parseInt(e.target.value) || 0)
          }
        />
        <CustomButton onClick={() => incrementByNumber(userNumber)}>
          Click to increase your counter
        </CustomButton>
        <label>Current Value: </label>
        <span>{count}</span>
      </div>
    </CounterContainer>
  );
}
