#!/usr/bin/env python
# coding: utf-8

# ## BANCO DE DADOS

# In[8]:


# Informações do banco
host = "172.22.0.99"
port = 5332
db = "risco"
user = "u_bots_risco"
passwd = "PDLbIF513Jt5"


# #### CONECTAR 

# In[9]:


import psycopg2

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    print('Conexão estabelecida')
    # Aqui roda o código com a conexão aberta


# #### QUERY PARA DATAFRAME

# In[14]:


import pandas as pd

query = '''SELECT *
        from db_risco.treinamento_qqtech
        LIMIT 10'''

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    df = pd.read_sql(query, conn)


# #### INSERT

# In[16]:


cmd = '''INSERT INTO db_risco.treinamento_qqtech
        ("desc", "preco") VALUES (%s, %s)'''
values = ("TURMA QQTECH 5", 123123)

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    with conn.cursor() as cursor:
        cursor.execute(cmd, values)


# #### VERIFICAR SE EXISTE NO BANCO

# In[22]:



query = '''SELECT * from db_risco.treinamento_qqtech
            WHERE "desc" = 'TURMA QQTECH 5'
            AND "preco" = 123123'''

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    df = pd.read_sql(query, conn)
    
if len(df) > 0:
    print("Existe no banco")
else:
    print("Não existe no banco")


# In[23]:



query = '''SELECT * from db_risco.treinamento_qqtech
        WHERE "desc" = 'BANANA'
        AND "preco" = 1'''

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    df = pd.read_sql(query, conn)
    
if len(df) > 0:
    print("Existe no banco")
else:
    print("Não existe no banco")


# #### UPDATE 

# In[25]:



cmd_update = '''UPDATE db_risco.treinamento_qqtech SET "desc" = %s WHERE "desc" = %s '''
values = ('MELHOR TURMA QQTECH', 'TURMA QQTECH 5')

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    with conn.cursor() as cursor:
        cursor.execute(cmd_update, values)
        



# In[26]:



query = '''SELECT * from db_risco.treinamento_qqtech WHERE "desc" = 'MELHOR TURMA QQTECH' '''

with psycopg2.connect(
    host = host,
    dbname = db,
    port = port,
    user = user,
    password = passwd
    ) as conn:
    
    df = pd.read_sql(query, conn)
    
if len(df) > 0:
    print("Existe no banco")
else:
    print("Não existe no banco")


# #LEMBRAR DE COLOCAR A TABELA NO BANCO QQ TECH
# 
# 1) Crie uma conexão com o banco QQ TECH.
# 
# 2) Com a conexão criada, selecione na tabela tabela_treinamento do banco:
# 
# a) As linhas que correspondem a pessoas de São Paulo
# 
# b) As linhas que correspondem a pessoas com idade entre 22 e 27 anos
# 
# c) As cidades das pessoas com o nome Maria
# 
# 3) Insira na tabela 2 novas linhas com dados ficticios

# In[ ]:




