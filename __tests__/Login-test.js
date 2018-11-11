import React from 'react';
import Login from '../Components/Login'
import Store from '../Store/configureStore'

import renderer from 'react-test-renderer';

/* Login page renderer */
test('Login.js renders correctly', () => {
    const tree = renderer.create(<Login store={Store}/>).toJSON();
    expect(tree).toMatchSnapshot();
});