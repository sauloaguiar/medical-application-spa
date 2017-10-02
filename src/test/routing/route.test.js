import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import { renderTestSequence } from './helper.js';

it('navigates around', done => {
  renderTestSequence({
    subject: App,

    steps: [
      // initial render
      ({ history, div }) => {
        // assert the screen says what we think it should
        console.assert(div.innerHTML.match(/patients/));

        done();
      }
    ]
  });
});
