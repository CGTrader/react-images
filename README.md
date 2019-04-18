# React Images

## Local development

Clone this repository, run `yarn` to install all dependencies.
Run `yarn link` to register this package system-wide ready to be linked.
Run `yarn link "react-images"` in the CGT repository root directory.
Create a feature branch.
Run `yarn run watch` in this package's directory. Changes to the code will trigger the build package build which will build the files which will trigger CGT webpack rebuild.
When creating a pull-request — commit **ONLY** files in the `/src` and `/examples` directories. Files in the `/lib` and `/dist` are only supposed to be built ant commited after a pull request is accepted and merged to master.


## Updating package code

To build the package code run:
```
yarn run build
```
This will build the package in the `/dist` and `/lib` directories.

Commit and push.


## Quick start


```bash
npm install --save react-images
```
or
```bash
yarn add react-images
```

```jsx
import React from 'react';
import Lightbox from 'react-images';

export default class Sample extends React.Component {
  ...
  render() {
    return (
      <Lightbox
        images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    );
  }
}
```


## Demo & Examples

Live demo: [jossmac.github.io/react-images](http://jossmac.github.io/react-images/)

To build the examples locally, run:

```
yarn install
yarn start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Using srcSet

Example using srcSet:
```jsx
<Lightbox
  images={LIGHTBOX_IMAGE_SET}
  ...
/>

const LIGHTBOX_IMAGE_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    caption: 'A forest'
    // As an array
    srcSet: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
  },
  {
    src: 'http://example.com/example/img2.jpg',
    // As a string
    srcSet: 'http://example.com/example/img2_1024.jpg 1024w, http://example.com/example/img2_800.jpg 800w, http://example.com/example/img2_500.jpg 500w, http://example.com/example/img2_320.jpg 320w',
  }
];

```

## Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
backdropClosesModal	|	bool	|	false	|	Allow users to exit the lightbox by clicking the backdrop
closeButtonTitle | string | ' Close (Esc) ' | Customize close esc title
enableKeyboardInput | bool  | true  | Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>
currentImage  | number  | 0 | The index of the image to display initially
customControls | array | undefined | An array of elements to display as custom controls on the top of lightbox
images  | array | undefined | Required. Array of image objects See image options table below
imageCountSeparator  | String  | ' of ' | Customize separator in the image count
isOpen  | bool  | false | Whether or not the lightbox is displayed
leftArrowTitle | string | ' Previous (Left arrow key) ' | Customize of left arrow title
onClickPrev | func | undefined | Fired on request of the previous image
onClickNext | func | undefined | Fired on request of the next image
onClose | func | undefined | Required. Handle closing of the lightbox
onClickImage | func | undefined | Handle click on image
onClickThumbnail | func | undefined | Handle click on thumbnail
preloadNextImage | bool | true | Based on the direction the user is navigating, preload the next available image
rightArrowTitle | string | ' Next (Right arrow key) ' | Customize right arrow title
showCloseButton | bool  | true | Optionally display a close "X" button in top right corner
showImageCount | bool  | true | Optionally display image index, e.g., "3 of 20"
width | number  | 1024 | Maximum width of the carousel; defaults to 1024px
spinner | func | DefaultSpinner | Spinner component class
spinnerColor | string | 'white' | Color of spinner
spinnerSize | number | 100 | Size of spinner
preventScroll | bool | true | Determines whether scrolling is prevented via [react-scrolllock](https://github.com/jossmac/react-scrolllock)

## Images object

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
src  | string | undefined | Required
srcSet  | array of strings or string | undefined | Optional
caption  | string | undefined | Optional
alt  | string | undefined | Optional
