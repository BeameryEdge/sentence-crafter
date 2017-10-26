import React from 'react';
import ReactDOM from 'react-dom';
import {Sentence, Selector} from '../src/index';

describe('<Sentence />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Sentence>
            <Selector ids={['thing']}></Selector>
        </Sentence>, div);
    });
});
