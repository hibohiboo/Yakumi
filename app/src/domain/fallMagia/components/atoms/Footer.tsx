import React from 'react';
import { FaGithub } from 'react-icons/fa';
const Footer: React.FC = () => {
  return (
    <div>
      <a href="/app/agreement">利用規約</a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="/app/privacy-policy">プライバシーポリシー</a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="/app/materials">利用素材</a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a
        href="https://github.com/hibohiboo/Yakumi"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'gray',
        }}
      >
        <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
