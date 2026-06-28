"""
Sistema de Orquestacion de Pruebas Combinatorias
Proyecto Final - Testing Avanzado - UIDE

Cumple tres funciones:
  1. Genera casos de prueba combinatorios automaticamente (pairwise).
  2. Prioriza los casos segun nivel de riesgo (alto/medio/bajo).
  3. Aprende de ejecuciones previas con un modelo de regresion lineal.
"""

import numpy as np
from allpairspy import AllPairs
from sklearn.linear_model import LinearRegression


# ============================================================
# 1. GENERACION AUTOMATICA DE CASOS COMBINATORIOS (PAIRWISE)
# ============================================================
def generar_casos_combinatorios():
    """Genera casos de prueba pairwise para un sistema de autenticacion."""
    factores = {
        "Navegador": ["Chrome", "Firefox", "Safari", "Edge"],
        "SO": ["Windows", "macOS", "Linux"],
        "TipoUsuario": ["Admin", "Estandar", "Invitado"],
        "Conexion": ["WiFi", "Datos", "Ethernet"],
        "Autenticacion": ["Password", "MFA", "Biometrica"],
    }
    nombres = list(factores.keys())
    valores = list(factores.values())

    casos = []
    for i, combinacion in enumerate(AllPairs(valores), start=1):
        caso = dict(zip(nombres, combinacion))
        caso["id"] = f"TC-{i:02d}"
        casos.append(caso)
    return casos


# ============================================================
# 2. PRIORIZACION POR NIVEL DE RIESGO
# ============================================================
def priorizar_por_riesgo(caso):
    """
    Asigna un nivel de riesgo segun criterios de seguridad.
    Criterio: combinaciones con Admin, Biometrica/MFA o conexiones
    no seguras representan mayor superficie de riesgo.
    """
    puntaje = 0
    if caso["TipoUsuario"] == "Admin":
        puntaje += 3
    elif caso["TipoUsuario"] == "Estandar":
        puntaje += 1

    if caso["Autenticacion"] == "Biometrica":
        puntaje += 3
    elif caso["Autenticacion"] == "MFA":
        puntaje += 2

    if caso["Conexion"] == "Datos":
        puntaje += 2

    if puntaje >= 6:
        return "ALTO"
    if puntaje >= 3:
        return "MEDIO"
    return "BAJO"


# ============================================================
# 3. APRENDIZAJE DE EJECUCIONES PREVIAS (REGRESION LINEAL)
# ============================================================
def predecir_defectos(historico):
    """
    Aprende de ejecuciones previas para predecir la siguiente.
    Ejemplo: si en la ejecucion 1 se hallaron 10 defectos, en la 2
    veinte y en la 3 treinta, el modelo infiere ~40 para la 4.
    """
    X = np.array(range(1, len(historico) + 1)).reshape(-1, 1)
    y = np.array(historico)

    modelo = LinearRegression()
    modelo.fit(X, y)

    siguiente = np.array([[len(historico) + 1]])
    prediccion = modelo.predict(siguiente)[0]
    return round(prediccion, 1), round(modelo.coef_[0], 2), round(modelo.intercept_, 2)


# ============================================================
# EJECUCION Y REPORTE
# ============================================================
if __name__ == "__main__":
    print("=" * 70)
    print("ORQUESTACION DE PRUEBAS COMBINATORIAS")
    print("=" * 70)

    # 1. Generacion
    casos = generar_casos_combinatorios()
    print(f"\n[1] Casos combinatorios generados (pairwise): {len(casos)}")

    # 2. Priorizacion
    for c in casos:
        c["riesgo"] = priorizar_por_riesgo(c)

    orden = {"ALTO": 0, "MEDIO": 1, "BAJO": 2}
    casos_ordenados = sorted(casos, key=lambda c: orden[c["riesgo"]])

    conteo = {"ALTO": 0, "MEDIO": 0, "BAJO": 0}
    for c in casos:
        conteo[c["riesgo"]] += 1

    print(f"\n[2] Priorizacion por riesgo:")
    print(f"    ALTO: {conteo['ALTO']} | MEDIO: {conteo['MEDIO']} | BAJO: {conteo['BAJO']}")
    print("\n    Casos de mayor prioridad (primeros 5):")
    print("    " + "-" * 60)
    for c in casos_ordenados[:5]:
        print(f"    {c['id']} [{c['riesgo']:5}] {c['Navegador']:8} {c['SO']:8} "
              f"{c['TipoUsuario']:9} {c['Autenticacion']}")

    # 3. Prediccion
    historico = [10, 20, 30]
    pred, pendiente, intercepto = predecir_defectos(historico)
    print(f"\n[3] Aprendizaje de ejecuciones previas (regresion lineal):")
    print(f"    Historico de defectos por ejecucion: {historico}")
    print(f"    Modelo: defectos = {pendiente} * ejecucion + {intercepto}")
    print(f"    Prediccion para la ejecucion 4: {pred} defectos")

    print("\n" + "=" * 70)