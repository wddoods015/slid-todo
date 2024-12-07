describe("dashboard 페이지 테스트", () => {
  beforeEach(() => {
    const API_URL = "https://sp-slidtodo-api.vercel.app";
    const TEAM_ID = Cypress.env("TEAM_ID");

    if (!TEAM_ID) {
      throw new Error("TEAM_ID is not set in environment variables");
    }

    Cypress.config("defaultCommandTimeout", 5000);
    Cypress.config("pageLoadTimeout", 5000);
    Cypress.config("requestTimeout", 5000);

    cy.intercept({
      method: "POST",
      url: "**/auth/login",
    }).as("loginRequest");

    cy.intercept("GET", `${API_URL}/${TEAM_ID}/todos**`).as("getTodos");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/login", { timeout: 5000 });

    const testEmail = Cypress.env("TEST_EMAIL");
    const testPassword = Cypress.env("TEST_PASSWORD");

    if (!testEmail || !testPassword) {
      throw new Error("Test credentials are not set in environment variables");
    }

    console.log("TEAM_ID:", TEAM_ID);
    console.log("TEST_EMAIL:", testEmail);

    cy.get('input[placeholder="이메일을 입력해 주세요"]')
      .should("be.visible", { timeout: 5000 })
      .type(testEmail, { delay: 10 });

    cy.get("[role='password']")
      .should("be.visible", { timeout: 5000 })
      .type(testPassword, { delay: 10 });

    cy.get("[data-cy='login-button']").should("be.visible", { timeout: 5000 }).click();

    cy.wait("@loginRequest", { timeout: 5000 }).then((interception) => {
      console.log("Login Response:", interception.response);
      expect(interception.response?.statusCode).to.eq(201);
    });

    cy.url().should("include", "/", { timeout: 5000 });
  });
  // 대시보드 - 최신 할일 블록 테스트
  it("대시보드에서 최신 할일 4개 조회 및 버튼 클릭 이동 확인", () => {
    // /dashboard 페이지 접근
    cy.visit("/dashboard");
    // url에 "dashboard"가 포함되어야 한다
    cy.url().should("include", "/dashboard");
    // data-cy="todo-item" 속성을 가진 요소가 4개 존재하는지 확인
    cy.get('[data-cy="todo-item"]').should("have.length", 4);
    // "모두보기" 버튼이 존재하는지 확인
    cy.contains("a", "모두 보기").should("be.visible");
    // "모두보기" 버튼을 클릭
    cy.contains("a", "모두 보기").click();
    // /todos 페이지로 이동했는지 URL 확인
    cy.url().should("include", "/todos");
  });

  // 목표별 할 일 블록 테스트
  it("대시보드에서 목표별 할일 테스트", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/dashboard");

    // 모든 체크박스를 클릭하여 체크 상태로 만듦
    cy.get('button[role="checkbox"]').each(($checkbox) => {
      // 각 체크박스가 체크되지 않은 경우에만 클릭하여 체크 상태로 만듦
      cy.wrap($checkbox).then(($btn) => {
        if ($btn.attr("aria-checked") !== "true") {
          cy.wrap($btn).click(); // aria-checked가 "false"인 경우 클릭
        }
      });
    });

    // 모든 체크박스가 체크되었을 때, progress의 값이 100%인지 확인
    cy.get('[data-cy="progress"]').should("include.text", "100");
  });
});
