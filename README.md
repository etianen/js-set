# @etianen/set

Helpers for using unique sorted arrays as sets.


## Installing

``` bash
npm install '@etianen/set'
```

**Typescript:** To take advantage of typings, be sure to set `moduleResolution` to `"node"` in your `tsconfig.json`.


## Overview

Unique sorted arrays can be used as relatively performant sets, without requiring a dedicated data structure.

@etianen/set provides helpers for using unique sorted arrays as sets.

``` ts
import * as set from "@etianen/set";

const setA = set.from([1, 2, 3]);
const setB = set.from([2, 3, 4]);
set.union(setA, setB);  // => [1, 2, 3, 4];
set.intersection(setA, setB);  // => [2, 3];
```


## API

In all the functions below:

* The source arguments are never mutated.
* The input arrays are assumed to be unique and sorted.
* If possible, the function will return an input array if the operation is a no-op. This is to help preserve reference equality.

To prevent runtime errors, stick to the following rules:

1. Create new sets using `create()`.
2. Convert existing arrays to sets using `from()`.
3. Never mutate a set directly. Use `add()`, `remove()` and friends to create new copies of a set with the changes applied.

**Advanced:** You can avoid the overhead of using `create()` and `from()` if you can guarantee your array is already unique and sorted, but be very careful!

**Typescript:** The compiler will prevent you from using input arrays that haven't been created using `create()` or `from()`. Use explicit typecasts to override this, but be very careful!


### add()

Adds `key` to a new copy of `set`.

**Complexity:** O(n)

``` ts
add<V>(set: Set<V>, key: V): Set<V>;
```


### create()

Creates a new blank set.

``` ts
create<V>(): Set<V>;
```


### difference()

Returns a set of all keys in `setA` that are not in `setB`.

**Complexity:** O(n)

``` ts
difference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### from()

Converts `keys` into a sorted, unique set.

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

Returns a set of all keys present in both `setA` and `setB`.

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

Returns a copy of `set` with `key` removed.

**Complexity:** O(n)

``` ts
remove<V>(set: Set<V>, key: V): Set<V>;
```


### symmetricDifference()

Returns a set of all keys not present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V>;
```


### union()

Returns a set of all keys in both `setA` and `setB`.

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
