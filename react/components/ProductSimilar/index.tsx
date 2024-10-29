import React from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { canUseDOM } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import type { Product } from 'vtex.product-context/react/ProductTypes'

import ProductSimilarsItem from './ProductSimilarsItem'
import GET_PRODUCTS from '../../graphql/product.gql'
import styles from './style.css'

const ProductSimilar = () => {
  if (canUseDOM) {
    const productContext = useProduct() || null

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
      variables: { slug: productContext?.product?.linkText },
    })

    const similars: Product[] = data?.product.recommendations.similars
    const productId: string = data?.product.productId     

    if (loading || error) return null

    if (loading) {
      return (
        <div>
          <Spinner color="currentColor" size={20} />
        </div>
      )
    }

    if(!similars) return

    return (
      <div className={`${styles.contentVariations}`}> 
          <span className={`${styles.titleVariations}`}>
            PRODUTOS SIMILARES
          </span>

           
          <div className={`${styles.listVariations}`}>
            {similars &&
              similars.map(item => {
                return (
                  <ProductSimilarsItem
                    stock={
                      item.items[0].sellers[0].commertialOffer.AvailableQuantity
                    }
                    link={item.linkText}
                    urlImage={item.items[0].images[0].imageUrl}
                    itemId={item.items[0].itemId}
                    productId={productId}
                  />
                )
              })}
          </div>  
          
             
      </div>
    )
  }

  return (
    <div>
      <Spinner color="currentColor" size={20} />
    </div>
  )
}

export default ProductSimilar
