import React from 'react'
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const CurrencyDropdown = ({
    currencies,currency,setCurrency,favourites,handleFavourites,title
  }) => {

  const isFavourite = curr => favourites.includes(curr)

  return (
    <div className='w-full'>
      <label htmlFor={title}
      className='block text-lg font-semibold text-gray-900'>
        {title}
      </label>

      <div className='mt-1 relative'>
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)}
        className='w-full p-2 border border-indigo-600 rounded-md shadow-sm
        focus:outline-none focus:ring-1 focus:ring-indigo-600'>
          {
            favourites.map((currency) => {
              return <option className='bg-gray-300' value={currency} key={currency}>{currency}</option>
            })
          }
          
          {
            currencies
            .filter((c)=>!favourites.includes(c))
            .map((currency) => {
              return <option value={currency} key={currency}>{currency}</option>
            })
          }
        </select>

        <button onClick={() => handleFavourites(currency)}
        className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5'>
          {isFavourite(currency) ? <HiHeart /> : <HiOutlineHeart />}
        </button>
      </div>
    </div>
  )
}

export default CurrencyDropdown
