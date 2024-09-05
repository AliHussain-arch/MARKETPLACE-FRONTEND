import './SignIn.css';
export default function SignIn() {
    return (
      <>
      <div className='formContainer'>
        <form>
          <h1>SignIn</h1>
          <div className='usernameContainer'>
            <label htmlFor='username'>username </label>
            <input type="text" name='username' id='password' placeholder='username'/>
          </div>
          <div className='passwordContainer'>
            <label htmlFor='password'>password </label>
            <input type="password" name='password' id='password' placeholder='password' />
          </div>  
          <div className='submitButton'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      </>
    );
  };