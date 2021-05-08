import {useState, useEffect} from 'react';

const useFetch = (url) =>{
    const [data, setdata] = useState([]); 
    const [isPanding,setisPanding] = useState(true);
    const [error ,setError] = useState(null);
    useEffect(() =>{
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url,{signal:abortCont.signal})
                .then(res => {
                    if(!res.ok){
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data =>{
                    console.log(data);
                    setdata(data);
                    setisPanding(false);
                    setError(null);
                })
                .catch(err =>{
                    if(err.name === 'AbortError'){
                        console.log('fetch aborted')
                    }else {
                        setisPanding(false);
                        setError(err.message);
                    }
                })
            
        });
        return () => abortCont.abort();

    },[]);
    return {data, isPanding, error, setdata}
}

export default useFetch;