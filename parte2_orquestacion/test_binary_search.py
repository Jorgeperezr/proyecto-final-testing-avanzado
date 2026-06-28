"""Pruebas unitarias para el pipeline."""
import pytest
from binary_search import binary_search

LISTA = [2, 5, 8, 12, 16, 23, 38, 45, 67, 99]


def test_encuentra_elemento():
    assert binary_search(LISTA, 23) == 5


def test_no_encuentra():
    assert binary_search(LISTA, 100) == -1


def test_lista_vacia():
    assert binary_search([], 5) == -1


def test_entrada_invalida():
    with pytest.raises(TypeError):
        binary_search("no-es-lista", 5)