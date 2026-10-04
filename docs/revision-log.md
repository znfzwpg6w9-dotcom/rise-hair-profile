# rise-hair-profile 作業記録（revision-log）

美容師 脇 翔麻さんのプロフィールページ（NFC カード＋プロフィールページ）。
1 仕事 1 記録。新しい記録を下に追記する。

## 2026-10-01 店舗中心 → 個人中心へ変更（記録時点: commit `ba852d6` 済み／push 前）

### 方針（社長確定）

- 正しい氏名は「脇 翔麻」。主役は RISE HAIR ではなく本人
- 固定URLは `https://shoma.studioroko.net/`。NFC カード（2 枚）・裏面QR はこの URL を指す。
  所属先が変わってもカードをそのまま使えるよう、title・OGP・フッターに店舗名を入れない
- RISE HAIR は「現在の所属」として扱う。公式LINE `@417iydoj`・Googleマップ・電話・住所は RISE HAIR 側の情報
- Instagram `@risehair_waki` は本人の個人リンクとして扱う（リンクは現状維持）
- 公式LINE の黒い強調カードは予約導線として維持

### 変更内容

- `index.html`
  - 上部: 写真 → 「脇 翔麻」（h1）→ SHOMA WAKI → Hair Stylist → 既存のキャッチコピー → 小さく「現在の所属 RISE HAIR」（#salon へのリンク）
  - Instagram を個人リンクとして独立
  - 「現在の所属」セクション（`#salon`）に 店舗名・公式LINE・地図・電話・住所 を集約
  - title「脇 翔麻（SHOMA WAKI）| Hair Stylist」、canonical / og:url = `https://shoma.studioroko.net/`、
    og:image / twitter:image = `https://shoma.studioroko.net/assets/profile.jpg`
  - フッター「© 2026 Shoma Waki」（Studio Roko 表記は入れない）
  - 所属変更時に書き換える箇所は 2 つ（上部の所属表示 1 行と `#salon`）。HTML コメントで明示し「所属」で検索できる
- `style.css`
  - 氏名・英字名・職種・所属表示・所属セクションのスタイルを追加（既存の色・フォント・カードを流用）
  - 既存不具合の修正: 後半の横スクロール防止ルールに含まれていた `.site { max-width: 100% }` が
    `max-width: 440px` を打ち消し、PC でカードが全幅になっていた → `.site` をそのルールから外した
- `CLAUDE.md`: 目的と個人中心の方針だけを修正
- 改行コードは元のまま（index.html / style.css は CRLF）

### 確認

- ローカル: `python3 -m http.server 8080 --bind 127.0.0.1` → `http://127.0.0.1:8080/`
- Playwright 390 / 1440px: 横スクロールなし、console error / request failed / HTTP エラーなし、
  title・canonical・OGP、「脇 翔麻」表記（「翔磨」0 件）、href は確認済みの 4 件＋`#salon` のみ、
  店舗情報が `#salon` に集約、PC で `.site` 幅 440px

### 記録時点の未実施事項（現在の状態は末尾参照）

- push / 本番反映（push 後に本番 `https://shoma.studioroko.net/` の表示確認が必要）
- GitHub repo の移管・非公開化、remote 変更
- NFC 書き込み・裏面QR の確認（実物カード）

## 2026-10-02 shoma.studioroko.net 接続（接続時点の履歴・push 前）

- 個人中心の変更は commit `ba852d6`（Refactor profile around Shoma Waki）済み。**接続時点では未 push**
- `shoma.studioroko.net` を Vercel プロジェクト `rise-hair-profile-1qbq` に追加し、Squarespace に CNAME を追加（社長が実施）
  - DNS: `shoma` → CNAME `fa0ca3adf77c5d66.vercel-dns-017.com`。Vercel は Valid Configuration
- 接続後の確認（読み取りのみ）: `https://shoma.studioroko.net/` は HTTPS 200・証明書検証 OK・Vercel 配信。
  接続時点で表示されていたのは**旧本番ページ**（店舗中心の `bc86dfc` と完全一致。title「RISE HAIR | 脇 翔麻」、canonical は vercel.app）
