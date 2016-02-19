# @etianen/set

Helpers for using unique sorted arrays as sets.


## Installing

``` bash
npm install '@etianen/set'
```

**Note:** If using Typescript, be sure to set `moduleResolution` to `"node"` in your `tsconfig.json`.


## Overview

Unique sorted arrays can be used as relatively performant sets, without requiring a dedicated data structure.

@etianen/set provides a set of helpers for using unique sorted arrays as sets.


## set API

In all the functions below:

* The source arguments are never mutated.
* The source argument is assumed to be unique and sorted.


### Set

A unique sorted array of keys, implemented as a plain Javascript `Array`.

``` ts
interface Set<V> extends Array<V> {
    isSet: void;
}
```

**Note:** `isSet` is a virtual, compiler-only flag. It exists to prevent accidentally passing an unsorted, non-unique array into functions expecting a sorted, unique array.

Create a new `Set` using `create()` or convert an existing `Array` to a `Set` using `from()`.

**Typescript only:** To coerce an `Array` that is guaranteed to be sorted and unique into a `Set`, use an explicit type cast.


### add()

Adds `key` to a new copy of `set`. If `key` is already in `set`, then `set` is returned unchanged.

**Complexity:** O(n)

``` ts
add<V>(set: Set<V>, key: V): Set<V>;
```


### create()

Creates a new blank `Set`.

``` ts
create<V>(): Set<V>;
```


### difference()

Returns a `Set` of all keys in `setA` that are not in `setB`.

**Complexity:** O(n)

``` ts
difference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### from()

Converts `keys` into a sorted, unique `Set`.

**Complexity:** O(2n + n log(n))

``` ts
from<V>(keys: Set<V>): Set<V>;
```


### has()

Returns `true` if `key` is present in `set`.

**Complexity:** O(log(n))

``` ts
has<V>(set: Set<V>, key: V): boolean;
```


### intersection()

Returns a `Set` of all keys present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
intersection<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### isDisjoint()

Returns `true` if `setA` and `setB` have no keys in common.

**Complexity:** O(n)

``` ts
isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### isSubset()

Returns `true` if all keys in `setA` are present in `setB`.

**Complexity:** O(n)

``` ts
isSubset<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### isSuperset()

Returns `true` if all keys in `setB` are present in `setA`.

**Complexity:** O(n)

``` ts
isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean;
```


### remove()

Returns a copy of `set` with `key` removed. If `key` is not present in `set`, then `set` is returned unchanged.

**Complexity:** O(n)

``` ts
remove<V>(set: Set<V>, key: V): Set<V>;
```


### symmetricDifference()

Returns a `Set` of all keys not present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### union()

Returns a `Set` of all keys in both `setA` and `setB`.

``` ts
union<V>(setA: Set<V>, setB: Set<V>): Set<V>;
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
