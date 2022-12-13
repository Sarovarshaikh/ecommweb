import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import axios from "axios"
import { useLayoutEffect } from "react";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`

const Products = ({cat,filters,sort}) => {
  const [products,setProducts] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-api-ravi.cyclic.app/api/products?category=${cat}`
            : "https://ecommerce-api-ravi.cyclic.app/api/products"
        );
        setProducts(res.data)
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter(item=> Object.entries(filters).every(([key, value])=>
        item[key].includes(value)
      ))
    );
  },[products, cat, filters])

  useEffect(() => {
    if(sort === "newest"){
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=> a.createdAt - b.createdAt)
      );
    }
    else if(sort === "asc"){
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=> a.price - b.price)
      )
    }
    else{
      setFilteredProducts((prev)=>
        [...prev].sort((a,b)=> b.price - a.price)
      )
    }
  }, [sort])

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Container>
        {cat ?
            filteredProducts.map((item,index)=> (
                <Product item={item} key={index}/>
            )) : products.slice(0,9).map((item,index)=> <Product item={item} key={index}/>)
        }
    </Container>
  )
}

export default Products