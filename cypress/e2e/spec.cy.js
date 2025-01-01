describe('Сторінка категорії', () => {
  const categoryId = 1;
  const apiUrl = `https://lib-back-ab58.onrender.com/api/videos/${categoryId}`;

  beforeEach(() => {
    cy.intercept('GET', apiUrl, {
      fixture: 'videos.json',
    }).as('getVideos');
    cy.visit(`/category/${categoryId}`);
  });

  it('Показує завантажувальний екран', () => {
    cy.get('.skeleton').should('exist');
  });

  it('Відображає заголовок категорії та відео', () => {
    cy.wait('@getVideos', { timeout: 10000 });
    cy.get('h1', { timeout: 10000 }).should('contain', 'Category 1');
    cy.get('.category-container').should('have.length', 2);
  });

  it('Відкриває поп-ап при кліку на відео', () => {
    cy.wait('@getVideos', { timeout: 10000 });
    cy.get('.category-container').first().click();
    cy.get('.video-view').should('exist');
    cy.get('iframe')
      .should('have.attr', 'src')
      .and('contain', 'youtube.com/embed');
  });

  it('Закриває поп-ап при кліку на кнопку', () => {
    cy.wait('@getVideos', { timeout: 10000 });
    cy.get('.category-container').first().click();
    cy.get('.close-video').click();
    cy.get('.video-view').should('not.exist');
  });
});
