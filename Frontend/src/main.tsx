import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/ui/Router.tsx'
import './assets/style/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
)
