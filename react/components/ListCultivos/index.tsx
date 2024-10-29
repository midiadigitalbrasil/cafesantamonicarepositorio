import React from 'react'
import { canUseDOM } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'

import style from './styles.css'

interface Props {
  itemsCultivos: PropsCultivoItem[]
}
interface PropsCultivoItem {
  image: string
  title: string
  text: string
}

const ListCultivos: StorefrontFC<Props> = (props: Props) => {

  if (canUseDOM) {
    if (props.itemsCultivos) {
      return (
        <div className=''>
          <div className={style.cultivoContent}>
            {
              props.itemsCultivos.map(
                ({ title, image, text }, index) => (
                  <div
                    className={style.cultivoItem}
                    key={index}
                  >
                    <img className={style.cultivoItemImage} src={image} alt="imagem da item" />
                    <div>
                      <p className={style.cultivoItemTitle} >{title}</p>
                      <p className={style.cultivoItemText} >{text}</p>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
      )
    }

    return <div className='empty'>vazio</div>
  }

  return (
    <div>
      <Spinner color="currentColor" size={20} />
    </div>
  )
}


ListCultivos.schema = {
  title: 'Items da seção Cultivo',
  type: 'object',
  properties: {
    itemsCultivos: {
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
          image: {
            type: 'string',
            image: 'Imagem',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          title: {
            type: 'string',
            title: 'Titulo',
          },
          text: {
            type: 'string',
            text: 'Texto',
          }
        },
      },
    },
  },
}

export default ListCultivos
