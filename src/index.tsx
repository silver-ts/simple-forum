import React from 'react'
import ReactDOM from 'react-dom/client'
import Application from './Application'
import { register as registerServiceWorker } from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
)

registerServiceWorker()
