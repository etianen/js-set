# @etianen/set

Helpers for using unique sorted arrays as sets.


## Installing

``` bash
npm install '@etianen/set'
```


## Overview

Unique sorted arrays can be used as relatively performant sets, without requiring a dedicated data structure.

@etianen/set provides a set of helpers for using unique sorted arrays as sets.


## set API

In all the functions below:

* The source arguments are never mutated.
* The source argument is assumed to be unique and sorted.


### add()

Adds `key` to a new copy of `set`. If `key` is already in `set`, then `set` is returned unchanged.

**Complexity:** O(n)

``` ts
add<V>(set: Array<V>, key: V): Array<V>;
```


### difference()

Returns a set of all keys in `setA` that are not in `setB`.

**Complexity:** O(n)

``` ts
difference<V>(setA: Array<V>, setB: Array<V>): Array<V>;
```


### from()

Returns a sorted, unique copy of `keys`.

**Complexity:** O(2n + n log(n))

``` ts
from<V>(keys: Array<V>): Array<V>;
```


### has()

Returns `true` if `key` is present in `set`.

**Complexity:** O(log(n))

``` ts
has<V>(set: Array<V>, key: V): boolean;
```


### intersection()

Returns a set of all keys present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
intersection<V>(setA: Array<V>, setB: Array<V>): Array<V>;
```


### isDisjoint()

Returns `true` if `setA` and `setB` have no keys in common.

**Complexity:** O(n)

``` ts
isDisjoint<V>(setA: Array<V>, setB: Array<V>): boolean;
```


### isSubset()

Returns `true` if all keys in `setA` are present in `setB`.

**Complexity:** O(n)

``` ts
isSubset<V>(setA: Array<V>, setB: Array<V>): boolean;
```


### isSuperset()

Returns `true` if all keys in `setB` are present in `setA`.

**Complexity:** O(n)

``` ts
isSuperset<V>(setA: Array<V>, setB: Array<V>): boolean;
```


### remove()

Returns a copy of `set` with `key` removed. If `key` is not present in `set`, then `set` is returned unchanged.

**Complexity:** O(n)

``` ts
remove<V>(set: Array<V>, key: V): Array<V>;
```


### symmetricDifference()

Returns a set of all keys not present in both `setA` and `setB`.

**Complexity:** O(n)

``` ts
symmetricDifference<V>(setA: Array<V>, setB: Array<V>): Array<V>;
```


### union()

Returns a set of all keys in both `setA` and `setB`.

``` ts
union<V>(setA: Array<V>, setB: Array<V>): Array<V>;
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
