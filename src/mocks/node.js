import { setupServer } from 'msw/node';
import { rest } from 'msw';


export const server = setupServer(
    rest.get('/api/campaigns/:cid', (req, res, ctx) => {
        const { cid } = req.params; 
        console.log('Intercepted /api/campaigns for campaign ID:', cid);
        return res(
          ctx.json([
            { id: 1, name: 'Red' },
            { id: 2, name: 'Blue' },
          ])
        );
      })
);