- `rise-hair-profile-1qbq.vercel.app` はドメイン追加後も残る
- 当時の次の手順: push → Vercel 自動デプロイ → 本番 `https://shoma.studioroko.net/` で 390 / 1440px の表示・OGP・リンクを確認

## 2026-10-02 本番反映・確認完了（現在の状態）

以下はユーザー確認済みの情報に基づく記録。今回の文書更新では push・デプロイ・本番検証を再実行していない。

- `main` は push 済み。Production deploy は success
- `https://shoma.studioroko.net/` に個人中心のプロフィールページを本番反映済み
- 本番 HTML / CSS / JS は確認対象の HEAD `12e4e95e9dcee09f96069e997bd5ed8d49d7b835` と一致
- Playwright 390px / 1440px は 38/38 PASS
- canonical / OGP / リンク / 氏名 / 所属構造は確認済み
- 上記の履歴にある push・本番反映・本番確認待ちは解消済み

### 残作業（未完了）

- GitHub repo の移管・非公開化の検討（必要な remote 変更を含む）
- NFC 書き込み確認
- 裏面QR の実物確認
- AI 印刷入稿データ試験
- 実物 2 枚の検品・納品

残作業は追加の依頼・判断後に進める。

## 2026-10-04 7/29版の店舗中心構成へ戻す（本人採用・ローカル commit / push 前）

- 本人判断: 2026-10-01 の個人中心版をやめ、7/29版（`bc86dfc`）の店舗中心構成を採用
- `index.html` / `style.css` は `bc86dfc` をそのまま基準にし、変更は次だけ
  - canonical・og:url・og:image・twitter:image を正式URL `https://shoma.studioroko.net/` に（4か所）
  - 「公開後にVercel URLへ置換」の古いコメント2か所を正式URLの記録に更新（表示に影響なし）
  - PC で `.site` の max-width 440px が効くよう、横スクロール防止ルールから `.site` を外す（1行）
- 氏名は「脇 翔麻」で確定（同日に一度「翔磨」への修正指示があったが本人が撤回）
- 「現在の所属」・SHOMA WAKI・Hair Stylist・CURRENT SALON・© 2026 Shoma Waki は削除（7/29版に存在しない）
- 改行コードは元のまま（index.html / style.css は CRLF）
- 確認（ローカル・Playwright 390 / 1440px）: 28/28 PASS（横スクロールなし、エラーなし、翔磨0件・翔麻6件・「現在の所属」0件、
  RISE HAIR が氏名より大きい、導線4件、PC幅440px）
- 未実施: push / 本番反映 / 本番確認（本人承認待ち）

## 2026-10-04 スクロールほぼなし・主要4導線 2×2 構成（本人採用・ローカル commit / push 前）

- 写真を132px（狭い画面では画面幅の34%まで）に縮小し、上部の余白を詰めた。RISE HAIR が主役、氏名「脇 翔麻」、キャッチコピーは維持
- 公式LINE / Instagram / Googleマップ / 電話を 2×2 に配置。各タイルは見出しのみで、補足は電話番号だけ表示
  （見出しは語句の切れ目でだけ改行: 公式LINEで｜予約・相談、Googleマップを｜開く）
- 住所は「ACCESS」見出しを外し1行に。「現在の所属」・CURRENT SALON は使わない。上寄せのまま（上下中央寄せはしない）
- 正式URL https://shoma.studioroko.net/ と PC max-width 440px は維持。改行コードは CRLF のまま
- 確認（ローカル・Playwright）: 390×844 内容の下端 y625（旧 1176px の縦長から1画面へ）、360×740 y612、1440×900 y628。
  いずれも横スクロールなし・エラーなし・2×2・禁止語なし。既存の確認 28/28
- 未実施: push / 本番反映 / 本番確認（本人承認待ち）

