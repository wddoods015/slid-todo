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
    cy.visit("/dashboard");
    cy.url().should("include", "/dashboard");

    cy.get('[data-cy="todo-item"]').then(($items) => {
      const itemCount = $items.length;
      if (itemCount === 0) {
        // 할일이 없을 경우
        cy.log("할일이 없습니다.");
        cy.contains("할일이 없습니다").should("be.visible");
      } else if (itemCount < 4) {
        // 할일이 4개 이하인 경우
        cy.log(`할일 개수: ${itemCount}`);
        cy.get('[data-cy="todo-item"]').should("have.length", itemCount);
      } else {
        // 할일이 4개 이상인 경우
        cy.get('[data-cy="todo-item"]').should("have.length", 4);
        cy.contains("a", "모두 보기").should("be.visible").click();
        cy.url().should("include", "/todos");
      }
    });
  });

  // it("대시보드에서 목표별 할일 테스트", () => {
  //   cy.visit("/dashboard");
  //   cy.url().should("include", "/dashboard");

  //   // 목표가 없을 때 '등록한 목표가 없어요' 메시지를 표시하는지 확인
  //   cy.get("body").then(($body) => {
  //     // 목표가 없을 때만 해당 div가 존재하는지 확인
  //     if ($body.find("div[data-cy='no-goals-message']").length > 0) {
  //       // 목표가 없으면 해당 div가 렌더링되므로 "등록한 목표가 없어요" 메시지를 확인
  //       cy.get("div[data-cy='no-goals-message']")
  //         .should("be.visible")
  //         .and("contain.text", "등록한 목표가 없어요");
  //     } else {
  //       // 목표가 있으면 해당 div는 렌더링되지 않으므로 목표가 있는 경우 테스트 진행

  //       // 목표가 있는 경우 무한 스크롤 테스트
  //       cy.get("div[data-radix-scroll-area-viewport]").then(($scrollArea) => {
  //         const scrollHeight = $scrollArea[0].scrollHeight;
  //         cy.wrap($scrollArea).scrollTo(0, scrollHeight, { duration: 1000 });
  //       });

  //       // "더보기" 버튼 누르면 데이터 추가 되는지 테스트
  //       cy.get("button:contains('더보기')").then(($button) => {
  //         if ($button.length > 0) {
  //           cy.wrap($button).click();
  //           cy.get('button[role="checkbox"]').then(($checkboxes) => {
  //             const initialCount = $checkboxes.length;
  //             cy.get("div[data-radix-scroll-area-viewport]").then(($scrollArea) => {
  //               const scrollHeight = $scrollArea[0].scrollHeight;
  //               cy.wrap($scrollArea).scrollTo(0, scrollHeight, { duration: 1000 });
  //             });
  //             cy.get('button[role="checkbox"]').should("have.length.greaterThan", initialCount);
  //           });
  //         } else {
  //           cy.log("'더보기' 버튼이 없습니다. 현재 상태에서 테스트 진행");
  //         }
  //       });

  //       // 체크박스 모두 체크
  //       cy.get('button[role="checkbox"]').each(($checkbox) => {
  //         cy.wrap($checkbox).then(($btn) => {
  //           if ($btn.attr("aria-checked") !== "true") {
  //             cy.wrap($btn).click();
  //           }
  //         });
  //       });

  //       // 진행률이 100%인지 확인
  //       cy.get('[data-cy="progress"]').should("include.text", "100");
  //     }
  //   });
  // });
});
