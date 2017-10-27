import React from 'react';
import ReactDOM from 'react-dom';
import {Sentence} from '../src/index';

describe('<Sentence />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Sentence id='test' choices={{}} config={[]}></Sentence>
        , div);
    });
});
