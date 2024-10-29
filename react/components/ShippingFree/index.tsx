import React, { useState, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner } from 'vtex.styleguide'

import style from './styles.css'
/* eslint-disable */
interface Props {
  valueMin: valueMinItem[]
}

interface valueMinItem {
  value: number
}

const ShippingFree: StorefrontFC<Props> = (props: Props) => {
  const {
    orderForm: { value, totalizers },
  } = useOrderForm()

  const [progress, setProgress] = useState(0)
  const [lack, setLack] = useState(0)
  const [shippingValue, setShippingValue] = useState(0)

  const minValue = props ? props.valueMin[0].value : 0

  useEffect(() => {
    if (value > 0) {
      console.log('minValue::  ', minValue)

      setProgress((value / minValue) * 100)
      if (minValue - value > 0) {
        setLack(minValue - value)
      } else {
        setLack(0)
      }
    } else {
      setLack(minValue)
      setProgress(0)
    }

    if (totalizers) {
      var isShipping = totalizers.filter(
        (item: any) => item.id == 'Shipping'
      )[0]?.value
      setShippingValue(isShipping ? isShipping : 0)
    }
  })

  if (canUseDOM) {
    return (
      <>
        <div className={`${style.mini_cart_fixed_container}`}>
          <div className={`${style.mini_cart_fixed_data}`}>
            <div className={`${style.mini_cart_fixed_data_info}`}>
              <span className={`${style.mini_cart_fixed_quantity}`}>
                Subtotal
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
          <div className={style.sfc__group}>
            {lack ? (
              <p className={style.sfc__text}>
                Faltam&nbsp;
                <strong>
                  {((lack + shippingValue) / 100)
                    .toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                    .replace('.', ',')}
                </strong>{' '}
                &nbsp;para ganhar&nbsp;FRETE GRÁTIS
              </p>
            ) : (
              <p className={style.sfc__text}>
                Parabéns você ganhou FRETE GRÁTIS
              </p>
            )}
            <div className={style.sfc__bar__content}>
              <span
                style={{ width: `${progress}%` }}
                className={style.sfc__bar__progress}
              ></span>
            </div>
          </div>
          <button className={`${style.mini_cart_fixed_text_wrap}`}>
            <a
              className={`${style.mini_cart_fixed_text}`}
              href="/checkout/#/cart"
            >
              IR PARA SACOLA
            </a>
          </button>
        </div>
      </>
    )
  }

  return (
    <div>
      <Spinner color="#fff" size={20} />
    </div>
  )
}

ShippingFree.defaultProps = {
  valueMin: [],
}

ShippingFree.schema = {
  title: 'valor minímo',
  type: 'object',
  properties: {
    valueMin: {
      title: 'Itens',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          value: {
            type: 'number',
            title: 'valor minímo',
          },
        },
      },
    },
  },
}

export default ShippingFree
