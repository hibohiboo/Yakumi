import HollowFluxDeckPage from '../pages/HollowFluxDeckPage';

export const hollowRouter = {
  path: '/hollow-flux',
  children: [{ path: '', element: <HollowFluxDeckPage /> }],
};
