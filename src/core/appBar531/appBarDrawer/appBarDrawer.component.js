import { Divider, Drawer, List } from '@material-ui/core';
import { Dashboard, ViewWeek } from '@material-ui/icons';
import React from 'react';
import { AuthConsumer } from '../../../context/authContext.component';
import { SnackbarConsumer } from '../../../context/snackbarContext.component';
import DrawerLink from './drawerLink.component';
import FeedbackListItem from './feedbackListItem.component';
import FeedbackModal from './feedbackModal/feedbackModal.component';

class AppBarDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackModalIsOpen: false,
    };
  }

  displayFeedbackModal = () => {
    this.setState({ feedbackModalIsOpen: true });
  };

  closeFeedbackModal = () => {
    this.setState({ feedbackModalIsOpen: false });
  };

  render() {
    const { feedbackModalIsOpen } = this.state;
    const { drawerIsOpen, toggleDrawer } = this.props;

    return (
      <AuthConsumer>
        {({ user }) => (
          <Drawer open={drawerIsOpen} onClose={toggleDrawer} anchor="left">
            <List onClick={toggleDrawer} onKeyDown={toggleDrawer}>
              {user &&
                user.currentCycleId && (
                  <div>
                    <DrawerLink
                      icon={<Dashboard />}
                      text="Current Cycle"
                      to={`/cycle/${user && user.currentCycleId}`}
                      showIfNotLoggedIn={false}
                    />
                    <Divider />
                  </div>
                )}
              <DrawerLink
                icon={<ViewWeek />}
                text="Cycle Generator"
                to="/cycle/generator/form"
                showIfNotLoggedIn={true}
              />
            </List>
            <Divider />
            {user && (
              <FeedbackListItem
                displayFeedbackModal={this.displayFeedbackModal}
              />
            )}
            <SnackbarConsumer>
              {({ openSnackbar }) => (
                <FeedbackModal
                  open={feedbackModalIsOpen}
                  onClose={this.closeFeedbackModal}
                  openSnackbar={openSnackbar}
                />
              )}
            </SnackbarConsumer>
          </Drawer>
        )}
      </AuthConsumer>
    );
  }
}

export default AppBarDrawer;
