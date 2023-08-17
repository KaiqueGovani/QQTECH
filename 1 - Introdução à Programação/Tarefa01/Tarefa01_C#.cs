using System;
using System.IO;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        CalcuarFerias(scanf("Digite o salário: "), scanf("Digite os meses trabalhados: "));
    }
    
    void CalcularFerias(decimal salario, int meses_trabalhados)
    {
        salario = (salario * meses_trabalhados)/12 // Média do salário pelos meses do ano
        salario += salario/3
        
        return salario
    }
}