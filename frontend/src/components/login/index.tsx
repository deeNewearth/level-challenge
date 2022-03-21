import { useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import "./login.scss";
import { useAppSelector } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { login, LoginProps } from "../../reducers/auth";

/*
type LoginData = {
  userName?: string;
  password?: string;
};
*/

type LoginData = {
  [Property in keyof LoginProps]+?: LoginProps[Property];
}

//This type can be used to create error object from any type
type ErrorTypes<Type> = {
  [Property in keyof LoginProps]+?: string;
};


export default function LoginView() {

  const [loginData, setLoginData] = useState<LoginData>();
  const [errors, setErrors] = useState<ErrorTypes<LoginData>>({});

  const {loading,error} = useAppSelector(state => state.auth);

  const formValid = loginData?.userName && loginData?.password
    && !errors?.userName && !errors?.password;

  const dispatch = useDispatch();

  function updateLogin(k: keyof LoginData, v: string, prompt: string) {

    let newError = '';
    if (!v) {
      newError = `${prompt} is required`;
    } else {
      if (v.length < 3) {
        newError = `${prompt} must be at least 3 characters`;
      } else if (v.length > 50) {
        newError = `${prompt} must be less then 50 characters`;
      }
    }

    const err = { ...errors };
    err[k] = newError
    setErrors(err);

    const data = { ...loginData };
    data[k] = v;
    setLoginData(data);
  }


  return <Form className='loginView justify-content-center align-items-center flex-grow-1'
     onSubmit={e => {
      e.preventDefault();
      if(formValid){
        const {userName,password} = loginData;
        if(userName && password){
          dispatch(login({userName,password}));
        }
        
      }
     }}
  >

    <Form.Group className="mb-3">

      <InputGroup hasValidation>
        <InputGroup.Text id="user-name">@</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Username"
          aria-describedby="user-name"
          required
          
          isInvalid={loginData?.userName && !!errors.userName ||undefined}
          isValid={loginData?.userName && !errors.userName || undefined}

          value={loginData?.userName || ''}
          onChange={e => updateLogin('userName', e.target.value, 'user name')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.userName || 'Please enter your username'}.
        </Form.Control.Feedback>

      </InputGroup>
    </Form.Group>


    <Form.Group className="mb-3">

      <InputGroup hasValidation>

        <Form.Control
          type="password"
          placeholder="Password"

          isInvalid={loginData?.password && !!errors.password ||undefined}
          isValid={loginData?.password && !errors.password || undefined}


          required
          value={loginData?.password || ''}
          onChange={e => updateLogin('password', e.target.value, 'password')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password || 'Please enter your password'}.
        </Form.Control.Feedback>
      </InputGroup>

    </Form.Group>

    {error && <h6 className="text-danger">{error}</h6>}

    {loading && <Spinner animation="border" variant="primary"/>}

    <Button type="submit" className="px-5" disabled={!formValid || !!loading}>
      Login
    </Button>
  </Form>;
}