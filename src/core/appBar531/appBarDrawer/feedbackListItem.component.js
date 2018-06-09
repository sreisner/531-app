import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { TagFaces } from '@material-ui/icons';
import React from 'react';

class FeedbackListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { displayFeedbackModal } = this.props;

    return (
      <div>
        <ListItem button onClick={displayFeedbackModal}>
          <ListItemIcon>
            <TagFaces />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </div>
    );
  }
}

export default FeedbackListItem;
