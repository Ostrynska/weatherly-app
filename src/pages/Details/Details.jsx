import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Detail Page </h1>
      <p>Card ID: {id}</p>
    </div>
  );
};

export default Details;
