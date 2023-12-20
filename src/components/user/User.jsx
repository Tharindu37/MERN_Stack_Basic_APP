import { useEffect, useState } from "react"
import UserForm from "../userForm/UserForm"
import UserTable from "../userTable/userTable"
import  Axios  from "axios"

function User() {
  // const users=[
  //   {id:1, name:'Tharindu'},
  //   {id:2, name: 'Lakshan'}
  // ]
  const [users,setUser]=useState([]);
  const [submitted,setSubmitted]=useState(false);
  const [isEdit,setIsEdit]=useState(false)
  const [selectedUser,setSelectedUser]=useState([])

  useEffect(()=>{
    getUser();
  },[])

  const getUser=()=>{
    Axios.get('http://127.0.0.1:3001/api/users')
    .then(response=>{
      // console.log(response.data.response)
      setUser(response?.data?.response || [])
    }).catch(error=>{
      console.log(error)
    })
  }

  const addUser=(data)=>{
    setSubmitted(true)
    const payload={
      id:data.id,
      name:data.name
    }
    Axios.post('http://127.0.0.1:3001/api/adduser',payload)
    .then(response=>{
      // console.log(response.data.response)
      getUser();
      setSubmitted(false)
      setIsEdit(false)

    }).catch(error=>{
      console.log(error)
    })
  }

  const updateUser=(data)=>{
    setSubmitted(true)
    const payload={
      id:data.id,
      name:data.name
    }
    Axios.put('http://127.0.0.1:3001/api/updateuser',payload)
    .then(response=>{
      // console.log(response.data.response)
      getUser();
      setSubmitted(false)
      setIsEdit(false)

    }).catch(error=>{
      console.log(error)
    })
  }

  const deleteUser=(data)=>{
    console.log(data)
    Axios.delete('http://127.0.0.1:3001/api/deleteuser',{data})
    .then(response=>{
      // console.log(response.data.response)
      console.log(response)
      getUser();

    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <>
    <UserForm addUser={addUser} submitted={submitted} data={selectedUser} isEdit={isEdit} updateUser={updateUser}/>
    <UserTable rows={users} selectedUser={data=>{
      setSelectedUser(data)
      setIsEdit(true)
    }} deleteUser={data=>window.confirm("Are you sure?") && deleteUser(data)}/>
    </>
  )
}

export default User