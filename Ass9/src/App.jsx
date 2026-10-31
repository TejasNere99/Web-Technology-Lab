import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");

  // Get students
  useEffect(() => {

    fetch("http://localhost:3000/students")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => {
        console.log("Error:", err);
      });

  }, []);


  // Add student
  function handleSubmit(e) {

    e.preventDefault();

    fetch("http://localhost:3000/add", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,
        roll_no: rollNo
      })
    })

      .then(res => res.json())

      .then(data => {

        console.log("Student added successfully");

        setUsers(prevUsers => [
          ...prevUsers,
          data.student
        ]);

        setName("");
        setRollNo("");

      })

      .catch(err => {
        console.log("Error:", err);
      });

  }


  return (
    <div className="container">

      <h1>Student Management</h1>

      <form onSubmit={handleSubmit} className="student-form">

        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter roll number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        <button type="submit">
          Add Student
        </button>

      </form>


      <h2>Students</h2>

      <div className="students">

        {users.map((user) => (

          <div className="student-card" key={user._id || user.roll_no}>

            <h3>{user.name}</h3>

            <p>
              Roll No: {user.roll_no}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;