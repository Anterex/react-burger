import React from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { MainPage } from '../MainPage/main-page'
import { Modals } from '../Modals/modals'

export const App = () => {
  return <>
    <AppHeader/>
    <MainPage/>
    <Modals/>
  </>
}
