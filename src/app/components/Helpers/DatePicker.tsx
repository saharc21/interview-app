import * as React from "react";
import { ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

interface DatePickerItems {
  datePickerName: string;
  value: Dayjs;
  onChange: (e: any) => void;
}
const RegularDatePicker = ({
  datePickerName,
  value,
  onChange,
}: DatePickerItems) => {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          label={datePickerName}
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default RegularDatePicker;
