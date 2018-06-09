import React from 'react';

const SnackbarContext = React.createContext({});

export class SnackbarProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: '',
    };
  }

  openSnackbar = message => {
    this.setState({
      message,
      isOpen: true,
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: '',
      isOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar,
          closeSnackbar: this.closeSnackbar,
          snackbarIsOpen: this.state.isOpen,
          message: this.state.message,
        }}
      >
        {children}
      </SnackbarContext.Provider>
    );
  }
}

export const SnackbarConsumer = SnackbarContext.Consumer;
