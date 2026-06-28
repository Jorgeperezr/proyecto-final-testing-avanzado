const { SearchService } = require("../src/searchService");

describe("SearchService - Mocking avanzado con spies de Jasmine", () => {
  const lista = [2, 5, 8, 12, 16, 23, 38, 45, 67, 99];
  let loggerMock;
  let servicio;

  beforeEach(() => {
    loggerMock = jasmine.createSpyObj("Logger", ["registrar"]);
    servicio = new SearchService(loggerMock);
  });

  it("llama al logger exactamente una vez por busqueda", () => {
    servicio.buscar(lista, 23);
    expect(loggerMock.registrar).toHaveBeenCalledTimes(1);
  });

  it("registra el mensaje correcto cuando encuentra el elemento", () => {
    servicio.buscar(lista, 16);
    expect(loggerMock.registrar).toHaveBeenCalledWith(
      "Elemento 16 encontrado en indice 4."
    );
  });

  it("registra el mensaje correcto cuando NO encuentra el elemento", () => {
    servicio.buscar(lista, 100);
    expect(loggerMock.registrar).toHaveBeenCalledWith(
      "Elemento 100 no encontrado."
    );
  });

  it("usa un spy personalizado con comportamiento simulado (callFake)", () => {
    const registros = [];
    loggerMock.registrar.and.callFake((mensaje) => {
      registros.push(mensaje.toUpperCase());
    });

    servicio.buscar(lista, 45);

    expect(registros.length).toBe(1);
    expect(registros[0]).toBe("ELEMENTO 45 ENCONTRADO EN INDICE 7.");
  });

  it("verifica que el spy NO fue llamado antes de ejecutar la busqueda", () => {
    expect(loggerMock.registrar).not.toHaveBeenCalled();
    servicio.buscar(lista, 8);
    expect(loggerMock.registrar).toHaveBeenCalled();
  });
});