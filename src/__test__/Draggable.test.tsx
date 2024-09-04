
import { render, fireEvent, screen } from '@testing-library/react';
import Draggable from '../pages/Draggable';
import { MemoryRouter } from 'react-router-dom';

describe('Draggable Component', () => {
  it('should adjust width when dragging left arrow', () => {
    render(<MemoryRouter initialEntries={['/Draggable']}><Draggable/></MemoryRouter>);

  
    const leftArrow = screen.getByTestId('left-arrow');

  
    const leftSection = screen.getByTestId('right-width');
    const initialWidth = parseInt(leftSection.style.width);


    fireEvent.mouseDown(leftArrow, { clientX: 300 });


    fireEvent.mouseMove(document, { clientX: 250 });


    fireEvent.mouseUp(document);

 
    const newWidth = parseInt(leftSection.style.width);
    console.log('Left Section Width after Drag:', newWidth);  


    expect(newWidth).toBeGreaterThan(initialWidth);
    expect(newWidth).toBeGreaterThanOrEqual(140);  
  });

  it('should adjust width when dragging right arrow', () => {
    render(<MemoryRouter initialEntries={['/Draggable']}><Draggable/></MemoryRouter>);

 
    const rightArrow = screen.getByTestId('right-arrow');

   
    const rightSection = screen.getByTestId('right-width');
    const initialWidth = parseInt(rightSection.style.width);


    fireEvent.mouseDown(rightArrow, { clientX: 300 });

  
    fireEvent.mouseMove(document, { clientX: 350 });

 
    fireEvent.mouseUp(document);


    const newWidth = parseInt(rightSection.style.width);
    console.log('Right Section Width after Drag:', newWidth);  


    expect(newWidth).toBeGreaterThanOrEqual(initialWidth);
    expect(newWidth).toBeLessThanOrEqual(325); 
  });
});
