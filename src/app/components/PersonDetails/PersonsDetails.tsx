import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomInput, CustomText } from "../../common.styles";
import BackButton from "../BackButton";
import Dropdown, { DropDownType } from "../Dropdown";
import { splitFullNameByFirstAndLast } from "../utils";
import { Gender, UserInfo, UsersData } from "./Person";
import PersonNewCard from "./PersonCard";

// Important! remove types that not interfaces.
// maybe add filters & sorts (gender, etc.) -> https://randomuser.me/documentation
// maybe add error notification, small modal at the left bottom.

const PersonsDetails = () => {
  const initailPageNumber = 1;

  const [nextPageNumber, setNextPageNumber] = useState(initailPageNumber);

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [picturePath, setPicturePath] = useState("");

  const [searchName, setSearchName] = useState<string[]>([]);
  const [openAddContactModal, setOpenAddContactModal] = useState(false);

  const [allUsersData, setAllUsersdata] = useState<UserInfo[]>([]);
  const [newPerson, setNewPerson] = useState<UserInfo | null>(null);

  const [femaleIsChecked, setFemaleIsChecked] = useState(false);
  const [maleIsChecked, setMaleIsChecked] = useState(false);
  const [allIsChecked, setAllIsChecked] = useState(false);

  const isMaleOnly = !!maleIsChecked && !femaleIsChecked;
  const isFemaleOnly = !!femaleIsChecked && !maleIsChecked;
  const isAllGender = !!allIsChecked || (!femaleIsChecked && !maleIsChecked);
  const searchByFirstName = searchName.length === 1 && searchName[0] !== "";
  const searchByFullName = searchName.length === 2;
  const [currentChoice, setCurrentChoice] = useState("Gender");
  const fetchRandomData = (pageNumber: number) =>
    axios
      .get<UsersData>(
        `https://randomuser.me/api?results=100&page=${pageNumber}`
      )
      .then(({ data }) => {
        setAllUsersdata([...allUsersData, ...data.results]);
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
      picture: { thumbnail: picturePath },
      dob: { date: "", age: age as number },
      gender: Gender.MaleCode,
    });
    setFullName("");
    setAge(undefined);
    setPicturePath("");
  };

  const setCheckedBoxes = (gender: string) => {
    switch (gender) {
      case Gender.MaleCode:
        if (allIsChecked === false && femaleIsChecked === false) {
          if (maleIsChecked) setCurrentChoice(Gender.AllDescription);
          else setCurrentChoice(Gender.MaleDescription);
          setMaleIsChecked((prev) => !prev);
        } else if (allIsChecked === false && femaleIsChecked === true) {
          setMaleIsChecked(true);
          setAllIsChecked(true);
          setCurrentChoice(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setMaleIsChecked(false);
          setAllIsChecked(false);
          setCurrentChoice(Gender.FemaleDescription);
        }
        break;
      case Gender.FemaleCode:
        if (allIsChecked === false && maleIsChecked === false) {
          if (femaleIsChecked) setCurrentChoice(Gender.AllDescription);
          else setCurrentChoice(Gender.FemaleDescription);
          setFemaleIsChecked((prev) => !prev);
        } else if (allIsChecked === false && maleIsChecked === true) {
          setFemaleIsChecked(true);
          setAllIsChecked(true);
          setCurrentChoice(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setFemaleIsChecked(false);
          setAllIsChecked(false);
          setCurrentChoice(Gender.MaleDescription);
        }
        break;
      case Gender.AllCode:
        if (allIsChecked === false) {
          setAllIsChecked(true);
          setFemaleIsChecked(true);
          setMaleIsChecked(true);
          setCurrentChoice(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setAllIsChecked(false);
          setFemaleIsChecked(false);
          setMaleIsChecked(false);
          setCurrentChoice("Gender");
        }
        break;
    }
  };

  useEffect(() => {
    if (initailPageNumber === nextPageNumber) {
      fetchRandomData(initailPageNumber);
    }
  }, []);

  useEffect(() => {
    if (newPerson) {
      setAllUsersdata([...allUsersData, newPerson]);
    }
  }, [newPerson]);

  return (
    <Container>
      <BackButton widthOfBtn="100px" />
      <CustomText>Fetch API data</CustomText>
      <CustomButton onClick={() => fetchRandomData(nextPageNumber)}>
        Get another user info
      </CustomButton>
      <SearchBarContainer>
        <CustomInput
          type="text"
          placeholder="Search by typping name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchName(splitFullNameByFirstAndLast(e.target.value))
          }
        />
        <Dropdown
          title={currentChoice}
          menu={[
            {
              description: Gender.MaleDescription,
              onClick: () => setCheckedBoxes(Gender.MaleCode),
              isChecked: maleIsChecked,
            },
            {
              description: Gender.FemaleDescription,
              onClick: () => setCheckedBoxes(Gender.FemaleCode),
              isChecked: femaleIsChecked,
            },
            {
              description: Gender.AllDescription,
              onClick: () => setCheckedBoxes(Gender.AllCode),
              isChecked: allIsChecked,
            },
          ]}
          typeOfDropDown={DropDownType.Checkbox}
        />
      </SearchBarContainer>
      <PersonCardsContainer>
        {isAllGender &&
          allUsersData.map(({ name, picture, dob }, id) =>
            searchByFirstName ? (
              name.first.includes(searchName[0]) && (
                <PersonNewCard
                  key={id}
                  age={dob.age.toString()}
                  name={name.first + " " + name.last}
                  thumbnail={picture.thumbnail}
                />
              )
            ) : searchByFullName ? (
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
        {isMaleOnly &&
          allUsersData.map(({ name, picture, dob, gender }, id) =>
            gender === Gender.MaleCode && searchByFirstName
              ? name.first.includes(searchName[0]) && (
                  <PersonNewCard
                    key={id}
                    age={dob.age.toString()}
                    name={name.first + " " + name.last}
                    thumbnail={picture.thumbnail}
                  />
                )
              : gender === Gender.MaleCode && searchByFullName
              ? name.first === searchName[0] &&
                name.last.includes(searchName[1]) && (
                  <PersonNewCard
                    key={id}
                    age={dob.age.toString()}
                    name={name.first + " " + name.last}
                    thumbnail={picture.thumbnail}
                  />
                )
              : gender === Gender.MaleCode && (
                  <PersonNewCard
                    key={id}
                    age={dob.age.toString()}
                    name={name.first + " " + name.last}
                    thumbnail={picture.thumbnail}
                  />
                )
          )}
        {isFemaleOnly &&
          allUsersData.map(({ name, picture, dob, gender }, id) =>
            gender === Gender.FemaleCode && searchByFirstName
              ? name.first.includes(searchName[0]) && (
                  <PersonNewCard
                    key={id}
                    age={dob.age.toString()}
                    name={name.first + " " + name.last}
                    thumbnail={picture.thumbnail}
                  />
                )
              : gender === Gender.FemaleCode && searchByFullName
              ? name.first === searchName[0] &&
                name.last.includes(searchName[1]) && (
                  <PersonNewCard
                    key={id}
                    age={dob.age.toString()}
                    name={name.first + " " + name.last}
                    thumbnail={picture.thumbnail}
                  />
                )
              : gender === Gender.FemaleCode && (
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
          <CustomInput
            type="string"
            value={fullName}
            placeholder="Insert full name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
          />
          <CustomInput
            type="number"
            value={age}
            placeholder="Insert age"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAge(parseInt(e.target.value))
            }
          />
          <CustomInput
            type="string"
            value={picturePath}
            placeholder="Insert picture url path"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPicturePath(e.target.value)
            }
          />
          <CustomInput
            type="string"
            value={picturePath}
            placeholder="Insert picture url path"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPicturePath(e.target.value)
            }
          />
          <CustomButton
            onClick={() => {
              setFullName("");
              setAge(undefined);
              setPicturePath("");
              setOpenAddContactModal(false);
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={() => {
              addNewPersonToTheList();
              setOpenAddContactModal(false);
            }}
          >
            Accept
          </CustomButton>
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
  background-color: none;
  width: 100%;
`;
