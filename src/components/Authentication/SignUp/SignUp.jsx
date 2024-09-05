import './SignUp.css';
export default function SignUp() {
    return (
      <>
      <div className='formContainer'>
        <form>
          <h1>SignUp</h1>
          <div className='usernameContainer'>
            <label htmlFor='username'>username </label>
            <input type="text" name='username' id='password' placeholder='username'/>
          </div>
          <div className='addressContainer'>
            <label htmlFor='address'>address </label>
            <textarea type="text" name='address' id='address' placeholder='address'/>
          </div>
          <div className='passwordContainer'>
            <label htmlFor='password'>password </label>
            <input type="password" name='password' id='password' placeholder='password' />
          </div>
          <div className='confirmPasswordContainer'>
            <label htmlFor='confirmPassword'>confirm password </label>
            <input type="password" name='confirmPassword' id='confirmPassword' placeholder='confirm password' />
          </div>  
          <div className='submitButton'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      </>
    );
  };