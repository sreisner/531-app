import React, { Component } from 'react';
import SessionGrid from './sessionGrid.component';

export default class SessionGridContainer extends Component {
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
