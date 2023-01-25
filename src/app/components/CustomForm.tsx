import styled from "@emotion/styled";

const CustomForm = () => {
  return <div>Custom Form</div>;
};

export default CustomForm;

const AddContactModal = styled.form`
  height: 400px;
  width: 300px;
  position: absolute;
  background-color: white;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 5px solid black;
  border-radius: 15px;
  // box-shadow: 0px 5px 6px black;
  // -webkit-box-shadow: 0px 5px 6px black;
  // -moz-box-shadow: 0px 5px 6px black;
  z-index: 1;
`;

const ActionButtonsSection = styled.div``;
const InputsSection = styled.div``;
