/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorageAccountFilePath } from '@yakumi-app/domain/storageAccount/getFilePath';
import { storageAccountPrefix } from '../constants';
import FallMagiaCharacterPage from '../pages/FallMagiaCharacterPage';
import FallMagiaCharacterViewerPage from '../pages/FallMagiaCharacterViewerPage';
import FallMagiaTutorial1Prologue from '../pages/tutorial/Scene1';
import FallMagiaTutorial2 from '../pages/tutorial/Scene2';
import FallMagiaTutorial3 from '../pages/tutorial/Scene3';
import FallMagiaTutorial4 from '../pages/tutorial/Scene4';
import FallMagiaTutorial5 from '../pages/tutorial/Scene5';
import FallMagiaTutorial6 from '../pages/tutorial/Scene6';
import FallMagiaTutorial7 from '../pages/tutorial/Scene7';
import FallMagiaTutorialMain from '../pages/tutorial/Scenemain';

export const fallMagiaRouter = {
  path: '/fall-magia/character',
  children: [
    { path: '', element: <FallMagiaCharacterPage /> },
    {
      path: 'tutorial',
      children: [
        {
          path: '1',
          element: <FallMagiaTutorial1Prologue />,
        },
        {
          path: '2',
          element: <FallMagiaTutorial2 />,
        },
        {
          path: '3',
          element: <FallMagiaTutorial3 />,
        },
        {
          path: '4',
          element: <FallMagiaTutorial4 />,
        },
        { path: '5', element: <FallMagiaTutorial5 /> },
        { path: '6', element: <FallMagiaTutorial6 /> },
        { path: '7', element: <FallMagiaTutorial7 /> },
        { path: 'main', element: <FallMagiaTutorialMain /> },
      ],
    },
    {
      path: 'viewer/:uid/:id',
      element: <FallMagiaCharacterViewerPage />,
      loader: async ({ params }: any) => {
        if (!params.id) throw new Response('Not Found', { status: 404 });
        const zipUrl = getStorageAccountFilePath(
          `${storageAccountPrefix}/${params.uid}/${params.id}/udonarium-character.zip`,
        );
        const res = await fetch(
          getStorageAccountFilePath(
            `${storageAccountPrefix}/${params.uid}/${params.id}/character-data.json`,
          ),
        );
        const data = await res.json();
        return {
          data,
          zipUrl,
        };
      },
    },
  ],
};
