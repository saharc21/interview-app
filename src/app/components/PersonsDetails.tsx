import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomText } from "../common.styles";
import PersonNewCard from "./PersonCard";

// Fix - Move all data interfaces to Person.ts file (example)
// Importent! remove types that not interfaces.
// change whole to all.
// maybe add filters & sorts (gender, etc.) -> https://randomuser.me/documentation
// maybe add error notification, small modal at the left bottom.

export interface UserName {
  first: string;
  last: string;
  title: string;
}
export interface PicProps {
  thumbnail: string;
}
export interface UserInfo {
  name: UserName;
  picture: PicProps;
}
export interface UsersData {
  results: UserInfo[];
}

const PersonsDetails = () => {
  const initailPageNumber = 1;

  const [nextPageNumber, setNextPageNumber] = useState(initailPageNumber);
  const [fullName, setFullName] = useState("");
  const [openAddContactModal, setOpenAddContactModal] = useState(false);

  const [wholeUsersData, setWholeUsersdata] = useState<UserInfo[]>([]);
  const [newPerson, setNewPerson] = useState<UserInfo | null>(null);

  const fetchRandomData = (pageNumber: number) =>
    axios
      .get<UsersData>(`https://randomuser.me/api?results=5&page=${pageNumber}`)
      .then(({ data }) => {
        setWholeUsersdata([...wholeUsersData, ...data.results]);
        setNextPageNumber(nextPageNumber + 1);
      })
      .catch((err) => console.error(err));

  const addNewPersonToTheList = () => {
    const formattedName = fullName.split(" ");
    setNewPerson({
      //states -> issue
      name: {
        first: formattedName[0] || "",
        last: formattedName[1] || "",
        title: "",
      },
      picture: { thumbnail: "" },
    });
    setFullName("");
  };

  useEffect(() => {
    if (initailPageNumber === nextPageNumber) {
      fetchRandomData(initailPageNumber);
    }
  }, []);

  useEffect(() => {
    if (newPerson) {
      setWholeUsersdata([...wholeUsersData, newPerson]);
    }
  }, [newPerson]);

  return (
    <Container>
      <CustomText>
        Ex 2 - Fetch API data
        <CustomButton onClick={() => fetchRandomData(nextPageNumber)}>
          Get another user info
        </CustomButton>
      </CustomText>
      <PersonCardsContainer>
        {wholeUsersData.map(({ name, picture }, id) => (
          <PersonNewCard
            key={id}
            age="27"
            name={name.first + " " + name.last}
            thumbnail={picture.thumbnail}
          />
        ))}
      </PersonCardsContainer>
      {!!openAddContactModal && (
        <AddContactModal>
          <input
            type="string"
            value={fullName}
            placeholder="Insert full name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
          />
          <button
            style={{
              width: "fit-content",
              // position: "absolute",
              // right: "2px",
              // top: "2px",
              borderRadius: "50%",
              border: "solid 1px black",
            }}
            onClick={() => {
              setFullName("");
              setOpenAddContactModal(false);
            }}
          >
            Cancel
          </button>
          <button
            style={{
              width: "fit-content",
              borderRadius: "50%",
              border: "solid 1px black",
            }}
            onClick={() => {
              addNewPersonToTheList();
              setOpenAddContactModal(false);
            }}
          >
            Accept
          </button>
        </AddContactModal>
      )}
      <AddContactButton onClick={() => setOpenAddContactModal(true)}>
        +
      </AddContactButton>
    </Container>
  );
};

export default PersonsDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;
`;

const PersonCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const AddContactButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 1;
`;

const AddContactModal = styled.form`
  position: absolute;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;
  height: 300px;
  width: 200px;
  z-index: 1;
`;
