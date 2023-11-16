describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login with valid email and PW", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });
  it("Should not login with empty login", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("test");
    cy.contains("Submit").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });
  it("Should not login with empty password", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

// next 3
const bookFirst = {
  title: "Душа Человека",
  description: "Душа человека. Ее способность к добру и злу",
  author: "Эрих Фромм",
};

const bookSecond = {
  title: "Искусство любить",
  description: "Исследование природы любви",
  author: "Эрих Фромм",
};

const bookThird = {
  title: "Одноэтажная Америка",
  description: "Книга в жанре путевого очерка",
  author: "Илья Ильф и Евгений Петров",
};

describe.only("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  // it("Valid login", () => {
  //   cy.contains("test@test.com").should("be.visible");
  //   cy.contains("Add new").should("have.class", "btn");
  // });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});
