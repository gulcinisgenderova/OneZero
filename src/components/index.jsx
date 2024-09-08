import React from 'react';
import { useGetAllProductsQuery } from '../features/productsApi';


const Components = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // const jsonData = JSON.parse(data);
  console.log('Data received:', data); 
  // console.log('Json  Data:', jsonData); 

  return (
    <div>
      
    </div>
  )
}

export default Components
