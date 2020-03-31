# @rafaelpelle/react-utils

> My favorite React and JS utils

[![NPM](https://img.shields.io/npm/v/@rafaelpelle/react-utils.svg)](https://www.npmjs.com/package/@rafaelpelle/react-utils) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @rafaelpelle/react-utils
```

## Usage

```jsx
import React from 'react'
import { useCPFInput } from '@rafaelpelle/react-utils'

export default function Example() {
  const cpfInput = useCPFInput()

  return <input {...cpfInput} />
}
```
