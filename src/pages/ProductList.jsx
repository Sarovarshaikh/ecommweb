import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../Responsive";
import { useLayoutEffect } from "react";

const Container = styled.div`
    
`
const Title = styled.h1`
    margin: 20px;

`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;

    ${mobile({width: "0 20px", display: "flex", flexDirection: "column"})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;

    ${mobile({marginRight: "5px"})}
`

const Select = styled.select`
  width: 150px;
  padding: 10px;
  font-size: 16px;
  font-weight:600;
  margin-right: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #ccc;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2326749a'><polygon points='0,0 100,0 50,50'/></svg>")
    no-repeat;
  background-color: #fffafa;
  background-size: 16px;
  background-position: calc(100% - 12px) 15px;
  background-repeat: no-repeat;
  cursor: pointer;

  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  list-style:none;
  outline: none;
  font-size:15px;
 
`

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container>
      <Annoucement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue={'Color'} name="color" onChange={handleFilters}>
          <Option disabled value="Color">
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Pink</Option>
          </Select>
          <Select name="size" defaultValue={'size'} onChange={handleFilters}>
            <Option disabled value="size">
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=>setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort= {sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList