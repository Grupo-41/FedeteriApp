import React from 'react'

const Page = ({params}) => {
    const id = params.id;

  return (
    <div>{id}</div>
  )
}

export default Page