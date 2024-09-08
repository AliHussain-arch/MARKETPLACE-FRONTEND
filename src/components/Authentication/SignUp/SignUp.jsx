import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticationServices from '../../../services/authenticationServices';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", address:"", password: "",  confirmPassword: "", });
  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await authenticationServices.signup({
      username: formData.username,
      address : formData.address,
      password: formData.password
    });
    navigate("/signin");
  }

  return (
    <section className="formSection">
      <div className='formContainer'>
        <form onSubmit={handleFormSubmit}>
          <h1>Sign Up</h1>
          <div className='usernameContainer'>
            <label htmlFor='username'>Username:</label>
            <input type="text" name='username' id='username' placeholder='Enter Username' onChange={handleFormData} value={formData.username}/>
          </div>
          <div className='addressContainer'>
            <label htmlFor='address'>Address:</label>
            <textarea type="text" name='address' id='address' placeholder='Enter Address' onChange={handleFormData} value={formData.address}/>
          </div>
          <div className='passwordContainer'>
            <label htmlFor='password'>Password:</label>
            <input type="password" name='password' id='password' placeholder='Enter Password' onChange={handleFormData} value={formData.password} />
          </div>
          <div className='confirmPasswordContainer'>
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Enter Confirm Password' onChange={handleFormData} value={formData.confirmpassword} />
          </div>  
          <div className='submitButton'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};