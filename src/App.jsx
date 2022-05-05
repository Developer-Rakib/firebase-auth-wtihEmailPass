import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase.init'

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  let [registerd, setRegisterd] = useState(false)
  let [err, setErr] = useState('')
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const emailHndle = event => {
    setEmail(event.target.value);
  }

  const passHndle = event => {
    setPass(event.target.value);
  }

  const hndleResetPass = event => {
    sendPasswordResetEmail(auth, email)
      .then(() => console.log("email sent"))
  }

  const hndleRegisterd = () => {
    setRegisterd(!registerd)
  }

  const formSubmitHndle = event => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (!/(?=.*[0-9].*[0-9])/.test(pass)) {
      setErr("Please Enter Atlast 2 digit")
      return;
    }

    if (registerd) {
      signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
          console.log(`Login succes, Your Details : Email: ${result.user.email} passHash: ${result.user.reloadUserInfo.passwordHash}`);
          console.log(result.user);
        })
    } else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
          console.log(`Register succes, Your Details : Email: ${result.user.email} passHash: ${result.user.reloadUserInfo.passwordHash}`);

          sendEmailVerification(auth.currentUser)
            .then(() => console.log("email send!"))
        })
        .catch(err => console.log(err))
    }

    setValidated(true);
    event.preventDefault();
  }

  return (
    <div className="w-50 mx-auto pt-5 mt-5">
      <h2 className='text-primary'>Please {registerd ? "Login" : "Register"} !</h2>
      <Form noValidate validated={validated} onSubmit={formSubmitHndle}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={emailHndle} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={passHndle} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid pass.
          </Form.Control.Feedback>
          <p className='text-danger'>{err}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={hndleRegisterd} type="checkbox" label="Aleady Registerd?" />
          </Form.Group>
        </Form.Group>
        <p onClick={hndleResetPass} style={{ color: 'blue', cursor: 'pointer' }}>Forget Password?</p>
        <Button variant="primary" type="submit">
          {registerd ? "Login" : "Registerd"}
        </Button>
      </Form>
    </div>
  )
}

export default App
