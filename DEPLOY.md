# 公開・更新手順

## 接続先

- ローカル（正式な保存先）: `C:\Users\kayo\OneDrive\ドキュメント\アプリ制作\fukushi-tool-check`
- GitHub: `ecamig28-pixel/fukushi-tool-check`
- 公開（予定）: GitHub の `main` ブランチに接続した Vercel

## 現在の状態

- React + TypeScript + Vite のMVP実装済み
- `pnpm build` 成功
- スマホ幅 `412 × 915` で主要操作を確認済み
- GitHubリポジトリ作成済み。GitHubコネクターで初回反映済み。Vercel接続は保留

## ローカル確認

```powershell
$env:Path='C:\Users\kayo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\kayo\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin;'+$env:Path
pnpm install
pnpm dev --host 127.0.0.1
```

ブラウザで `http://127.0.0.1:5173/` を開く。

## 更新時の確認

1. `src/data/tools.ts` と `src/data/checkItems.ts` の内容を確認する。
2. `pnpm build` を実行する。
3. スマホ幅で用具選択・チェック・詳細・検索・リセットを確認する。
4. PWAのキャッシュ内容を変えた場合は `public/sw.js` の `CACHE_NAME` を更新する。
5. 安全に関わる文言は、公開・業務利用前に福祉用具専門相談員等の有資格者へ確認する。

## GitHubへ公開するとき

1. 通常の `git push` とGitHub CLI（`gh`）は使わない。
2. GitHubコネクターの `github_fetch_file` で、`main` 上の対象ファイルとblob SHAを取得する。
3. 既存ファイルは `github_update_file` にファイル全文・取得したSHA・`branch: main` を渡す。
4. 同じファイルへの更新は並列実行しない。
5. GitHub上の内容を再取得して反映を確認する。
6. VercelでリポジトリをImportし、Framework PresetをViteとして公開する。

ローカルGitの履歴とGitHubコネクターで作られるリモート履歴は一致しない前提で扱う。認証待ちになるため、通常の `git push` は公開に使わない。
