/* eslint-disable */

import React from 'react';
import { mount } from 'cypress/react18';
import MyNotes from '../../notes-app/src/components/MyNotes';

describe('MyNotes Component', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:5000/api/notes', {
          statusCode: 200,
          body: [
            {
              _id: '1',
              title: 'Test Note 1',
              content: 'This is a test note',
              image: null,
              updatedAt: new Date().toISOString(),
            },
            {
              _id: '2',
              title: 'Test Note 2',
              content: 'This is another test note',
              image: null,
              updatedAt: new Date().toISOString(),
            },
          ],
        }).as('getNotes');
    
        mount(<MyNotes />);
      });
    
      it('should display the list of notes', () => {
        cy.wait('@getNotes');
        cy.get('.note-div').should('have.length', 2);
        cy.get('.note-div').first().contains('Test Note 1');
        cy.get('.note-div').last().contains('Test Note 2');
      });
    
      it('should display a message when there are no notes', () => {
        cy.intercept('GET', 'http://localhost:5000/api/notes', {
          statusCode: 200,
          body: [],
        }).as('getNoNotes');
    
        mount(<MyNotes />);
        cy.wait('@getNoNotes');
        cy.get('.note-div').should('not.exist');
        cy.contains('There are no notes. Add your first one');
      });
    
      it('should filter notes based on search input', () => {
        cy.wait('@getNotes');
        cy.get('input.search-input').type('Test Note 1');
    
        cy.get('.note-div').should('have.length', 2).then(($divs) => {
            expect($divs.first()).to.contain('Test Note 1');
        });
    });
    
      it('should clear the search input', () => {
        cy.wait('@getNotes');
        cy.get('input.search-input').type('Test Note 1');
        cy.get('.clear-search-btn').click({ force: true });
        cy.get('.note-div').should('have.length', 2);
    });
});