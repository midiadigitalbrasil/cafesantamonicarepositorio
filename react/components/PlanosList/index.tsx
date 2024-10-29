import React from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { index as RichText } from 'vtex.rich-text'

import style from './styles.css'

interface Props {
  items: PropsPlanosListItem[]
  children: any
}
interface PropsPlanosListItem {
  title: string
  icon: string
  text: string
  perks: string
  footer?: string
  isMaisPedido: boolean
}

const PlanosList: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  if (props.items.length > 0) {
    const categoriasListContent = props.items.map(
      ({ title, icon, text, perks, footer, isMaisPedido }, index) => (
        <div
          className={`ph6 w-100 h-100 relative ${style.planoItem}`}
          key={index}
          style={{ paddingTop: '80px' }}
        >
          <div
            className="h-100 w-100 ph3 pv9 tc flex flex-column justify-between"
            style={{ backgroundColor: '#FCE7C2' }}
          >
            <div
              className={`br-100 absolute right-0 left-0  top-0 center ${style.planoItemIcon}`}
              style={{
                backgroundImage: icon ? `url(${icon})` : '',
              }}
            >
              {isMaisPedido && (
                <div className="absolute bottom-0  w-100 ">
                  <div className="dib bg-success c-on-base--inverted center f8 fw5 nowrap pv3 ph4 ttu">
                    mais pedido{' '}
                  </div>
                </div>
              )}
            </div>
            <div>
              <RichText
                textColor="c-action-primary"
                text={title}
                font="t-heading-2"
              />
              <div className="mt2">
                <RichText text={text} />
              </div>
            </div>
            <div className="mt6">
              <RichText
                textColor="c-action-primary"
                text={perks}
                font="t-heading-3"
              />
            </div>
            <RichText
              text={footer || 'durante o período de vigência do plano'}
              font="t-mini"
            />
          </div>
        </div>
      )
    )

    const newListContextValue = list.concat(categoriasListContent)

    return (
      <div>
        <ListContextProvider list={newListContextValue}>
          {props.children}
        </ListContextProvider>
      </div>
    )
  }

  return <div />
}

PlanosList.schema = {
  title: 'Lista de Planos',
  type: 'object',
  properties: {
    items: {
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
          title: {
            type: 'string',
            title: 'Título',
          },
          icon: {
            type: 'string',
            title: 'Ícone',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          text: {
            type: 'string',
            title: 'Headline',
          },
          perks: {
            title: 'Vantagens',
            type: 'string',
          },
          footer: {
            type: 'string',
            title: 'Footer',
          },
          isMaisPedido: {
            type: 'boolean',
            title: 'Mostrar selo Mais Pedido',
          },
        },
      },
    },
  },
}

export default PlanosList
