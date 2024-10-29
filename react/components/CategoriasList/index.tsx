import React from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { index as RichText } from 'vtex.rich-text'
//import { TextPositionValues } from 'vtex.rich-text/react/typings/SchemaTypes'
import { Icon } from 'vtex.store-icons'
import { Link } from 'vtex.render-runtime'

interface Props {
  items: PropsCategoriasListItem[]
  children: any
}
interface PropsCategoriasListItem {
  text: string
  iconId: string
  iconSize: number
  href: string
}

const CategoriasList: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  if (props.items && props.items.length > 0) {
    const categoriasListContent = props.items.map(({ text, iconId, iconSize, href }, index) => (
      <div className={text} key={index}>
        <Link className="flex flex-column items-center" to={href}>
          <Icon id={iconId} size={iconSize} className="listCategoriasIcon" />
          <RichText text={text} />
        </Link>
      </div>
    ))

    const newListContextValue = list.concat(categoriasListContent)

    return (

      <div className='categoriasListContainer' style={{
        overflowX: "auto",
      }}>
        <ListContextProvider list={newListContextValue}>
          {props.children}
        </ListContextProvider>
      </div>

    )
  }

  return <div />
}

CategoriasList.schema = {
  title: 'Itens da Lista de Categorias',
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
          text: {
            type: 'string',
            title: 'Texto',
          },
          iconId: {
            type: 'string',
            title: 'Id do ícone',
          },
          iconSize: {
            type: 'string',
            title: 'Tamanho do ícone',
          },
          href: {
            type: 'string',
            title: 'URL'
          }
        },
      },
    },
  },
}

export default CategoriasList
