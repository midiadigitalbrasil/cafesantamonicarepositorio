import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { canUseDOM } from 'vtex.render-runtime'
import style from './style.css'

const SelosPdp: StorefrontFC = () => {
  if (canUseDOM) {
    const { product } = useProduct()

    console.log('product.specificationGroups',product.specificationGroups);
    

    const groups = product.specificationGroups.filter(
      (group: any) => group.name === 'Selos'
    )  

    if (!groups) return

    return(
        groups.map((group: any, index: number) => (
              <ul key={index} className={`${style.selos__container}`}>
                {group.specifications.map((spec: any, index: number) => (
                  <li key={index} className={`${style.selos__item}`}>
                    <img src={`/arquivos/selos-${spec.name}.png?v=123`} alt={spec.name} />    
                  </li>
                ))}
              </ul>
          ))
    )
  }

  return (
    <div className={`${style.selos__item} center ph3 ph5-m ph2-xl mw9 `}>
      carregando informações...
    </div>
  )
}

export default SelosPdp
