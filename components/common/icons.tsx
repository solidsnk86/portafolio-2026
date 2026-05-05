import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const buildA11yProps = (title?: string) =>
  title ? { role: "img" } : { "aria-hidden": true };

export const InstagramIcon = ({ title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...buildA11yProps(title)}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.4-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    <path d="M7.4 3.5h9.2A3.9 3.9 0 0 1 20.5 7.4v9.2a3.9 3.9 0 0 1-3.9 3.9H7.4a3.9 3.9 0 0 1-3.9-3.9V7.4a3.9 3.9 0 0 1 3.9-3.9Zm0 1.7a2.2 2.2 0 0 0-2.2 2.2v9.2a2.2 2.2 0 0 0 2.2 2.2h9.2a2.2 2.2 0 0 0 2.2-2.2V7.4a2.2 2.2 0 0 0-2.2-2.2H7.4Z" />
  </svg>
);

export const FacebookIcon = ({ title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...buildA11yProps(title)}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M13.4 8.8V7.4c0-.7.5-1.3 1.3-1.3h1.4V3.5h-1.9c-2.2 0-3.7 1.4-3.7 3.6v1.7H8v2.6h2.5V20h2.9v-8.6h2.4l.4-2.6h-2.8Z" />
  </svg>
);

export const TwitterIcon = ({ title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...buildA11yProps(title)}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M19.6 7.2c.6-.4 1.1-1 1.3-1.7-.6.3-1.3.6-2 .7a3 3 0 0 0-5.2 2c0 .2 0 .5.1.7a8.5 8.5 0 0 1-6.2-3.2 3 3 0 0 0 .9 4 3 3 0 0 1-1.4-.4v.1a3 3 0 0 0 2.4 2.9 3 3 0 0 1-1.4.1 3 3 0 0 0 2.8 2.1 6 6 0 0 1-3.7 1.3c-.2 0-.5 0-.7-.1a8.5 8.5 0 0 0 13.1-7.2v-.4c.5-.4 1-.9 1.3-1.5-.5.2-1 .4-1.6.5Z" />
  </svg>
);

export const GithubIcon = ({ title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...buildA11yProps(title)}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.2c.4.1.6-.2.6-.5v-1.7c-2.4.5-3-.6-3-1.4 0-.8-.5-1.3-.9-1.5-.8-.5.1-.5.1-.5.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.3-1.9-.2-3.9-1-3.9-4.4 0-1 .4-1.8 1-2.4-.1-.2-.4-1.1.1-2.3 0 0 .8-.2 2.5 1a8.6 8.6 0 0 1 4.6 0c1.7-1.2 2.5-1 2.5-1 .5 1.2.2 2.1.1 2.3.7.6 1 1.4 1 2.4 0 3.4-2 4.2-3.9 4.4.3.3.6.8.6 1.7v2.5c0 .3.2.6.6.5A8.8 8.8 0 0 0 12 3.2Z" />
  </svg>
);

export const LinkedinIcon = ({ title, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={24}
    height={24}
    {...buildA11yProps(title)}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M6.4 9.3H3.8V20h2.6V9.3ZM5.1 8.1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM20.2 13.9c0-2.4-1.3-3.5-3.1-3.5-1.4 0-2.1.8-2.5 1.4V9.3h-2.6V20h2.6v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.9 1.7 1.9 3V20h2.6v-6.1Z" />
  </svg>
);
