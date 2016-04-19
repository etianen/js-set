import {expect} from "chai";
import * as set from "../lib/index";


describe("set", () => {

    const disjoint1: set.Set<string> = set.of("a");
    const disjoint2: set.Set<string> = set.of("g");
    const empty: set.Set<string> = set.empty<string>();
    const subset: set.Set<string> = set.of("b", "c", "d", "e", "f");
    const superset: set.Set<string> = set.of("a", "b", "c", "d", "e", "f", "g");

    describe("add", () => {

        it("adds a value to the set", () => {
            expect(set.add(subset, "a")).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(set.add(subset, "b")).to.equal(subset);
            expect(set.add(subset, "f")).to.equal(subset);
            expect(set.add(subset, "g")).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(set.add(empty, "a")).to.eql(["a"]);
        });

    });

    describe("empty", () => {

        it("creates a new empty set", () => {
            expect(set.empty()).to.eql(empty);
        });

    });

    describe("difference", () => {

        it("returns all keys in the first set that are not in the second set", () => {
            expect(set.difference(subset, subset)).to.eql(empty);
            expect(set.difference(disjoint1, subset)).to.equal(disjoint1);
            expect(set.difference(subset, disjoint1)).to.equal(subset);
            expect(set.difference(disjoint2, subset)).to.equal(disjoint2);
            expect(set.difference(subset, disjoint2)).to.equal(subset);
            expect(set.difference(empty, empty)).to.equal(empty);
            expect(set.difference(subset, empty)).to.equal(subset);
            expect(set.difference(empty, subset)).to.equal(empty);
            expect(set.difference(subset, superset)).to.eql(empty);
            expect(set.difference(superset, subset)).to.eql(["a", "g"]);
        });

    });

    describe("from", () => {

        it("creates a set from an array", () => {
            expect(set.from(empty)).to.equal(empty);
            expect(set.from(disjoint1)).to.eql(disjoint1);
            expect(set.from(["b", "a", "a", "c", "b"])).to.eql(["a", "b", "c"]);
        });

    });

    describe("has", () => {

        it("returns true if the set contains the value", () => {
            for (const key of subset) {
                expect(set.has(subset, key)).to.be.true;
            }
            expect(set.has(subset, "a")).to.be.false;
            expect(set.has(subset, "g")).to.be.false;
            expect(set.has(empty, "a")).to.be.false;
        });

    });

    describe("intersection", () => {

        it("returns the intersection of two sets", () => {
            expect(set.intersection(subset, subset)).to.equal(subset);
            expect(set.intersection(disjoint1, subset)).to.eql(empty);
            expect(set.intersection(subset, disjoint1)).to.eql(empty);
            expect(set.intersection(disjoint2, subset)).to.eql(empty);
            expect(set.intersection(subset, disjoint2)).to.eql(empty);
            expect(set.intersection(empty, empty)).to.equal(empty);
            expect(set.intersection(subset, empty)).to.equal(empty);
            expect(set.intersection(empty, subset)).to.equal(empty);
            expect(set.intersection(subset, superset)).to.equal(subset);
            expect(set.intersection(superset, subset)).to.equal(subset);
        });

    });

    describe("isDisjoint", () => {

        it("returns true if the sets have no key in common", () => {
            expect(set.isDisjoint(subset, subset)).to.be.false;
            expect(set.isDisjoint(disjoint1, subset)).to.be.true;
            expect(set.isDisjoint(subset, disjoint1)).to.be.true;
            expect(set.isDisjoint(disjoint2, subset)).to.be.true;
            expect(set.isDisjoint(subset, disjoint2)).to.be.true;
            expect(set.isDisjoint(empty, empty)).to.be.true;
            expect(set.isDisjoint(subset, empty)).to.be.true;
            expect(set.isDisjoint(empty, subset)).to.be.true;
            expect(set.isDisjoint(subset, superset)).to.be.false;
            expect(set.isDisjoint(superset, subset)).to.be.false;
        });

    });

    describe("isSubset", () => {

        it("returns true if the first set is a subset of the second", () => {
            expect(set.isSubset(subset, subset)).to.be.true;
            expect(set.isSubset(disjoint1, subset)).to.be.false;
            expect(set.isSubset(subset, disjoint1)).to.be.false;
            expect(set.isSubset(disjoint2, subset)).to.be.false;
            expect(set.isSubset(subset, disjoint2)).to.be.false;
            expect(set.isSubset(empty, empty)).to.be.true;
            expect(set.isSubset(subset, empty)).to.be.false;
            expect(set.isSubset(empty, subset)).to.be.true;
            expect(set.isSubset(subset, superset)).to.be.true;
            expect(set.isSubset(superset, subset)).to.be.false;
        });

    });

    describe("isSuperset", () => {

        it("returns true if the first set is a superset of the second", () => {
            expect(set.isSuperset(subset, subset)).to.be.true;
            expect(set.isSuperset(disjoint1, subset)).to.be.false;
            expect(set.isSuperset(subset, disjoint1)).to.be.false;
            expect(set.isSuperset(disjoint2, subset)).to.be.false;
            expect(set.isSuperset(subset, disjoint2)).to.be.false;
            expect(set.isSuperset(empty, empty)).to.be.true;
            expect(set.isSuperset(subset, empty)).to.be.true;
            expect(set.isSuperset(empty, subset)).to.be.false;
            expect(set.isSuperset(subset, superset)).to.be.false;
            expect(set.isSuperset(superset, subset)).to.be.true;
        });

    });

    describe("remove", () => {

        it("removes a value from the set", () => {
            expect(set.remove(subset, "a")).to.equal(subset);
            expect(set.remove(subset, "b")).to.eql(["c", "d", "e", "f"]);
            expect(set.remove(subset, "f")).to.eql(["b", "c", "d", "e"]);
            expect(set.remove(subset, "g")).to.equal(subset);
            expect(set.remove(empty, "a")).to.equal(empty);
        });

    });

    describe("symmetricDifference", () => {

        it("returns the symmetric difference of two sets", () => {
            expect(set.symmetricDifference(subset, subset)).to.eql(empty);
            expect(set.symmetricDifference(disjoint1, subset)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(set.symmetricDifference(subset, disjoint1)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(set.symmetricDifference(disjoint2, subset)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(set.symmetricDifference(subset, disjoint2)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(set.symmetricDifference(empty, empty)).to.equal(empty);
            expect(set.symmetricDifference(subset, empty)).to.equal(subset);
            expect(set.symmetricDifference(empty, subset)).to.equal(subset);
            expect(set.symmetricDifference(subset, superset)).to.eql(["a", "g"]);
            expect(set.symmetricDifference(superset, subset)).to.eql(["a", "g"]);
        });

    });

    describe("union", () => {

        it("returns the union of two sets", () => {
            expect(set.union(subset, subset)).to.equal(subset);
            expect(set.union(disjoint1, subset)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(set.union(subset, disjoint1)).to.eql(["a", "b", "c", "d", "e", "f"]);
            expect(set.union(disjoint2, subset)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(set.union(subset, disjoint2)).to.eql(["b", "c", "d", "e", "f", "g"]);
            expect(set.union(empty, empty)).to.equal(empty);
            expect(set.union(subset, empty)).to.equal(subset);
            expect(set.union(empty, subset)).to.equal(subset);
            expect(set.union(subset, superset)).to.equal(superset);
            expect(set.union(superset, subset)).to.equal(superset);
        });

    });

});
