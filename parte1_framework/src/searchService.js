const { binarySearch } = require("./binarySearch");

class SearchService {
  constructor(logger) {
    this.logger = logger;
  }

  buscar(arr, target) {
    const indice = binarySearch(arr, target);

    if (indice === -1) {
      this.logger.registrar("Elemento " + target + " no encontrado.");
    } else {
      this.logger.registrar("Elemento " + target + " encontrado en indice " + indice + ".");
    }

    return indice;
  }
}

module.exports = { SearchService };