import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './styles/style.scss'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
