import React, { useState, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

import Button from'@mui/material/Button';
//tekstikenttä
import TextField from'@mui/material/TextField';
//välit
import Stack from'@mui/material/Stack';
//deleteIcon
import DeleteIcon from '@mui/icons-material/DeleteForever';
//date
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

export default function ToDoApp() {

  const [toDo, setToDo] = useState({date:'', desc:'', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const columns = [
    {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: 'agTextColumnFilter'},
    {headerName: 'Description', field: 'desc', sortable: true, filter: true, floatingFilter: 'agTextColumnFilter'},
    {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: 'agTextColumnFilter',
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
  ]

  const changeDate = (date) => {
    setToDo({
      date: date
    })
  }

  const inputChanged = (event) => {
    setToDo({...toDo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, toDo]);
    //lomakekentän tyhjennys
    setToDo({date:'', desc:'', priority:''});
  }

  const deleteToDo = (event) => {
    event.preventDefault();
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((toDo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select row first');
    }
  }

  return (
    <div>
      <h3>Add ToDo:</h3>

      <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={toDo.date}
          onChange={date => changeDate(date)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

        <TextField label="Description" variant="standard" name="desc" value={toDo.desc} onChange={inputChanged}/>
        <TextField label="Priority" variant="standard" name="priority" value={toDo.priority} onChange={inputChanged}/>

        <Button onClick={addTodo} variant='outlined'>Add</Button>
        <Button onClick={deleteToDo} variant='outlined' color='error' endIcon={<DeleteIcon />}>Delete</Button>

      </Stack>

      <div
      className="ag-theme-material"
      style={{
        width: '80%',
        height: 700,
        margin: 'auto'}}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={
            params => gridRef.current = params.api
          }
          rowSelection='single'
          columnDefs={columns}
          rowData={todos}
          animateRows={true}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

