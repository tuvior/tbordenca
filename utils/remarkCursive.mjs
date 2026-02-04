// remark-percent-cursive.mjs
import { visit } from 'unist-util-visit';

export default function remarkPercentCursive() {
  return tree => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (typeof node.value !== 'string') return;

      const value = node.value;
      if (!value.includes('%')) return;

      const parts = value.split('%');
      if (parts.length < 3) return; // need pairs

      const out = [];

      for (let i = 0; i < parts.length; i++) {
        const chunk = parts[i];
        if (!chunk) continue;

        if (i % 2 === 0) {
          out.push({ type: 'text', value: chunk });
        } else {
          // %cursive% → <span class="cursive">...</span>
          out.push({
            type: 'mdxJsxTextElement',
            name: 'span',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'className',
                value: 'cursive',
              },
            ],
            children: [{ type: 'text', value: chunk }],
          });
        }
      }

      parent.children.splice(index, 1, ...out);
    });
  };
}
