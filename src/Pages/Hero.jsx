import React from 'react'
import { useState } from 'react'
import Header from '../Component/Header'
import SearchHeader from '../Component/SearchHeader'
import Content from '@/Component/Content'

const Hero = () => {

  const [receivedArray, setReceivedArray] = useState([]);

  const receiveArrayFromChild = (array) => {
    setReceivedArray(array);
  };

  console.log(receivedArray)

  return (
    <>
      <section className='w-screen h-screen'>
        <Header passArrayToParent={receiveArrayFromChild} />
        {/* <SearchHeader /> */}
        <Content taskData={receivedArray} />
      </section>

    </>
  )
}

export default Hero