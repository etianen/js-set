type Pusher<V> = (result: Array<V>, value: V) => void;

function copy<V>(result: Array<V>, set: Array<V>, index: number, push: Pusher<V>): void {
    for (const len = set.length; index < len; index++) {
        push(result, set[index]);
    }
}

function merge<V>(setA: Array<V>, setB: Array<V>, pushBoth: Pusher<V>, pushA: Pusher<V>, pushB: Pusher<V>): Array<V> {
    const result: Array<V> = [];
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        if (setA[indexA] === setB[indexB]) {
            pushBoth(result, setA[indexA]);
            indexA++;
            indexB++;
        } else if (setA[indexA] < setB[indexB]) {
            pushA(result, setA[indexA]);
            indexA++;
        } else {
            pushB(result, setB[indexB]);
            indexB++;
        }
    }
    copy(result, setA, indexA, pushA);
    copy(result, setB, indexB, pushB);
    return result;
}

function noPush() {
    // Do nothing;
}

const push: Pusher<Object> = Function.prototype.call.bind(Array.prototype.push);


// set API.

export function add<V>(set: Array<V>, key: V): Array<V> {
    let len = set.length;
    const result: Array<V> = [];
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
        copy(result, set, index, push);
    }
    return result;
}

export function difference<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    return merge<V>(setA, setB, noPush, push, noPush);
}

export function from<V>(keys: Array<V>): Array<V> {
    const len = keys.length;
    if (len === 0) {
        return keys;
    }
    const sortedKeys = keys.slice();
    sortedKeys.sort();
    const result: Array<V> = [sortedKeys[0]];
    for (let index = 1; index < len; index++) {
        if (sortedKeys[index] !== sortedKeys[index - 1]) {
            result.push(sortedKeys[index]);
        }
    }
    return result;
}

export function has<V>(set: Array<V>, key: V): boolean {
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

export function intersection<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    return merge<V>(setA, setB, push, noPush, noPush);
}

export function isDisjoint<V>(setA: Array<V>, setB: Array<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        if (setA[indexA] === setB[indexB]) {
            return false;
        } else if (setA[indexA] < setB[indexB]) {
            indexA++;
        } else {
            indexB++;
        }
    }
    return true;
}

export function isSubset<V>(setA: Array<V>, setB: Array<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        if (setA[indexA] === setB[indexB]) {
            indexA++;
            indexB++;
        } else if (setA[indexA] < setB[indexB]) {
            return false;
        } else {
            indexB++;
        }
    }
    return indexA === lenA;
}

export function isSuperset<V>(setA: Array<V>, setB: Array<V>): boolean {
    return isSubset(setB, setA);
}

export function remove<V>(set: Array<V>, key: V): Array<V> {
    let len = set.length;
    const result: Array<V> = [];
    let index: number = 0;
    for (; index < len; index++) {
        if (set[index] === key) {
            copy(result, set, index + 1, push);
            return result;
        }
        result.push(set[index]);
    }
    // Return the original set for value equality.
    return set;
}

export function symmetricDifference<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    return merge<V>(setA, setB, noPush, push, push);
}

export function union<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    return merge<V>(setA, setB, push, push, push);
}
