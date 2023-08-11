/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// @ts-ignore  
import * as Tabs from '@radix-ui/react-tabs'
import { canUseDOM } from 'vtex.render-runtime'

import './global.css'

const MenuMobileListAccount = ({ children = [] }) => {
  const stopSwiper = () => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (canUseDOM) {
      const stopSwiped = (event: any) => {
        event.stopPropagation()
      }

      const NavBar: any = window.document.querySelector(
        '.vtex-store-drawer-0-x-drawerContent--header-menu-mobile .js-menuMobileAccount'
      )

      if (NavBar) {
        NavBar.addEventListener('touchstart', stopSwiped)
        NavBar.addEventListener('touchmove', stopSwiped)
        NavBar.addEventListener('touchend', stopSwiped)
      }
    }
  }

  return (
    <Tabs.Root className="TabsRoot" defaultValue="Feminino">
      <Tabs.List
        className="js-menuMobileAccount"
        aria-label="Menu Mobile"
        onTouchStart={() => stopSwiper()}
      >
        {children.map((item: any, index: number) => {
          // eslint-disable-next-line react/jsx-key
          return (
            <Tabs.Trigger
              key={index}
              className="menuMobileAccount__item"
              value="item"
            >
              {item}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
    </Tabs.Root>
  )
}

export default MenuMobileListAccount