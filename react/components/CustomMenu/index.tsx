import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { canUseDOM, Link } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import { Icon } from 'vtex.store-icons'
import { useDevice } from 'vtex.device-detector'

import QUERY_VALUE from './CustomMenuData.gql'
import style from './style.css'

interface Props {
  staticItems: MenuItemStatic[]
  evidencedDepartamentItems: evidencedDepartament[]
}

interface MenuItem {
  name: string
  href: string
  id: number
  children: []
  slug: string
}

interface MenuItemStatic {
  name: string
  href: string
  newTab: boolean
}

interface evidencedDepartament {
  name: string
  image: string
}

const CustomMenu: StorefrontFC<Props> = ({ staticItems, evidencedDepartamentItems }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [departamentActive, setDepartamentActive] = useState<number | null>(null)
  const [departamentSubItemsOpen, setDepartamentSubItemsOpen] = useState<number | null>(null)
  const [evidencedDepartamentOpen, setEvidencedDepartamentOpen] = useState<number | null>(null)

  const { isMobile } = useDevice()

  if (canUseDOM) {
    const { loading, error, data } = useQuery(QUERY_VALUE)

    if (loading) {
      return (
        <div>
          <Spinner color="currentColor" size={20} />
        </div>
      )
    }

    if (error) {
      return <div> Ocorreu um erro </div>
    }
   

    return (
      <div className="flex justify-between items-center mh6 relative">
        <div className="flex items-center">
         
          <div
            onMouseEnter={()=> {!isMobile ? setOpenMenu(true) : ''}}
            onMouseLeave={()=> {!isMobile ? setOpenMenu(false) : ''}}
            className={`flex justify-between items-center pointer pv5 ${style.presvg}`}
          >
            <div
              onClick={ () => openMenu && !isMobile ?  setOpenMenu(false) : setOpenMenu(true) } 
              className='flex items-center justify-between'>
              <Icon                
                id={openMenu ? "sti-close--line" : "hpa-hamburguer-menu"}
                size="20"
                className={style.menuIcon}
              />
              <h1               
                className={`f7 fw5 ml3 ttu ${style.menuTitle} ${style.hideMobile}`}>
                Departamentos
              </h1>
            </div>            

            <div
            className={`${style.menuMobile} ${openMenu ? style['departamentContainer--isOpen'] : style.departamentContainer}`}
            >
              <div className={`${style.buttonCloseMobile} ${style.hideDesktop}`} onClick={() => setOpenMenu(false)}>
                <Icon
                  id="sti-close--line"
                  size="16"
                ></Icon>
              </div>
              {data.categories.map((departament: MenuItem, departamentIndex: number) => (
                <div className={`flex justify-start items-center ${style.departamentMobile}`}>
                  <div
                    className={`w-20 mb6 pointer ${style.departamentTitleMobile}`}
                    key={departamentIndex}
                    onMouseEnter={()=> {!isMobile ? setDepartamentActive(departamentIndex) : ''}}                    
                    onClick={() => {
                      if(!departamentActive) {
                        setDepartamentActive(departamentIndex)
                      }
                      if(departamentActive === departamentIndex) {
                        setDepartamentActive(null)
                      }
                      if(departamentActive && departamentActive !== departamentIndex) {
                        setDepartamentActive(departamentIndex)
                      }
                    }}
                  >
                    {isMobile ? 
                      <h3
                    className={`f6 fw4 ${style.departamentTitleContainer} ${departamentActive === departamentIndex ? 'fw7': 'fw4'}`}
                      >
                        {departament.name}
                      </h3>
                      :
                      <Link className={`f6 fw4 ${style.departamentTitleContainer}`} to={departament.href}>{departament.name}</Link>
                    }                    
                    <div className={style.hideDesktop}>
                      <Icon id="nav-arrow--right" size="20"></Icon>
                    </div>                   
                  </div> 
                  <div
                    className={`
                    w-80
                    ${departamentActive === departamentIndex ? style['departamentItemContainer--isActive'] : style.departamentItemContainer}
                    `}
                  >
                    <div className={`${style.departamentHeaderMobile} ${style.hideDesktop}`}>
                      <div onClick={() => {setDepartamentActive(null)}}>
                        <Icon
                          id="nav-arrow--left"
                          size="20"
                          className={style.departamentIconHeaderMobile}
                          
                        />
                      </div>
                      <Link to={departament.href}>
                        {departament.name}
                      </Link>
                    </div>
                    {departament.children.length > 0 && (
                      departament.children.map((departamentItem: MenuItem, departamentItemIndex: number) => (
                        <div key={departamentItemIndex}>
                          <div className={`mb4 ${style.hideMobile}`}>
                            <Link to={departamentItem.href}>
                              <h4 className={`f6 fw5 ${style['textColor--gray']}`}>{departamentItem.name}</h4>
                            </Link>
                          </div>
                          <div
                            className={`${style.hideDesktop} flex items-center justify-between ph6 teste pv6`}
                            onClick={() => {
                              if(!departamentSubItemsOpen) {
                                setDepartamentSubItemsOpen(departamentItemIndex)
                              }
                              if(departamentSubItemsOpen === departamentItemIndex) {
                                setDepartamentSubItemsOpen(null)
                              }
                              if(departamentSubItemsOpen && departamentSubItemsOpen !== departamentItemIndex) {
                                setDepartamentSubItemsOpen(departamentItemIndex)
                              }
                            }}
                          >
                            <Link to={departamentItem.href}>
                              <h4 className={`f6 fw5 mr8 ${style['textColor--gray']}`}>{departamentItem.name}</h4>
                            </Link>
                            <Icon
                              id={departamentSubItemsOpen === departamentItemIndex ? 'nav-minus' : 'nav-plus'}
                              size="10">
                            </Icon>
                          </div>
                          <div>
                            {departamentItem.children.length > 0 && (
                              departamentItem.children.map((departamentSubItem: MenuItem, departamentSubItemIndex: number) => (
                                <div key={departamentSubItemIndex} >
                                  <div className={`flex ${style.hideMobile}`}>
                                    <Link to={departamentSubItem.href}>
                                      <h5 className={`f7 fw4 mb3 underline-hover ${style['textColor--gray']}`}>{departamentSubItem.name}</h5>
                                    </Link>
                                  </div>
                                  <div
                                    className={`
                                      ph6 pv2
                                      ${style.hideDesktop}
                                      ${departamentSubItemsOpen === departamentItemIndex ? style['departamentSubItem--isOpen']: style.departamentSubItem}
                                    `}
                                  >
                                    <Link to={departamentSubItem.href}>
                                      <h5 className={`f7 fw4 mb2 underline-hover ${style['textColor--gray']}`}>{departamentSubItem.name}</h5>
                                    </Link>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    <div className={`flex ${style.seeAllMobile}`}>
                      <Link to={departament.href}>
                        <h4 className={`f6 fw5 ${style['textColor--orange']}`}>Ver Todos</h4>
                      </Link>
                    </div>
                  </div>                 
                </div>
              ))}
              {staticItems.length > 0 && (
                <div className={`block ${style.hideDesktop}`}>
                  {staticItems.map((item: MenuItemStatic, index: number) => (
                    <div className={`f6 fw5 ttu ${style.staticItemsTitle}`} key={index}>
                      <Link to={item.href} target={item.newTab ? '_blank' : '_self'}>
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>          
        </div>
        
        <div className={`flex items-center pv6 ${style.hideMobile}`}>
          {evidencedDepartamentItems.length > 0 && (
            data.categories.map((departament: MenuItem) => (
              evidencedDepartamentItems.map((evidencedDepartament: evidencedDepartament, evidencedDepartamentIndex: number) => (
                departament.name === evidencedDepartament.name && (
                  <div 
                    className='pv5'
                    key={evidencedDepartamentIndex}
                    onMouseEnter={() => {!isMobile ? setEvidencedDepartamentOpen(evidencedDepartamentIndex) : '' }}
                    onMouseLeave={() => {!isMobile ? setEvidencedDepartamentOpen(null) : ''}}
                  >
                    <div
                      className={`relative f7 mh4 fw5 ttu tc ${style.evidencedDepartamentTitle}`} 
                      onClick={() => {
                        if(!evidencedDepartamentOpen) {
                          setEvidencedDepartamentOpen(evidencedDepartamentIndex)
                        }
                        if(evidencedDepartamentOpen === evidencedDepartamentIndex) {
                          setEvidencedDepartamentOpen(null)
                        }
                        if(evidencedDepartamentOpen && evidencedDepartamentOpen !== evidencedDepartamentIndex) {
                          setEvidencedDepartamentOpen(evidencedDepartamentIndex)
                        }
                      }}
                    >
                      <Link to={departament.href}>{departament.name}</Link>
                    </div>
                    <div
                      className={`
                        flex justify-between
                        ${style.evidencedDepartamentItemsContainer}
                        ${evidencedDepartamentOpen === evidencedDepartamentIndex ?
                          style['evidencedDepartamentItemsContainer--isOpen'] : ''}
                      `}
                    >
                      <div className="flex flex-column pv7 ph6 w-100">
                        {departament.children.length > 0 && (
                          departament.children.map((departamentItem: MenuItem, departamentItemIndex: number) => (
                            <div className="mb5" key={departamentItemIndex}>
                              <Link
                                to={departamentItem.href}
                                className={`f7 fw4 mt pointer ${style.evidencedDepartamentText}`}
                              >
                                <p>{departamentItem.name}</p>
                              </Link>
                            </div>
                          ))
                        )}
                        <div className="mt5">
                          <Link className={`f7 fw4 pointer ${style.evidencedDepartamentVerTodos}`} to={departament.href}>
                            <p>Ver Todos</p>
                          </Link>
                        </div>
                      </div>
                      <div className={style.evidencedDepartamentImage}>
                        <img src={evidencedDepartament.image} alt={evidencedDepartament.name} />
                      </div>
                    </div>
                  </div>
                )
              ))
            ))
          )}

          {staticItems.length > 0 && (
            <div className={`flex ${style.hideMobile}`}>
              {staticItems.map((item: MenuItemStatic, index: number) => (
                <div className={`f7 mh4 fw5 ttu tc ${style.staticItemsTitle}`} key={index}>
                  <Link to={item.href} target={item.newTab ? '_blank' : '_self'}>
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Spinner color="currentColor" size={20} />
    </div>
  )
}

CustomMenu.defaultProps = {
  staticItems: [],
  evidencedDepartamentItems: [],
}

CustomMenu.schema = {
  title: 'Menu de Categorias',
  type: 'object',
  properties: {
    staticItems: {
      title: 'Itens Estáticos do Menu',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          name: {
            type: 'string',
            title: 'Texto',
          },
          href: {
            type: 'string',
            title: 'URL',
          },
          newTab: {
            type: 'boolean',
            title: 'Abrir em Nova Aba',
          },
        },
      },
    },
    evidencedDepartamentItems: {
      title: 'Departamento em destaque',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'admin/editor.menu.item.editorItemTitle.title',
            description: 'admin/editor.menu.item.editorItemTitle.description',
            type: 'string',
          },
          name: {
            title: 'Nome do Departamento',
            type: 'string',
          },
          image: {
            title: 'imagem do Departamento',
            type: 'string',
          }
        }
      }
    }
  },
}

export default CustomMenu
