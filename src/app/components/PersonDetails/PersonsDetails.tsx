import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomInput, CustomText } from "../../common.styles";
import BackButton from "../BackButton";
import Dropdown, { DropDownType } from "../Dropdown";
import NotificationShow, { NotificationType } from "../NotficationShow";
import {
  FemaleAvatarIcon,
  MaleAvatarIcon,
  splitFullNameByFirstAndLast,
  UndefinedAvatarIcon,
} from "../utils";
import { Gender, UserInfo, UsersData } from "./Person";
import PersonNewCard from "./PersonCard";
import RadioButtonsList, { Option } from "./RadioButtonsList";

// Important! remove types that not interfaces.
// maybe add filters & sorts (gender, etc.) -> https://randomuser.me/documentation
// maybe add error notification, small modal at the left bottom.

const PersonsDetails = () => {
  const initailPageNumber = 1;

  const [nextPageNumber, setNextPageNumber] = useState(initailPageNumber);

  const [newFullName, setNewFullName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newPicturePath, setNewPicturePath] = useState("");

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
    const formattedName = splitFullNameByFirstAndLast(newFullName);
    setNewPerson({
      name: {
        first: formattedName[0] || "",
        last: formattedName[1] || "",
        title: "",
      },
      picture: { thumbnail: newPicturePath },
      dob: { date: "", age: newAge as number },
      gender: selectedGender,
    });

    setNewFullName("");
    setNewAge(0);
    setNewPicturePath("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newPerson) {
      setAllUsersdata((allUsersData) => [...allUsersData, newPerson]);
    }
  }, [newPerson]);

  const [selectedGender, setSelectedGender] = useState(Gender.Undefined);

  const genderArray: Option[] = [
    {
      optionDescription: Gender.MaleDescription,
      onClick: () => {
        setSelectedGender(Gender.MaleDescription);
      },
      optionIcon: MaleAvatarIcon,
    },
    {
      optionDescription: Gender.FemaleDescription,
      onClick: () => {
        setSelectedGender(Gender.FemaleDescription);
      },
      optionIcon: FemaleAvatarIcon,
    },
    {
      optionDescription: Gender.Undefined,
      onClick: () => {
        setSelectedGender(Gender.Undefined);
      },
      optionIcon: UndefinedAvatarIcon,
    },
  ];

  const [successfulNotfication, setSuccessfulNotfication] = useState(false);
  const [errorNotfication, setErrorNotfication] = useState(false);

  return (
    <Container>
      <BackButton width="100px" />
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
        <AddContactModal
          onSubmit={() => {
            addNewPersonToTheList();
            setSuccessfulNotfication(true);
            setOpenAddContactModal(false);
          }}
        >
          <InputsSection>
            <CustomInput
              type="string"
              value={newFullName}
              placeholder="Insert full name"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewFullName(e.target.value);
              }}
              required
            />
            <CustomInput
              type="number"
              value={newAge}
              placeholder="Insert age"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewAge(parseInt(e.target.value))
              }
            />
            <CustomInput
              type="string"
              value={newPicturePath}
              placeholder="Insert picture url path"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPicturePath(e.target.value)
              }
            />
          </InputsSection>

          <RadioButtonsList optionsArray={genderArray} />
          <ActionButtonsSection>
            <CustomButton
              onClick={() => {
                setNewFullName("");
                setNewAge(0);
                setNewPicturePath("");
                setOpenAddContactModal(false);
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit">Accept</CustomButton>
          </ActionButtonsSection>
        </AddContactModal>
      )}
      {!!errorNotfication && (
        <NotificationShow
          description="Please fill the full name of your person"
          type={NotificationType.ErrorNoitication}
          onClose={() => setErrorNotfication(false)}
        />
      )}
      {!!successfulNotfication && (
        <NotificationShow
          description="Your details saved successfully"
          type={NotificationType.SuccessNotification}
          onClose={() => setSuccessfulNotfication(false)}
        />
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

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: none;
  width: 100%;
`;

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
