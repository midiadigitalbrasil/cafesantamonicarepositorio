import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

import styles from './style.css'

interface Props {
  productId: string
  itemId: string
  link: string
  urlImage: string
  stock: number
}

const ProductSimilarsItem: FC<Props> = ({
  link,
  urlImage,
  stock,
  productId,
  itemId,
}) => {

  return (
    <Link
      to={`/${link}/p`}
      className={`${styles.variation} ${
        productId === itemId ? styles.active : ''
      } ${!stock ? styles.outStock : styles.inStock}`}
    >
      <img className={styles.custom_similars_img} src={urlImage} alt={urlImage} />
    </Link>
  )
}

export default ProductSimilarsItem
