import { visit } from 'unist-util-visit';

function reactAttribute(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

function handleContainer(node) {
  switch (node.name) {
    case 'spoiler': {
      node.type = 'mdxJsxFlowElement';
      node.name = 'Spoiler';
      const attributes = [];

      for (const attribute in node.attributes) {
        attributes.push(reactAttribute(attribute, node.attributes[attribute]));
      }
      node.attributes = attributes;
      break;
    }
    case 'info':
    case 'warning':
    case 'error': {
      const calloutType = node.name;
      const attributes = [];

      for (const attribute in node.attributes) {
        attributes.push(reactAttribute(attribute, node.attributes[attribute]));
      }

      attributes.push(reactAttribute('type', calloutType));

      node.type = 'mdxJsxFlowElement';
      node.name = 'Aside';

      node.attributes = attributes;
      break;
    }
  }
}

function handleLeaf(node) {
  switch (node.name) {
    case 'caption': {
      node.type = 'mdxJsxFlowElement';
      node.name = 'Caption';
      const attributes = [];

      for (const attribute in node.attributes) {
        attributes.push(reactAttribute(attribute, node.attributes[attribute]));
      }
      node.attributes = attributes;
      break;
    }
  }
}

export default function remarkCallouts() {
  return tree => {
    visit(tree, node => {
      switch (node.type) {
        case 'containerDirective': {
          handleContainer(node);
          break;
        }
        case 'leafDirective': {
          handleLeaf(node);
          break;
        }
      }
    });
  };
}
