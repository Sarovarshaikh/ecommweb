import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "./data";
import { mobile } from "../Responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  background-color: #1bbeff;
  height: 80vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${mobile({display: "none"})}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #cecece;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.6;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease-in-out;
  transform: translateX(${props=> props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 90%;
  margin-top:-50px;
  margin-left: 10vw;
`;

const InfoContainer = styled.div`
  padding: 50px;
  flex: 1;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-top: -70px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const BottomText = styled.h1`
  padding: 10px;
  margin-left: -10px;
  box-sizing: border-box;
  font-size: 30px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const navigate =  useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  
  const handleClick = (direction) => {
    if(direction === "left"){
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
    else{
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  };


  const handleEvent=()=>{
    if(slideIndex===0){
      navigate("/products/dress")
    }else if(slideIndex===1){
      navigate("/products/men")
    }else{
      navigate("/products/tshirt")
    }
  }

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIos />
      </Arrow>
      <Wrapper onClick={handleEvent} slideIndex = {slideIndex}>
        {sliderItems.map((item,index) => (
          <Slide key={index} bg={item.bg}> 
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <BottomText>SHOP NOW</BottomText>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIos />
      </Arrow>
    </Container>
  );
};

export default Slider;
