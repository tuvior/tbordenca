import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  decoration?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function Card({
  title,
  icon,
  children,
  footer,
  decoration,
  className = '',
  contentClassName = '',
}: CardProps) {
  return (
    <div className={`card relative flex h-full flex-col ${className}`.trim()}>
      {decoration}
      <div className="flex items-center gap-2">
        {icon ? (
          <div className="bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8 flex h-8 w-8 items-center justify-center rounded-full">
            {icon}
          </div>
        ) : null}
        <h3 className="text-base font-medium">{title}</h3>
      </div>
      <div className="bg-nord-5/70 dark:bg-nord-3/60 mt-3 h-px w-full" />
      <div
        className={`flex flex-1 flex-col items-center justify-center pt-4 ${contentClassName}`.trim()}
      >
        {children}
      </div>
      {footer ? (
        <div className="border-nord-5/60 dark:border-nord-3/60 mt-4 border-t pt-4">{footer}</div>
      ) : null}
    </div>
  );
}
