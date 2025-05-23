
describe('Marketplace Page', () => {
  beforeEach(() => {
    cy.visit('/marketplace');
  });

  it('should load the marketplace page correctly', () => {
    // Check that the page title is visible
    cy.contains('h1', 'Marketplace').should('be.visible');
    
    // Check that products are displayed
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
    
    // Check navigation works
    cy.get('nav').contains('Map').click();
    cy.url().should('include', '/map');
    
    // Go back to marketplace
    cy.visit('/marketplace');
  });

  it('should filter products by category', () => {
    // Get the first category button
    cy.get('[data-testid="category-filter"]').first().then($btn => {
      const categoryName = $btn.text().trim();
      
      // Click the category
      cy.wrap($btn).click();
      
      // Check that products are filtered
      cy.get('[data-testid="product-card"]').each($card => {
        if ($card.find('[data-testid="product-category"]').length > 0) {
          cy.wrap($card).find('[data-testid="product-category"]').should('contain', categoryName);
        }
      });
    });
  });

  it('should search for products', () => {
    const searchTerm = 'NFT';
    
    // Type in the search box
    cy.get('[data-testid="search-input"]').type(searchTerm);
    
    // Check that products contain the search term
    cy.get('[data-testid="product-card"]').each($card => {
      const productText = $card.text().toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      
      // Product title or description should contain the search term
      expect(productText).to.include(searchTermLower);
    });
  });

  it('should have accessible elements', () => {
    // Run accessibility checks
    cy.injectAxe();
    cy.checkA11y();
  });
});
