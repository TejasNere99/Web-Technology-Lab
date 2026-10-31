import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    fetch("http://localhost:5173/students")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => {
        console.log("Error : ", err);
      })
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5173/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        roll_no: rollNo
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log("student added successfuly");
        setUsers((prevUsers) => [...prevUsers, data.student]);
        setName("");
        setRollNo("");
      })
      .catch((e) => {
        console.log("Error : " + e);
      })
  }

  return (
    <>
      <h1>Add Students : </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter the name of the student' />
        <input type="number" name='rollNo' value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder='Enter your roll number' />
        <button type='submit'>Add</button>
      </form>
      <h1>Students</h1>
      <br />
      <br />
      {users.map((user) => (
        <ul key={user.roll_no}>
          <li><h3>{user.name}</h3></li>
          <br />
          <li>{user.roll_no}</li>
        </ul>
      ))}
    </>
  )
}

export default App
