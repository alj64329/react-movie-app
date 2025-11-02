import React, { useContext, useState } from 'react'
import { account, ID } from '../lib/appwrite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../context/UserContext'

const AuthoForm = ({onClose, setUser}) => {
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const [username, setUsername] =useState('')
  const [email, setEmail] =useState('')
  const [error, setError] = useState("")
  const [password, setPassword] = useState('')
  const [newUser, setNewUser]= useState(true)

  async function login(e) {
    console.log(e)
    e.preventDefault()
    setError("")

    if(!email ||!password){
      setError("Please enter both email and password")
      return
    }

    if(password.length<8){
      setError("Password needs to be more than 8 characters")
      return
    }

    try{
      await account.createEmailPasswordSession({
        email,
        password
      })
      const user = await account.get()
      console.log(user)
      setLoggedInUser(user)
      console.log(`${user.name} succesfully logged in`)
      onClose()
    }catch(err){
      console.log("Login failed:", err)
      console.log(err.code)
    }
  }

  async function signin(e) {
    console.log(username, email, password)
    e.preventDefault()
    setError("")

    if(!email ||!password||!username){
      setError("Please fill all boxes")
      return
    }

    if(password.length<8){
      setError("Password needs to be more than 8 characters")
    }

    try{
        await account.create({
        userId: ID.unique(),
        name:username,
        email,
        password})  
    }catch(err){
      console.log(err.code)
      //Confilict
      if(err.code){
        setError("Email exisit, please log in")
        return
      }

    }
    login(e)
  }

  return (
    <div className='flex flex-col justify-center p-[1rem]'>
      {loggedInUser?
      <div className='flex flex-col justify-center gap-[2.5rem]'>
        <h2 className='text-center'>Sign Out?</h2>
          <button
          type="button"
          className='cursor-pointer text-center'
          onClick={async () => {
            try{
              await account.deleteSession({
                  sessionId: 'current'
              });
              setLoggedInUser(null);
            }catch(err){
              if(err.code === 401){
                setError("None has been logged in")
              }
            }     
          }}>
          Logout
        </button>
      </div>: (
      <div>
        {error!==""&&
        <div className='error-msg'>
          <FontAwesomeIcon icon={faCircleExclamation}/> {error}
        </div>
        }
        <h2 className='py-[1.3rem] text-center text-xl'>{newUser?"Create Your Account":"Welcome Back"}</h2>
        <form className='flex flex-col gap-[1rem]'>
          {newUser?
          <div className='flex flex-col'>
            <label htmlFor="username" className='text-sm'>Username:</label>
            <input type="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>:""}
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-sm'>Email:</label>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password:</label>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

        {newUser?
          <button
            type="button"
            onClick={async (e) => signin(e)}>
            Sign In
          </button>:
          <button type="button" 
          onClick={(e) => login(e)}
          className=''>
            Login
          </button>}

        {newUser? 
        <div>Already have an account?
          <span onClick={()=>setNewUser(false)} 
          className='swtich-btn'>Login</span></div>
          :<div>Don't have an account?
            <span
          onClick={()=>setNewUser(true)}
          className='swtich-btn'>SignIn</span></div>}

        </form>
        </div>)}
    </div>
  )
}

export default AuthoForm