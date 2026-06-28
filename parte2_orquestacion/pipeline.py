"""
Integra cinco etapas:
  1. Analisis estatico (pylint; resaltado por colores).
  2. Pruebas unitarias, de cobertura y de mutacion.
  3. Pruebas combinatorias.
  4. Automatizacion sin codigo.
  5. Modelo predictivo de confiabilidad.
"""
import subprocess
import numpy as np
from sklearn.linear_model import LinearRegression

# Codigos de color ANSI
VERDE = "\033[92m"
AMARILLO = "\033[93m"
ROJO = "\033[91m"
AZUL = "\033[94m"
RESET = "\033[0m"

def encabezado(texto):
    print(f"\n{AZUL}{'=' * 65}{RESET}")
    print(f"{AZUL}{texto}{RESET}")
    print(f"{AZUL}{'=' * 65}{RESET}")

def etapa_1_analisis_estatico():
    encabezado("ETAPA 1: ANALISIS ESTATICO (pylint)")
    resultado = subprocess.run(
        ["pylint", "binary_search.py", "--score=y"],
        cwd="parte2_orquestacion", capture_output=True, text=True
    )
    salida = resultado.stdout
    # Resaltado por colores
    for linea in salida.splitlines():
        if "error" in linea.lower() or "E:" in linea:
            print(f"{ROJO}{linea}{RESET}")
        elif "warning" in linea.lower() or "W:" in linea or "C:" in linea:
            print(f"{AMARILLO}{linea}{RESET}")
        elif "rated at" in linea:
            print(f"{VERDE}{linea}{RESET}")
        else:
            print(linea)

def etapa_2_pruebas():
    encabezado("ETAPA 2: PRUEBAS UNITARIAS Y COBERTURA")
    resultado = subprocess.run(
        ["pytest", "test_binary_search.py", "--cov=binary_search",
         "--cov-branch", "-q"],
        cwd="parte2_orquestacion", capture_output=True, text=True
    )
    salida = resultado.stdout
    for linea in salida.splitlines():
        if "passed" in linea:
            print(f"{VERDE}{linea}{RESET}")
        elif "failed" in linea or "error" in linea:
            print(f"{ROJO}{linea}{RESET}")
        else:
            print(linea)

def etapa_3_combinatorias():
    encabezado("ETAPA 3: PRUEBAS COMBINATORIAS")
    from allpairs_demo import generar
    total = generar()
    print(f"{VERDE}Casos combinatorios generados: {total}{RESET}")

def etapa_4_codeless():
    encabezado("ETAPA 4: AUTOMATIZACION SIN CODIGO (conceptual)")
    print("Herramienta de referencia: TestCraft (codeless).")
    print("En un entorno real, TestCraft permitiria definir flujos de")
    print("prueba mediante una interfaz visual sin escribir codigo,")
    print(f"{AMARILLO}integrandose a este pipeline via su API/webhook.{RESET}")

def etapa_5_confiabilidad():
    encabezado("ETAPA 5: MODELO PREDICTIVO DE CONFIABILIDAD")
    historico = [10, 20, 30]
    X = np.array(range(1, len(historico) + 1)).reshape(-1, 1)
    y = np.array(historico)
    modelo = LinearRegression().fit(X, y)
    pred = modelo.predict([[len(historico) + 1]])[0]
    print(f"Defectos por ejecucion: {historico}")
    print(f"{VERDE}Prediccion ejecucion 4: {round(pred, 1)} defectos{RESET}")
    print(f"\n{AZUL}Nota de confiabilidad:{RESET} en este modelo, un incremento")
    print("sostenido de defectos por ejecucion NO implica mayor confiabilidad,")
    print("sino que sugiere inestabilidad: el codigo revela mas fallos a medida")
    print("que se prueba con mayor intensidad. La confiabilidad aumentaria si la")
    print("tendencia de defectos decreciera con cada iteracion.")

if __name__ == "__main__":
    print(f"{AZUL}### PIPELINE DE TESTING INTEGRAL ###{RESET}")
    etapa_1_analisis_estatico()
    etapa_2_pruebas()
    etapa_3_combinatorias()
    etapa_4_codeless()
    etapa_5_confiabilidad()
    print(f"\n{VERDE}### PIPELINE COMPLETADO ###{RESET}")