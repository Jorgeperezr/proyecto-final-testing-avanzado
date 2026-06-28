/**
 * Sistema de Metricas Avanzadas de Calidad
 *
 * Calcula y reporta cuatro metricas:
 *  1. Complejidad ciclomatica por funcion.
 *  2. Deteccion de pruebas inestables (flaky tests).
 *  3. Analisis de tiempo de ejecucion.
 *  4. Relacion entre cobertura y defectos detectados.
 */

const { execSync } = require("child_process");
const fs = require("fs");

// ---------- METRICA 1: Complejidad ciclomatica ----------
// Se calcula contando los puntos de decision del codigo fuente.
// Complejidad = 1 + (numero de: if, else if, while, for, &&, ||, case, ?)
function complejidadCiclomatica(rutaArchivo) {
  const codigo = fs.readFileSync(rutaArchivo, "utf8");
  const decisiones = (codigo.match(/\b(if|else if|while|for|case)\b|&&|\|\||\?/g) || []).length;
  return 1 + decisiones;
}

// ---------- METRICA 2: Deteccion de flaky tests ----------
// Ejecuta la suite N veces y detecta si algun resultado varia.
function detectarFlakyTests(corridas) {
  const resultados = [];
  for (let i = 0; i < corridas; i++) {
    try {
      execSync("npm test", { cwd: __dirname + "/..", stdio: "pipe" });
      resultados.push("PASS");
    } catch (e) {
      resultados.push("FAIL");
    }
  }
  const unicos = new Set(resultados);
  return {
    corridas,
    resultados,
    esFlaky: unicos.size > 1,
  };
}

// ---------- METRICA 3: Tiempo de ejecucion ----------
function tiempoEjecucion() {
  const inicio = Date.now();
  try {
    execSync("npm test", { cwd: __dirname + "/..", stdio: "pipe" });
  } catch (e) {
    // ignorar; solo medimos tiempo
  }
  return Date.now() - inicio;
}

// ---------- METRICA 4: Relacion cobertura-defectos ----------
// Usa el mutation score como proxy de cobertura efectiva y los
// mutantes sobrevivientes como defectos no detectados.
function relacionCoberturaDefectos(mutationScore, mutantesSobrevivientes, totalMutantes) {
  const defectosDetectados = totalMutantes - mutantesSobrevivientes;
  return {
    mutationScore: mutationScore + "%",
    defectosDetectados,
    defectosNoDetectados: mutantesSobrevivientes,
    ratio: (defectosDetectados / totalMutantes).toFixed(2),
  };
}

// ---------- EJECUCION Y REPORTE ----------
console.log("=".repeat(70));
console.log("SISTEMA DE METRICAS AVANZADAS DE CALIDAD");
console.log("=".repeat(70));

const cc = complejidadCiclomatica(__dirname + "/../src/binarySearch.js");
console.log("\n[METRICA 1] Complejidad ciclomatica de binarySearch.js: " + cc);
console.log("   Interpretacion: " + (cc <= 10 ? "Baja (codigo mantenible)" : "Alta (revisar)"));

console.log("\n[METRICA 3] Analisis de tiempo de ejecucion...");
const tiempo = tiempoEjecucion();
console.log("   Tiempo de ejecucion de la suite: " + tiempo + " ms");

console.log("\n[METRICA 2] Deteccion de flaky tests (3 corridas)...");
const flaky = detectarFlakyTests(3);
console.log("   Resultados: " + flaky.resultados.join(", "));
console.log("   Pruebas inestables (flaky): " + (flaky.esFlaky ? "SI detectadas" : "NO (suite estable)"));

console.log("\n[METRICA 4] Relacion cobertura-defectos (datos de Stryker)...");
const rel = relacionCoberturaDefectos(88.89, 3, 27);
console.log("   Mutation score (cobertura efectiva): " + rel.mutationScore);
console.log("   Defectos detectados: " + rel.defectosDetectados + " / 27");
console.log("   Defectos no detectados (mutantes vivos): " + rel.defectosNoDetectados);
console.log("   Ratio de deteccion: " + rel.ratio);

console.log("\n" + "=".repeat(70));
console.log("RESUMEN DE METRICAS");
console.log("=".repeat(70));
console.log("| Metrica                        | Valor                    |");
console.log("|--------------------------------|--------------------------|");
console.log("| 1. Complejidad ciclomatica     | " + String(cc).padEnd(24) + " |");
console.log("| 2. Flaky tests                 | " + (flaky.esFlaky ? "Detectados" : "Ninguno (estable)").padEnd(24) + " |");
console.log("| 3. Tiempo de ejecucion         | " + (tiempo + " ms").padEnd(24) + " |");
console.log("| 4. Ratio cobertura-defectos    | " + (rel.ratio + " (88.89%)").padEnd(24) + " |");
console.log("=".repeat(70));