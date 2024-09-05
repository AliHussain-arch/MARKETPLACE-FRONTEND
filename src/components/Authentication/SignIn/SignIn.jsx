import './SignIn.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationServices from '../../../services/authenticationServices';

export default function SignIn({setUser}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await authenticationServices.signin({
      username: formData.username,
      password: formData.password
    });
    const user = await authenticationServices.getUser();
    setUser(user);
    navigate(`/user/${user.id}/item`);
  }
  

    return (
      <>
      <div className='formContainer'>
        <form onSubmit={handleFormSubmit}>
          <h1>SignIn</h1>
          <div className='usernameContainer'>
            <label htmlFor='username'>username </label>
            <input type="text" name='username' id='password' placeholder='username' onChange={handleFormData} value={formData.username}/>
          </div>
          <div className='passwordContainer'>
            <label htmlFor='password'>password </label>
            <input type="password" name='password' id='password' placeholder='password' onChange={handleFormData} value={formData.password}/>
          </div>  
          <div className='submitButton'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      </>
    );
  };