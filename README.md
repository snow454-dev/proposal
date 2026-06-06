# 不動産LP テスト納品 - E's garden 東刈谷駅南

## 納品物

| ファイル名 | 内容 | サイズ |
|---|---|---|
| `01_TOP.jpg` | TOPセクション (キャッチ+ヒーロー+アクセス) | 1000×3000px |
| `02_floorplan.jpg` | 間取りセクション (PLAN I + 番号付き解説) | 1000×3000px |
| `03_environment.jpg` | 周辺環境セクション (地図+6施設) | 1000×3000px |

## 生成スクリプト

`gen_top_v2.py` `gen_floorplan.py` `gen_environment.py` を同梱。
Python 3 + Pillow があれば誰でも再生成できる。

```bash
pip install pillow
python3 gen_top_v2.py
```

## 使用フォント

- Noto Sans CJK JP (本文・見出し)
- Noto Serif CJK JP (キャッチコピー・大数字)

## Figma/Canvaでの編集

このJPGはラスタ画像のため直接編集はできない。微調整するには:

### A. Canvaで簡易微調整
1. JPGをアップロード
2. 上から透過テキストレイヤーを乗せて文字差し替え

### B. 完全な編集対応(本納品時)
Figma MCP連携を実装すると、各要素がレイヤー分離された
編集可能ファイルとして納品できる。
詳細は引き継ぎドキュメント参照。

## 既知の課題

- 縦書き装飾文字「NEAR STATION」「SPACIOUS HOUSE」が
  サンプルと位置がやや異なる(画像にかぶる距離が短い)
- 間取り図素材に既存の番号が焼き込まれているため、
  実運用では「番号なしの間取り図」を入力する必要がある
- フォント:Mac/WindowsのNoto Sans JPと若干字形差あり
