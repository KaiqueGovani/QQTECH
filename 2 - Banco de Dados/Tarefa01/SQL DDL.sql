CREATE TABLE "public.Cliente" (
	"Id" serial NOT NULL,
	"Nome" varchar(255) NOT NULL,
	"Nascimento" DATE,
	"CPF" VARCHAR(11) NOT NULL UNIQUE,
	"Origem" VARCHAR(255) NOT NULL,
	"Score" integer,
	CONSTRAINT "Cliente_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Categoria" (
	"Id" serial NOT NULL,
	"Nome" varchar(255) NOT NULL,
	CONSTRAINT "Categoria_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Produto" (
	"Id" serial NOT NULL,
	"Nome" varchar(255) NOT NULL,
	"Valor" FLOAT NOT NULL,
	"Categoria" integer NOT NULL,
	CONSTRAINT "Produto_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Vendedor" (
	"Matricula" integer NOT NULL UNIQUE,
	"Nome" varchar(255) NOT NULL,
	CONSTRAINT "Vendedor_pk" PRIMARY KEY ("Matricula")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Pedido" (
	"Id" serial NOT NULL UNIQUE,
	"ClienteId" integer NOT NULL,
	"DataDeCriação" DATE NOT NULL,
	"VendedorId" integer NOT NULL,
	"ProdutoIds" integer NOT NULL,
	"ValorPedido" FLOAT NOT NULL,
	CONSTRAINT "Pedido_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fk0" FOREIGN KEY ("Categoria") REFERENCES "Categoria"("Id");


ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_fk0" FOREIGN KEY ("ClienteId") REFERENCES "Cliente"("Id");
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_fk1" FOREIGN KEY ("VendedorId") REFERENCES "Vendedor"("Matricula");
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_fk2" FOREIGN KEY ("ProdutoIds") REFERENCES "Produto"("Id");






