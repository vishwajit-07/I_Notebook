import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Login successfully!","success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Creadentials","danger");
          }
    }
    
      
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div>
            <form className='container p-4 shadow' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h2 style={{ textAlign:"center"}}>Login</h2>
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        aria-describedby="emailHelp"
                        value={credentials.email} 
                        placeholder='Enter your email address'                       
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        id="password"
                        placeholder='Enter your password'
                        value={credentials.password} 
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login