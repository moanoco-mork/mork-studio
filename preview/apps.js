/* MORK STUDIO のアプリ一覧（トップページのカードはここから作る）
   新しいアプリは、この配列に 1 件足すだけで載ります。並びは自動で新しい順。

   id        : 英小文字。サポートページのフォルダ名と同じにする（例 "ekikan" → ekikan/）
   name      : アプリ名
   genre     : ジャンル（App Store のカテゴリ）
   catch     : 一言（30 字くらいまで）
   status    : "released"（公開中） / "soon"（近日公開）
   released  : 公開日 "YYYY-MM-DD"。近日公開は null（いちばん上に並ぶ）
   appStore  : App Store の URL。近日公開は null
   icon      : アイコン画像のパス。まだ無ければ null（アプリ名の頭文字の仮アイコンになる）
   color     : カードに少しだけ使うアプリの色（白い文字が 4.5:1 以上で読める濃さにする） */
window.MORK_APPS = [
  {
    id: "ekikan",
    name: "駅間アラーム",
    genre: "ナビゲーション",
    catch: "降りる駅の手前で、イヤホンにだけアラーム。電車の寝過ごしを防ぎます。",
    status: "soon",
    released: null,
    appStore: null,
    icon: "assets/ekikan-icon.png",
    color: "#3f766d"
  },
  {
    id: "tekuteku",
    name: "てくてくダイヤリー",
    genre: "ライフスタイル",
    catch: "歩いた歩数と行った場所が、カレンダーと日記に自動で残ります。",
    status: "released",
    released: "2026-11-13",
    appStore: "https://apps.apple.com/jp/app/id6834400667",
    icon: "assets/tekuteku-icon.jpg",
    color: "#23855c"
  },
  {
    id: "boomole",
    name: "発破職人ブーモル",
    genre: "ゲーム",
    catch: "ビルのどこに爆弾を仕掛ければ、まっすぐ崩れる？ 物理で崩れる爆破解体パズル。",
    status: "released",
    released: "2026-11-11",
    appStore: "https://apps.apple.com/jp/app/id6832903245",
    icon: "assets/boomole-icon.jpg",
    color: "#1e5ae6"
  }
];
