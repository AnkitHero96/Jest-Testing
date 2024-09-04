// Carousel.test.tsx
// import React from 'react';
import { render, screen, fireEvent, act, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../pages/Carousel';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Draggable from '../pages/Draggable';



test('Show App', () => {
    render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
});


test('Show Draggable', () => {
    render(<MemoryRouter initialEntries={['/Draggable']}><Draggable/></MemoryRouter>);
});


test('Show Carousel', () => {
    render(<MemoryRouter initialEntries={['/Carousel']}><Carousel/></MemoryRouter>);
});


jest.useFakeTimers();

describe('Carousel', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/Carousel']}>
        <Carousel />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it('should render the Navbar', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render the first image initially', () => {
    const firstImage = screen.getByTestId('carousel-image-0') as HTMLImageElement;
    expect(firstImage).toBeInTheDocument();
    expect(firstImage.src).toContain("https://picsum.photos/id/237/200/300");
  });

  it('should go to the next slide when the right arrow is clicked', async () => {
    const rightArrow = screen.getByTestId('right-arrow');
    fireEvent.click(rightArrow);

    await waitFor(() => {
      const secondImage = screen.getByTestId('carousel-image-1') as HTMLImageElement;
      expect(secondImage.src).toContain("https://picsum.photos/200/300?grayscale");
    });
  });

  it('should go to the previous slide when the left arrow is clicked', async () => {
    const leftArrow = screen.getByTestId('left-arrow');
    fireEvent.click(leftArrow);

    await waitFor(() => {
      const lastImage = screen.getByTestId('carousel-image-3') as HTMLImageElement;
      expect(lastImage.src).toContain("https://picsum.photos/seed/picsum/200/300");
    });
  });

  it('should automatically go to the next slide after 5 seconds', async () => {
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      const secondImage = screen.getByTestId('carousel-image-1') as HTMLImageElement;
      expect(secondImage.src).toContain("https://picsum.photos/200/300?grayscale");
    });
  });
});
