import { useState } from "react"
import styled from "styled-components"
import { userRequest } from "../requestMethods"
import { mobile } from "../Responsive"
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    display: flex;
    background-size: cover;
    align-items: center;
    justify-content: center;

`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;

    ${mobile({width: "75%"})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width:40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
    width: 40%;
    font-size: 17px;
    border: none;
    padding: 10px 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
    
`

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user, [name]: value
  })
  }
  const register = async(e) => {
    e.preventDefault();
    const {name, email, password, reEnterPassword} = user;
    if(name && email && password && (password === reEnterPassword)){
      await userRequest.post("/auth/register", user)
      .then(response=>{
        alert("successfull",response);
        navigate("/login")
      });
     
    } 
    else{
      alert("invalid credentials")
    }
    
    
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input type="text" name="name" value={user.name} onChange={handleChange} placeholder="username" />
          <Input type="email" name="email" value={user.email} onChange={handleChange} placeholder="email" />
          <Input type="password" name="password" value={user.password} onChange={handleChange} placeholder="password" />
          <Input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange} placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Div>
          <Button onClick={register}>Create</Button>
          <Button onClick={()=>navigate("/login")}>Login</Button>
          </Div>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;