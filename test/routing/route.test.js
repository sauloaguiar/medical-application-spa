import App from '../../src/components/App';
import { renderTestSequence } from './helper.js';

xit('navigates around', done => {
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
