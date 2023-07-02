import React, { useState, useEffect } from "react";
import {
  AppBar,
  Autocomplete,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import MovieIcon from "@mui/icons-material/Movie";
import { getAllMovies } from "../api-helpers/api-helpers";
import {Link} from 'react-router-dom'

function Header() {
    const [tabValue, setTabValue] = useState(0)
    const [movies, setMovies] = useState([])

    useEffect(()=> {
        getAllMovies()
        .then((data) => setMovies(data.movies))
        .catch(err => console.log(err))
    }, [])
  return (
    <AppBar sx={{bgcolor: '#2b2d4d'}}>
      <Toolbar>
        <Box width="20%">
          <MovieIcon />
        </Box>
        <Box width="30%" margin="auto">
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
              sx={{ input: {color: 'white'}}}
                {...params}
                variant="standard"
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>

        <Box display="flex">
          <Tabs 
            textColor="inherit" 
            indicatorColor="secondary" 
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
           >
            <Tab 
                LinkComponent={Link} 
                to='/movies' 
                label="Movies" 
            />
            <Tab 
                LinkComponent={Link} 
                to='/admin' 
                label="Admin" 
            />
            <Tab 
                LinkComponent={Link} 
                to='/auth' 
                label="Auth" 
            />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
