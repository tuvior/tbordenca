type ArticleTagProps = {
  tag: string;
};

export default function ArticleTag({ tag }: ArticleTagProps) {
  return (
    <span className="bg-nord-7/20 text-nord-10 dark:bg-nord-7/10 dark:text-nord-7 rounded-lg p-3 px-3 py-1 text-sm font-bold shadow-md">
      {tag}
    </span>
  );
}
