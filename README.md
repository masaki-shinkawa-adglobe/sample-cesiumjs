# Sample CesiumJS Proof of Concept

## 概要
本プロジェクトは Next.js と CesiumJS を用いて、3D地図上のエリアを可視化するデモです。
以下の機能を実装しています：

- Cesium Ion の Photorealistic 3D Tiles 表示
- KML ファイルによるポイント、ライン、ポリゴン (四角形・円) の読み込み
- 地形への垂直誇張設定
- カメラ初期ビューとユーザー操作による動的カメラ制御

## 主な構成
- `src/components/MapViewer.tsx`：Cesium Viewer の初期化と KML 読み込みロジック
- `public/kml/sample.kml`：サンプルKML (LookAt, LineString, Polygon 定義)
- `public/Cesium`：Cesium のワーカーやウィジェット CSS などの静的アセット
- `.env.local`：Cesium Ion アクセストークン設定

## セットアップと実行方法
1. リポジトリをクローン
   ```bash
   git clone <repo-url>
   cd sample-cesiumjs
   ```
2. 依存パッケージをインストール
   ```bash
   npm install
   ```
3. Cesium Ion のアクセストークンを取得し、ルートに `.env.local` を作成
   ```dotenv
   NEXT_PUBLIC_CESIUM_ION_TOKEN=YOUR_CESIUM_ION_ACCESS_TOKEN
   ```
4. Cesium の静的アセットを配置
   ```bash
   cp -R node_modules/cesium/Build/Cesium public/Cesium
   ```
5. 開発サーバーを起動
   ```bash
   npm run dev
   ```
6. ブラウザで http://localhost:3000 を開く

## 注意点
- `.gitignore` により `public/Cesium` は無視されています。コミットする際は `.gitkeep` 以外を除外してください。
- KML ファイルのパスは `/kml/sample.kml` を想定しています。必要に応じて変更してください。

## ライセンス
MIT
