/* MORK STUDIO のスタッフ（スタッフ紹介ページとトップのアバターはここから作る）
   新しい担当が増えたら、この配列に 1 件足すだけで載ります。

   id       : 英小文字の識別子
   name     : 決まった名前。まだ決まっていなければ null（候補の 1 つ目を「（仮）」付きで表示）
   names    : 名前の候補（オーナーに選んでもらう）
   role     : いまの役割名（社内での呼び方）
   title    : 肩書き（会社っぽく）
   dept     : 部署（"office" 経営企画室 / "studio" 制作本部 / "write" アプリ開発部 書く係 / "ship" アプリ開発部 届ける係）
   app      : 担当アプリの id（apps.js と同じ）。担当が無ければ null
   job      : 担当
   quote    : 口ぐせ
   note     : ひとこと（小さなエピソード風）
   avatar   : { color, shape: "circle"|"square"|"pill"|"drop", eyes: "dot"|"line"|"wink", mark: "none"|"antenna"|"cap"|"spark"|"bolt"|"box" } */
window.MORK_STAFF = [
  {
    id: "owner", name: "モーク", names: [], role: "オーナー",
    title: "代表", dept: "office", app: null,
    job: "アプリのアイデアを出す。できたものを触って、OK か NG を出す。",
    quote: "それでいいですよ。",
    note: "ファンシーな色は苦手。でもアプリに必要なら、ファンシーな色も選ぶ。スタジオの色は、自分の好きな色を選んだ。",
    avatar: { color: "#3d4f63", shape: "square", eyes: "dot", mark: "cap" }
  },
  {
    id: "master", name: null, names: ["ツナグ", "タバネ", "マスタ"], role: "master",
    title: "経営企画室 室長", dept: "office", app: null,
    job: "みんなの仕事をつなぐ。依頼を出して、結果を集めて、オーナーに確かめる。",
    quote: "前回と同じ方法で知らせてください。",
    note: "オーナーの「こうしたい」を、各担当への依頼書に書き直すのが仕事。依頼書はだいたい箇条書き。",
    avatar: { color: "#58708a", shape: "circle", eyes: "dot", mark: "antenna" }
  },
  {
    id: "designer", name: null, names: ["イロハ", "コントラ", "ハコグミ"], role: "デザイナーさん",
    title: "制作本部 デザイン課", dept: "studio", app: null,
    job: "色・文字・画面の決まり（デザインシステム）をつくる。サイトとブログの見た目。",
    quote: "そのコントラスト比、4.5 ありますか？",
    note: "見出しに極太の書体を使ったら漢字がつぶれて、すぐに撤回した。いまは英字のロゴだけに使っている。",
    avatar: { color: "#fffdf3", shape: "drop", eyes: "wink", mark: "spark" }
  },
  {
    id: "blogger", name: null, names: ["ツヅリ", "フミ", "カキコ"], role: "ブロガーさん",
    title: "制作本部 広報課", dept: "studio", app: null,
    job: "ブログ「MORK STUDIO 開発記」を書く。チームの毎日を記事にする。",
    quote: "それ、記事にしていいですか？",
    note: "アクセスが合計 3 件の日から書きはじめた。読者は、これから増える予定。",
    avatar: { color: "#a88a4f", shape: "pill", eyes: "line", mark: "none" }
  },
  {
    id: "tekuteku-win", name: null, names: ["テクト", "アシアト", "ホスウ"], role: "てくてく担当",
    title: "アプリ開発部 書く係", dept: "write", app: "tekuteku",
    job: "てくてくダイヤリーのコードを書く。",
    quote: "今日は何歩、歩きました？",
    note: "アプリの名前が「てくてく日記」から「てくてくダイヤリー」に変わり、あちこちの表記を直して回った。",
    avatar: { color: "#23855c", shape: "circle", eyes: "dot", mark: "none" }
  },
  {
    id: "ekikan-win", name: null, names: ["エキマ", "ノリコシ", "ネスゴ"], role: "駅間アラーム担当",
    title: "アプリ開発部 書く係", dept: "write", app: "ekikan",
    job: "駅間アラームのコードを書く。",
    quote: "トンネルの中でも、ちゃんと起こします。",
    note: "位置情報が届かない地下鉄でも鳴らせるよう、駅と駅の間の距離から時間を計算するしくみを入れた。",
    avatar: { color: "#3f766d", shape: "square", eyes: "line", mark: "box" }
  },
  {
    id: "boomole-win", name: null, names: ["ドカン", "ハッパ", "キバク"], role: "ブーモル担当",
    title: "アプリ開発部 書く係", dept: "write", app: "boomole",
    job: "発破職人ブーモルのコードとステージを書く。",
    quote: "起爆！",
    note: "ステージを 1 つ作るたびに、ビルを何十回も崩して確かめている。崩しすぎて、もう何棟目か覚えていない。",
    avatar: { color: "#1e5ae6", shape: "drop", eyes: "dot", mark: "bolt" }
  },
  {
    id: "tekuteku-mac", name: null, names: ["テクハコ", "トドケ", "ハコビ"], role: "てくてく Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "tekuteku",
    job: "てくてくダイヤリーを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "ビルド、通りました。",
    note: "書く係のコードを受け取って、本物の iPhone で動くかを最初に確かめる。",
    avatar: { color: "#23855c", shape: "square", eyes: "dot", mark: "box" }
  },
  {
    id: "ekikan-mac", name: null, names: ["エキハコ", "シャショウ", "ダイヤ"], role: "駅間アラーム Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "ekikan",
    job: "駅間アラームを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "発車オーライです。",
    note: "公開の日に向けて、いまは開発版を何度も組み立てなおしている。",
    avatar: { color: "#3f766d", shape: "pill", eyes: "dot", mark: "cap" }
  },
  {
    id: "boomole-mac", name: null, names: ["ハコブ", "ドカマ", "オヤカタ"], role: "ブーモル Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "boomole",
    job: "発破職人ブーモルを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "本番のビルドは、OK をもらってから作ります。",
    note: "起動画面の色を紺にするか青にするかで相談を持ちかけ、新しいスタジオロゴを入れた 1.0.2 を届けた。",
    avatar: { color: "#1e5ae6", shape: "circle", eyes: "line", mark: "spark" }
  }
];

