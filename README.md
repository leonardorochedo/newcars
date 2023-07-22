# NewCars 🚗

Um lugar onde você pode vender seu carro e também comprar um novo!

Primeiro projeto fullstack que fiz independente, curti muito cada rota e endpoint da aplicação acredito que ficou bem completa!

## Projeto

![Home](https://user-images.githubusercontent.com/62243365/218235172-dd68a2c2-9fcb-4532-b239-89a5ea5140c6.png)

## Tecnologias

### Frontend

- React
- Axios
- React Icons
- React IMask
- React Router Dom
- React Toastify

### Backend

- Spring Boot
- H2 Database
- JDBC MySQL
- JPA Hibernate
- BCrypt
- Java JWT
- JUnit

## Rode em sua máquina

Para conseguir rodar esse projeto em sua máquina você deve ter <i>Node / NPM e Java</i> instalado previamente!

1. Clone o repositório

```
git clone https://github.com/leonardorochedo/newcars.git
```

2. Acesse o diretório frontend

```
cd frontend
```

3. Baixe as dependências

```
npm install
```

4. Inicie o frontend

```
npm run dev
```

5. Crie os seguintes diretórios que irão armazenar as imagens:

- `backend/images`
- `backend/images/user`
- `backend/images/vehicle`


Já o backend tem duas maneiras de ser iniciado, pelo banco de dados H2 e pelo MySQL, porém no MySQL você deve ter instalado em seu dispositivo, já o H2 não!

1. Acesse o diretório backend

```
cd backend
```

2. Localize o arquivo application.properties e deixe a primeira linha como default (caso queira rodar com o ambiente MySQL):

```
spring.profiles.active=default
```

3. Ou como test (caso queira rodar com o banco de dados H2)

```
spring.profiles.active=test
```

4. Caso deixou em default rode este comando em seu MySQL:

```
CREATE SCHEMA newcars
```

5. Em sua IDE (Eclipse, IntelliJ, Spring Tools Suite) inicie a aplicação no arquivo

```
BackendApplication.java
```

Após os passos acima o projeto estará rodando na URL *http://localhost:5173* e o backend em *http://localhost:8080*

## Testes

Foi implementado testes de integração e unitários utilizando JUnit, estão acessíveis no diretório:

```
src/test/java
```

Lembrando que todos os testes rodam no banco H2 que é um banco em memória, o que facilita para a implementação do código.
