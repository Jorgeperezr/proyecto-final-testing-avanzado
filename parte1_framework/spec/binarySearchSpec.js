const { binarySearch } = require("../src/binarySearch");

describe("Búsqueda binaria - Pruebas funcionales", () => {
  const lista = [2, 5, 8, 12, 16, 23, 38, 45, 67, 99];

  it("encuentra un elemento existente en el arreglo", () => {
    expect(binarySearch(lista, 23)).toBe(5);
  });

  it("encuentra el primer elemento", () => {
    expect(binarySearch(lista, 2)).toBe(0);
  });

  it("encuentra el último elemento", () => {
    expect(binarySearch(lista, 99)).toBe(9);
  });

  it("retorna -1 cuando el elemento no existe", () => {
    expect(binarySearch(lista, 100)).toBe(-1);
  });

  it("lanza TypeError si el argumento no es un arreglo", () => {
    expect(() => binarySearch("no-es-arreglo", 5)).toThrowError(TypeError);
  });
});
