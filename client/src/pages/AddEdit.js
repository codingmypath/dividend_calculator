import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link}  from "react-router-dom";
import axios from "axios";
import "./AddEdit.css"
import { toast } from "react-toastify";

const initialState = {
    stock: "",
    shares: "",
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {stock, shares} = state;
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}));

    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stock || !shares) {
            toast.error("Please provide value into each input field");
        } else {
            if (!id) {
                axios.post("/api/post", {
                stock, 
                shares,
            
                }).then(() => {
                    setState({stock: "", shares: "", total: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully")
            } else {
                axios.put(`/api/update/${id}`, {
                stock, 
                shares,
    
                }).then(() => {
                    setState({stock: "", shares: "", total: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully")
            }
            
            setTimeout(() => {
                navigate("/");
            }, 300)
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }


    return (
        <div className="addEditContainer">
        <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
        <label htmlFor="name">Stock</label>
                <input 
                type="text" 
                id="stock"
                name="stock" 
                placeholder="AAPL" 
                value={stock || ""}
                onChange={handleInputChange} />
                <label htmlFor="shares">Amount of Shares</label>
                <input 
                type="number" 
                id="shares"
                name="shares" 
                placeholder="Amount of shares" 
                value={shares || ""}
                onChange={handleInputChange} />
                {/* <label htmlFor="total">Total</label>
                <input 
                type="total" 
                id="total"
                name="total" 
                placeholder="total" 
                value={total || ""}
                onChange={handleInputChange} disabled /> */}

                <input className="btn btn-submit submitBtn" type="submit" value="Submit" />
                <Link to="/">
                    <input className="btn btn-edit editBtn" type="button" value="Go Back" />
                </Link>
        </form>
    </div>
    )
}

export default AddEdit