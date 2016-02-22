export interface Set<V> extends Array<V> {
    isSet: void;
}


// API.

export function add<V>(set: Set<V>, key: V): Set<V> {
    return union(set, [key] as Set<V>);
}

export function create<V>(): Set<V> {
    return [] as Set<V>;
}

export function difference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const result = [] as Set<V>;
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            if (valueA < valueB) {
                result.push(valueA);
            }
            indexA++;
        }
        if (valueB <= valueA) {
            indexB++;
        }
    }
    for (; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
    }
    if (lenA === result.length) {
        return setA;
    }
    return result;
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

export function intersection<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const result = [] as Set<V>;
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            if (valueA === valueB) {
                result.push(valueA);
            }
            indexA++;
        }
        if (valueB <= valueA) {
            indexB++;
        }
    }
    if (lenA === result.length) {
        return setA;
    }
    if (lenB === result.length) {
        return setB;
    }
    return result;
}

export function isDisjoint<V>(setA: Set<V>, setB: Set<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            if (valueA === valueB) {
                return false;
            }
            indexA++;
        }
        if (valueB <= valueA) {
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
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            if (valueA < valueB) {
                return false;
            }
            indexA++;
        }
        if (valueB <= valueA) {
            indexB++;
        }
    }
    return indexA === lenA;
}

export function isSuperset<V>(setA: Set<V>, setB: Set<V>): boolean {
    return isSubset(setB, setA);
}

export function remove<V>(set: Set<V>, key: V): Set<V> {
    return difference(set, [key] as Set<V>);
}

export function symmetricDifference<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const result = [] as Set<V>;
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            if (valueA < valueB) {
                result.push(valueA);
            }
            indexA++;
        }
        if (valueB <= valueA) {
            if (valueB < valueA) {
                result.push(valueB);
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
    return result;
}

export function union<V>(setA: Set<V>, setB: Set<V>): Set<V> {
    const result = [] as Set<V>;
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA <= valueB) {
            result.push(valueA);
            indexA++;
        }
        if (valueB <= valueA) {
            if (valueB < valueA) {
                result.push(valueB);
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
    if (lenA === result.length) {
        return setA;
    }
    if (lenB === result.length) {
        return setB;
    }
    return result;
}
