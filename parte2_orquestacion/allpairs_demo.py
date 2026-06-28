"""Modulo auxiliar de pruebas combinatorias para el pipeline."""
from allpairspy import AllPairs


def generar():
    factores = [
        ["Chrome", "Firefox", "Safari"],
        ["Windows", "macOS", "Linux"],
        ["Admin", "Estandar"],
    ]
    casos = list(AllPairs(factores))
    return len(casos)