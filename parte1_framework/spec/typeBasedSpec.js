const { binarySearch } = require("../src/binarySearch");

describe("Pruebas basadas en tipos - generadas con asistencia de IA", () => {

  describe("Tipo: arreglo de enteros", () => {
    it("retorna un number cuando el target existe", () => {
      const resultado = binarySearch([1, 3, 5, 7, 9], 7);
      expect(typeof resultado).toBe("number");
      expect(resultado).toBe(3);
    });

    it("retorna -1 (number) cuando el target no existe", () => {
      const resultado = binarySearch([1, 3, 5, 7, 9], 4);
      expect(typeof resultado).toBe("number");
      expect(resultado).toBe(-1);
    });
  });

  describe("Tipo: arreglo vacio y de un elemento", () => {
    it("retorna -1 con arreglo vacio", () => {
      expect(binarySearch([], 5)).toBe(-1);
    });

    it("encuentra el unico elemento de un arreglo unitario", () => {
      expect(binarySearch([42], 42)).toBe(0);
    });
  });

  describe("Tipo: el retorno siempre es number", () => {
    it("garantiza tipo number en busqueda exitosa y fallida", () => {
      expect(typeof binarySearch([1, 2, 3], 2)).toBe("number");
      expect(typeof binarySearch([1, 2, 3], 99)).toBe("number");
    });
  });

  describe("Tipo: entradas invalidas lanzan TypeError", () => {
    it("lanza TypeError con un string", () => {
      expect(() => binarySearch("texto", 1)).toThrowError(TypeError);
    });

    it("lanza TypeError con null", () => {
      expect(() => binarySearch(null, 1)).toThrowError(TypeError);
    });

    it("lanza TypeError con un number", () => {
      expect(() => binarySearch(123, 1)).toThrowError(TypeError);
    });

    it("lanza TypeError con un objeto", () => {
      expect(() => binarySearch({ a: 1 }, 1)).toThrowError(TypeError);
    });
  });
});