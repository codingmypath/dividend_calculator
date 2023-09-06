import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [data, setData] = useState([]);
    const [stockApi, setStockApi] = useState([]);


    const loadData = async () => {
        const response = await axios.get("https://mydividendtracker.netlify.app/api/get");
        setData(response.data);

        async function getCat() {
            const respOne = await fetch("https://mydividendtracker.netlify.app/api/get");
            const cat = await respOne.json(); 
    
            const childRes = await Promise.all( 
                cat.map(id => 
                    fetch(`https://stockapi-rskk.onrender.com/api/${id.stock}`)
                )
            );
            // console.log("child", childRes)
    
            const childData = await Promise.all(
                childRes.map((response) => response.json())
            )
            setStockApi(childData)

            console.log("ENTER");
            console.log("childData", childData)
            console.log("Child", childRes.map((e) => e))
            // return cat.map((test, index) => test.json())
        }
        getCat();

    }

    useEffect(() => {
        loadData();
        // console.log("data", data)
        // const respOne = await fetch("http://localhost:3009/api/get");
        // const cat = await respOne.json();
        // const fetchData = async () => {
        //     try {
        //         Promise.all(data.map(id => 
        //             // console.log("map2", id))
        //             fetch(`https://stockapi-rskk.onrender.com/api/${id.stock}`).then(resp =>resp.json())
        //             .then(value => {
        //                 setStockApi(prev => [...prev, value])})
        //           ))
        //           console.log("stockapi", stockApi)
        //     } catch(err) {}
        // } 



        // console.log("data", data)
        // console.log('stockapi', stockApi)
        // Promise.all(data.map(id => 
        //     // console.log("map", id))
        //     fetch(`https://stockapi-rskk.onrender.com/api/${id.stock}`).then(resp =>resp.json())
        //   )).then(value => console.log("val", value))
    }, []);
    // console.log("STockapi", stockApi)

    // useEffect(() => {
    //     console.log("data2:", data)
    //     Promise.all(data.map(id => 
    //         // console.log("map2", id))
    //         fetch(`https://stockapi-rskk.onrender.com/api/${id.stock}`).then(resp =>resp.json())
    //         .then(value => {
    //             setStockApi(prev => [...prev, value])})
    //       ))
    //       console.log("stockapi", stockApi)
    // }, [data]);


    // useEffect(() => {
    //     console.log("usedata:", data)
    //     Promise.all(data.map(id => 
    //         // console.log("map", id.stock)))
    //         fetch(`https://stockapi-rskk.onrender.com/api/${id.stock}`).then(resp => {resp.json()})
    //         .then(value => console.log('val', value))
    //       ))
    // }, [data])

    // console.log("data2:", data)
    

    // stockApi.map((item, index) => {
    //     console.log("item", item.name)
    //     // <td>{stockApi[index].name}</td>
    // })
    
    const deleteContact = (id) => {
        console.log("ID", id)
        if(window.confirm("Are you sure that you want to delete?")) {
            axios.delete(`https://mydividendtracker.netlify.app/api/remove/${id}`);
            toast.success("Contact Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    }

    if (stockApi.length > 0) {
    let sum = 0;
    stockApi.forEach(num => {
        sum += num.dividend;
    })
    console.log("SUM", sum)

    return (
        <div className="homeContainer">
            <div className="navTable">
                <img className="logo" src="./dividend_logo.jpg" alt="logo" />
                <Link to="/addContact">
                <button className='btn btn-contact'>+</button>
                </Link>
            </div>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Stock</th>
                        <th style={{textAlign: "center"}}>Shares</th>
                        <th style={{textAlign: "center"}}>Total Dividend</th>
                    
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>${item.stock.toUpperCase()}</td>
                                <td>{item.shares}</td>
                                <td>${((stockApi[index].dividend) * item.shares).toFixed(2)}</td>
                                {/* {stockApi.map((item, index) => {
                                    return (
                                        <td key={index}>{item.name}</td>
                                    )
                                    // <td>{stockApi[index].name}</td>
                                })}
                         */}
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
    } else {
        return (
            <h2 className='loading'>Loading...</h2>
        )
    }
}

export default Home