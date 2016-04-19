export interface Set<V> extends Array<V> {
    isSet: void;
}

// Helpers.

const asSet: <V>(result: Array<V>) => Set<V> = Object.freeze;

const EMPTY_SET: Set<any> = asSet([]);


// API.

// General optimization: Using array index assignment is faster than .push(), if it's trivial to calculate.
// General optimization: Using array index lookup is faster than a temp variable.
// General optimization: A lot of inlining, instead of gnarly functional stuff, runs faster.

export function add<V>(set: Set<V>, key: V): Set<V> {
    const len = set.length;
    // Optimization: Pre-allocate result to correct length.
    const result: Array<V> = [];
    result.length = len + 1;
    for (let index = 0; index < len; index++) {
        // Preserve reference equality and shortcut the loop.
        if (set[index] === key) {
            return set;
        }
        if (set[index] > key) {
            result[index] = key;
            // Optimization: Fast inner loop to finish the array copy.
            for (; index < len; index++) {
                result[index + 1] = set[index];
            }
            return asSet(result);
        }
        result[index] = set[index];
    }
    result[len] = key;
    return asSet(result);
}

export function empty<V>(): Set<V> {
    return EMPTY_SET;
}

export function difference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const lenA = setA.length;
    // Optimization: Avoid needlessly allocating a result array, only to throw it away.
    if (lenA === 0) {
        return setA;
    }
    const lenB = setB.length;
    // Optimization: Avoid copying the entire of setA into result, only to discard result.
    if (lenB === 0) {
        return setA;
    }
    const result: Array<V> = [];
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            if (setA[indexA] < setB[indexB]) {
                result.push(setA[indexA]);
            }
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            indexB++;
        }
    }
    for (; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
    }
    // Preserve reference equality.
    if (lenA === result.length) {
        return setA;
    }
    return asSet(result);
}

export function from<V>(keys: Array<V>): Set<V> {
    const len = keys.length;
    if (len === 0) {
        return EMPTY_SET;
    }
    if (len <= 1) {
        return asSet(keys.slice());
    }
    const sortedKeys = keys.slice().sort();
    const result: Array<V> = [sortedKeys[0]];
    for (let index = 1; index < len; index++) {
        if (sortedKeys[index] !== sortedKeys[index - 1]) {
            result.push(sortedKeys[index]);
        }
    }
    return asSet(result);
}

export function has<V>(set: Set<V>, key: V): boolean {
    let min = 0;
    let max = set.length;
    if (max === 0) {
        return false;
    }
    while (min <= max) {
        const index = Math.floor((min + max) / 2);
        if (set[index] === key) {
            return true;
        }
        if (set[index] > key) {
            max = index - 1;
        } else {
            min = index + 1;
        }
    }
    return false;
}

export function intersection<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const lenA = setA.length;
    // Optimization: Avoid allocating a result array, only to throw it away.
    if (lenA === 0) {
        return setA;
    }
    const lenB = setB.length;
    // Optimization: Avoid allocating a result array, only to throw it away.
    if (lenB === 0) {
        return setB;
    }
    const result: Array<V> = [];
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            if (setA[indexA] === setB[indexB]) {
                result.push(setA[indexA]);
            }
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            indexB++;
        }
    }
    // Preserve reference equality.
    if (lenA === result.length) {
        return setA;
    }
    if (lenB === result.length) {
        return setB;
    }
    return asSet(result);
}

export function isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            if (setA[indexA] === setB[indexB]) {
                return false;
            }
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            indexB++;
        }
    }
    return true;
}

export function isSubset<V>(setA: Set<V>, setB: Set<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            if (setA[indexA] < setB[indexB]) {
                return false;
            }
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            indexB++;
        }
    }
    return indexA === lenA;
}

export function isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return isSubset(setB, setA);
}

export function of<V>(...keys: Array<V>): Set<V> {
    return from(keys);
}

export function remove<V>(set: Set<V>, key: V): Set<V> {
    const len = set.length;
    if (len === 0) {
        return set;
    }
    // Pre-allocate result to the correct length. Might save a few cycles...
    const result: Array<V> = [];
    result.length = len - 1;
    for (let index = 0; index < len; index++) {
        if (set[index] === key) {
            // Fast inner loop to finish the array copy.
            for (index++; index < len; index++) {
                result[index - 1] = set[index];
            }
            return asSet(result);
        }
        // Preserve reference equality.
        if (set[index] > key) {
            return set;
        }
        result[index] = set[index];
    }
    return set;
}

export function symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const lenA = setA.length;
    if (lenA === 0) {
        return setB;
    }
    const lenB = setB.length;
    if (lenB === 0) {
        return setA;
    }
    const result: Array<V> = [];
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            if (setA[indexA] < setB[indexB]) {
                result.push(setA[indexA]);
            }
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            if (setB[indexB] < setA[oldIndexA]) {
                result.push(setB[indexB]);
            }
            indexB++;
        }
    }
    for (; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
    }
    for (; indexB < lenB; indexB++) {
        result.push(setB[indexB]);
    }
    return asSet(result);
}

export function union<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const lenA = setA.length;
    // Optimization: Avoid copying the entire of setB into result, only to discard result.
    if (lenA === 0) {
        return setB;
    }
    const lenB = setB.length;
    // Optimization: Avoid copying the entire of setA into result, only to discard result.
    if (lenB === 0) {
        return setA;
    }
    const result: Array<V> = [];
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const oldIndexA = indexA;
        if (setA[indexA] <= setB[indexB]) {
            result.push(setA[indexA]);
            indexA++;
        }
        if (setB[indexB] <= setA[oldIndexA]) {
            if (setB[indexB] < setA[oldIndexA]) {
                result.push(setB[indexB]);
            }
            indexB++;
        }
    }
    for (; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
    }
    for (; indexB < lenB; indexB++) {
        result.push(setB[indexB]);
    }
    // Preserve reference equality.
    if (lenA === result.length) {
        return setA;
    }
    if (lenB === result.length) {
        return setB;
    }
    return asSet(result);
}
