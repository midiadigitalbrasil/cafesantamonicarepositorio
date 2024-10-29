import React, { useEffect } from 'react'
import { useFullSession } from 'vtex.session-client'
import { canUseDOM } from 'vtex.render-runtime'
import { Icon } from 'vtex.store-icons'
import { Spinner } from 'vtex.styleguide'

import style from './style.css'

const CartMobile: StorefrontFC = () => {
  const { data: session } = useFullSession()

  useEffect(() => {
    if (session === undefined) {
      return
    }

    const sessionData: any = session.session

    console.log('minicart', sessionData)
  }, [session])

  if (canUseDOM) {
    return (
      <div>
        <a
          id="miniCartMobile"
          className={style.miniCart}
          href="/checkout#/cart"
        >
          <Icon id="hpa-cart" size="24" />
        </a>
      </div>
    )
  }

  return (
    <div>
      <Spinner color="#fff" size={20} />
    </div>
  )
}

export default CartMobile
