import React, { useEffect, useState } from "react"
import {useParams, Link}  from "react-router-dom";
import axios from "axios";
import "./View.css";


const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();
    const [stock, setStock] = useState();

    // useEffect(() => {
    //     axios.get(`http://localhost:3009/api/get/${id}`)
    //     .then((resp) => setUser({ ...resp.data[0] }));
    // }, [id]);

    
    useEffect(() => {

        fetch(`http://localhost:3009/api/get/${id}`)
        .then(response => {
            return response.json();
        })
        .then(data1 => {
            setUser({ ...data1[0] });
            console.log("DATA1:", data1);
            return fetch(`https://stockapi-rskk.onrender.com/api/${data1[0].stock}`);
        })
        .then(response => {
            return response.json();
        })
        .then(data2 => {
            setStock({...data2})
            console.log("DATA2 ", data2);
        })
        .catch(error => {
            console.error(error);
        });
    
    }, [id])

    if (!stock) {
        return null;
    }

    // console.log("user", user)
    // console.log("Stock", stock)
    
    // console.log("user.total", user.total)
    // console.log("Stock.div", stock.dividend)
    // console.log("TOTAL:", user.total * stock.dividend)
    
   
    let total = (user.shares * stock.dividend).toFixed(2);

    console.log("total:", total)

    return (
        <div className="viewContainer">
            <div className="card">
                <div className="card-header">
                    <p>Stock Details</p>
                </div>
                <div>
                    <img className="stockLogo" src={stock.image} alt="logo" />
                    <br />
                    <br />
                    <strong>Stock:</strong>
                    <span> {stock.name}</span>
                    <br />
                    <br />
                    <strong>Symbol:</strong>
                    <span> ${user.stock.toUpperCase()}</span>
                    <br />
                    <br />
                    <strong>Shares:</strong>
                    <span> {user.shares}</span>
                    <br />
                    <br />
                    <strong>Pay:</strong>
                    <span> {stock.pay}</span>
                    <br />
                    <br />
                    <strong>Sector:</strong>
                    <span> {stock.sector}</span>
                    <br />
                    <br />
                    <strong>Total:</strong>
                    <span> {total}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View