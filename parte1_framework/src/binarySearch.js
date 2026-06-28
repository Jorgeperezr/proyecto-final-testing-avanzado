/**
 * Evaluación en Contacto con el Docente - Testing Avanzado
 * UIDE - Diseño de Pruebas, Control de Calidad y Mantenimiento
 * Búsqueda binaria iterativa sobre un arreglo ordenado ascendentemente.
 */

function binarySearch(arr, target) {
  if (!Array.isArray(arr)) {
    throw new TypeError("El primer argumento debe ser un arreglo.");
  }

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

module.exports = { binarySearch };