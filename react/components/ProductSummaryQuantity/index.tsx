import React from 'react'
import { ProductQuantity } from 'vtex.product-quantity'

import style from './styles.css'

const ProductSummaryQuantity = () => {
  const stopBubblingUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      onClick={stopBubblingUp}
      className={`b--action-primary ba br-0-l c-action-primary  ${style.quantitySelectorContainer}`}
    >
      <ProductQuantity showLabel={false} />
    </div>
  )
}

export default ProductSummaryQuantity
