import React, { useState } from 'react'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { index as RichText } from 'vtex.rich-text'
import { Collapsible } from 'vtex.styleguide'

interface Props {
  items: PropsDuvidasListItem[]
  children: any
}
interface PropsDuvidasListItem {
  title: string
  text: string
}

const DuvidasList: StorefrontFC<Props> = (props: Props) => {
  const { list } = useListContext() || []

  const [openItem, setOpenItem] = useState<null | number>(null)

  if (props.items && props.items.length > 0) {
    const duvidasListContent = props.items.map(({ title, text }, index) => (
      <div className="ph4 mt6" key={`title-${index}`}>
        <Collapsible
          header={title}
          onClick={() => setOpenItem(openItem === index ? null : index)}
          isOpen={index === openItem}
          align="right"
          caretColor="base"
        >
          <div className="mt2">
            <RichText
              key={`content-${index}`}
              font="t-small"
              textColor="c-muted-1"
              text={text}
            />
          </div>
        </Collapsible>
      </div>
    ))

    const newListContextValue = list.concat(duvidasListContent)

    return (
      <div
        className="duvidasContainer"
        style={{
          overflowX: 'auto',
        }}
      >
        <ListContextProvider list={newListContextValue}>
          {props.children}
        </ListContextProvider>
      </div>
    )
  }

  return <div />
}

DuvidasList.schema = {
  title: 'Lista de Dúvidas',
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
          text: {
            type: 'string',
            title: 'Texto',
            widget: { 'ui:widget': 'textarea' },
          },
        },
      },
    },
  },
}

export default DuvidasList
