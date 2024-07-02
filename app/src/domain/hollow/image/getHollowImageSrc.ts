import { basePath } from '@yakumi-app/constants';

export const getHollowImageSrc = (src: string) => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (import.meta.env.DEV) {
    return `/${basePath}${src}`;
  }
  return `${src}`;
};
