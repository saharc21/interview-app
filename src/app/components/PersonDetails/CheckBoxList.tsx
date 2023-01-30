export interface CheckboxOptionItem {
  optionDescription: string;
  optionCode: string;
  isChecked: boolean;
  onClick: () => void;
}

export interface CheckBoxOptionsList {
  optionsArray: CheckboxOptionItem[];
}

const CheckBoxList = ({ optionsArray }: CheckBoxOptionsList) => {
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
