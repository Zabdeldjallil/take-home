import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  })
  it('should make sure no drug has a benefit bigger than 50', () => {
    expect(()=>{
      new Pharmacy([new Drug("test", 5, 55)]).updateBenefitValue()
    }
    ).toThrowError("can't be more than 50")

    expect(()=>{
      new Pharmacy([new Drug("Herbal Tea", 5, 55)]).updateBenefitValue()
    }
    ).toThrowError("can't be more than 50")
    expect(()=>{
      new Pharmacy([new Drug("Magic Pill", 5, 55)]).updateBenefitValue()
    }
    ).toThrowError("can't be more than 50")

    expect(()=>{
      new Pharmacy([new Drug("Fervex", 5, 55)]).updateBenefitValue()
    }
    ).toThrowError("can't be more than 50")
  })
  it('once expried benefits decrease twice as fast', () => {
    expect(
      new Pharmacy([new Drug("test", 0, 2)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 0)]);

    expect(
      new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 0)]);
  })
  it('should make sure no benefit is negative', () => {
    expect(
      new Pharmacy([new Drug("test", 1, 1)]).updateBenefitValue()
    ).toEqual([new Drug("test", 0, 0)]);
  })
  it('should increase herbal tea benefit the older it gets', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 15, 1)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 14, 2)]);
  })
  it('should increase Herbal Tea benefit twice as fast when its expired', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 1)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 3)]);
  })
  it('should never update any property if its a magic pill', () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 0, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", -1, 50)]);
  })
  it('should increase the benefit of Fervex when expiresIn is bigger than 10 days', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 20, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 19, 41)]);

    expect(
      new Pharmacy([new Drug("Fervex", 20, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 19, 50)]);
  })
  it('should increase benefit of Fervex by 2 when it expiresIn 10 days or less', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 42)]);
  })
  it('should decrease benefit of Fervex to 0 when it expires', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  })
  it('dafalgan degrades in benifits twice as much as normal drugs', () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 5, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 4, 38)]);

    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 40)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -1, 38)]);
  })
});
