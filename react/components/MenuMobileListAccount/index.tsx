
import React from 'react'

import './global.css'
import { canUseDOM } from 'vtex.render-runtime'

const MenuMobileListAccount = ({ children = [] }) => {
  const stopSwiper = () => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (canUseDOM) {
      const stopSwiped = (event: any) => {
        event.stopPropagation()
      }

      const NavBar: any = window.document.querySelector(
        '.vtex-store-drawer-0-x-drawerContent--menu--mobile .js-menuMobileAccount'
      )

      if (NavBar) {
        NavBar.addEventListener('touchstart', stopSwiped)
        NavBar.addEventListener('touchmove', stopSwiped)
        NavBar.addEventListener('touchend', stopSwiped)
      }
    }
  }

  return (
    <div className="TabsRoot">
      <div
        className="js-menuMobileAccount"
        aria-label="Menu Mobile"
        onTouchStart={() => stopSwiper()}
      >
        {children.map((item: any, index: number) => {

          return (
            <div
              key={index}
              className="menuMobileAccount__item"
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuMobileListAccount