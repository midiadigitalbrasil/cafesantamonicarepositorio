import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { ProductListContext } from 'vtex.product-list-context'
import { ExtensionPoint } from 'vtex.render-runtime'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'

import { mapSKUItemsToCartItems } from '../../utils/MapSKUItemsToCartItems'
import LazyRender from '../../utils/LazyRender'
import Totals from './Totals'
import style from './styles.css'

interface Props {
  BuyButton: React.ComponentType<{ skuItems: CartItem[] | null }>
}

const { ProductListProvider } = ProductListContext

const BuyTogether: StorefrontFC<Props> = ({ BuyButton }) => {
  const { product } = useProduct()
  let items: any[] = []
  let cartItems: any[] = []
  
  if (product?.benefits?.length > 0 && product?.benefits?.items?.length > 0) {
    product.benefits[0].items.forEach((el: BenefitItem) => {
      const normalized = ProductSummary.mapCatalogProductToProductSummary(
        el.benefitProduct
      )

      items = [...items, normalized]
    })

    cartItems = mapSKUItemsToCartItems(items)
    console.log('cartItems', cartItems)
  }

  if (!items || items.length === 0) {
    return <div></div>
  }

  return (
    <LazyRender>
      <>
        <div className={`${style.buyTogether}`}>
          <h2>APROVEITE E COMPRE JUNTO</h2>
          <div className={`${style.buyTogether__container}`}>
            <div className="flex">
              <ProductListProvider listName="BuyTogether">
                {items.map((item, index) => (
                  <div key={index}>
                    <ExtensionPoint id="product-summary.shelf" product={item} />
                  </div>
                ))}
              </ProductListProvider>
            </div>
            <div className={`${style.buyTogether__totalContainer}`}>
              <Totals benefitsItems={product.benefits[0].items} />

              {cartItems && <BuyButton skuItems={cartItems} />}
            </div>
          </div>
        </div>
      </>
    </LazyRender>
  )
}

BuyTogether.schema = {
  type: 'object',
  title: 'Compre Junto',
  properties: {},
}

export default BuyTogether
