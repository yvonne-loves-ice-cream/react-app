import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { beforeAll, afterEach, afterAll, vi, test } from 'vitest';
import Dashboard from './Dashboard';


const server = setupServer(
  rest.get('/api/campaigns/:cid', (req, res, ctx) => {
    const number = req.url.searchParams.get('number');
    console.log('Intercepted request for campaign:', req.params.cid);
    return res(
      ctx.json({
        impressions: 100 * number,
        clicks: 50 * number,
        users: 10 * number,
      })
    );
  })
);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Renders dashboard metrics and updates them every 5 seconds', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(await screen.findByText('Total Impressions')).toBeInTheDocument();
  expect(await screen.findByText('Total Clicks')).toBeInTheDocument();
  expect(await screen.findByText('CTR (Click-Through Rate)')).toBeInTheDocument();

  expect(await screen.findByText('100')).toBeInTheDocument(); 
  expect(await screen.findByText('50')).toBeInTheDocument();
  expect(await screen.findByText('50.00%')).toBeInTheDocument(); 
  expect(await screen.findByText('10')).toBeInTheDocument(); 

  await waitFor(
    async () => {
      expect(await screen.findByText('200')).toBeInTheDocument(); 
      expect(await screen.findByText('100')).toBeInTheDocument(); 
      expect(await screen.findByText('50.00%')).toBeInTheDocument(); 
      expect(await screen.findByText('20')).toBeInTheDocument(); 
    },

  );
},15000);
