import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Example from './Example';
import Example2 from './Example2';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

declare var document: any

const render = (Component, ele) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById(ele)
  );
};

render(Example, 'example');
render(Example2, 'example2');

interface NodeModule {
  hot: any
}

declare var module: NodeModule
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Example', () => {
    render(Example, 'example')
  });
  module.hot.accept('./Example2', () => {
    render(Example2, 'example2')
  });
}
