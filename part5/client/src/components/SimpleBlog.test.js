import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, cleanup, fireEvent} from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

describe('SimpleBlog ', () => {
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

  test('button is clicked', () => {
    const clickHandler = jest.fn();
    component = render(<SimpleBlog blog={blog} onClick={clickHandler}/>);

    const button = component.container.querySelector('.btn');
    fireEvent.click(button);

    expect(clickHandler.mock.calls.length).toBe(1);
  });
});
