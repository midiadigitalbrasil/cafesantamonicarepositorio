import React, { useState, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Spinner } from 'vtex.styleguide'

import style from './styles.css'

interface Props {
  valueMin: valueMinItem[]
}

interface valueMinItem {
  value: number
}

const ShippingFree: StorefrontFC<Props> = (props: Props) => {
  const {
    orderForm: { value, totalizers, shippingData },
  } = useOrderForm()

  const [progress, setProgress] = useState(0)
  const [lack, setLack] = useState(0)
  const [shippingValue, setShippingValue] = useState(0)

  const minValue = props.valueMin.length > 0 ? props.valueMin[0].value : 0

  // Calculate subscriber price with a 15% discount
  const subscriberPrice = value * 0.85

  useEffect(() => {
    const calculateLack = () => {
      setProgress((value / minValue) * 100)
      setLack(Math.max(minValue - value, 0))

      if (totalizers) {
        const shippingTotalizer = totalizers.find(
          (item: any) => item.id === 'Shipping'
        )
        setShippingValue(shippingTotalizer ? shippingTotalizer.value : 0)
      }
      
      console.log(shippingValue) // Para evitar erro de variável não utilizada
    }

    if (value > 0) {
      calculateLack()
    } else {
      setLack(minValue)
      setProgress(0)
    }
  }, [value, totalizers, minValue, shippingValue])

  const isSPFreteGratis = () => {
    const postalCode = shippingData?.address?.postalCode || ''
    return postalCode.startsWith('0') // Lógica específica para São Paulo
  }

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
                {(value / 100).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span className={`${style.mini_cart_fixed_price_subscriber}`}>
                Assinante: {(subscriberPrice / 100).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </div>
          <div className={style.sfc__group}>
            {lack > 0 ? (
              <p className={style.sfc__text}>
                Faltam&nbsp;
                <strong>
                  {(lack / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
                &nbsp;para ganhar FRETE GRÁTIS
              </p>
            ) : isSPFreteGratis() ? (
              <p className={style.sfc__text}>
                Parabéns! Você ganhou FRETE GRÁTIS
              </p>
            ) : (
              <p className={style.sfc__text}>
                Frete grátis não disponível para sua região
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
  title: 'Valor Mínimo para Frete Grátis',
  type: 'object',
  properties: {
    valueMin: {
      title: 'Itens',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Título',
            description: 'Título do valor mínimo',
            type: 'string',
          },
          value: {
            type: 'number',
            title: 'Valor mínimo',
          },
        },
      },
    },
  },
}

export default ShippingFree
