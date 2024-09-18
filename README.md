# 🐾 Projeto Petshop - Melhor Amigo 🐾

Este é o repositório do **Projeto Petshop - Melhor Amigo**, desenvolvido pela squad *SAS 512*. O objetivo deste projeto foi criar um website para o petshop. A aplicação simula um site real, com uma página principal, a página de produtos, a exibição de uma galeria de imagens e fornece página para contato.

---

![Imagem do Site do Petshop](https://i.ibb.co/SfT7S7M/petshopmelhoramigo.png)

---

## 🛠️ Sobre a SAS 512

A **SAS 512** (*Saturday Afternoon Squad*) é uma organização formada durante o curso de Desenvolvimento Fullstack da Infinity School. O número **512** se refere à turma em que os integrantes estudam ou estudaram. 

O grupo foi criado por amigos do curso, após convite de **Lucas Fraga** em um sábado à tarde, com a intenção de desenvolverem projetos juntos. A SAS 512 é caracterizada por um ambiente de colaboração e igualdade, onde todos os membros possuem o mesmo nível de liderança. A missão do grupo é aprender, compartilhar conhecimento e desenvolver soluções de software que possam ser utilizadas em projetos reais.

### Membros do Time

- [Fraga](https://github.com/lucasfragadev)
- [Jão](https://github.com/jvsouza06)
- [Feijão](https://github.com/pedrofeijoo)
- [Nat boy](https://github.com/natanael89)
- [Tiko](https://github.com/Tikorsm)
- [Luan Delas](https://github.com/LuanGabriel23)

## 🚀 Tecnologias Utilizadas

- **Node.js**: para o back-end.
- **JavaScript**: utilizado tanto no front-end (para interatividade e manipulação do DOM) quanto no back-end (via Node.js).
- **Express**: framework para a construção do servidor e gerenciamento das rotas.
- **MySQL**: banco de dados relacional utilizado para armazenar as informações.
- **Handlebars**: engine de templates para a geração dinâmica de HTML.
- **Body-parser**: para o parsing de requisições HTTP.
- **Nodemon**: ferramenta para desenvolvimento que reinicia automaticamente o servidor.
- **Dotenv**: para o gerenciamento de variáveis de ambiente.

## 📂 Estrutura de Pastas

```bash
projeto-petshop/
├── MelhorAmigo/
│   ├── assets/
│   │   ├── css/        # Arquivos de estilo
│   │   ├── img/        # Imagens do site
│   │   ├── javascript/ # Scripts em JS
│   │   └── videos/     # Vídeos do site
│   ├── database/
│   │   ├── connection.js  # Configuração da conexão com MySQL
│   │   ├── schema.sql     # Script SQL para criação das tabelas
│   │   └── server.js      # Configuração do servidor Node.js com Express
│   ├── pages/             # Páginas estáticas HTML
│   │   ├── contato.html
│   │   ├── galeria.html
│   │   ├── index.html
│   │   └── produtos.html
│   ├── routes/
│   │   └── index.js       # Rotas da aplicação
├── .gitignore
├── LICENSE
├── package.json           # Dependências e scripts da aplicação
└── README.md              # Documentação do projeto
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (instalado e configurado)

### Passos para rodar o projeto

1. Clone este repositório:

```bash
git clone https://github.com/sas512-squad/projeto-petshop.git
```

2. Navegue até a pasta do projeto:

```bash
cd projeto-petshop/MelhorAmigo
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na pasta `database/` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=petshop
PORT=3000
```

5. Configure o banco de dados MySQL:

   - Crie o banco de dados utilizando o script `schema.sql` localizado na pasta `database/`:

```bash
mysql -u root -p < database/schema.sql
```

6. Inicie o servidor:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000/index`.

## ✨ Funcionalidades

- Página inicial com informações sobre o petshop.
- Página de produtos, exibindo itens disponíveis no petshop.
- Galeria de imagens.
- Página de contato para clientes.

## 📜 Scripts NPM

- `npm start`: inicia o servidor em modo de produção.
- `npm run dev`: inicia o servidor com *nodemon* para desenvolvimento.

## 🤝 Contribuição

Siga os passos abaixo para contribuir com este projeto:

1. Faça um fork deste repositório.
2. Crie uma nova branch com sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie a branch para o seu fork (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
