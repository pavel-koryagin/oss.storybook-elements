/* oxlint-disable tailwindcss/no-custom-classname, nextjs/no-img-element -- imported code, consider porting later */
// import '../src/core/theme/app-for-storybook.scss';
import { DecoratorContext, getStorybookConfiguration, type Lang, StorybookIframeWrapper } from '@extpoint/storybook-elements';
import type { FC, ReactElement, ReactNode } from 'react';
import { Suspense, useContext } from 'react';

type Kind = 'image' | 'match' | 'custom';

const DEFAULT_TITLE = '<TO' + /* exclude the word from source search */ 'DO: comment this state>';

export type StorybookSlotProps = {
  kind?: Kind;
  width?: number | 'auto';
  height?: number; // WAS // | string;
  margin?: string; // Use this to position contents on overlay
  screen?: string;
  overlay?: string | ReactElement;
  overlayType?: string;
  wrapIframe?: boolean | 'noStyles';
  title?: string;
  lang?: Lang;
  background?: string;
  className?: string;
  done?: boolean;
  children: ReactNode;
  onShow?: (container: HTMLElement) => void;
};

type ExpectedLayoutContext = {
  screen: string;
  [key: string]: any;
};

type Options = {
  defaultWidth: number;
  defaultHeight: number; // For iframe mode; auto in non-iframe mode
  LayoutContextProvider: FC<{ value: ExpectedLayoutContext; children: ReactNode }>;
  createLayoutContext: (props: StorybookSlotProps) => ExpectedLayoutContext;
};

const storybookSlotOptions: Options = {
  defaultWidth: 412, // 320,
  defaultHeight: 783, // 800,
  LayoutContextProvider: ({ children }) => <>{children}</>,
  createLayoutContext: ({ width }) => ({
    screen: (width === 'auto' || (width ?? 0) >= 1200) ? 'desktop' : 'mobile',
  }),
};

function getRefToTriggerOnShow(onShow: StorybookSlotProps['onShow']) {
  if (!onShow) {
    return null;
  }

  return (ref: HTMLElement | null) => {
    if (ref) {
      setTimeout(() => onShow(ref), 100);
    }
  };
}

export function StorybookSlot(props: StorybookSlotProps) {
  // Wrap slot content with the host project's decorator
  const { SlotDecorator } = getStorybookConfiguration();
  const { lang: globalLang } = useContext(DecoratorContext);

  const {
    kind,
    width,
    height,
    margin,
    screen,
    overlay,
    overlayType,
    wrapIframe,
    title,
    lang = globalLang,
    background,
    className,
    done = false,
    children,
    onShow,
  } = props;

  const context = storybookSlotOptions.createLayoutContext(props);

  const isRtl = ((lang as string) === 'he' || (lang as string) === 'ar');
  // TODO: Revise width and height possible values
  const effectiveWidth = width || (typeof children === 'string' ? undefined : storybookSlotOptions.defaultWidth);
  const effectiveHeight = Number.isNaN(Number(height)) ? height || undefined : (`${height}px`);
  const effectiveScreen = screen ?? context.screen;
  const effectiveKind: Kind = kind || (
    typeof children === 'string'
      ? 'image'
      : (overlay
          ? 'match'
          : 'custom'));
  const effectiveTitle = title || (
    effectiveKind === 'image'
      ? 'Reference Look'
      : (effectiveKind === 'match'
          ? 'Match overlay'
          : DEFAULT_TITLE));

  // Render
  const body = (
    <>
      {overlay && (
        <div className={`storybook-decorator__overlay ${overlayType ? ` storybook-decorator__overlay_${overlayType}` : ''}`}>
          {typeof overlay === 'string'
            ? <img src={overlay} alt="Design" />
            : overlay}
        </div>
      )}
      <div className={className} style={{ margin, height: '100%' }} ref={getRefToTriggerOnShow(onShow)}>
        <Suspense fallback="loading">
          <SlotDecorator>
            <storybookSlotOptions.LayoutContextProvider value={context}>
              {children}
            </storybookSlotOptions.LayoutContextProvider>
          </SlotDecorator>
        </Suspense>
      </div>
    </>
  );

  return (
    <div
      className={`storybook-decorator__item storybook-decorator__item_${effectiveKind}`}
    >
      <div className={`storybook-decorator__title storybook-decorator__title_${effectiveKind}`}>
        <div className="storybook-decorator__title-contents">
          {done ? <span className="storybook-decorator__done" title="HTML-coding is done for this state">✔</span> : null}
          {effectiveTitle}
        </div>
      </div>
      <div
        className={`storybook-decorator__body screen_${effectiveScreen}`}
        style={{
          width: Number.isNaN(Number(effectiveWidth)) ? effectiveWidth : (`${effectiveWidth}px`),
          height: Number.isNaN(Number(height)) ? height : (`${height}px`),
          background,
        }}
      >
        {!wrapIframe
          ? body
          : (
              <StorybookIframeWrapper
                title={effectiveTitle}
                width={effectiveWidth ?? storybookSlotOptions.defaultWidth}
                height={effectiveHeight ?? storybookSlotOptions.defaultHeight}
                background={background}
                lang={lang}
                isRtl={isRtl}
                noStyles={wrapIframe === 'noStyles'}
              >
                {body}
              </StorybookIframeWrapper>
            )}
      </div>
    </div>
  );
}
