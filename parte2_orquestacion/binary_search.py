"""Algoritmo de busqueda binaria para el pipeline de testing."""


def binary_search(arr, target):
    """Busqueda binaria sobre lista ordenada. Retorna indice o -1."""
    if not isinstance(arr, list):
        raise TypeError("El primer argumento debe ser una lista.")
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1