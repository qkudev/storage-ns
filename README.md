# Storage NS

Simple way to separate your storage by namespaces

## Setup

```
$ npm install --save storage-ns
# --- or ---
$ yarn add storage-ns
```

## Usage

It implements [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface, so you can use it as `localStorage`

```
import { StorageNS } from 'storage-ns';

const storage1 = new StorageNS('ns1');
storage1.setItem('foo', 'bar');

const storage2 = new StorageNS('ns2);
storage2.setItem('bar', 'buzz');

storage1.clear();
storage2.getItem('bar') // 'buzz'
```

#### `new StorageNS(prefix, [storage])`

- arguments
  - **prefix** _string_
    - required namespace prefix
  - **storage** [_Storage_](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
    - any storage that implements `Storage` interface, default to `localStorage`
- returns namespaced storage
