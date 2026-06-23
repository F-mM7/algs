# VisualCube リファレンス

cube-algs が alg の図を生成するのに使っている **VisualCube** のパラメータ仕様まとめ。

- 使用エンドポイント: `https://visualcube.api.cubing.net/visualcube.php`（cubing.net ホスト）
- 原典仕様: `https://cube.rider.biz/visualcube.php`（Conrad Rider 版）
- 仕組み: URL のクエリパラメータでキューブ画像（SVG/PNG 等）を生成し、`<img src>` で貼れる。
- 確認日: 2026-05-26（公式仕様 + 実画像での検証）

---

## クイックスタート（cube-algs での実例・検証済み）

`case=` は「手順を解く**前**の状態」＝認識図を描く（手順の逆適用）。記法中の空白・`'` は URL エンコードされる。

| 用途 | パラメータ |
|---|---|
| OLL | `fmt=svg&pzl=3&view=plan&stage=oll&case=R U R' U R U2 R'` |
| PLL | `fmt=svg&pzl=3&view=plan&stage=pll&case=<alg>` |
| F2L | `fmt=svg&pzl=3&stage=f2l&case=<alg>`（view 省略＝等角立体図） |
| 4x4 | `fmt=svg&pzl=4&case=<alg>` |

cube-algs では上記に加えて `size=160` と `bg=2a2a2a`（カード背景色）を自動付与している（`main.js` の `visualcubeURL()`）。

---

## パラメータ一覧

### 1. パズルと状態（何のキューブの、どんな状態を描くか）

| param | 意味 | 値 | 例 |
|---|---|---|---|
| `pzl` | パズルサイズ NxN | 1〜10（3=3x3, 4=4x4, 2=2x2） | `pzl=4` |
| `alg` | 手順を**順**適用した状態 | 標準記法（`U R F B L D`, `M E S`, `x y z`, `'` `2`, ワイド `Rw`/`r` 等） | `alg=R U R'` |
| `case` | 手順を**逆**適用した状態（認識図向き） | `alg` と同じ記法 | `case=R U R' U R U2 R'` |
| `fd` | 各ステッカーの**面**を直接定義 | 54 文字（後述） | — |
| `fc` | 各ステッカーの**色**を直接指定 | 54 文字（後述、`fd` より優先） | — |

> `alg`/`case` を使えば配色は手順から自動生成されるため `fd`/`fc` は不要。`fd`/`fc` は手順を使わず手で配色を作りたいときに使う。

### 2. ビューとマスク（どう見せるか）

| param | 意味 | 値 |
|---|---|---|
| `view` | 視点 | 省略＝**等角立体図**（U/R/F の3面）/ `plan`＝**上面図**（最上段の側面も見せる）/ `trans`＝本体を透明化しマスク面を隠す |
| `stage` | 強調するパーツ（**それ以外を灰色化**） | `fl` `f2l` `f2l_1` `f2l_2` `f2l_3` `f2l_sm` `f2b` `line` `cross` `ll` `oll` `ocll` `oell` `coll` `ocell` `pll` `cll` `ell` `cmll` `els` `cls` `wv` `vh` `2x2x2` `2x2x3` |
| `r` | 視点回転 | 軸（`x`/`y`/`z`）＋角度（-360〜360）を連結。例 `r=x-30y45` |
| `dist` | 視点距離 | 1〜100 |

> `stage` は「**どのピースの色を残すか（＝他を灰色にするか）**」を選ぶだけ。残ったピースが**何色か**は `alg`/`case` か `fd`/`fc` で決まる（=「色を付けるピースの選択」と「その色」は別軸）。

### 3. 配色・装飾

| param | 意味 | 値 |
|---|---|---|
| `sch` | 6 面の配色。順序は **U R F D L B** | 短縮コード `y r b w o g`。**デフォルト `yrbwog`**（U=黄, R=赤, F=青, D=白, L=橙, B=緑）。hex も可 |
| `bg` | 背景色 | hex / 色名 / `t`＝透明 |
| `cc` | キューブ本体（枠）の色 | hex / 色名 |
| `co` | キューブ本体の透明度 | 0〜99（0＝完全透明） |
| `fo` | ステッカーの透明度 | 0〜99 |

### 4. 矢印（PLL の移動表示など）

| param | 意味 | 値 |
|---|---|---|
| `arw` | 矢印（カンマ区切りで複数） | `<始><終>[<経由>][-i影響][-s長さ][-色]` |
| `ac` | 既定の矢印色 | hex / 色名 |

- 既定は `-i10-s10`（影響＝曲がり 100% / 長さ 100%）。`-s8`＝長さ 80%、`-i5`＝曲がり 50%、末尾に色名で個別色。
- 例: `arw=U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow`
- 矢印は**自動生成されない**。PLL に付けるには手順ごとに手で指定する。

### 5. 出力

| param | 意味 | 値 |
|---|---|---|
| `fmt` | 画像形式 | `svg` `png` `gif` `jpg` `tiff` `ico` |
| `size` | 画像サイズ(px) | 0〜1024 |

---

## ステッカー番号（`arw` / `fc` / `fd` で使用）

- 面順: **U R F D L B**
- 各面の 9 マスは **0〜8**（行優先・左上→右下）。**実証済み**（`arw=U0U2,U6U8` が上面図で上辺・下辺をそれぞれ左→右に描いた）:

```
0 1 2
3 4 5
6 7 8
```

- `arw` のステッカー指定は「面文字＋番号」（例 `U0`, `R5`）。

---

## `fd` / `fc` の記法

- 54 文字 = 9 文字 × 6 面、面順 **U R F D L B**（可読性のための空白は無視される）。
- `fd` デフォルト: `uuuuuuuuu rrrrrrrrr fffffffff ddddddddd lllllllll bbbbbbbbb`
- `fc` デフォルト: `yyyyyyyyy rrrrrrrrr bbbbbbbbb wwwwwwwww ooooooooo ggggggggg`
- `fd` の特殊文字: `n`＝灰（blank）, `o`＝銀（oriented）, `t`＝透明。
- `fc` は各マスを色コードで塗る。`fd` と両方あれば `fc` が優先。
- 面内の 9 文字の並びはステッカー番号と同じ行優先と推定（未実証）。

---

## `view` の違い（実証）

- **省略（等角）**: U/R/F の 3 面が見える立体図。F2L・4x4 など層をまたぐ状態向き。
- **`plan`**: 真上から。U 面 3×3 ＋最上段の側面タブ。OLL/PLL の認識図向き。
- **`trans`**: 本体を透明化し、マスク/未定義の面を隠す。透けた状態確認用。

---

## cube-algs 実装メモ

- URL 組み立ては `main.js` の `visualcubeURL(cfg)`。`fmt=svg` 固定、`size`/`bg`/`pzl` に既定値、`view`/`stage`/`sch`/`arw` は指定時のみ付与、手順は `case=` に渡す。
- `data.js` のカテゴリ/各 alg に `pzl` `view` `stage` `sch` `arw` `size` `bg` を書けば反映される（alg 個別がカテゴリ既定を上書き）。
- PLL に矢印を出したい場合は各 alg に `arw` を追加する（自動では付かない）。

## 注意

- 第三者サービス（`visualcube.api.cubing.net`）への依存。サービス停止・オフライン時は図が出ない。
- 検証済み: `pzl` `view` `stage` `case` `sch` `bg` `fmt` `size` `arw`（ステッカー番号配置）、`view=trans`。
- 未実証: `fd`/`fc` の面内並び順、`co`/`fo`/`dist`/`r`/`cc` の細かい挙動、`stage` 各値の正確な範囲（公式記載ベース）。
