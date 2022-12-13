import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { login } from "../redux/apiCalls"
import { mobile } from "../Responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    display: flex;
    background-size: cover;
    align-items: center;
    justify-content: center;

`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;

    ${mobile({width: "75%"})}
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Input = styled.input`
    flex: 1;
    min-width:40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled{
      color: green;
      cursor: not-allowed;
    }
`
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Error = styled.span`
    color:red;
`


const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName]= useState("");
  const [password, setPassword]= useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  
  const handleClick =(e)=>{
    e.preventDefault();
    login(dispatch, {username, password})
  };
  return (
    <Container>
        <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUserName(e.target.value)}/>
          <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Div>
            <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            <Button onClick={()=>navigate("/register")}>SIGN UP</Button>
            </Div>
            {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login