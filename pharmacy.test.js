import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("test", 1, 2)]);
  })
  it('once expried benefits decrease twice as fast', () => {
    expect(
      new Pharmacy([new Drug("test", 0, 2)]).updateBenefitValue()
    ).toEqual([new Drug("test", -1, 0)]);
  })
  it('should increase benefits of herbal tea the older it gets', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 15, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 14, 3)]);
  })
  it('should increase twice as fast the benefits of herbal tea after expiration date', () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 2)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 4)]);
  })
  it('should make sure no drug has a benefit bigger than 50', () => {
    expect(
      new Pharmacy([new Drug("test", 5, 55)]).updateBenefitValue()
    ).toEqual([new Drug("test", 5, 55)]);
  })
  it('assumes Magic Pill never expires nor decreases in Benefit', () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 1, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 1, 50)]);
  })
  it('Fervex increases its benefits when its expiration date approaches', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 20, 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 19, 46)]);
  })
  it('Fervex increases its benefits by two when there are 10 days or less', () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 47)]);
    expect(
      new Pharmacy([new Drug("Fervex",6 , 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 5, 47)]);
  })
  it('Fervex increases its benefits by three when there are 5 days or less ', () => {
    expect(
      new Pharmacy([new Drug("Fervex",5 , 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 48)]);
    expect(
      new Pharmacy([new Drug("Fervex",4 , 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 3, 48)]);
  })
  it('Fervex drops to 0 after the expiration date', () => {
    expect(
      new Pharmacy([new Drug("Fervex",0 , 45)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  })
  it('Dafalgan degrades in Benefit twice as fast as normal drugs', () => {
    expect(
      new Pharmacy([new Drug("Dafalgan",10 , 45)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 9, 43)]);
  })
});
