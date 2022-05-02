import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFindOneItem from '../../hooks/useFindOneItem';
import './Inventory.css'

const ManageOne = ({ id }) => {
    const { item, setItem } = useFindOneItem(id)
    // console.log(item.price)
    const { DiscountPrice, category, details, imageUrl, price, quantity, supplierName, title, _id } = item
    const quantityParse = parseInt(quantity)



    const updateQuantityHandle = (e, method) => {

        let newQuantity;
        if (method === 'reduce') {
            if (quantityParse > 0) {
                newQuantity = quantityParse - 1;
            }
            else {
                alert('Sorry stock empty')
            }
        }
        else {
            newQuantity = quantityParse + parseInt(e.target.parentNode.querySelector('#restock').value)
        }

        const NewItem = { DiscountPrice, category, details, imageUrl, price, quantity: newQuantity, supplierName, title };

        const { data } = axios.put(`http://localhost:5000/item/${id}`, NewItem)
        setItem(NewItem)
    }
    return (
        <div className='manageItemMain'>
            <div className='manageItem'>
                <img src={imageUrl} alt="" />
                <div>
                    <h3>{title}</h3>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h5>Quantity:
                                <span className='new'> {Boolean(quantityParse) ? quantityParse : <span style={{ color: "red" }}>Stock out</span>}
                                </span>
                            </h5>
                            <h3 className='price'>
                                Price:
                                <del className='old'> ${price}</del>
                                <span className='new'>     ${DiscountPrice}</span>
                            </h3>
                        </div>
                        <span className='category'>
                            <Link to='/'><small>{category}</small></Link>
                            <b>||</b>
                            <Link to=''>{supplierName}</Link>
                        </span>

                        <p>
                            {
                                details?.substring(0, 60)
                            }...
                        </p>

                        <div className='reStockDel'>
                            <div>
                                <button onClick={(e) => updateQuantityHandle(e, 'reduce')}>Delivered</button>

                            </div>
                            <div>
                                <input type="number" min='1' name="" id="restock" placeholder='Restock value' />
                                <button onClick={(e) => updateQuantityHandle(e, 'restock')}>Restock </button>
                            </div>
                        </div>


                        {/* <button onClick={() => { navigate('/inventory/' + _id) }}> <img src={manage} alt="" className='manage' /> Manage Item</button> */}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageOne;