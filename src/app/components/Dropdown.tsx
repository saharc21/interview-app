import styled from "@emotion/styled";
import { useState } from "react";
import { arrowToRightSvgXmlns, capitalFirstCharacter } from "./utils";

interface MenuItem {
  description: string;
  onClick: () => void;
  isChecked: boolean;
}

export enum DropDownType {
  Checkbox = "checkbox",
  ButtonsList = "buttonslist",
}

interface Props {
  title: string;
  menu: MenuItem[];
  typeOfDropDown: DropDownType;
}

interface ModalProp {
  isOpened?: boolean;
}

const Dropdown = ({ title, menu, typeOfDropDown }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <DropDown isOpened={open}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => handleOpen()} style={{ lineHeight: "20px" }}>
          {arrowToRightSvgXmlns}
          {" " + title}
        </button>
      </div>
      {!!open && (
        <Menu>
          {typeOfDropDown === DropDownType.ButtonsList &&
            menu.map((menuItem, idx) => (
              <li key={idx} className="menu-item">
                <button
                  onClick={() => {
                    menuItem.onClick();
                  }}
                >
                  {capitalFirstCharacter(menuItem.description)}
                </button>
              </li>
            ))}
          {typeOfDropDown === DropDownType.Checkbox && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {menu.map((menuItem, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={menuItem.isChecked}
                    onClick={menuItem.onClick}
                    className="menu-item"
                    style={{ marginRight: "5px" }}
                  />
                  <label>{capitalFirstCharacter(menuItem.description)}</label>
                </div>
              ))}
            </div>
          )}
        </Menu>
      )}
    </DropDown>
  );
};

export default Dropdown;

const DropDown = styled("div")<ModalProp>`
  position: relative;

  button {
    width: 100%;
    height: 100%;
    text-align: left;

    background: none;
    color: inherit;
    border: none;
    padding: 5px;
    margin: 0;
    font: inherit;
    cursor: pointer;
  }

  svg {
    transform: ${(props) =>
      props.isOpened === true ? "rotate(90deg)" : "rotate(0deg)"};
  }
`;

const Menu = styled.ul`
  position: absolute;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: white;

  border: 1px solid grey;
  width: 150px;
  z-index: 3;

  li {
    margin: 0;
    border-bottom: 1px solid grey;
  }

  li:hover {
    background-color: lightgray;
  }

  button {
    width: 100%;
    height: 100%;
    text-align: left;

    background: none;
    color: inherit;
    border: none;
    padding: 5px;
    margin: 0;
    font: inherit;
    cursor: pointer;
  }
`;
