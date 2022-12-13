import { useLocation } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  background-color: #ffcaca;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
    width: 30%;
    height: 25vh;
    box-sizing: border-box;
    padding: 50px 0;
    border-radius: 20px;
    background-color: #00aaff;
    text-align: center;
`

const Success = () => {
    const location = useLocation();
    console.log(location);
  return (
    <Container>
      <Box>
        <h1>Payment Successfull!</h1>
        <h3>Thank You</h3>
      </Box>
    </Container>
  );
}

export default Success