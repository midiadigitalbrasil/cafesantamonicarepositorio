/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useState, useEffect } from 'react'
import { FormattedCurrency } from 'vtex.format-currency'
import style from './styles.css'
import { deducePercentage } from '../../utils/deducePercentage'

interface Props {
  benefitsItems: BenefitItem[]
}

const Totals: StorefrontFC<Props> = ({ benefitsItems }) => {
  const [totals, setTotals] = useState({
    totalPriceWithoutDiscount: 0,
    totalPrice: 0,
  })

  useEffect(() => {
    let totalPriceWithoutDiscount = 0
    let totalPrice = 0

    benefitsItems.forEach((item: BenefitItem) => {
      const price =
        item.benefitProduct.items[0].sellers[0].commertialOffer.Price

      const priceWithDiscount = deducePercentage(price, item.discount)

      totalPriceWithoutDiscount += price ?? 0
      totalPrice += priceWithDiscount ?? 0
    })

    setTotals({
      totalPriceWithoutDiscount,
      totalPrice,
    })
  }, [])

  return (
    <div className="pv8">

      <h2>LEVE<br/>2 PRODUTOS</h2>
      <span className={`${style.buyTogether__listPrice}`}>
        <FormattedCurrency
          value={Math.max(0, totals.totalPriceWithoutDiscount)}
        />
      </span>
      <h3 className={`${style.buyTogether__bestPrice}`}>
        <FormattedCurrency value={Math.max(0, totals.totalPrice)} />
      </h3>
    </div>
  )
}

export default Totals
