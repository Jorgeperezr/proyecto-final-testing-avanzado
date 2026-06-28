"""
Modelo Predictivo de Confiabilidad

Predice la cantidad esperada de defectos de un modulo a partir de su
complejidad ciclomatica, mediante regresion lineal. A diferencia del
modelo basado en el historico de ejecuciones, este usa una metrica de
complejidad como variable predictora.
"""

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

def entrenar_modelo(complejidades, defectos):
    """Entrena una regresion lineal: complejidad -> defectos."""
    X = np.array(complejidades).reshape(-1, 1)
    y = np.array(defectos)

    modelo = LinearRegression()
    modelo.fit(X, y)

    predicciones = modelo.predict(X)
    r2 = r2_score(y, predicciones)

    return modelo, round(r2, 3)

def predecir(modelo, complejidad_nueva):
    """Predice los defectos esperados para una complejidad dada."""
    pred = modelo.predict(np.array([[complejidad_nueva]]))[0]
    return round(max(pred, 0), 1)

if __name__ == "__main__":
    print("=" * 68)
    print("MODELO PREDICTIVO PERSONALIZADO DE CONFIABILIDAD")
    print("Variable predictora: complejidad ciclomatica")
    print("=" * 68)

    # Datos historicos: modulos con su complejidad y defectos hallados
    modulos = ["Login", "Pagos", "Reportes", "Busqueda", "Carrito", "Perfil"]
    complejidades = [3, 12, 7, 5, 15, 4]
    defectos = [1, 9, 4, 2, 12, 2]

    print("\nDatos historicos de entrenamiento:")
    print("-" * 68)
    print(f"{'Modulo':<12}{'Complejidad':<14}{'Defectos hallados':<18}")
    print("-" * 68)
    for m, c, d in zip(modulos, complejidades, defectos):
        print(f"{m:<12}{c:<14}{d:<18}")

    # Entrenamiento
    modelo, r2 = entrenar_modelo(complejidades, defectos)
    pendiente = round(modelo.coef_[0], 3)
    intercepto = round(modelo.intercept_, 3)

    print("\n" + "=" * 68)
    print("MODELO ENTRENADO")
    print("=" * 68)
    print(f"Ecuacion: defectos_esperados = {pendiente} * complejidad + {intercepto}")
    print(f"Coeficiente de determinacion (R2): {r2}")
    print(f"Interpretacion R2: el modelo explica el {round(r2*100,1)}% de la "
          f"variabilidad de los defectos.")

    # Prediccion para modulos nuevos
    print("\n" + "=" * 68)
    print("PREDICCION PARA MODULOS NUEVOS")
    print("=" * 68)
    nuevos = [("Checkout", 10), ("Notificaciones", 6), ("Dashboard", 18)]
    print(f"{'Modulo nuevo':<16}{'Complejidad':<14}{'Defectos predichos':<20}")
    print("-" * 68)
    for nombre, comp in nuevos:
        pred = predecir(modelo, comp)
        riesgo = "ALTO" if pred >= 8 else "MEDIO" if pred >= 4 else "BAJO"
        print(f"{nombre:<16}{comp:<14}{str(pred):<8}(riesgo {riesgo})")

    print("\n" + "=" * 68)
    print("Nota de confiabilidad: el modelo permite anticipar los modulos")
    print("mas propensos a fallos antes de probarlos, priorizando el esfuerzo")
    print("de testing en aquellos de mayor complejidad y, por tanto, de menor")
    print("confiabilidad esperada.")
    print("=" * 68)