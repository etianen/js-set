export interface Set<V> extends Array<V> {
    isSet: void;
}

type EntryCallback<C, V> = (context: C, valueA: V, valueB: V) => void;

type SetCallback<C, V> = (context: C, set: Set<V>, index: number) => void;

function noop() {
    // Do nothing.
}

function copy<V>(result: Set<V>, set: Set<V>, index: number): void {
    for (const len = set.length; index < len; index++) {
        result.push(set[index]);
    }
}

function iter<C, V>(context: C, setA: Set<V>, setB: Set<V>, callback: EntryCallback<C, V>, setACallback: SetCallback<C, V>, setBCallback: SetCallback<C, V>): void {
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
        callback(context, valueA, valueB);
    }
    setACallback(context, setA, indexA);
    setBCallback(context, setB, indexB);
}

function merge<V>(setA: Set<V>, setB: Set<V>, callback: EntryCallback<Set<V>, V>, setACallback: SetCallback<Set<V>, V>, setBCallback: SetCallback<Set<V>, V>): Set<V> {
    const result = [] as Set<V>;
    iter(result, setA, setB, callback, setACallback, setBCallback);
    return result;
}

export function compare<V>(setA: Set<V>, setB: Set<V>, failOnBoth: boolean, failOnA: boolean): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        if (setA[indexA] === setB[indexB]) {
            if (failOnBoth) {
                return false;
            }
            indexA++;
            indexB++;
        } else if (setA[indexA] < setB[indexB]) {
            if (failOnA) {
                return false;
            }
            indexA++;
        } else {
            indexB++;
        }
    }
    if (failOnA) {
        return indexA === lenA;
    }
    return true;
}


// set API.

export function add<V>(set: Set<V>, key: V): Set<V> {
    let len = set.length;
    const result = [] as Set<V>;
    let index: number = 0;
    for (; index < len; index++) {
        if (set[index] === key) {
            return set;
        } else if (set[index] > key) {
            result.push(key);
            break;
        }
        result.push(set[index]);
    }
    if (index === len) {
        result.push(key);
    } else {
        copy(result, set, index);
    }
    return result;
}

export function create<V>(): Set<V> {
    return [] as Set<V>;
}

function differenceCallback<V>(result: Set<V>, valueA: V, valueB: V): void {
    if (valueA < valueB) {
        result.push(valueA);
    }
}

export function difference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return merge(setA, setB, differenceCallback, copy, noop);
}

export function from<V>(keys: Array<V>): Set<V> {
    const len = keys.length;
    if (len <= 1) {
        return keys as Set<V>;
    }
    const sortedKeys = keys.slice();
    sortedKeys.sort();
    const result = [sortedKeys[0]] as Set<V>;
    for (let index = 1; index < len; index++) {
        if (sortedKeys[index] !== sortedKeys[index - 1]) {
            result.push(sortedKeys[index]);
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
        if (set[index] === key) {
            return true;
        } else if (set[index] > key) {
            newIndex = index / 2;
        } else {
            newIndex = (index + len) / 2;
        }
        newIndex = Math.floor(newIndex);
    }
    return false;
}

function intersectionCallback<V>(result: Set<V>, valueA: V, valueB: V): void {
    if (valueA === valueB) {
        result.push(valueA);
    }
}

export function intersection<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return merge(setA, setB, intersectionCallback, noop, noop);
}

export function isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean {
    return compare(setA, setB, true, false);
}

export function isSubset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return compare(setA, setB, false, true);
}

export function isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return isSubset(setB, setA);
}

export function remove<V>(set: Set<V>, key: V): Set<V> {
    let len = set.length;
    const result = [] as Set<V>;
    let index: number = 0;
    for (; index < len; index++) {
        if (set[index] === key) {
            copy(result, set, index + 1);
            return result;
        }
        result.push(set[index]);
    }
    // Return the original set for value equality.
    return set;
}

function symmetricDifferenceCallback<V>(result: Set<V>, valueA: V, valueB: V): void {
    if (valueA < valueB) {
        result.push(valueA);
    } else if (valueB < valueA) {
        result.push(valueB);
    }
}

export function symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return merge(setA, setB, symmetricDifferenceCallback, copy, copy);
}

function unionCallback<V>(result: Set<V>, valueA: V, valueB: V): void {
    if (valueA <= valueB) {
        result.push(valueA);
    } else if (valueB < valueA) {
        result.push(valueB);
    }
}

export function union<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    return merge(setA, setB, unionCallback, copy, copy);
}
