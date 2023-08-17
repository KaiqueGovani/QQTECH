def CalcularBonus(salario: float, meses: int) -> float:
    # salario *= meses/9 -> Seria exatamente a mesma conta, porém simplificada

    salario *= meses
    salario /= 12
    salario += salario/3

    return salario

def ValidaMeses(meses: int) -> bool:
    return meses >= 12


_salario : float
_meses : int

_salario = float(input("Digite o salário: "))
_meses = int(input("Digite os meses trabalhados: "))
    
if ValidaMeses(_meses):
    print(f"O bônus de férias é: R$ {CalcularBonus(_salario, _meses):.2f}")
else:
    print("O funcionário deve ter ao menos 12 meses de trabalho para receber bônus de férias!")
