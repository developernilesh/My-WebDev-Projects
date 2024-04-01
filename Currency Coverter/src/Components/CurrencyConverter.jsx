import React, { useEffect } from 'react'
import { useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown'
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const CurrencyConverter = () => {

    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setfromCurrency] = useState("USD")
    const [toCurrency, settoCurrency] = useState("INR")
    const [convertedAmount, setconvertedAmount] = useState(null)
    const [loading, setloading] = useState(false)
    const [favourites, setfavourites] = useState(
        JSON.parse(localStorage.getItem("favourites")) || []
    )

    async function fetchCurrencies(){
        try {
            const res = await fetch('https://api.frankfurter.app/currencies')
            const data = await res.json();
            setCurrencies(Object.keys(data))
        } 
        catch (error) {
            console.error("Error fetching data", error)
        }
    }

    useEffect(() => {
      fetchCurrencies()
    }, [])

    async function convertCurrencies(){
        if(!amount) return;
        setconvertedAmount("");
        setloading(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json();
            
            setconvertedAmount(data.rates[toCurrency]+" "+toCurrency)
        } 
        catch (error) {
            console.error("Error fetching data", error)
        }
        setloading(false)
    }

    function handleFavourites(currency){
        let updatedFavourites = [...favourites]

        if(updatedFavourites.includes(currency)){
            updatedFavourites = updatedFavourites.filter((fav)=> fav!== currency)
        }
        else{
            updatedFavourites.push(currency)
        }
        setfavourites(updatedFavourites)
        localStorage.setItem("favourites",JSON.stringify(updatedFavourites))
    }

    function swapCurrencies(){
        setfromCurrency(toCurrency)
        settoCurrency(fromCurrency)
    }

    return (
        <div className='max-w-sm sm:max-w-lg mx-auto my-10 p-5 bg-[#ffffff73] 
        rounded-lg shadow-md ring-1 ring-gray-700 backdrop-blur-sm'>
        <h2 className='mb-5 text-3xl font-semibold text-indigo-800'>
            Currency Converter
        </h2>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between'>
            <CurrencyDropdown 
            favourites={favourites}
            currencies={currencies} 
            title="From" 
            setCurrency={setfromCurrency} 
            handleFavourites={handleFavourites} 
            currency={fromCurrency}/>

            {/* swap currency button */}
            <div className='flex items-center justify-center -mb-8'>
                <button onClick={swapCurrencies} className='p-2 bg-gray-100 rounded-full 
                cursor-pointer border border-gray-700 hover:bg-gray-50 rotate-90 sm:rotate-0'>
                    <HiOutlineSwitchHorizontal className='text-xl font-bold text-gray-700'/>
                </button>
            </div>

            <CurrencyDropdown 
            favourites={favourites}
            currencies={currencies} 
            title="To" 
            setCurrency={settoCurrency} 
            handleFavourites={handleFavourites} 
            currency={toCurrency}/>
        </div>

        <div className='mt-4'>
            <label htmlFor='amount' className='block text-lg font-semibold text-gray-900'>Amount:</label>
            <input type='text' id='amount' onChange={(e)=>setAmount(e.target.value)} value={amount}
            className='w-full p-2 border border-indigo-600 rounded-md shadow-sm
            focus:outline-none focus:ring-1 focus:ring-indigo-600 mt-1'/>
        </div>

        <div className='flex justify-end mt-6'>
            <button className={`px-5 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 text-lg
            focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2 ${loading?"animate-pulse":""}`}
            onClick={convertCurrencies}>
                Convert
            </button>
        </div>

        {loading && <div className='mt-4 text-xl font-semibold text-right text-rose-900 animate-pulse'>
            Converting...
        </div>}

        {convertedAmount && <div className='mt-4 text-xl font-semibold text-right text-rose-900'>
            Converted Amount : {convertedAmount}
        </div>}
        </div>
    )
}

export default CurrencyConverter
