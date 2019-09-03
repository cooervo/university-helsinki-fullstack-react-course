import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, cleanup} from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

describe('<Togglable />', () => {
  let component, blog;

  beforeEach(() => {
    const title = 'Title of blog';
    const author = 'The Dude';
    const likes = 30;
    blog = {title, author, likes};
    component = render(<SimpleBlog blog={blog}/>);
  });

  test('title and author is rendered', () => {
    const titleEle = component.container.querySelector('.title');
    expect(titleEle).toHaveTextContent(`${blog.title} ${blog.author}`);
  });

  test('likes are rendered', () => {
    const likesEle = component.container.querySelector('.likes');
    expect(likesEle).toHaveTextContent(`blog has ${blog.likes} likes`);
  });
});
