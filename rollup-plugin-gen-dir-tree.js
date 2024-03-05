import { readdir, stat } from 'fs/promises';
import { join } from 'path';

async function generateDirectoryTree(rootPath) {
  async function traverseDirectory(dirPath, tree) {
    const files = await readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = join(dirPath, file.name);
      if (file.isDirectory()) {
        const subtree = { name: file.name, type: 'directory', children: [] };
        tree.children.push(subtree);
        await traverseDirectory(filePath, subtree);
      } else {
        const fileInfo = { name: file.name, type: 'file' };
        tree.children.push(fileInfo);
      }
    }
  }

  const rootTree = { name: rootPath, type: 'directory', children: [] };
  await traverseDirectory(rootPath, rootTree);
  return rootTree;
}

// 在Rollup插件中使用
export default function projectStructurePlugin(options) {
  let tree;
  
  return {
    name: 'project-structure',
    async buildStart() {
      tree = await generateDirectoryTree(options?.rootPath || './');
    },
    generateBundle() {
      console.log('Project Structure Tree:', JSON.stringify(tree, null, 2));
    }
  };
}
