import { Add, Remove } from "@mui/icons-material"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Annoucement from "../components/Annoucement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { mobile } from "../Responsive"
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from "react"
import { userRequest } from "../requestMethods"
import { NavLink, useNavigate } from "react-router-dom"

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 20px;

    ${mobile({padding: "10px"})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    ${mobile({justifyContent: "center"})}
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=> props.type === "filled" && "none"};
    background-color: ${props=> props.type === "filled" ? "black" : "transparent"};
    color: ${props=> props.type === "filled" && "White"};
`
const TopTexts = styled.div`
    ${mobile({display: "none"})}
`
const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({flexDirection: "column"})}
`
const Info = styled.div`
  margin: 10px 0;
  flex: 3;
`
const Product = styled.div`
box-sizing: border-box;
    display: flex;
    margin: 30px 0;
    justify-content: space-between;

    ${mobile({flexDirection: "column"})}
`
const ProductDetail = styled.div`
   flex: 2;
   display: flex;
   ${mobile({flexDirection: "column"})}
`
const Image = styled.img`
  width: 20vw;
  ${mobile({width: "100%"})}
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    

`
const ProductName = styled.span`
  font-size: 25px;
  ${mobile({marginBottom: "20px"})}
`
const ProductId = styled.span`
  ${mobile({marginBottom: "20px"})}
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=> props.color};
    ${mobile({marginBottom: "20px"})}
`
const ProductSize = styled.span`
  color: black;
`
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;

    ${mobile({margin: "20px"})}
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    box-shadow: 5px 5px 10px rgb(0, 0 ,0,0.4);
    border-radius: 10px;
    padding: 10px;
    height: 50vh;
    
    ${mobile({boxSizing: "borderBox",padding: "20px", marginBottom: "40px", width: "82%",marginLeft:"10px"})}
`
const SummaryTitle = styled.h1`
    font-weight:200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && 500};
    font-size: ${props=> props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
 
`
const SummaryItemPrice = styled.span`
    
`
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`
const B = styled.b`
  margin-right:10px;
`


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector(state=> state.user.currentUser);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();


   const onToken =(token)=>{
    setStripeToken(token)
   }

   const checkout =()=>{
    if(!user){
      alert("Please Login")
    }
    else if(cart.total<1){
      alert("Please Add Something To Cart")
    }
   }
   
   useEffect(()=>{
    const makeRequest = async()=>{
      
        const res = await userRequest.post("/checkout/payment", {
          tokenId : stripeToken.id,
          amount: cart.total*100,
        });
        navigate("/success", res);
    }
    stripeToken && cart.total>=1 && makeRequest();
   },[stripeToken, cart.total, navigate])
 
  


  return (
    <Container>
      <Annoucement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <NavLink style={{textDecoration:"none"}} to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </NavLink>
          <TopTexts>
            <TopText>Shopping Bag <b>{(cart.quantity)}</b></TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <B>
                        Size: 
                      </B>
                        {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$5.5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {user && cart.total>=1 ? (
              <StripeCheckout
                name="Shop"
                image="https://i.ibb.co/WyD4skn/vecteezy-colorful-beauty-dancer-logo-illustration-vector-template-8214205.png"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <SummaryButton>CHECKOUT NOW</SummaryButton>
              </StripeCheckout>
            ) : (
              <SummaryButton onClick={checkout}>CHECKOUT NOW</SummaryButton>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart