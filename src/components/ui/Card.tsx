import type React from "react";

type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  decoration?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  footer,
  decoration,
  className = "",
  contentClassName = "",
}) => {
  return (
    <div className={`card relative flex h-full flex-col ${className}`.trim()}>
      {decoration}
      <div className="flex items-center gap-2">
        {icon ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-8">
            {icon}
          </div>
        ) : null}
        <h3 className="text-base font-medium">{title}</h3>
      </div>
      <div className="mt-3 h-px w-full bg-nord-5/70 dark:bg-nord-3/60" />
      <div className={`flex flex-1 flex-col pt-4 ${contentClassName}`.trim()}>
        {children}
      </div>
      {footer ? (
        <div className="mt-4 border-t border-nord-5/60 pt-4 dark:border-nord-3/60">
          {footer}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
