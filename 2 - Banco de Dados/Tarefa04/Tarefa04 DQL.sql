-- 1)  Selecionar a quantidade de clientes cadastrados,
-- data de nascimento do cliente mais novo e mais velho

SELECT COUNT(*) AS "Quantidade de Clientes" FROM cliente;

SELECT MAX(nascimento) AS "Cliente Mais Novo" FROM cliente;

SELECT MIN(nascimento) AS "Cliente Mais Velho" FROM cliente;

-- 2) Selecionar o código do produto, menor valor, maior valor, 
-- média dos valores e valor total de cada produto vendido.
-- Ordenar do menor para o maior código de produto 

SELECT id FROM produto ORDER BY id ASC;

SELECT MIN(valor), MAX(valor), AVG(valor), SUM(valor) FROM produto;

-- 3) Selecionar o código dos pedidos e o total de cada 
-- ordenando do pedido mais recente para o mais antigo 

SELECT pp.pedido_id, SUM(pp.valor_produto), p.data_de_criacao
FROM "pedido_produto" pp
JOIN pedido p 
ON pp.pedido_id = p.id
GROUP BY pp.pedido_id, p.data_de_criacao
ORDER BY p.data_de_criacao DESC

-- 4)  Selecionar o código dos clientes e quantidade de pedidos, 
-- ordenando pela quantidade de pedidos da maior para menor 

SELECT cliente_id AS "ID do Cliente", Count(*) AS "Quantidade de Pedidos"
FROM pedido
GROUP BY "cliente_id"
ORDER BY COUNT(*) DESC;
