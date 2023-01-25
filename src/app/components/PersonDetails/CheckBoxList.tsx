import { OptionsList } from "./RadioButtonsList";

const CheckBoxList = ({ optionsArray }: OptionsList) => {
  return (
    <div>
      {optionsArray.map((optionItem, idx) => (
        <div key={idx}>
          <input
            type={"checkbox"}
            checked={optionItem.isChecked}
            onClick={optionItem.onClick}
            readOnly
          />
          <label>{optionItem.optionDescription}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxList;