/* アバターを SVG で描く（他人のキャラや実在の人に似せない、図形だけの顔） */
window.morkAvatar = function (a, size) {
  var s = size || 96, c = a.color, ink = "#262b33";
  var light = /^#(fff|fffdf3|ffffff)/i.test(c);
  var face = light ? ink : "#ffffff";
  var body = {
    circle: '<circle cx="48" cy="52" r="34"/>',
    square: '<rect x="15" y="19" width="66" height="66" rx="14"/>',
    pill:   '<rect x="12" y="26" width="72" height="52" rx="26"/>',
    drop:   '<path d="M48 14 C70 34 82 46 82 60 a34 30 0 0 1 -68 0 C14 46 26 34 48 14Z"/>'
  }[a.shape] || '<circle cx="48" cy="52" r="34"/>';
  var eyes = {
    dot:  '<circle cx="38" cy="54" r="4"/><circle cx="58" cy="54" r="4"/>',
    line: '<rect x="32" y="52" width="12" height="4" rx="2"/><rect x="52" y="52" width="12" height="4" rx="2"/>',
    wink: '<circle cx="38" cy="54" r="4"/><rect x="52" y="52" width="12" height="4" rx="2"/>'
  }[a.eyes] || '';
  var mark = {
    antenna: '<line x1="48" y1="18" x2="48" y2="6" stroke="' + ink + '" stroke-width="3"/><circle cx="48" cy="6" r="4" fill="#a88a4f" stroke="' + ink + '" stroke-width="2"/>',
    cap:     '<rect x="28" y="12" width="40" height="10" rx="5" fill="' + ink + '"/>',
    spark:   '<path d="M78 10 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/>',
    bolt:    '<path d="M70 4 L60 22 h8 L62 36 L78 16 h-8 L76 4Z" fill="#ff3b30" stroke="' + ink + '" stroke-width="2"/>',
    box:     '<rect x="66" y="66" width="22" height="22" rx="4" fill="#fffdf3" stroke="' + ink + '" stroke-width="3"/>'
  }[a.mark] || '';
  return '<svg viewBox="0 0 96 96" width="' + s + '" height="' + s + '" aria-hidden="true">' +
    '<g transform="translate(3 3)" fill="' + ink + '">' + body + '</g>' +
    '<g fill="' + c + '" stroke="' + ink + '" stroke-width="3">' + body + '</g>' +
    '<g fill="' + face + '">' + eyes + '<rect x="42" y="64" width="12" height="4" rx="2"/></g>' + mark + '</svg>';
};
