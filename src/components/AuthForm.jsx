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
      setError("Incorrect email or password")
    }
  }

  async function signin(e) {
    console.log(username, email, password)
    e.preventDefault()
    setError("")

    if(!email.trim() ||!password.trim()||!username.trim()){
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
        setError("Email exisit, please log in or use other email to create an account")
        return
      }

    }
    login(e)
  }

  async function keyHandler(e){
    console.log(e.target.key)
  }

  return (
    <div className='flex flex-col justify-center p-[1rem]'>
      {loggedInUser?
      <div className='flex flex-col justify-center gap-[2.5rem] pt-[2rem]'>
        <h2 className='text-center'>Are you sure you want to sign out?</h2>
          <button
          type="button"
          className='cursor-pointer text-center auth-btn'
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
            <label htmlFor="username" className='text-sm font-bold'>Username:</label>
            <input type="username" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>:""}
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-sm font-bold'>Email:</label>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="flex flex-col pb-[1rem]">
            <label htmlFor="password" className="text-sm font-bold">Password:</label>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

        {newUser?
          <button
            type="button"
            onClick={async (e) => signin(e)}
            className='auth-btn'>
            Sign In
          </button>:
          <button type="button" 
          onClick={(e) => login(e)}
          className='auth-btn'>
            Login
          </button>}

        {newUser? 
        <div className='pt-[0.8rem] text-center'>
          Already have an account?
          <span onClick={()=>setNewUser(false)} 
          className='swtich-btn'>Login</span></div>
          :<div className='pt-[0.8rem] text-center'>
            Don't have an account?
            <span
          onClick={()=>setNewUser(true)}
          className='swtich-btn'>SignIn</span></div>}

        </form>
        </div>)}
    </div>
  )
}

export default AuthoForm