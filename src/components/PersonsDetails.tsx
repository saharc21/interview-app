import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomText } from "../app/common";
import PersonNewCard from "./PersonCard";

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
export interface ResultProps {
  results: UserInfo[];
}

const PersonsDetails = () => {
  const [wholeUsersData, setWholeUsersdata] = useState<ResultProps[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [nextPageNumber, setNextPageNumber] = useState<number>(1);
  const [newPerson, setNewPerson] = useState<ResultProps>({
    results: [
      { name: { first: "", last: "", title: "" }, picture: { thumbnail: "" } },
    ],
  });
  const [openAddContactModal, setOpenAddContactModal] =
    useState<boolean>(false);

  const fetchRandomData = (pageNumber: number) => {
    return axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then((res) => {
        // handle success
        setWholeUsersdata([...wholeUsersData, res.data]);
        setNextPageNumber(nextPageNumber + 1);
      })
      .catch((err) => {
        // handle error
        console.error(err);
      });
  };

  const addNewPersonToTheList = () => {
    const formattedName = fullName.split(" ");
    setNewPerson({
      //states -> issue
      results: [
        {
          name: {
            first: formattedName[0] || "",
            last: formattedName[1] || "",
            title: "",
          },
          picture: { thumbnail: "" },
        },
      ],
    });
    setFullName("");
  };

  useEffect(() => {
    fetchRandomData(nextPageNumber);
  }, []);

  useEffect(() => {
    setWholeUsersdata([...wholeUsersData, newPerson]);
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
        {wholeUsersData.map((item) =>
          item.results?.map((details, id) => (
            <PersonNewCard
              key={id}
              age="27"
              name={details.name.first + " " + details.name.last}
              thumbnail={details.picture.thumbnail}
            />
          ))
        )}
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
  border: solid 2px aliceblue;
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

//check push
