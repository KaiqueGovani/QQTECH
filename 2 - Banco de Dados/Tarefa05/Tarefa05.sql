/* 1) Selecionar o código do pedido, valor total dos pedidos que tem dois ou mais
produtos, ordenado pelo código do pedido de forma crescente. */

SELECT pp.pedido_id, SUM(pp.valor_produto) AS "Valor Total", COUNT(pp.produto_id)
FROM "pedido_produto" pp
JOIN pedido p 
ON pp.pedido_id = p.id
GROUP BY pp.pedido_id
HAVING COUNT(pp.produto_id) >= 2
ORDER BY pp.pedido_id ASC;

/* 2) Selecionar o código dos vendedores e quantidade de pedidos realizados, mas
apenas aqueles que tiveram mais de uma venda. Ordenar pela quantidade de
pedidos de forma decrescente e código do vendedor */

SELECT 
    vendedor_id, 
    COUNT(vendedor_id) AS "Quantidade de Pedidos"
FROM pedido
WHERE vendedor_id IS NOT NULL
GROUP BY vendedor_id
    HAVING 
        COUNT(vendedor_id) > 1
ORDER BY 
    "Quantidade de Pedidos" DESC, 
    vendedor_id ASC
;

/* 3) Selecionar o código dos pedidos, seu valor total, dos pedidos que o valor total
ultrapasse R$ 8000,00 e que tenha mais de três produto, ordenando pelo valor
total do maior pedido para o menor */

SELECT 
    pp.pedido_id, 
    SUM(pp.valor_produto), 
    Count(pp.produto_id)
FROM "pedido_produto" pp
JOIN pedido p 
    ON pp.pedido_id = p.id
GROUP BY pp.pedido_id
    HAVING 
        SUM(pp.valor_produto) > 8000 
        AND Count(pp.produto_id) > 3
ORDER BY 2 DESC;

/* 4) Selecionar o nome, cpf, score e medalha, a medalha é baseada no valor do
score, assim para medalha ouro o score deve ser acima de 80, prata entre 60 à
79 e bronze 0 a 59. Ordenar os clientes por medalha de bronze para ouro e
nome */

SELECT
    nome,
    cpf,
    score,
    CASE WHEN score > 80 THEN 'Ouro' WHEN score BETWEEN 60 AND 79 THEN 'Prata' ELSE 'Bronze' END AS "Medalha"
FROM cliente
ORDER BY
    CASE
        WHEN score > 80 THEN 1                  -- Se o score for maior que 80, aparece primeiro
        WHEN score >= 60 AND score <= 79 THEN 2 -- Se o score estiver entre 60 e 79, aparece em segundo
        ELSE 3                                  -- Se o score for menor que 60, aparece em terceiro
    END, nome
;


/* 5) Selecionar as possibilidades de compras de produtos para os clientes Francis
Borba e Isis Cirne Veleda. Deve constar nome do cliente, cpf, score, nome do
produto e valor. Ordenar por nome de cliente */

SELECT c.nome, c.cpf, c.score, p.nome AS Produto, p.valor AS Preco
FROM cliente c
CROSS JOIN produto p
WHERE c.nome in ('Francis Ruas Borba', 'Isis Cirne Veleda')
ORDER BY c.nome, 4;

/* 6) Selecionar o código do pedido, data dele, se teve vendedor (sim ou não) e
nome de seus produtos. Ordenar por código do pedido */

SELECT 
    pp.pedido_id,
    STRING_AGG(pr.nome, ', ' ORDER BY pr.nome ASC) AS "Nome do Produto",
    DATE(pe.data_de_criacao) AS "Data de Criação", 
    CASE WHEN pe.vendedor_id IS NULL THEN 'Não' ELSE 'Sim' END AS "Teve Vendedor"
FROM pedido_produto pp
JOIN pedido pe
ON pe.id = pp.pedido_id
JOIN produto pr
ON pr.id = pp.produto_id
GROUP BY pp.pedido_id, pe.data_de_criacao, pe.vendedor_id
ORDER BY pp.pedido_id;

/* 7) Selecionar o código dos pedidos, quantidade de produtos, dos pedidos
realizados em 2020 */

SELECT pp.pedido_id, COUNT(pp.produto_id) --, p.data_de_criacao para mostrar tb a data
FROM "pedido_produto" pp
JOIN pedido p 
ON pp.pedido_id = p.id
WHERE EXTRACT(YEAR FROM p.data_de_criacao) = 2020
GROUP BY pp.pedido_id, p.data_de_criacao
ORDER BY pp.pedido_id;

/* 8) Selecionar o nome, score e mês de aniversário dos clientes com score acima de
60 */

SELECT nome, score, nascimento FROM cliente WHERE score > 60;

/* 9) Selecionar a média dos pedidos realizados entre janeiro e maio de 2021  */

SELECT AVG(sum) AS Média FROM (SELECT SUM(pp.valor_produto)
FROM "pedido_produto" pp
JOIN pedido p 
ON pp.pedido_id = p.id
WHERE p.data_de_criacao BETWEEN '2021-01-01' AND '2021-05-31'
GROUP BY pp.pedido_id, p.data_de_criacao
ORDER BY p.data_de_criacao DESC) AS average;