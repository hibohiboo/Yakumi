import { Button, ButtonProps } from '@blueprintjs/core';

const NextButton: React.FC<ButtonProps> = (props) => {
  return <Button rightIcon="circle-arrow-right" {...props} />;
};
export default NextButton;
