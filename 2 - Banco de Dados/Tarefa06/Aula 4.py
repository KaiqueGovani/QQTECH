#!/usr/bin/env python
# coding: utf-8

# ## PANDAS

# In[1]:


import pandas as pd
import numpy as np

pd.options.display.max_columns = 99999

# #### CARREGAR BASE CSV

# In[43]:

caminho_base = r'Z:\20_TREINAMENTO_PYTHON\QQTech\notebooks'

df = pd.read_csv(caminho_base+'\\base_vendas.csv',
                 sep=';', #SEPARADOR, normalmente é ; mas pode ser qualquer coisa (/t = tab)
                 decimal=',', # decimal = separador de decimais
                 encoding='latin-1') #idioma de codificação (comuns = 'latin-1','utf-8')

# #### CARREGAR APENAS COLUNAS ESPECIFICAS

# In[9]:


df = pd.read_csv('base_vendas.csv',
                 sep=';', #SEPARADOR, normalmente é ; mas pode ser qualquer coisa (/t = tab)
                 decimal=',', # decimal = separador de decimais
                 encoding='latin-1', #idioma de codificação (comuns = 'latin-1','utf-8')
                 usecols=['classe','valor_unitario'], # Colunas a serem carregadas
                ) 


# #### CARREGAR APENAS ALGUMAS LINHAS

# In[10]:


df = pd.read_csv('base_vendas.csv',
                 sep=';', #SEPARADOR, normalmente é ; mas pode ser qualquer coisa (/t = tab)
                 decimal=',', # decimal = separador de decimais
                 encoding='latin-1', #idioma de codificação (comuns = 'latin-1','utf-8')
                 nrows= 100 # Nº de linhas a serem carregadas
                ) 


# #### MOSTRAR PRIMEIRAS LINHAS

# In[6]:


df.head()
# Ou especificando o número de linhas
df.head(10)


# #### MOSTRAR PRIMEIRAS LINHAS

# In[8]:


df.tail()
# Ou especificando o número de linhas
df.tail(10)


# #### AGRUPANDO COLUNAS


df_agg = df.groupby('classe').agg({'qtde_vendida':'sum',
                                    'valor_unitario':'sum',
                                    'sku':'nunique'}).reset_index()


# #### ORDENANDO DADOS

df_agg = df_agg.sort_values(by=['sku','qtde_vendida'],ascending=False).reset_index(drop=True)



df_agg.loc[6]

# #### SELECIONAR COLUNAS

# In[11]:


df['classe']


# In[12]:


df1 = df[['classe', 'qtde_vendida']]


# #### SELECIONANDO LINHAS

# In[13]:


df.loc[0]


# In[16]:


df.loc[100]


# In[23]:


df.loc[10:15]


# In[18]:


df.loc[500:]


# In[21]:


df.loc[5]['sku']


# In[22]:


df['sku'].loc[5]


# #### INFORMAÇÕES DA BASE

# In[24]:


df.info()


# In[35]:


df.describe()


# In[25]:


df.shape


# In[26]:


df.count()


# In[27]:


df.nunique()


# In[29]:


df['classe'].nunique()


# In[30]:


df['classe'].unique()


# In[31]:


df['valor_unitario'].max()


# In[32]:


df['valor_unitario'].min()


# In[33]:


df['valor_unitario'].mean()


# #### CRIAR COLUNAS

# In[36]:


df['NOVA_COL'] = 5


# #### OPERAÇÕES COM COLUNAS

# In[38]:


df['qtde_vendida'] * df['valor_unitario']

df['receita'] = df['qtde_vendida'] * df['valor_unitario']

df = df.drop(['receita'],1)


# In[39]:


df['qtde_vendida'] - df['valor_unitario']


# In[40]:


df['qtde_vendida'] + df['valor_unitario']


# In[41]:


df['qtde_vendida'] / df['valor_unitario']


# #### FILTRAR A BASE

# In[44]:


df['classe'] == "moveis"


# In[45]:


df_moveis = df[df['classe'] == "moveis"]


# In[49]:


df[df['qtde_vendida'] > 6000]


# In[50]:


df[(df['qtde_vendida'] > 6000) & (df['valor_unitario'] > 1000)]



df['top_skus'] = np.where(df['qtde_vendida']>3000,1,0)

df[df['top_skus']==1]


# In[51]:


df_desc = pd.read_csv('base_descricao.csv',
                         sep=';', 
                         decimal=',',
                         encoding='latin-1'
                        ) 


df_left = pd.merge(df,df_desc,how='left',on='sku')

df_right = pd.merge(df,df_desc,how='right',on='sku')

df_inner = pd.merge(df,df_desc,how='inner',on='sku')




# In[53]:






# Exercícios propostos:
# 
# 1) Crie um dataframe conforme a seguinte tabela:
# 
# |produto|preco|
# |-------|-----|
# |cadeira| 50  |
# | mesa  | 200 |
# |torneira|15|
# |cama| 800|
# |abajur|90|
# |porta|450|
# 
# 2) Com o dataframe criado, ordene-o em ordem decrescente de preço.
# 
# 3) Adicione ao dataframe o produto "tapete" que tem valor 250.
# 
# 4) Filtre o dataframe para mostrar os produtos com preço menor que 100.
# 
# 5) Salve o dataframe original em um arquivo csv
# 
# 6) Use o pd.read_csv para ler o dataframe salvo anteriormente e adicione a esse dataframe uma coluna "vendas" que representa a quantidade vendida (inicialmente nenhum produto vendido, então o valor será 0 para todas as linhas).
# 
# 7) Crie o seguinte dataframe:
# 
# |produto|qtd_vendida|
# |-------|-----|
# |cadeira| 5  |
# | mesa  | 12 |
# |torneira|65|
# |cama| 51|
# |abajur|12|
# |porta|9|
# 
# E faça um merge com o dataframe do exercício 1 para obter o dataframe a seguir:
# 
# |produto| preco |qtd_vendida|
# |-------| ------|-----|
# |cadeira|    50  |5  |
# | mesa  |200 |12 |
# |torneira|15|65|
# |cama| 800|51|
# |abajur|90|12|
# |porta|450|9|
# 
# 8) Crie uma coluna no dataframe do exercício anterior que indique a receita total do produto, após isso, calcule a receita total de todos os produtos e crie uma nova coluna indicando qual a porcentagem de cada produto na receita total.
