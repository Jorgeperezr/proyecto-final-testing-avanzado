const { binarySearch } = require("../src/binarySearch");

/**
 * Contract testing: se verifica que binarySearch cumpla su contrato:
 * PRECONDICION: el primer argumento debe ser un arreglo.
 * POSTCONDICION 1: el retorno es un entero >= -1 y < length.
 * POSTCONDICION 2: si retorna un indice i, entonces arr[i] === target.
 * INVARIANTE: la funcion no modifica el arreglo de entrada.
 */
describe("Contract testing - cumplimiento del contrato de binarySearch", () => {
  const lista = [2, 5, 8, 12, 16, 23, 38, 45, 67, 99];

  // CONTRATO 1: precondicion + postcondicion de rango y coherencia del retorno
  describe("CONTRATO 1: precondiciones y postcondiciones del retorno", () => {
    it("precondicion: rechaza entradas que no son arreglo (TypeError)", () => {
      expect(() => binarySearch(null, 5)).toThrowError(TypeError);
      expect(() => binarySearch("abc", 5)).toThrowError(TypeError);
    });

    it("postcondicion: el retorno es un entero dentro del rango valido o -1", () => {
      const valores = [2, 50, 99, 1, 200];
      valores.forEach((target) => {
        const r = binarySearch(lista, target);
        expect(Number.isInteger(r)).toBe(true);
        expect(r).toBeGreaterThanOrEqual(-1);
        expect(r).toBeLessThan(lista.length);
      });
    });

    it("postcondicion: si retorna un indice, el valor en ese indice es el target", () => {
      const target = 38;
      const r = binarySearch(lista, target);
      if (r !== -1) {
        expect(lista[r]).toBe(target);
      }
    });
  });

  // CONTRATO 2: invariante de no modificacion del arreglo de entrada
  describe("CONTRATO 2: invariante de inmutabilidad de la entrada", () => {
    it("invariante: la funcion no modifica el arreglo de entrada", () => {
      const original = [2, 5, 8, 12, 16, 23, 38, 45, 67, 99];
      const copia = [...original];

      binarySearch(original, 23);
      binarySearch(original, 100);

      expect(original).toEqual(copia);
    });

    it("invariante: el resultado es determinista para la misma entrada", () => {
      const r1 = binarySearch(lista, 45);
      const r2 = binarySearch(lista, 45);
      expect(r1).toBe(r2);
    });
  });
});