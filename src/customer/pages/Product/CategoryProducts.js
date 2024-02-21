import React from 'react'
import {useParams} from 'react-router'

const CategoryProducts = () => {

    const params = useParams()

  return (
    <div>CategoryProducts {params.categoryId}</div>
  )
}

export default CategoryProducts