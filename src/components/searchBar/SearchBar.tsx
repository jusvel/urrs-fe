import './SearchBar.css';
import { getUserRole } from '../../helpers/axiosHelper.ts';
import React, { useEffect, useState } from 'react';
import { getEventTypes } from '../../api/eventsApi.ts';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

export default function SearchBar() {
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState('Concert');
  const [date, setDate] = useState(dayjs());

  const fetchAllEventTypes = async () => {
    const e = await getEventTypes()
    setEventTypes(e);
  };

  useEffect(() => {
    fetchAllEventTypes();
  }, []);

  return (
    <div className="search-bar">
      <Box >
        <FormControl fullWidth size="small" sx={{ display:"flex", flexDirection:"row", width: "100%", justifyContent:"center", gap:"20px"}}>
          <Select
            id="event-type-select"
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value)}
          >
            {eventTypes?.map(type =>
              <MenuItem value={type}>{type}</MenuItem>,
            )}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ padding: "0"}}>
              <DatePicker
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                value={date}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField>

          </TextField>
          <Button
          variant="contained"
          color="success"
          >
            Ieškoti
          </Button>
        </FormControl>
      </Box>

    </div>)
    ;
}
