export function difference<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    const result: Array<V> = [];
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA === valueB) {
            indexA++;
            indexB++;
        } else if (valueA < valueB) {
            result.push(valueA);
            indexA++;
        } else {
            indexB++;
        }
    }
    for (indexA; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
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

export function intersection<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    const result: Array<V> = [];
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA === valueB) {
            result.push(valueA);
            indexA++;
            indexB++;
        } else if (valueA < valueB) {
            indexA++;
        } else {
            indexB++;
        }
    }
    return result;
}

export function isDisjoint<V>(setA: Array<V>, setB: Array<V>): boolean {
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA === valueB) {
            return false;
        } else if (valueA < valueB) {
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
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA === valueB) {
            indexA++;
            indexB++;
        } else if (valueA < valueB) {
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

export function union<V>(setA: Array<V>, setB: Array<V>): Array<V> {
    const result: Array<V> = [];
    const lenA = setA.length;
    const lenB = setB.length;
    let indexA = 0;
    let indexB = 0;
    while (indexA < lenA && indexB < lenB) {
        const valueA = setA[indexA];
        const valueB = setB[indexB];
        if (valueA === valueB) {
            result.push(valueA);
            indexA++;
            indexB++;
        } else if (valueA < valueB) {
            result.push(valueA);
            indexA++;
        } else {
            result.push(valueB);
            indexB++;
        }
    }
    for (indexA; indexA < lenA; indexA++) {
        result.push(setA[indexA]);
    }
    for (indexB; indexB < lenB; indexB++) {
        result.push(setB[indexB]);
    }
    return result;
}
