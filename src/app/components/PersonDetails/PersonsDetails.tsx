import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomText } from "../../common.styles";
import BackButton from "../BackButton";
import { splitFullNameByFirstAndLast } from "../utils";
import { UserInfo, UsersData } from "./Person";
import PersonNewCard from "./PersonCard";

// Fix - Move all data interfaces to Person.ts file (example)
// Important! remove types that not interfaces.
// maybe add filters & sorts (gender, etc.) -> https://randomuser.me/documentation
// maybe add error notification, small modal at the left bottom.

const PersonsDetails = () => {
  const initailPageNumber = 1;

  const [nextPageNumber, setNextPageNumber] = useState(initailPageNumber);
  const [fullName, setFullName] = useState("");
  const [searchName, setSearchName] = useState<string[]>([]);
  const [openAddContactModal, setOpenAddContactModal] = useState(false);

  const [allUsersData, setWholeUsersdata] = useState<UserInfo[]>([]);
  const [newPerson, setNewPerson] = useState<UserInfo | null>(null);

  const fetchRandomData = (pageNumber: number) =>
    axios
      .get<UsersData>(
        `https://randomuser.me/api?results=100&page=${pageNumber}`
      )
      .then(({ data }) => {
        setWholeUsersdata([...allUsersData, ...data.results]);
        setNextPageNumber(nextPageNumber + 1);
      })
      .catch((err) => console.error(err));

  const addNewPersonToTheList = () => {
    const formattedName = fullName.split(" ");
    setNewPerson({
      name: {
        first: formattedName[0] || "",
        last: formattedName[1] || "",
        title: "",
      },
      picture: { thumbnail: "" },
      dob: { date: "", age: 17 },
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
      setWholeUsersdata([...allUsersData, newPerson]);
    }
  }, [newPerson]);

  const [femaleIsChecked, setFemaleIsChecked] = useState(false);
  const [maleIsChecked, setMaleIsChecked] = useState(false);
  return (
    <Container>
      <CustomText>Fetch API data</CustomText>
      <CustomButton onClick={() => fetchRandomData(nextPageNumber)}>
        Get another user info
      </CustomButton>
      <SearchBarContainer>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search by typping name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchName(splitFullNameByFirstAndLast(e.target.value))
          }
        />
        <input
          className="femaleGender"
          type="checkbox"
          checked={femaleIsChecked}
          onClick={() => setFemaleIsChecked(!femaleIsChecked)}
        ></input>
        <label>Female</label>
        <input
          className="maleGender"
          type="checkbox"
          checked={maleIsChecked}
          onClick={() => setMaleIsChecked(!maleIsChecked)}
        ></input>
        <label>Male</label>

        {/* <someDropDownCheckbox></someDropDownCheckbox> */}
      </SearchBarContainer>
      <PersonCardsContainer>
        {allUsersData.map(({ name, picture, dob }, id) =>
          searchName.length === 1 && searchName[0] !== "" ? (
            name.first.includes(searchName[0]) && (
              <PersonNewCard
                key={id}
                age={dob.age.toString()}
                name={name.first + " " + name.last}
                thumbnail={picture.thumbnail}
              />
            )
          ) : searchName.length === 2 ? (
            name.first === searchName[0] &&
            name.last.includes(searchName[1]) && (
              <PersonNewCard
                key={id}
                age={dob.age.toString()}
                name={name.first + " " + name.last}
                thumbnail={picture.thumbnail}
              />
            )
          ) : (
            <PersonNewCard
              key={id}
              age={dob.age.toString()}
              name={name.first + " " + name.last}
              thumbnail={picture.thumbnail}
            />
          )
        )}
      </PersonCardsContainer>
      {!!openAddContactModal && (
        <AddContactModal>
          {/* <AddPersonDetailsModal></AddPersonDetailsModal> */}
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
          <BackButton />
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
  overflow: auto;
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

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
  width: 100%;
`;
