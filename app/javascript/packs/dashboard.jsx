import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import DashboardContainer from 'components/DashboardContainer'

document.addEventListener('DOMContentLoaded', () => {
	const node = document.getElementById('current-user');
  const data = JSON.parse(node.getAttribute('data'));
  ReactDOM.render(<DashboardContainer userId={data.user_id} />, node);
});
