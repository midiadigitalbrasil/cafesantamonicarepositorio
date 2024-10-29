import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Icon } from 'vtex.store-icons'
import { Spinner } from 'vtex.styleguide'

import style from './styles.css'

const MiniCartFixed: StorefrontFC = () => {
  const {
    orderForm: { value, items },
  } = useOrderForm()

  if (canUseDOM) {
    return (
      <div>
        <div className={`${style.mini_cart_fixed_container}`}>
          <div className={`${style.mini_cart_fixed_data}`}>
            <Icon id="hpa-cart" size="16" />
            <div className={`${style.mini_cart_fixed_data_info}`}>
              <span className={`${style.mini_cart_fixed_quantity}`}>
                Sacola - {items.length} itens
              </span>
              <span className={`${style.mini_cart_fixed_price}`}>
                {(value / 100)
                  .toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .replace('.', ',')}
              </span>
            </div>
          </div>

          <a
            className={`${style.mini_cart_fixed_text}`}
            href="/checkout/#/cart"
          >
            IR PARA SACOLA
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Spinner color="#fff" size={20} />
    </div>
  )
}

export default MiniCartFixed
