import { visit } from 'unist-util-visit';

export default function remarkCallouts() {
  return tree => {
    visit(tree, node => {
      if (node.type !== 'containerDirective') {
        return;
      }

      switch (node.name) {
        case 'spoiler': {
          node.type = 'mdxJsxFlowElement';
          node.name = 'Spoiler';
          node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
          break;
        }
        case 'caption': {
          node.type = 'mdxJsxFlowElement';
          node.name = 'Caption';
          node.attributes = Array.isArray(node.attributes) ? node.attributes : [];
          break;
        }
        case 'info':
        case 'warning':
        case 'error': {
          const calloutType = node.name;
          const attributes = Array.isArray(node.attributes) ? [...node.attributes] : [];

          node.type = 'mdxJsxFlowElement';
          node.name = 'Aside';
          attributes.push({
            type: 'mdxJsxAttribute',
            name: 'type',
            value: calloutType,
          });
          node.attributes = attributes;
          break;
        }
      }
    });
  };
}
