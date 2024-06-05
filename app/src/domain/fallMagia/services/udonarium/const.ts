// eslint-disable-next-line turbo/no-undeclared-env-vars
export const udonariumOrigin = import.meta.env.VITE_UDONARIUM_ORIGIN;
export const UDONARIUM_IFRAME_ID = 'iframe-udonarium';
export const UDONARIUM_IFRAME_TUTORIAL_URL = `${
  udonariumOrigin === 'http://localhost:4200'
    ? udonariumOrigin
    : `${udonariumOrigin}/udonarium/`
}?room=vsrank&use-hand-storage=1&tutorial=1&use-chat-command=1&use-post-message=1&shuffle-normal=1&counter-board=1&key-shortcut=1&z=-200&x=-100&rx=-10&ry=0&rz=-10`;
export const UDONARIUM_URL = `${
  udonariumOrigin === 'http://localhost:4200'
    ? udonariumOrigin
    : `${udonariumOrigin}/udonarium/`
}?room=vsrank&use-hand-storage=1&use-chat-command=1&use-post-message=1&shuffle-normal=1&counter-board=1&key-shortcut=1&z=-200&x=-100&rx=-10&ry=0&rz=-10`;
