const fc = require("fast-check");
const { binarySearch } = require("../src/binarySearch");

describe("Property-based testing con fast-check", () => {

  // Propiedad 1: si un elemento esta en el arreglo ordenado,
  // binarySearch debe encontrarlo en la posicion correcta.
  it("PROPIEDAD 1: encuentra cualquier elemento que existe en el arreglo", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), { minLength: 1 }),
        (arr) => {
          const ordenado = [...new Set(arr)].sort((a, b) => a - b);
          const indiceObjetivo = Math.floor(Math.random() * ordenado.length);
          const target = ordenado[indiceObjetivo];

          const resultado = binarySearch(ordenado, target);
          return ordenado[resultado] === target;
        }
      )
    );
  });

  // Propiedad 2: para cualquier arreglo ordenado y cualquier target,
  // el resultado es -1 o un indice valido cuyo valor coincide.
  it("PROPIEDAD 2: el resultado siempre es -1 o un indice valido", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(),
        (arr, target) => {
          const ordenado = [...new Set(arr)].sort((a, b) => a - b);
          const resultado = binarySearch(ordenado, target);

          if (resultado === -1) {
            return !ordenado.includes(target);
          }
          return ordenado[resultado] === target;
        }
      )
    );
  });
});