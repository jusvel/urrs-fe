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
  const [selectedEventType, setSelectedEventType] = useState('CONCERT');
  const [date, setDate] = useState(dayjs());

  const fetchAllEventTypes = async () => {
    const response = await getEventTypes();
    setEventTypes(response.data);
  };

  useEffect(() => {
    fetchAllEventTypes();
  }, []);

  return (
    <div className="search-bar">
      <Box sx={{ minWidth: 120, display:"flex", flexDirection:"row", width: "100%", alignContent:"center" }}>
        <FormControl fullWidth sx={{ display:"flex", flexDirection:"row", width: "100%", justifyContent:"center"}}>
          <InputLabel id="event-type-label">Renginio tipas</InputLabel>
          <Select
            labelId="event-type-label"
            id="event-type-select"
            value={selectedEventType}
            label="Age"
            onChange={(e) => setSelectedEventType(e.target.value)}
          >
            {eventTypes.map(type =>
              <MenuItem value={type}>{type}</MenuItem>,
            )}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ }}>
              <DatePicker
                label="Renginio data"
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                value={date}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField>

          </TextField>
          <Button>
            Ieškoti
          </Button>
        </FormControl>
      </Box>

    </div>)
    ;
}
