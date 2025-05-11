module.exports = {
  root: true,
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    quotes: ['error', 'double'],             // ダブルクオート強制
    semi: ['error', 'always'],               // セミコロン強制
    'comma-dangle': ['error', 'always-multiline'], // ぶら下がりカンマ
    'no-console': 'warn', // console.log に警告
    'no-unused-vars': 'warn', // 使っていない変数に警告
  },
};
