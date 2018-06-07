import { IconButton, Input } from '@material-ui/core';
import React from 'react';

const SatisfactionButton = props => (
  <Input>
    <IconButton>{props.children}</IconButton>
  </Input>
);

export default SatisfactionButton;
