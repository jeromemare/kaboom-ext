# Kaboom Ext

KaboomJS Extensions

## install

```sh
$ npm i --save kaboom-ext
```

## Usage

```js
import { moveable } from 'kaboom-ext'

// Add moveable component to your game object
k.add([
  moveable(),
  ...
])
```

## Components list

The module exports some components that can be used to manage your game objects behaviour

### moveable

This component allow your game object to be moved using the keyboard.

### pointTowards

This component constrains your game object to always point in direction of the closer game object with the specified tag.

### pointToMouse

This component constrains your game object to always point in direction of the mouse
Todo

## Plugins list

Todo
