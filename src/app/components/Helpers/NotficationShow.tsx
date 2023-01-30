import { useEffect } from "react";
import styled from "@emotion/styled";
import { CustomText } from "../../common.styles";

export enum NotificationType {
  FailureNoitication = "Failure",
  SuccessNotification = "Success",
}

interface Notification {
  description: string;
  type: NotificationType;
  onClose: () => void;
}

const NotificationShow = ({ description, type, onClose }: Notification) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onClose();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContainer type={type}>
      <CustomText
        weight="600"
        fontSize={20}
        color="white"
        textShadow="white 1px 0 5px"
      >
        {type}
      </CustomText>
      <CustomText style={{ marginTop: "10px" }} color="white">
        {description}
      </CustomText>
    </NotificationContainer>
  );
};

export default NotificationShow;

const NotificationContainer = styled("div")<{ type: NotificationType }>`
  position: absolute;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(prop) =>
    prop.type === NotificationType.FailureNoitication ? "red" : "green"};
  color: white;
  min-height: 150px;
  width: 350px;
  z-index: 1;
  left: 10px;
  bottom: 10px;
  border: solid 5px grey;
  border-radius: 25px;
`;
