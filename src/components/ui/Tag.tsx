type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return (
    <span className="bg-nord-10/10 text-nord-10 dark:bg-nord-8/10 dark:text-nord-8 rounded-lg p-3 px-3 py-1 text-sm font-bold shadow-md">
      {tag}
    </span>
  );
}
