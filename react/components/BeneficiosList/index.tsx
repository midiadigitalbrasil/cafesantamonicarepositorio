import React from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { index as RichText } from 'vtex.rich-text'
//import { TextPositionValues } from 'vtex.rich-text/react/typings/SchemaTypes'

interface Props {
  items: PropsBeneficiosListItem[]
  children: any
}
interface PropsBeneficiosListItem {
  text: string
}

const BeneficiosList: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  if (props.items.length > 0) {
    const beneficiosListContent = props.items.map(({ text }, index) => (
      <div className='ph4'>
        <RichText key={`tb-${index}`} text={text} />
      </div>
    ))

    const newListContextValue = list.concat(beneficiosListContent)

    return (

      <div className='beneficiosContainer' style={{
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

BeneficiosList.schema = {
  title: 'Itens da Tip Bar',
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
        },
      },
    },
  },
}

export default BeneficiosList
