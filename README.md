# Gentle Introduction to React

This repo contains a sample application that acts as a gentle introduction to React.

## MVP, MVC, MVVM, and Flux Architecture (2 way binding vs. one way loop)

- https://reactjs.org/docs/getting-started.html
- https://reactjs.org/tutorial/tutorial.html

![image](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-explained-1300w.png)

## State vs. Prop

The key difference between props and state is that state is internal and controlled by the component itself while props are external and controlled by whatever renders the component.

## What are hooks?

- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-overview.html

## State

- https://reactjs.org/docs/hooks-overview.html#state-hook
- https://reactjs.org/docs/hooks-state.html

useState: ClickCounter

## Effect
- https://reactjs.org/docs/hooks-overview.html#effect-hook
- https://reactjs.org/docs/hooks-effect.html

useEffect: Vote Up Vote Down

### Explain this sample - setup and cleanup

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## Building your own hooks

- https://reactjs.org/docs/hooks-overview.html#building-your-own-hooks

## Context

https://reactjs.org/docs/context.html
useContext: https://reactjs.org/docs/hooks-reference.html#usecontext


## Useful articles

- https://www.pluralsight.com/guides/fetching-data-updating-state-react-class
- https://www.pluralsight.com/guides/fetching-data-updating-state-hooks
- https://app.pluralsight.com/guides/typescript-react-getting-started

## React Redux - Complete Guide

https://github.com/piotrwitek/react-redux-typescript-guide#react--redux-in-typescript---complete-guide

Also mention about Recoil! https://recoiljs.org/

https://react-typescript-cheatsheet.netlify.app/docs/basic/setup

### Points to discuss

However, the general consensus today is that React.FunctionComponent (or the shorthand React.FC) is discouraged. This is a nuanced opinion of course, but if you agree and want to remove React.FC from your codebase, you can use this jscodeshift codemod.
https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components - See why is React FC discouraged.

### Hooks and TypeScript

- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks
- https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
