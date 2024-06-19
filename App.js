import  { useEffect, useState } from 'react';

const FetchWithDelayAndCleanup = () => {
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        // Adding a 5-second delay
        await new Promise(resolve => setTimeout(resolve, 5000));

        const response = await fetch('http://localhost:3001/', { signal: abortController.signal });
        const data = await response.text();
        console.log(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchData();

    // Cleanup function to abort fetch on component unmount
    return () => {
      abortController.abort();
    };
  }, []);

  return <div>Fetching data... Check the console after 5 seconds.</div>;
};


function App(){
  const [st, setSt] = useState(true)
  return (
    <>
    <button type="button" onClick={()=>setSt(false)}>Click</button>
    {st && <FetchWithDelayAndCleanup/>}
    </>
    
  );
}


export default App;

