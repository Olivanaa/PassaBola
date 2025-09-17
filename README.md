# Plataforma FutFem

A **Plataforma FutFem** é uma aplicação web interativa e inclusiva, focada em meninas e mulheres de todas as regiões do Brasil, que integra um mapa geolocalizado de oportunidades de prática de futebol feminino. O objetivo é reduzir barreiras geográficas e sociais, aumentando a visibilidade e o acesso a treinamentos, eventos e clubes, além de criar uma base de dados estratégica para descoberta e desenvolvimento de talentos.

O diferencial da plataforma está na **centralização, democratização e transparência das informações**, incentivando o protagonismo local e promovendo a diversidade no esporte.

Além disso, a solução busca automatizar os Encontros PassaBola, centralizando a gestão de inscrições, vagas e documentos, e facilitando o acompanhamento e organização de campeonatos e eventos. Dessa forma, reduz processos manuais e burocráticos, tornando mais eficiente a operação tanto para as usuárias quanto para organizadoras e gestores de projetos.



## 🎯 Visão Geral

A Plataforma FutFem conecta meninas e mulheres ao futebol em todo o Brasil, democratizando o acesso ao esporte e centralizando informações sobre treinos, campeonatos e oportunidades em um só lugar.



## ✨ Funcionalidades

- **Mapa Interativo:** Visualize oportunidades de treinos e eventos próximos a você  
- **Filtros Avançados:** Filtre por tipo, faixa etária, nível e custo  
- **Geolocalização:** Descubra oportunidades perto de você  
- **Cadastro Completo:** Perfil com informações pessoais, posição e nível de habilidade  
- **Gestão de Encontros:** Organize e participe de eventos PassaBola  
- **Sistema de Inscrições:** Inscreva-se em eventos com facilidade  
- **Busca e Filtros:** Encontre eventos por tipo, faixa etária, nível e custo  
- **Perfil de Usuária:** Acompanhe suas inscrições e histórico  



## 🛠️ Tecnologias Utilizadas

### Frontend
- React  
- React Router DOM  
- React Leaflet  
- Tailwind CSS  
- Lucide React  

### Backend
- JSON Server (API REST simulada)  
- ViaCEP (integração para busca de endereços)  

### Armazenamento
- LocalStorage (armazenamento local de dados e tokens de usuário)  

## 🔌 API Endpoints

A aplicação utiliza **JSON Server** como backend simulado. A seguir, os principais endpoints e suas funcionalidades:

### Usuárias (`/usuarios`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/usuarios`         | Retorna todas as usuárias cadastradas |
| GET    | `/usuarios/:id`     | Retorna dados de uma usuária específica |
| POST   | `/usuarios`         | Cadastra uma nova usuária.              |
| PUT    | `/usuarios/:id`     | Atualiza os dados de uma usuária existente |

### Eventos (`/eventos`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/eventos`         | Retorna todos os eventos |
| GET    | `/eventos/:id`     | Retorna um evento específico |
| POST   | `/eventos`         | Cadastra um novo evento |
| PUT    | `/eventos/:id`     | Atualiza um evento (vagas, inscritos, histórico) |
| DELETE | `/eventos/:id`     | Remove um evento |

### Locais (`/locais`)

| Método | Endpoint             | Descrição |
|--------|--------------------|-----------|
| GET    | `/locais`          | Retorna todos os pontos de acesso (quadras, escolinhas, clubes, academias, eventos) |
| GET    | `/locais/:id`      | Retorna um ponto de acesso específico |


## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v14 ou superior)  
- npm ou yarn  

### Passos para execução

1. Clone o repositório:

```bash
git clone https://github.com/Olivanaa/FutFemMVP.git
cd FutFemMVP
```

2. Instale as dependencias:

```bash
npm install
``` 

3. Execute o backend simulado:
```bash
npm json-server --watch db.json --port 3000
``` 
4. Execute o frontend:
```bash
npm run dev
``` 

## 🔍 Observações

O JSON Server é apenas para desenvolvimento e testes

A integração com ViaCEP garante preenchimento automático de endereços por CEP.

Geolocalização depende de permissão do navegador; caso negada, a aplicação ainda funciona, mas sem mostrar a localização exata.

## 👥 Equipe 

- Matheus von Koss Wildeisen - RM: 561539
- Ana Clara Rocha de Oliveira – RM: 564298
- Deivid ruan Marques – RM: 566356
- Felipe Cordeiro - RM: 566518

## ⚽ Juntos transformamos o futebol feminino no Brasil!

A Plataforma FutFem conecta e empodera meninas e mulheres no futebol em todo o Brasil. Com funcionalidades de mapa interativo, gestão de eventos e inscrições, filtros avançados e integração com geolocalização, a plataforma promove acesso democrático, transparência e inclusão no esporte.
