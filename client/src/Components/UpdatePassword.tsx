import React, { useState } from 'react'
import { UPDATE_PASSWORD } from '../Graphql/Mutation'
import { useMutation } from '@apollo/client'

const UpdatePassword = () => {
    const[username, setUsername]= useState("")
    const[currentPassword, setCurrentPassword]= useState("")
    const[newPassword, setnewPassword]= useState("")

    const[UpdatePassword, {error}] =useMutation(UPDATE_PASSWORD)

  return (
    <div>
      <input type='text' placeholder='Username...' 
      onChange={(event)=> {
            setUsername(event.target.value)
      }}/>
      <input type='password' placeholder='Current Password' 
      onChange={(event)=>
       {setCurrentPassword(event.target.value)}}/>
      <input type='password' placeholder='New Passsword...' onChange={
        (event)=>
            {setnewPassword(event.target.value)}
      }/>

      <button onClick={()=>{UpdatePassword({variables: {username: username, oldPassword: currentPassword, newPassword: newPassword}})}}>UPDATE PASSWORD</button>
    </div>
  )
}

export default UpdatePassword
