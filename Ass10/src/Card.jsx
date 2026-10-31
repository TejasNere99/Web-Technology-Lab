import React from "react";
import Student from "./assets/students.jpg"
export function Card(){
    return(
        <>
            <div className="card">
                <img src={Student} alt="Student" style={{ height: "600px", width: "700px" }}/>
            </div>
        </>
    );
}