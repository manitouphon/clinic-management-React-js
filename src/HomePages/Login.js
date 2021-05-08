import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { FormControl, InputLabel, makeStyles, Select } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import PasswordField from 'material-ui-password-field';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  container_style: {
    width: `60%`,
    margin:`auto`,
    border:`1px solid gray`,
    borderRadius: `10px`,
    marginTop: `50px`,
  }
  
})
const userRole_selection = [
  {user_role:"Admin", id:1},
  {user_role:"Doctor", id:2},
  {user_role:"Pharmacist", id:3},
  {user_role:"Receptionist", id:4},
]

export default function Login() {
  const classes = useStyles()
  const [username, setTitle] = useState('')
  const [password, setPassword] = useState('')
  const [userRole , setUserRole]  = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passWordError, setpassWordError] = useState(false)
  const [userRoleError , setuserRoleError]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsernameError(false)
    setpassWordError(false)
    setuserRoleError(false)

    if (username == '') {
      setUsernameError(true)
    }
    if (password == '') {
      setpassWordError(true)
    }
    if(userRole == ''){
      setuserRoleError(true)
    }
    if (username && password && userRole) {
      console.log(username, password, userRole)
    } 
    
  }

  return (
    <Container size="sm" className = {classes.container_style}>
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Login Page
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          label="Username" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={usernameError}
        />
        <TextField className={classes.field}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          type ="password"
          error={passWordError}
        />

        <FormControl variant="outlined" className={classes.field}>
        <InputLabel htmlFor="outlined-age-native-simple" color="secondary" >User-role</InputLabel>
        <Select
          native
          onChange={(e) => setUserRole(e.target.value)}
          label="User_role"
          color="secondary"
          error={userRoleError}
          
        >
          <option aria-label="None" value="" />
          <option value={'Admin'}>Admin</option>
          <option value={'Doctor'}>Doctor</option>
          <option value={'Pharmacist'}>Pharmacist</option>
          <option value={'Receptionist'}>Receptionist</option>
        </Select>
      </FormControl>


  
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Login
        </Button>
      </form>

      
    </Container>
  )
}
