import { useEffect, useState } from 'react';

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Network error occurred'));
    }, 1000); // Simulating a 1-second delay before the error occurs
  });
}

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(response => {
        setData(response);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div>Data: {data}</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default MyComponent;
