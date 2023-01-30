import styled from "@emotion/styled";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CustomButton, CustomInput, CustomText } from "../../common.styles";
import BackButton from "../Helpers/BackButton";
import Dropdown, { DropDownType } from "../Helpers/Dropdown";
import NotificationShow, { NotificationType } from "../Helpers/NotficationShow";
import {
  FemaleAvatarIcon,
  MaleAvatarIcon,
  splitFullNameByFirstAndLast,
  UndefinedAvatarIcon,
} from "../utils";
import { Gender, UserInfo, UsersData } from "./Person";
import PersonNewCard from "./PersonCard";
import { RadioOptionItem } from "../CustomForm/RadioButtonsList";
import CustomForm from "../CustomForm/CustomForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeSuccessfullValue } from "../Helpers/succesfullSlice";
import { changeFailureValue } from "../Helpers/failureSlice";
import { InputOptionItem } from "../CustomForm/InputsList";

const PersonsDetails = () => {
  const initailPageNumber = 1;
  const [nextPageNumber, setNextPageNumber] = useState(initailPageNumber);

  const [allUsersData, setAllUsersdata] = useState<UserInfo[]>([]);
  const [newPerson, setNewPerson] = useState<UserInfo | null>(null);

  //successfull-failure global state
  const failureNotification = useAppSelector((state) => state.failure.value);
  const successfulNotfication = useAppSelector(
    (state) => state.successfull.value
  );
  const dispatch = useAppDispatch();

  //new person states
  const [openAddPersonModal, setOpenAddPersonModal] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newPicturePath, setNewPicturePath] = useState("");

  //filters states
  const [searchName, setSearchName] = useState<string[]>([]);
  const [femaleIsChecked, setFemaleIsChecked] = useState(false);
  const [maleIsChecked, setMaleIsChecked] = useState(false);
  const [otherIsChecked, setOtherIsChecked] = useState(false);
  const [allIsChecked, setAllIsChecked] = useState(false);

  const isMaleOnly = !!maleIsChecked && !femaleIsChecked;
  const isFemaleOnly = !!femaleIsChecked && !maleIsChecked;
  const isAllGender = !!allIsChecked || (!femaleIsChecked && !maleIsChecked);
  const searchByFirstName = searchName.length === 1 && searchName[0] !== "";
  const searchByFullName = searchName.length === 2;
  const [currentGenderFilterTitle, setCurrentGenderFilterTitle] =
    useState("Gender");
  const [selectedGender, setSelectedGender] = useState(Gender.Undefined);

  const gendersOptions: RadioOptionItem[] = [
    {
      optionDescription: Gender.MaleDescription,
      optionCode: Gender.MaleCode,
      onClick: () => {
        setSelectedGender(Gender.MaleCode);
      },
      optionIcon: MaleAvatarIcon,
    },
    {
      optionDescription: Gender.FemaleDescription,
      optionCode: Gender.FemaleCode,
      onClick: () => {
        setSelectedGender(Gender.FemaleCode);
      },
      optionIcon: FemaleAvatarIcon,
    },
    {
      optionDescription: Gender.OtherDescription,
      optionCode: Gender.OtherCode,
      onClick: () => {
        setSelectedGender(Gender.OtherCode);
      },
      optionIcon: UndefinedAvatarIcon,
    },
  ];

  const personDetailsOptions: InputOptionItem[] = [
    {
      type: "string",
      value: newFullName,
      inputName: "Full Name",
      onChange: (value: string) => setNewFullName(value),
      required: true,
    },
    {
      type: "number",
      value: newAge,
      inputName: "Age",
      onChange: (value: number) => setNewAge(value),
      required: false,
    },
    {
      type: "string",
      value: newPicturePath,
      inputName: "Picture Url",
      onChange: (value: string) => setNewPicturePath(value),
      required: false,
    },
  ];

  const genderFilterOptions = [
    {
      description: Gender.MaleDescription,
      onClick: () => setGenderDropDownCheckBoxes(Gender.MaleCode),
      isChecked: maleIsChecked,
    },
    {
      description: Gender.FemaleDescription,
      onClick: () => setGenderDropDownCheckBoxes(Gender.FemaleCode),
      isChecked: femaleIsChecked,
    },
    {
      description: Gender.OtherDescription,
      onClick: () => setGenderDropDownCheckBoxes(Gender.OtherCode),
      isChecked: otherIsChecked,
    },
    {
      description: Gender.AllDescription,
      onClick: () => setGenderDropDownCheckBoxes(Gender.AllCode),
      isChecked: allIsChecked,
    },
  ];

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

  const resetFormValues = () => {
    setNewFullName("");
    setNewAge(0);
    setNewPicturePath("");
  };

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
    resetFormValues();
  };

  const setGenderDropDownCheckBoxes = (gender: string) => {
    switch (gender) {
      case Gender.MaleCode:
        if (allIsChecked === false && femaleIsChecked === false) {
          if (maleIsChecked) {
            setCurrentGenderFilterTitle(Gender.AllDescription);
          } else {
            setCurrentGenderFilterTitle(Gender.MaleDescription);
          }
          setMaleIsChecked((prev) => !prev);
        } else if (allIsChecked === false && femaleIsChecked === true) {
          setMaleIsChecked(true);
          setAllIsChecked(true);
          setCurrentGenderFilterTitle(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setMaleIsChecked(false);
          setAllIsChecked(false);
          setCurrentGenderFilterTitle(Gender.FemaleDescription);
        }
        break;
      case Gender.FemaleCode:
        if (allIsChecked === false && maleIsChecked === false) {
          if (femaleIsChecked)
            setCurrentGenderFilterTitle(Gender.AllDescription);
          else setCurrentGenderFilterTitle(Gender.FemaleDescription);
          setFemaleIsChecked((prev) => !prev);
        } else if (allIsChecked === false && maleIsChecked === true) {
          setFemaleIsChecked(true);
          setAllIsChecked(true);
          setCurrentGenderFilterTitle(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setFemaleIsChecked(false);
          setAllIsChecked(false);
          setCurrentGenderFilterTitle(Gender.MaleDescription);
        }
        break;
      case Gender.AllCode:
        if (allIsChecked === false) {
          setAllIsChecked(true);
          setFemaleIsChecked(true);
          setMaleIsChecked(true);
          setCurrentGenderFilterTitle(Gender.AllDescription);
        } else if (allIsChecked === true) {
          setAllIsChecked(false);
          setFemaleIsChecked(false);
          setMaleIsChecked(false);
          setCurrentGenderFilterTitle("Gender");
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

  // useEffect(() => {
  //   console.log({ allUsersData });
  // }, [allUsersData]);

  //fix gender filter - other option.
  //fix - components animations
  //fix - find best using of successfull and failure states - notifications
  //fix - check search user pattern works well to remove some extra conditions

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
          // pattern="([A-Za-z]+\s)([A-Za-z]+)(\s)?"
          title="Full Name has to contain First and Last name while space seperate between them"
        />
        <Dropdown
          title={currentGenderFilterTitle}
          menu={genderFilterOptions}
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
      {!!openAddPersonModal && (
        <CustomForm
          onSubmit={() => {
            addNewPersonToTheList();
            dispatch(changeSuccessfullValue());
            setOpenAddPersonModal(false);
          }}
          onClose={() => {
            setOpenAddPersonModal(false);
            resetFormValues();
          }}
          radioOptions={gendersOptions}
          inputOptions={personDetailsOptions}
        ></CustomForm>
      )}
      {!!failureNotification && (
        <NotificationShow
          description="Please fill the full name of your person"
          type={NotificationType.FailureNoitication}
          onClose={() => dispatch(changeFailureValue())}
        />
      )}
      {!!successfulNotfication && (
        <NotificationShow
          description="Your details saved successfully"
          type={NotificationType.SuccessNotification}
          onClose={() => dispatch(changeSuccessfullValue())}
        />
      )}
      <AddContactButton onClick={() => setOpenAddPersonModal(true)}>
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
