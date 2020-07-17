import Constants from "../../src/constants/index";

context("User Actions", () => {
  beforeEach(() => {
    cy.visit(Constants.domain);
  });

  const userFirstName = "John";
  const userLastName = "Doe";
  let count = 1;

  it("Create User", () => {
    cy.get(".btn-user-create").click();

    cy.get("#form-createUser")
      .children()
      .should("have.length.greaterThan", 2);

    cy.get("#firstName")
      .type(userFirstName, { delay: 500 })
      .should("have.value", userFirstName);

    cy.get("#lastName")
      .type(userLastName, { delay: 500 })
      .should("have.value", userLastName);

    cy.get(".modal-actions")
      .children()
      .should("have.length.greaterThan", 0);

    cy.get(".modal-actions button").click();

    cy.get(".container-user-card")
      .find(`[data-name="${userFirstName} ${userLastName}"] input`)
      .should("have.value", `${userFirstName} ${userLastName}`)
      .wait(3000);
  });

  it("Delete User", () => {
    let cards = cy.get(".card");

    cards.each(($card) => {
      cy.wrap($card)
        .find(".btn-user-remove")
        .wait(100)
        .click();
      cy.get(".swal2-confirm")
        .wait(100)
        .click({ force: true });

      cy.wrap($card).should("not.exist");
    });
  });

  it("Update User", () => {
    cy.get(".card").each(($card) => {
      cy.wrap($card)
        .find("button.btn.btn-default.btn-user-edit")
        .first()
        .click()

        .closest(".card")
        .find(".user-info-name")
        .clear()
        .type(`John Doe ${count}`)
        .should("have.value", `John Doe ${count}`)

        .closest(".card")
        .find(".user-info-date")
        .click()
        .find(".picker-wrap tbody tr td")
        .contains("17")
        .click({ force: true })
        .closest(".card")
        .find(".user-info-date input")
        .should("have.value", "12/17/2019");

      cy.wrap($card)
        .find("button.btn.btn-default.btn-user-edit")
        .eq(1)
        .click();
      count++;
    });
  });
});
