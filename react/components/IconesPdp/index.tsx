import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { canUseDOM } from 'vtex.render-runtime'
import style from './style.css'

const IconesPdp: StorefrontFC = () => {
  if (canUseDOM) {
    const { product } = useProduct()

    // Verifica se há grupos para evitar erros
    if (!product || !product.specificationGroups) return null

    const groups = product.specificationGroups.filter(
      (group: any) => group.name === 'Icons'
    )

    // Se o grupo "Icons" existir, mas você não quer exibir nada, simplesmente retorna null
    if (groups && groups.length > 0) return null
  }

  return (
    <div className={`${style.icones__item__custom} center ph3 ph5-m ph2-xl mw9`}>
      carregando informações...
    </div>
  )
}

export default IconesPdp
