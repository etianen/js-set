import {expect} from "chai";
import {add, difference, from, has, intersection, isDisjoint, isSubset, isSuperset, remove, symmetricDifference, union} from "../lib/index";


describe("set", () => {

    const disjoint1 = ["a"];
    const disjoint2 = ["g"];
    const empty: Array<string> = [];
    const set = ["b", "c", "d", "e", "f"];
    const superset = ["a", "b", "c", "d", "e", "f", "g"];

    describe("add", () => {

        it("adds a value to the set", () => {
            expect(add(set, "a")).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(add(set, "b")).to.equal(set);
            expect(add(set, "f")).to.equal(set);
            expect(add(set, "g")).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(add(empty, "a")).to.eql(["a"]);
        });

    });

    describe("difference", () => {

        it("returns all keys in the first set that are not in the second set", () => {
            expect(difference(set, set)).to.eql(empty);
            expect(difference(disjoint1, set)).to.eql(disjoint1);
            expect(difference(set, disjoint1)).to.eql(set);
            expect(difference(disjoint2, set)).to.eql(disjoint2);
            expect(difference(set, disjoint2)).to.eql(set);
            expect(difference(empty, empty)).to.eql(empty);
            expect(difference(set, empty)).to.eql(set);
            expect(difference(empty, set)).to.eql(empty);
            expect(difference(set, superset)).to.eql(empty);
            expect(difference(superset, set)).to.eql(["a", "g"]);
        });

    });

    describe("from", () => {

        it("creates a set from an array", () => {
            expect(from(empty)).to.equal(empty);
            expect(from(["b", "a", "a", "c", "b"])).to.eql(["a", "b", "c"]);
        });

    });

    describe("has", () => {

        it("returns true if the set contains the value", () => {
            for (const key of set) {
                expect(has(set, key)).to.be.true;
            }
            expect(has(set, "a")).to.be.false;
            expect(has(set, "g")).to.be.false;
            expect(has(empty, "a")).to.be.false;
        });

    });

    describe("intersection", () => {

        it("returns the intersection of two sets", () => {
            expect(intersection(set, set)).to.eql(set);
            expect(intersection(disjoint1, set)).to.eql(empty);
            expect(intersection(set, disjoint1)).to.eql(empty);
            expect(intersection(disjoint2, set)).to.eql(empty);
            expect(intersection(set, disjoint2)).to.eql(empty);
            expect(intersection(empty, empty)).to.eql(empty);
            expect(intersection(set, empty)).to.eql(empty);
            expect(intersection(empty, set)).to.eql(empty);
            expect(intersection(set, superset)).to.eql(set);
            expect(intersection(superset, set)).to.eql(set);
        });

    });

    describe("isDisjoint", () => {

        it("returns true if the sets have no key in common", () => {
            expect(isDisjoint(set, set)).to.be.false;
            expect(isDisjoint(disjoint1, set)).to.be.true;
            expect(isDisjoint(set, disjoint1)).to.be.true;
            expect(isDisjoint(disjoint2, set)).to.be.true;
            expect(isDisjoint(set, disjoint2)).to.be.true;
            expect(isDisjoint(empty, empty)).to.be.true;
            expect(isDisjoint(set, empty)).to.be.true;
            expect(isDisjoint(empty, set)).to.be.true;
            expect(isDisjoint(set, superset)).to.be.false;
            expect(isDisjoint(superset, set)).to.be.false;
        });

    });

    describe("isSubset", () => {

        it("returns true if the first set is a subset of the second", () => {
            expect(isSubset(set, set)).to.be.true;
            expect(isSubset(disjoint1, set)).to.be.false;
            expect(isSubset(set, disjoint1)).to.be.false;
            expect(isSubset(disjoint2, set)).to.be.false;
            expect(isSubset(set, disjoint2)).to.be.false;
            expect(isSubset(empty, empty)).to.be.true;
            expect(isSubset(set, empty)).to.be.false;
            expect(isSubset(empty, set)).to.be.true;
            expect(isSubset(set, superset)).to.be.true;
            expect(isSubset(superset, set)).to.be.false;
        });

    });

    describe("isSuperset", () => {

        it("returns true if the first set is a superset of the second", () => {
            expect(isSuperset(set, set)).to.be.true;
            expect(isSuperset(disjoint1, set)).to.be.false;
            expect(isSuperset(set, disjoint1)).to.be.false;
            expect(isSuperset(disjoint2, set)).to.be.false;
            expect(isSuperset(set, disjoint2)).to.be.false;
            expect(isSuperset(empty, empty)).to.be.true;
            expect(isSuperset(set, empty)).to.be.true;
            expect(isSuperset(empty, set)).to.be.false;
            expect(isSuperset(set, superset)).to.be.false;
            expect(isSuperset(superset, set)).to.be.true;
        });

    });

    describe("remove", () => {

        it("removes a value from the set", () => {
            expect(remove(set, "a")).to.equal(set);
            expect(remove(set, "b")).to.eql(["c", "d", "e", "f"]);
            expect(remove(set, "f")).to.eql(["b", "c", "d", "e"]);
            expect(remove(set, "g")).to.equal(set);
            expect(remove(empty, "a")).to.equal(empty);
        });

    });

    describe("symmetricDifference", () => {

        it("returns the symmetric difference of two sets", () => {
            expect(symmetricDifference(set, set)).to.eql(empty);
            expect(symmetricDifference(disjoint1, set)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(symmetricDifference(set, disjoint1)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(symmetricDifference(disjoint2, set)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(symmetricDifference(set, disjoint2)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(symmetricDifference(empty, empty)).to.eql(empty);
            expect(symmetricDifference(set, empty)).to.eql(set);
            expect(symmetricDifference(empty, set)).to.eql(set);
            expect(symmetricDifference(set, superset)).to.eql(["a", "g"]);
            expect(symmetricDifference(superset, set)).to.eql(["a", "g"]);
        });

    });

    describe("union", () => {

        it("returns the union of two sets", () => {
            expect(union(set, set)).to.eql(set);
            expect(union(disjoint1, set)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(union(set, disjoint1)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(union(disjoint2, set)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(union(set, disjoint2)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(union(empty, empty)).to.eql(empty);
            expect(union(set, empty)).to.eql(set);
            expect(union(empty, set)).to.eql(set);
            expect(union(set, superset)).to.eql(superset);
            expect(union(superset, set)).to.eql(superset);
        });

    });

});
