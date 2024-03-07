module.exports = {
  "*.{js,jsx,ts,tsx, !tests/**}": ["eslint --fix", "prettier --write"],
  // "{!(package)*.json,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};
