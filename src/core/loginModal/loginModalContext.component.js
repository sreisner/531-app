import React from 'react';
import LoginModal from './loginModal.component';

const LoginModalContext = React.createContext({});

export class LoginModalProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalIsOpen: false,
    };
  }

  openLoginModal = message => {
    this.setState({
      loginModalIsOpen: true,
    });
  };

  closeLoginModal = () => {
    this.setState({
      loginModalIsOpen: false,
    });
  };

  render() {
    const { children } = this.props;

    return (
      <LoginModalContext.Provider
        value={{
          openLoginModal: this.openLoginModal,
          closeLoginModal: this.closeLoginModal,
          loginModalIsOpen: this.state.loginModalIsOpen,
        }}
      >
        <LoginModal />

        {children}
      </LoginModalContext.Provider>
    );
  }
}

export const LoginModalConsumer = LoginModalContext.Consumer;
