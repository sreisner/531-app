import { Button, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import FeedbackService from '../../services/api/feedback/feedback.service';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: '300px',
  },
  submitButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  satisfactionButtonContainer: {
    padding: theme.spacing.unit,
  },
  satisfactionButton: {
    fontSize: 72,
  },
});

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      satisfaction: -1,
      feedbackType: '',
      comments: '',
      error: '',
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { satisfaction, feedbackType, comments } = this.state;

    this.setState({ loading: true });

    FeedbackService.sendFeedback(satisfaction, feedbackType, comments)
      .then(() =>
        this.setState({ error: '', loading: false }, this.props.onClose())
      )
      .catch(message =>
        this.setState({
          error:
            'Sorry!  An unexpected error occurred.  Please try again later.',
          loading: false,
        })
      );
  };

  setSatisfaction = satisfaction => {
    this.setState({ satisfaction });
  };

  formIsValid = () => {
    return this.state.satisfaction >= 0;
  };

  render() {
    const { classes, open, onClose } = this.props;
    const { loading, satisfaction } = this.state;

    return (
      <Modal open={open} onClose={onClose}>
        <div className={classes.paper}>
          <Typography variant="display2" color="inherit" gutterBottom={true}>
            Feedback
          </Typography>
          <form className={classes.form} onSubmit={e => this.handleSubmit(e)}>
            <Grid container direction="column">
              <Grid container direction="row" justify="center" spacing={16}>
                <Grid item>
                  <IconButton
                    className={classes.satisfactionButtonContainer}
                    color={satisfaction === 0 ? 'primary' : 'default'}
                    onClick={() => this.setSatisfaction(0)}
                  >
                    <SentimentVeryDissatisfied
                      className={classes.satisfactionButton}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.satisfactionButtonContainer}
                    color={satisfaction === 0 ? 'primary' : 'default'}
                    onClick={() => this.setSatisfaction(0)}
                  >
                    <SentimentVeryDissatisfied
                      className={classes.satisfactionButton}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.satisfactionButtonContainer}
                    color={satisfaction === 0 ? 'primary' : 'default'}
                    onClick={() => this.setSatisfaction(0)}
                  >
                    <SentimentVeryDissatisfied
                      className={classes.satisfactionButton}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.satisfactionButtonContainer}
                    color={satisfaction === 0 ? 'primary' : 'default'}
                    onClick={() => this.setSatisfaction(0)}
                  >
                    <SentimentVeryDissatisfied
                      className={classes.satisfactionButton}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.satisfactionButtonContainer}
                    color={satisfaction === 0 ? 'primary' : 'default'}
                    onClick={() => this.setSatisfaction(0)}
                  >
                    <SentimentVeryDissatisfied
                      className={classes.satisfactionButton}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disabled={loading || !this.formIsValid()}
              className={classes.submitButton}
            >
              Send Feedback
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}

FeedbackModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackModal);
