import React, { useEffect, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import style from './style.css'

const CategoryDescription: StorefrontFC = () => {
  const {
    route: { params },
  } = useRuntime()
  const [description, setDescription] = useState('')

  useEffect(() => {
    console.log('params', params);
    const fetchCategoryDescription = async () => {
      try {
        const categoryId = params?.id;
        if (!categoryId) return;

        const res = await fetch(`/api/catalog_system/pub/category/${categoryId}`)
        if (!res.ok) throw new Error('Failed to fetch category')

        const data = await res.json()
        console.log('data', data);
        setDescription(data.MetaTagDescription || '')
      } catch (err) {
        console.error('Error fetching category description:', err)
      }
    }

    fetchCategoryDescription()
  }, [params])

  if (!description) return null

  return <h2 className={style.description}>{description}</h2>
}

export default CategoryDescription
