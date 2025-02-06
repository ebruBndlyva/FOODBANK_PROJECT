import React from 'react'
import { useParams } from 'react-router';

function VerifyPage() {
const {token} = useParams()
console.log(token);
    if (token) {
        fetch("http://localhost:5000/api/auth/verify", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            }
        })
        .then(res => res.json()) 
        .then(data => {
            if (data.success) {
                alert("Email successfully verified!");
                window.location.href = "http://localhost:5173"; // 
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error verifying email:", error));
    } else {
        alert("No token found in URL!");
    }
    
  return (
    <div>VerifyPage</div>
  )
}

export default VerifyPage
