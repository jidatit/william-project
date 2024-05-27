import React from 'react'

const Button = ({text, onClickProp}) => {
  return (
    <button onClick={onClickProp} className='w-full h-[50px] rounded-[33px] bg-[#FFA90A] font-bold text-[20px] text-white'>{text}</button>
  )
}

export default Button