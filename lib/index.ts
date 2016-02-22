export interface Set<V> extends Array<V> {
    isSet: void;
}

type EntryCallback<V, C> = (valueA: V, valueB: V, context: C) => boolean | void;

type SetCallback<V, C> = (set: Set<V>, index: number, context: C) => boolean | void;

function copy<V>(set: Set<V>, index: number, result: Set<V>): void {
    for (const len = set.length; index < len; index++) {
        result.push(set[index]);
    }
}

function noop(): void {
    // Do nothing.
}

function isIncomplete<V>(set: Set<V>, index: number): boolean {
    return set.length !== index;
}

function iter<V, C>(setA: Set<V>, setB: Set<V>, callback: EntryCallback<V, C>, setACallback: SetCallback<V, C>, setBCallback: SetCallback<V, C>, context?: C): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            indexA++;
        }
        if (valueB <= valueA) {
            indexB++;
        }
        if (callback(valueA, valueB, context)) {
            return false;
        }
    }
    return !setACallback(setA, indexA, context) && !setBCallback(setB, indexB, context);
}

function merge<V>(setA: Set<V>, setB: Set<V>, callback: EntryCallback<V, Set<V>>, setACallback: SetCallback<V, Set<V>>, setBCallback: SetCallback<V, Set<V>>): Set<V> {
    const result = [] as Set<V>;
    iter(setA, setB, callback, setACallback, setBCallback, result);
    return result;
}

function preserveReference<V>(set: Set<V>, result: Set<V>): Set<V> {
    if (set.length === result.length) {
        return set;
    }
    return result;
}


// set API.

export function add<V>(set: Set<V>, key: V): Set<V> {
    return union(set, [key] as Set<V>);
}

export function create<V>(): Set<V> {
    return [] as Set<V>;
}

function differenceCallback<V>(valueA: V, valueB: V, result: Set<V>): void {
    if (valueA < valueB) {
        result.push(valueA);
    }
}

export function difference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return preserveReference(setA, merge(setA, setB, differenceCallback, copy, noop));
}

export function from<V>(keys: Array<V>): Set<V> {
    const len = keys.length;
    if (len <= 1) {
        return keys as Set<V>;
    }
    const sortedKeys = keys.slice().sort();
    const result = [sortedKeys[0]] as Set<V>;
    for (let index = 1; index < len; index++) {
        const value = sortedKeys[index];
        if (value !== sortedKeys[index - 1]) {
            result.push(value);
        }
    }
    return result;
}

export function has<V>(set: Set<V>, key: V): boolean {
    const len = set.length;
    if (len === 0) {
        return false;
    }
    let index: number;
    let newIndex = Math.floor(len / 2);
    while (index !== newIndex) {
        index = newIndex;
        const value = set[index];
        if (value === key) {
            return true;
        } else if (value > key) {
            newIndex = index / 2;
        } else {
            newIndex = (index + len) / 2;
        }
        newIndex = Math.floor(newIndex);
    }
    return false;
}

function intersectionCallback<V>(valueA: V, valueB: V, result: Set<V>): void {
    if (valueA === valueB) {
        result.push(valueA);
    }
}

export function intersection<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return preserveReference(setA, preserveReference(setB, merge(setA, setB, intersectionCallback, noop, noop)));
}

function isDisjointCallback<V>(valueA: V, valueB: V): boolean {
    return valueA === valueB;
}

export function isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean {
    return iter(setA, setB, isDisjointCallback, noop, noop);
}

function isSubsetCallback<V>(valueA: V, valueB: V): boolean {
    return valueA < valueB;
}

export function isSubset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return iter(setA, setB, isSubsetCallback, isIncomplete, noop);
}

export function isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return isSubset(setB, setA);
}

export function remove<V>(set: Set<V>, key: V): Set<V> {
    return difference(set, [key] as Set<V>);
}

function symmetricDifferenceCallback<V>(valueA: V, valueB: V, result: Set<V>): void {
    if (valueA < valueB) {
        result.push(valueA);
    } else if (valueB < valueA) {
        result.push(valueB);
    }
}

export function symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return merge(setA, setB, symmetricDifferenceCallback, copy, copy);
}

function unionCallback<V>(valueA: V, valueB: V, result: Set<V>): void {
    if (valueA <= valueB) {
        result.push(valueA);
    } else if (valueB < valueA) {
        result.push(valueB);
    }
}

export function union<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return preserveReference(setA, preserveReference(setB, merge(setA, setB, unionCallback, copy, copy)));
}
