import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthConsumer } from '../../../../context/authContext.component';
import FeedbackService from '../../../../services/api/feedback/feedback.service';

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
  },
  submitButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  satisfactionButton: {
    cursor: 'pointer',
    [theme.breakpoints.only('xs')]: {
      fontSize: 36,
    },
    fontSize: 72,
  },
  row: {
    marginBottom: theme.spacing.unit,
  },
});

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      satisfaction: -1,
      feedbackType: 'Feature Request',
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

  handleSubmit = (event, user) => {
    event.preventDefault();

    const { satisfaction, feedbackType, comments } = this.state;

    this.setState({ loading: true });

    FeedbackService.sendFeedback(user._id, satisfaction, feedbackType, comments)
      .then(() =>
        this.setState(
          {
            error: '',
            loading: false,
            satisfaction: -1,
            feedbackType: 'Feedback Request',
            comments: '',
          },
          this.props.onClose()
        )
      )
      .catch(message =>
        this.setState({
          error: message,
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
    const { loading, satisfaction, feedbackType, comments, error } = this.state;

    return (
      <Modal open={open} onClose={onClose}>
        <div className={classes.paper}>
          <Typography variant="display2" color="inherit" gutterBottom={true}>
            Feedback
          </Typography>
          <AuthConsumer>
            {({ user }) => (
              <form
                className={classes.form}
                onSubmit={e => this.handleSubmit(e, user)}
              >
                <Grid container direction="column">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={16}
                    className={classes.row}
                  >
                    <Grid item xs={2}>
                      <SentimentVeryDissatisfied
                        color={satisfaction === 0 ? 'secondary' : 'primary'}
                        onClick={() => this.setSatisfaction(0)}
                        className={classes.satisfactionButton}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SentimentDissatisfied
                        color={satisfaction === 1 ? 'secondary' : 'primary'}
                        onClick={() => this.setSatisfaction(1)}
                        className={classes.satisfactionButton}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SentimentNeutral
                        color={satisfaction === 2 ? 'secondary' : 'primary'}
                        onClick={() => this.setSatisfaction(2)}
                        className={classes.satisfactionButton}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SentimentSatisfied
                        color={satisfaction === 3 ? 'secondary' : 'primary'}
                        onClick={() => this.setSatisfaction(3)}
                        className={classes.satisfactionButton}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SentimentVerySatisfied
                        color={satisfaction === 4 ? 'secondary' : 'primary'}
                        onClick={() => this.setSatisfaction(4)}
                        className={classes.satisfactionButton}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={16}
                    className={classes.row}
                  >
                    <Grid item xs={10}>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel>Feedback Type</InputLabel>
                        <Select
                          value={feedbackType}
                          onChange={this.handleChange}
                          name="feedbackType"
                        >
                          <MenuItem value="Feature Request">
                            Feature Request
                          </MenuItem>
                          <MenuItem value="Bug">Bug</MenuItem>
                          <MenuItem value="Inaccurate Template">
                            Inaccurate Template
                          </MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={16}
                    className={classes.row}
                  >
                    <Grid item xs={10}>
                      <TextField
                        style={{ width: '100%' }}
                        label="Comments"
                        multiline
                        rowsMax="4"
                        value={comments}
                        name="comments"
                        onChange={this.handleChange}
                      />
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
                {error && (
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                )}
              </form>
            )}
          </AuthConsumer>
        </div>
      </Modal>
    );
  }
}

FeedbackModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedbackModal);
