import {expect} from "chai";
import {has, intersection, union} from "../lib/index";


describe("set", () => {

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
            expect(intersection(set, superset)).to.eql(set);
            expect(intersection(superset, set)).to.eql(set);
            expect(intersection(set, empty)).to.eql(empty);
            expect(intersection(empty, set)).to.eql(empty);
        });

    });

    describe("union", () => {

        it("returns the union of two sets", () => {
            expect(union(set, set)).to.eql(set);
            expect(union(set, superset)).to.eql(superset);
            expect(union(superset, set)).to.eql(superset);
            expect(union(set, empty)).to.eql(set);
            expect(union(empty, set)).to.eql(set);
        });

    });

});
