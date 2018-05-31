import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SessionGrid from './sessionGrid.component';

class SessionGridContainer extends Component {
  handleBeginSessionClick = sessionId => {
    this.props.history.push(`/cycle/current/session/${sessionId}`);
  };

  render() {
    return (
      <SessionGrid
        sessions={this.props.sessions}
        onBeginSessionClick={this.handleBeginSessionClick}
      />
    );
  }
}

export default withRouter(SessionGridContainer);
