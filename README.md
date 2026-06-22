# 福祉用具チェックカンペ

福祉用具のモニタリング・点検時に、用具ごとの確認ポイントをすぐ開くためのスマホ向けWebアプリです。

## 特徴

- 17種類の福祉用具をカテゴリから複数選択
- 用具別チェックリストと進捗表示
- 確認ポイント、ありがちな原因、その場の対応、相談目安、リスクを表示
- 用具名・問題名・確認ポイント・原因・リスクを横断検索
- チェック状態のみブラウザへ一時保存
- 利用者情報、ログイン、クラウド記録、外部APIなし
- スマホのホーム画面へ追加できるPWA構成

## ローカル起動

```powershell
$env:Path='C:\Users\kayo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\kayo\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin;'+$env:Path
pnpm install
pnpm dev --host 127.0.0.1
```

表示先: `http://127.0.0.1:5173/`

## データ追加

- 用具一覧: `src/data/tools.ts`
- チェック項目: `src/data/checkItems.ts`
- 型定義: `src/types/index.ts`

## 注意

このアプリは一般的な点検補助です。医療判断、リハビリ評価、個別利用者への診断を行うものではありません。用具の改造や、取扱説明書・専門職の指示によらない調整は行わないでください。

点検内容は公開・業務利用前に、福祉用具専門相談員などの有資格者による確認を推奨します。
