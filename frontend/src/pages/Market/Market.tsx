import {useState, useEffect} from 'react';


export const Market = ({wallet}) => {

    const fetchMyCards = async () => {
        console.log(await wallet.contract.getAllNftInSales())

    }

    useEffect(() => {
        fetchMyCards();
        }, [wallet]);
    return (
        <div>
            <h1>Market</h1>
        </div>
    )
}