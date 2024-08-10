import { currency } from "../scripts/utils/money.js";

describe('test suite: currency',()=>{
    it("converts cents into dollars",()=>{
        expect(currency(2095)).toEqual('20.95');
    });
    it("work with 0",()=>{
        expect(currency(0)).toEqual('0.00');
    });
    it("work with cents in point",()=>{
        expect(currency(2095.5)).toEqual('20.96');
    });

}); 