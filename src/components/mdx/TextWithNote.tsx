'use client';

import { ReactNode } from 'react';

import { Popover } from '@base-ui/react/popover';

type TextWithNoteProps = {
  label: string;
  children: ReactNode;
};

const arrowRotationBySide: Record<string, number> = {
  top: 180,
  bottom: 0,
  left: 90,
  right: -90,
};

export default function TextWithNote({ label, children }: TextWithNoteProps) {
  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton={false}
        render={
          <span className="hover:text-nord-10 dark:hover:text-nord-8 cursor-pointer transition-colors">
            {label}
          </span>
        }
      ></Popover.Trigger>
      <span aria-hidden className="text-nord-10 dark:text-nord-8 align-super text-xs font-bold!">
        {'✱'}
      </span>

      <Popover.Portal>
        <Popover.Positioner
          side="top"
          sideOffset={16}
          collisionPadding={12}
          collisionAvoidance={{
            side: 'flip',
            align: 'shift',
            fallbackAxisSide: 'none',
          }}
          className="z-50"
        >
          <Popover.Popup
            className={[
              'border-nord-4/60 bg-nord-6 max-w-80 rounded-2xl border px-5 py-4 shadow-xl md:max-w-120',
              'dark:border-nord-3/60 dark:bg-nord-1',
              'transition-[transform,opacity] duration-250',
              'data-starting-style:scale-95 data-starting-style:opacity-0',
              'data-ending-style:scale-95 data-ending-style:opacity-0',
            ].join(' ')}
          >
            <Popover.Arrow
              className={[
                'flex',
                'data-[side=top]:bottom-[-0.5rem]',
                'data-[side=bottom]:top-[-0.5rem]',
                'data-[side=left]:right-[-0.8125rem]',
                'data-[side=right]:left-[-0.8125rem]',
              ].join(' ')}
              render={(props, state) => (
                <div {...props}>
                  <ArrowSvg rotation={arrowRotationBySide[state.side] ?? 0} />
                </div>
              )}
            />

            <Popover.Description>{children}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

type ArrowSvgProps = React.ComponentProps<'svg'> & {
  rotation?: number;
};

function ArrowSvg({ rotation = 0, ...props }: ArrowSvgProps) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <g transform={`rotate(${rotation} 10 5)`}>
        <path
          d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
          className="fill-nord-6/95 dark:fill-nord-1/95"
        />
        <path
          d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
          className="fill-nord-4/60 dark:fill-none"
        />
        <path
          d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
          className="dark:fill-nord-3/60 fill-none"
        />
      </g>
    </svg>
  );
}
