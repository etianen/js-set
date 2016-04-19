# @etianen/set

Helpers for using unique sorted arrays as sets.


## Installing

``` bash
npm install '@etianen/set'
```

**TypeScript:** To take advantage of typings, be sure to set `moduleResolution` to `"node"` in your `tsconfig.json`.


## Overview

Unique sorted arrays can be used as relatively performant sets, without requiring a dedicated data structure.

@etianen/set provides helpers for using unique sorted arrays as sets.

``` ts
import * as set from "@etianen/set";

const setA = set.from([1, 2, 3]);
const setB = set.from([2, 3, 4]);
set.union(setA, setB);  // => [1, 2, 3, 4]
set.intersection(setA, setB);  // => [2, 3]
```


## API

In all the functions below:

* The source arguments are never mutated.
* The input arrays are assumed to be unique and sorted.
* If possible, the function will return one of the input arrays if the operation is a no-op. This helps preserve reference equality.
* If the result is a `Set`, it will be frozen.


### Set

A unique, sorted array containing values of type `V`.

``` ts
interface Set<V> extends Array<V> {
    isSet: void;
}
```

`isSet` is a compiler-only flag, used by the TypeScript compiler. Do not attempt to access it.

**Important:** Any function that expects a `Set` will not behave as expected if the array is not sorted and unique. If you cannot guarantee that an input array is sorted and unique, use `from()` to convert it.

**TypeScript:** The compiler will prevent you using an `Array` as a `Set` to prevent accidental mistakes. If you can guarantee that the array is sorted and unique, it's safe to use an explicit typecast to convert it.


### add()

Adds `key` to a new copy of `set`.

**Complexity:** O(n)

``` ts
function add<V>(set: Set<V>, key: V): Set<V>;
```


### difference()

Returns a `Set` of all keys in `setA` that are not in `setB`.

**Complexity:** O(n)

``` ts
function difference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### empty()

Creates a new empty set.

``` ts
function empty<V>(): Set<V>;
```


### from()

Converts `keys` into a sorted, unique set.

**Complexity:** O(2n + n log(n))

``` ts
function from<V>(keys: Set<V>): Set<V>;
```


### has()

Returns `true` if `key` is present in `set`.

**Complexity:** O(log(n))

``` ts
function has<V>(set: Set<V>, key: V): boolean;
```


### intersection()

Returns a `Set` of all keys present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
function intersection<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### isDisjoint()

Returns `true` if `setA` and `setB` have no keys in common.

**Complexity:** O(n)

``` ts
function isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### isSubset()

Returns `true` if all keys in `setA` are present in `setB`.

**Complexity:** O(n)

``` ts
function isSubset<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### isSuperset()

Returns `true` if all keys in `setB` are present in `setA`.

**Complexity:** O(n)

``` ts
function isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### remove()

Returns a copy of `set` with `key` removed.

**Complexity:** O(n)

``` ts
function remove<V>(set: Set<V>, key: V): Set<V>;
```


### symmetricDifference()

Returns a `Set` of all keys not present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
function symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### union()

Returns a `Set` of all keys in both `setA` and `setB`.

``` ts
function union<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


## Build status

This project is built on every push using the Travis-CI service.

[![Build Status](https://travis-ci.org/etianen/js-set.svg?branch=master)](https://travis-ci.org/etianen/js-set)


## Support and announcements

Downloads and bug tracking can be found at the [main project website](http://github.com/etianen/js-set).


## More information

This project was developed by Dave Hall. You can get the code
from the [project site](http://github.com/etianen/js-set).

Dave Hall is a freelance web developer, based in Cambridge, UK. You can usually
find him on the Internet:

- [Website](http://www.etianen.com/)
- [Google Profile](http://www.google.com/profiles/david.etianen)
