# @galiojs/react-watermark

[![npm version](https://img.shields.io/npm/v/@galiojs/react-watermark.svg?style=flat-square)](https://www.npmjs.org/package/@galiojs/react-watermark)
[![npm downloads](https://img.shields.io/npm/dm/@galiojs/react-watermark.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@galiojs/react-watermark)

## Introduction

It is a mini watermark library based on React ⚛ .

## Installation

Use yarn

```bash
$ yarn add react-watermark
```

## Usage

```jsx
import React from "react";
import { Watermark } from "react-watermark";

function App() {
  return (
    <div>
      <Watermark
        texts={[
          {
            translateX: 65,
            translateY: 35,
            rotate: -15,
            text: "Yo yo yo",
          },
          {
            translateX: 110,
            translateY: 55,
            rotate: -15,
            text: "Check it now.",
          },
        ]}
      />
      <h2>Hello Watermark!</h2>
    </div>
  );
}
```

## API

- WatermarkProps

| Prop    | Type   | Description                 | Default |
| ------- | ------ | --------------------------- | ------- |
| width   | number | SVG width                   | 180     |
| height  | number | SVG height                  | 80      |
| zIndex  | number | Watermark div style z-index | 9999    |
| opacity | number | Watermark div style opacity | 0.15    |
| texts   | Text[] | Watermark texts             | []      |

- Text

| Prop       | Type   | Description                   | Default     |
| ---------- | ------ | ----------------------------- | ----------- |
| translateX | number | SVG TEXT transform translateX |             |
| translateY | number | SVG TEXT transform translateY |             |
| rotate     | number | SVG TEXT transform rotate     |             |
| fill       | string | SVG TEXT fill                 | "#000000"   |
| fontFamily | string | SVG TEXT font family          | "monospace" |
| text       | string | SVG TEXT inner text           |             |

## License

MIT
