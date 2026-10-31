import { useState } from "react";

function RegistrationForm(){
    const [formData, setFormData] = useState({name: "", email: "", password: ""});
    const [errors, setErrors] = useState({name: "", email: "", password: ""});
    const [records, setRecords] = useState([]);

    function handleForm(e){
        e.preventDefault();
        let name = formData.name.trim();
        let email = formData.email.trim();
        let password = formData.password.trim();
        let newErrors = {name: "", email: "", password: ""};
        let isValid = true;
        if(name === ""){
            newErrors.name = "Name is required";
            isValid = false;
        }
        if(email === ""){
            newErrors.email = "Email is required";
            isValid = false;
        }
        if(password === ""){
            newErrors.password = "Password is required";
            isValid = false;
        }
        if(isValid) {
            console.log("Form submitted");
            alert("Form Submitted Successfully");
            setRecords([...records, formData]);
        }else{
            setErrors(newErrors);
            for(let key in newErrors){
                if(newErrors[key] !== ""){
                    alert(newErrors[key]);
                }
            }
        }
        
    }

    function handleInputChange(e){

        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return(
        <>
            <h2>Form Registration</h2>
            <form onSubmit={handleForm}>
                <input name="name" value={formData.name} onChange={handleInputChange}    type="text" placeholder="Enter your name " />
                <br />
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter your email " />
                <br />
                <input name="password" value={formData.password} onChange={handleInputChange}  type="password" placeholder="Enter your password "/>
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <hr />
            <h2>Records</h2>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {record.name}<br />
                        <strong>Email:</strong> {record.email}<br />
                        <strong>Password:</strong> {record.password}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default RegistrationForm;