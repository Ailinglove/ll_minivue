import { readonly, isReactive, isReadonly, } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);

    // expect(isProxy(wrapped)).toBe(true);
    expect(isReactive(wrapped)).toBe(false);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReactive(original)).toBe(false);
    expect(isReadonly(original)).toBe(false);
    // expect(isReactive(wrapped.bar)).toBe(false);
    // expect(isReadonly(wrapped.bar)).toBe(true);
    // expect(isReactive(original.bar)).toBe(false);
    // expect(isReadonly(original.bar)).toBe(false);
    // get
    expect(wrapped.foo).toBe(1);
  });

  it('warn', ()=>{
    console.warn = jest.fn();
    const user = readonly({
      age: 10,
    });

    user.age = 11;
    expect(console.warn).toHaveBeenCalled();

  })
});
