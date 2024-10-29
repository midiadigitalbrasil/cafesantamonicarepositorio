import React, { useState } from 'react'
import useProduct from 'vtex.product-context/useProduct'
// import { useListContext, ListContextProvider } from 'vtex.list-context'
// import { index as RichText } from 'vtex.rich-text'
import { canUseDOM } from 'vtex.render-runtime'

import style from './styles.css'

const CustomPdpDescription: StorefrontFC = () => {
  if (canUseDOM) {
    const { product } = useProduct()
    const [tabCurrent, setTabCurrent] = useState(0)

    const groups = product.specificationGroups.filter(
      (group: any) => group.name !== 'allSpecifications'
    )

    const { description } = product

    const groupRenderingList = groups.map((group: any, index: number) => (
      <>
        {tabCurrent === index && (
          <table className={`${style.prodSpec__table}`}>
            {group.specifications.map((spec: any) => (
              <tr>
                <td>
                  <b>{spec.name}</b>
                </td>
                <td>{spec.values[0]}</td>
              </tr>
            ))}
          </table>
        )}
      </>
    ))

    const tabs = groups.map((group: any, index: number) => (
      <div
        className={`${style.prodSpec__tab} ${
          tabCurrent === index ? style.prodSpec__tabActive : ''
        }`}
        onClick={() => setTabCurrent(index)}
      >
        <label>{group.name}</label>
        <div className={`${style.prodSpec__mobile}`}>
          {tabCurrent === index && groupRenderingList}
        </div>
      </div>
    ))

    return (
      <section className={`prodSpec__container__master left`}>
        <div
          className={`${style.prodSpec__container} center ph3 ph5-m ph2-xl mw9 `}
        >
          <div className={`${style.prodSpec__tabs}`}>{tabs}</div>
          <div
            className={`${style.prodSpec__tableCenter} ${style.prodSpec__desktop}`}
          >
            {groupRenderingList}
          </div>
        </div>

        <div
          className={`${style.prodSpec__container} center ph3 ph5-m ph2-xl mw9 `}
        >
          <div className={`${style.prodSpec__description}`}>Descrição</div>
          <div className={`${style.prodSpec__tableCenter}`}>{description}</div>
        </div>
      </section>
    )
  }

  return (
    <div
      className={`${style.prodSpec__container} center ph3 ph5-m ph2-xl mw9 `}
    >
      carregando informações...
    </div>
  )
}

CustomPdpDescription.schema = {
  type: 'object',
  title: 'Descrição do Produto',
}

export default CustomPdpDescription
