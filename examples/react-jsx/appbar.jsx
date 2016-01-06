/**
 * MUI React Appbar Example
 * @module
 */

import React from 'react';

import { Appbar } from '../src/react/appbar.jsx';
import { Container } from '../src/react/container.jsx';


class Example extends React.Component {
  render() {
    return (
      <div>
        <h1>Appbar</h1>
        <Container>
          <Appbar />
        </Container>
      </div>
    )
  }
}
