import React from 'react'
import Form from './../../components/Shared/Form/Form';


const Login = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8 form-banner">
          <img src="./assets/images/banner1.jpeg" alt="Login Image"></img>
        </div>
        <div className="col-md-4 form-container">
          <Form formTitle={'Login'} submitBtn={'Login'}/>
        </div>
      </div>
    </>
  );
}

export default Login