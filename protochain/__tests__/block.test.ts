import Block from "../src/lib/block";
import {describe, expect, test} from "@jest/globals";

describe("Block", () => {
    test("should create valid", () => {
        const block = new Block(1, "hash previo","data");
        expect(block.isValid()).toBeTruthy();
    })

    test("should not create invalid with -1", () => {
        const block = new Block(-1, "hash previo","data");
        expect(block.isValid()).toBeFalsy();
    })

/*     test("should not create invalid without hash", () => {
        const block = new Block(1, "");
        expect(block.isValid()).toBeFalsy();
    }) */
});