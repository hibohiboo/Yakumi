import { basePath } from '@yakumi-app/constants';
import { getStorageAccountFilePath } from '@yakumi-app/domain/storageAccount/getFilePath';
import HollowFluxPage from '@yakumi-app/pages/HollowFluxPage';
import ImagePge from '@yakumi-app/pages/ImagePage';
import ImageUploaderPage from '@yakumi-app/pages/ImageUploaderPage';
import SheetToCharPage from '@yakumi-app/pages/SheetToCharPage';
import SpreadSheetPage from '@yakumi-app/pages/SpreadSheetPage';
import TextImagePage from '@yakumi-app/pages/TextImagePage';
import TextPage from '@yakumi-app/pages/TextPage';
import VSRankCharacterPage from '@yakumi-app/pages/VSRankCharacterPage';
import VSRankCharacterViewerPage from '@yakumi-app/pages/VSRankCharacterViewerPage';
import { createBrowserRouter } from 'react-router-dom';
import Top from '../App';
// import { getCharacter } from '@yakumi-app/domain/api/crud';

export const createRouter = () =>
  createBrowserRouter(
    [
      {
        path: '/',
        element: <Top />,
      },
      {
        path: '/text',
        element: <TextPage />,
      },
      {
        path: '/image',
        element: <ImagePge />,
      },
      {
        path: '/text-image',
        element: <TextImagePage />,
      },
      {
        path: '/hollow',
        element: <HollowFluxPage />,
      },
      {
        path: '/spread-sheet',
        element: <SpreadSheetPage />,
      },
      {
        path: '/sheet-to-char',
        element: <SheetToCharPage />,
      },
      {
        path: '/vs-rank-character',
        element: <VSRankCharacterPage />,
      },
      {
        path: '/vs-rank-character-viewer/:uid/:id',
        element: <VSRankCharacterViewerPage />,
        loader: async ({ params }) => {
          if (!params.id) throw new Response('Not Found', { status: 404 });

          const res = await fetch(
            getStorageAccountFilePath(
              `character-data/${params.uid}/${params.id}/character-data.json`,
            ),
          );
          const data = await res.json();
          return {
            data,
            zipUrl: getStorageAccountFilePath(
              `character-data/${params.uid}/${params.id}/udonarium-character.zip`,
            ),
          };
        },
      },
      {
        path: '/image-uploader',
        element: <ImageUploaderPage />,
      },
    ],
    {
      basename: `/${basePath}`,
    },
  );
