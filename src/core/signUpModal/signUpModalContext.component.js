import React from 'react';
import SignUpModal from './signUpModal.component';

const SignUpModalContext = React.createContext({});

export class SignUpModalProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpModalIsOpen: false,
    };
  }

  openSignUpModal = message => {
    this.setState({
      signUpModalIsOpen: true,
    });
  };

  closeSignUpModal = () => {
    this.setState({
      signUpModalIsOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <SignUpModalContext.Provider
        value={{
          openSignUpModal: this.openSignUpModal,
          closeSignUpModal: this.closeSignUpModal,
          signUpModalIsOpen: this.state.signUpModalIsOpen,
        }}
      >
        <SignUpModal />
        {children}
      </SignUpModalContext.Provider>
    );
  }
}

export const SignUpModalConsumer = SignUpModalContext.Consumer;
