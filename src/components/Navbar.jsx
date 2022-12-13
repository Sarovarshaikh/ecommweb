import React from "react";
import {Search, ShoppingCartOutlined} from "@mui/icons-material"
import styled from "styled-components";
import { Badge } from "@mui/material";
import { mobile } from "../Responsive";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  text-decoration: none;
  background-color:#ffdf40;

  ${mobile({height: "85px",marginBottom:"10px"})}
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  ${mobile({boxSizing:"borderBox",justifyContent:"spaceAround",padding: "10px 15px", backgroundColor: "pink"})}
`;
const Left = styled.div`
  flex: 1;
  display : flex;
  align-items: center;
  ${mobile({display: "none"})}
`;
const Input = styled.input`
    border: none;

    ${mobile({width: "50px"})}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    margin-left: 25px;
    padding: 5px;
    align-items: center;
`;


const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.div`

    ${mobile({fontSize: "24px"})}
`
const Image = styled.img`
  width: 15%;
  ${mobile({width: "90%"})}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction:row;
  justify-content: flex-end;

  ${mobile({height:"70px",flex: 2.5, justifyContent: "center"})}
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    &:hover{
      color: #3f3f3f;
    }
    ${mobile({width: "100%",fontSize: "16px", marginRight: "25px"})}
`

const Navbar = () => {
  const navigate = useNavigate()
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=> state.user.currentUser);

  const logout = () =>{
      localStorage.clear();
      navigate("/")
      window.location.reload();
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
          <NavLink to="/">
          <Image src="https://i.ibb.co/kS7V2kg/Fashion-shop-logo-design-on-transparent-background-PNG.png"></Image>
          </NavLink>
          </Logo>
        </Center>
        <Right>
          {!user ? (
            <>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/register"
              >
                <MenuItem><b>REGISTER</b></MenuItem>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <MenuItem><b>SIGN IN</b></MenuItem>
              </NavLink>
            </>
          ) : <MenuItem onClick={logout}><b>LOGOUT</b></MenuItem>}
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to="/cart"
          >
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </NavLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
