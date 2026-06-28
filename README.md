# Evaluación en Contacto con el Docente - Técnicas Avanzadas de Testing de Software

UIDE - Sistemas de la Información
Asignatura: Diseño de Pruebas, Control de Calidad y Mantenimiento
Estudiante: Jorge Pérez Rodríguez

## Descripción

Este proyecto integra y expande técnicas avanzadas de testing de software en un desarrollo unificado. Combina un framework híbrido sobre Jasmine (JavaScript) con integración continua, mocking y generación de pruebas asistida por IA; la ampliación del algoritmo de búsqueda binaria con property-based, contract y mutation testing; la orquestación de pruebas combinatorias y un pipeline de testing en Python; y un estudio comparativo con un modelo predictivo de confiabilidad. El proyecto está desarrollado y probado en un entorno GitHub Codespaces con Node.js y Python 3.12.

## Estructura del proyecto

- `parte1_framework/` — Framework híbrido en JavaScript con Jasmine: búsqueda binaria, mocking, generación con IA, property-based, contract y mutation testing, y métricas de calidad.
- `parte2_orquestacion/` — Orquestación de pruebas combinatorias y pipeline de testing integral en Python.
- `parte3_modelo/` — Modelo predictivo de confiabilidad basado en complejidad ciclomática.
- `.github/workflows/` — Workflow de integración continua con GitHub Actions.
- `requirements.txt` — Dependencias de Python.

## Instalación

### Parte 1 (JavaScript)

```
cd parte1_framework
npm install
```

### Partes 2 y 3 (Python)

Crear el entorno virtual e instalar las dependencias:

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Ejecución

### Parte 1 — Framework híbrido con Jasmine

Ejecutar toda la suite de pruebas (funcionales, mocking, generadas con IA, property-based y contract):

```
cd parte1_framework
npm test
```

Mutation testing con Stryker:

```
npx stryker run
```

Sistema de métricas de calidad:

```
node metrics/qualityMetrics.js
```

La integración continua se ejecuta automáticamente en cada push mediante GitHub Actions (ver pestaña Actions del repositorio).

### Parte 2 — Orquestación y pipeline

Sistema de orquestación de pruebas combinatorias (generación, priorización por riesgo y predicción):

```
python parte2_orquestacion/orquestador.py
```

Pipeline de testing integral (análisis estático, pruebas, cobertura, combinatorias y modelo predictivo):

```
python parte2_orquestacion/pipeline.py
```

### Parte 3 — Modelo predictivo

Modelo de confiabilidad basado en complejidad ciclomática:

```
python parte3_modelo/modelo_predictivo.py
```

## Herramientas utilizadas

- jasmine — framework de pruebas en JavaScript.
- fast-check — property-based testing.
- @stryker-mutator — mutation testing.
- GitHub Actions — integración continua.
- allpairspy — generación de casos combinatorios (pairwise).
- scikit-learn y numpy — modelos de regresión lineal.
- pytest y pytest-cov — pruebas unitarias y cobertura.
- pylint — análisis estático del código.
