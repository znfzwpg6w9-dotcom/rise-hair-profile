# rise-hair-profile 作業記録（revision-log）

美容師 脇 翔麻さんのプロフィールページ（NFC カード＋プロフィールページ）。
1 仕事 1 記録。新しい記録を下に追記する。

## 2026-10-01 店舗中心 → 個人中心へ変更（ローカル実装・検証済み／commit 前）

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

### 未実施（社長確認待ち）

- commit / push / deploy
- Vercel へのドメイン `shoma.studioroko.net` 追加・Squarespace の CNAME 追加
- GitHub repo の移管・非公開化、remote 変更
- NFC 書き込み・裏面QR の確認（実物カード）
