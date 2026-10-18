import { getStorybookConfiguration, type Lang } from '@extpoint/storybook-elements';
import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title: string;
  width: number | string;
  height?: number | string;
  lang: Lang;
  isRtl: boolean;
  background?: string;
  noStyles?: boolean;
  children: ReactNode;
};

const StorybookIframeWrapper: React.FC<Props> = ({
  title,
  width,
  height,
  lang,
  isRtl,
  background,
  noStyles = false,
  children,
}: Props) => {
  // Use the same portal context as the host project
  const { BodyContainerContext } = getStorybookConfiguration();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (iframeRef.current) {
      const contentDocument = iframeRef.current.contentDocument!;
      contentDocument.open();
      contentDocument.write(`
        <!DOCTYPE html>
        <html
          lang="${lang}"${isRtl ? ' dir="rtl" class="rtl"' : ''}
          style="${background ? `background: ${background} !important` : ''}"
        >
        <head>
          <meta charset="UTF-8">
          ${noStyles
            ? ''
            : Array.from(document.getElementsByTagName('style'))
              .map(value => value.outerHTML).join('\n')}
          ${noStyles
            ? ''
            : Array.from(document.getElementsByTagName('link'))
              .map(value => value.outerHTML).join('\n')}
        </head>
        <body>
          <div id="root"></div>
        </body>
        </html>
      `);
      contentDocument.close();

      // Set the iframe body for portal rendering
      const root = contentDocument.getElementById('root');
      if (root) {
        setIframeBody(root);
      }

      // Monitor new styles
      if (!noStyles) {
        document.head.addEventListener('DOMNodeInserted', (event) => {
          if (event.target instanceof HTMLStyleElement) {
            const style = event.target;
            window.requestAnimationFrame(() => {
              const newEl = contentDocument.createElement('style');
              newEl.innerHTML = style.innerHTML;
              contentDocument.head.appendChild(newEl);
            });
          }
        });
      }
    }
  }, [lang, isRtl, background, noStyles]);

  return (
    <>
      <iframe
        title={title}
        src="about:blank"
        ref={iframeRef}
        frameBorder={0}
        sandbox="allow-same-origin allow-scripts"
        style={{
          display: 'block',
          width,
          height,
        }}
        scrolling="auto"
      />
      {iframeBody && createPortal(
        <BodyContainerContext.Provider value={iframeBody}>
          {children}
        </BodyContainerContext.Provider>,
        iframeBody,
      )}
    </>
  );
};

export default StorybookIframeWrapper;
