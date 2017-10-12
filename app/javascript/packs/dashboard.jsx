import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import DashboardContainer from 'components/DashboardContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <DashboardContainer />,
    document.body.appendChild(document.createElement('div')),
  )
})
