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

  it("대시보드에서 목표별 할일 테스트", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/dashboard");

    // overflow-hidden 영역에서 스크롤을 수동으로 내리기
    cy.get("div[data-radix-scroll-area-viewport]").then(($scrollArea) => {
      // 부모 요소의 scrollTop을 변경하여 수동으로 스크롤 내리기
      const scrollHeight = $scrollArea[0].scrollHeight; // 전체 스크롤 높이
      cy.wrap($scrollArea).scrollTo(0, scrollHeight, { duration: 1000 }); // 맨 아래로 스크롤
    });

    // "더보기" 버튼이 보일 때까지 기다리기
    cy.contains("button", "더보기", { timeout: 10000 }).click(); // 버튼 클릭

    // 클릭 후 체크박스 개수 확인
    cy.get('button[role="checkbox"]').then(($checkboxes) => {
      const initialCount = $checkboxes.length;

      // 스크롤을 내려 추가된 체크박스 로드
      cy.get("div[data-radix-scroll-area-viewport]").then(($scrollArea) => {
        const scrollHeight = $scrollArea[0].scrollHeight;
        cy.wrap($scrollArea).scrollTo(0, scrollHeight, { duration: 1000 }); // 다시 스크롤 내리기
      });

      // "더보기" 버튼 클릭 후 체크박스 개수 확인
      cy.get('button[role="checkbox"]', { timeout: 10000 }).should(
        "have.length.greaterThan",
        initialCount,
      );
    });

    // "더보기" 버튼 클릭 후 모든 체크박스가 체크 가능한지 확인
    cy.get('button[role="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).then(($btn) => {
        if ($btn.attr("aria-checked") !== "true") {
          cy.wrap($btn).click();
        }
      });
    });

    // 모든 체크박스 체크 후 progress 값이 100%인지 확인
    cy.get('[data-cy="progress"]').should("include.text", "100");
  });
});
