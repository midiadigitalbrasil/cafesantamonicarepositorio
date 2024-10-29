import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { canUseDOM } from 'vtex.render-runtime'
import style from './style.css'

const IconesPdp: StorefrontFC = () => {
  if (canUseDOM) {
    const { product } = useProduct()    

    const groups = product.specificationGroups.filter(
      (group: any) => group.name === 'Icons'
    ) 

    console.log('groups',groups);
    

    if (!groups) return

    return(
      groups.map((group: any, index: number) => (
              <ul key={index} className={`${style.icones__container__custom}`}>
                {group.specifications.map((spec: any, index: number) => (
                  <li key={index} className={`${style.icones__item__custom}`}>
                    <img src={`/arquivos/icones-${spec.name.replace(/\s/g, '-').toLocaleLowerCase()}.png?v=321`} alt={spec.name} />    
                  </li>
                ))}
              </ul>
          ))
    )
  }

  return (
    <div className={`${style.icones__item__custom} center ph3 ph5-m ph2-xl mw9 `}>
      carregando informações...
    </div>
  )
}

export default IconesPdp
