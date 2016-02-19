import {expect} from "chai";
import {has, intersection, isDisjoint, union} from "../lib/index";


describe("set", () => {

    const disjoint1 = ["a"];
    const disjoint2 = ["g"];
    const empty: Array<string> = [];
    const set = ["b", "c", "d", "e", "f"];
    const superset = ["a", "b", "c", "d", "e", "f", "g"];

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
