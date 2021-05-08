import React, { useEffect, useState } from 'react'

export function Fetch_data(url) {
    const [data, setdata] = useState([])
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setdata(data))
    }, [url])
    return {data, setdata}
}


