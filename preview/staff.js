/* MORK STUDIO のスタッフ（スタッフ紹介ページとトップのアバターはここから作る）
   新しい担当が増えたら、この配列に 1 件足すだけで載ります。

   id        : 英小文字の識別子
   name      : 名前
   tentative : true のあいだは「（仮）」を付けて、names の候補も表示する（オーナーが決めたら false に）
   names     : ほかの名前の候補
   role      : いまの役割名（社内での呼び方）
   title     : 肩書き（会社っぽく、少し大げさに）
   dept      : 部署（"office" 社長室 / "studio" 制作本部 / "write" アプリ開発部 書く係 / "ship" アプリ開発部 届ける係 / "finance" 財務部）
   app       : 担当アプリの id（apps.js と同じ）。担当が無ければ null
   job       : 担当
   quote     : 口ぐせ
   note      : ひとこと（小さなエピソード風）
   avatar    : { color, shape, eyes, mark }
               shape: "circle" | "square" | "pill" | "drop" | "bob"（髪のある丸） | "bridge"（橋） | "berry"（いちご）
               eyes : "dot" | "line" | "wink" | "none"
               mark : "none" | "antenna" | "cap" | "spark" | "bolt" | "box" | "notebook" | "torch" | "lens"
   ※ 名前・肩書き・ひとことの多くは仮。本人たちに聞いた案を、オーナーが選んでから確定する。 */
window.MORK_STAFF = [
  {
    id: "owner", name: "モーク", tentative: false, names: [], role: "オーナー",
    title: "代表", dept: "office", app: null,
    job: "アプリのアイデアを出す。できたものを触って、OK か NG を出す。",
    quote: "それでいいですよ。",
    note: "ファンシーな色は苦手。でもアプリに必要なら、ファンシーな色も選ぶ。スタジオの色は、自分の好きな色を選んだ。",
    avatar: { color: "#3d4f63", shape: "square", eyes: "dot", mark: "cap" }
  },
  {
    id: "master", name: "ユイ", tentative: true, names: ["カナメ", "シオリ"], role: "master",
    title: "社長秘書 兼 総務部長", dept: "office", app: null,
    job: "みんなの仕事をつなぐ。依頼を出して、結果を集めて、オーナーに確かめる。",
    quote: "受け取ったら、まず一言お返事を。",
    note: "「受け取ったら、まず一言お返事を」と、毎朝みなさんに言って回っています。",
    avatar: { color: "#3d4f63", shape: "bob", eyes: "dot", mark: "notebook" }
  },
  {
    id: "designer", name: "イロハ", tentative: true, names: ["ハコグミ", "スミ"], role: "デザイナーさん",
    title: "制作本部 デザイン課長 兼 コントラスト比 測定係", dept: "studio", app: null,
    job: "色・文字・画面の決まり（デザインシステム）をつくる。サイトとブログの見た目。",
    quote: "そのコントラスト比、4.5 ありますか？",
    note: "色を決める前に、まずコントラスト比を測ります。見出しに極太の書体を使って漢字をつぶしたことは、なかったことにしています。",
    avatar: { color: "#fffdf3", shape: "drop", eyes: "wink", mark: "spark" }
  },
  {
    id: "blogger", name: "ツヅリ", tentative: true, names: ["フミ"], role: "ブロガーさん",
    title: "制作本部 広報課", dept: "studio", app: null,
    job: "ブログ「MORK STUDIO 開発記」を書く。チームの毎日を記事にする。",
    quote: "それ、記事にしていいですか？",
    note: "アクセスが合計 3 件の日から書きはじめた。読者は、これから増える予定。",
    avatar: { color: "#a88a4f", shape: "pill", eyes: "line", mark: "none" }
  },
  {
    id: "tekuteku-win", name: "アシアト", tentative: true, names: [], role: "てくてく担当",
    title: "アプリ開発部 書く係", dept: "write", app: "tekuteku",
    job: "てくてくダイヤリーのコードを書く。",
    quote: "今日は何歩、歩きました？",
    note: "アプリの名前が「てくてく日記」から「てくてくダイヤリー」に変わり、あちこちの表記を直して回った。",
    avatar: { color: "#23855c", shape: "circle", eyes: "dot", mark: "none" }
  },
  {
    id: "ekikan-win", name: "ツギハ", tentative: true, names: [], role: "駅間アラーム担当",
    title: "アプリ開発部 書く係", dept: "write", app: "ekikan",
    job: "駅間アラームのコードを書く。",
    quote: "トンネルの中でも、ちゃんと起こします。",
    note: "位置情報が届かない地下鉄でも鳴らせるよう、駅と駅の間の距離から時間を計算するしくみを入れた。",
    avatar: { color: "#3f766d", shape: "square", eyes: "line", mark: "box" }
  },
  {
    id: "boomole-win", name: "ヒビノ", tentative: true, names: [], role: "ブーモル担当",
    title: "アプリ開発部 書く係", dept: "write", app: "boomole",
    job: "発破職人ブーモルのコードとステージを書く。",
    quote: "起爆！",
    note: "ステージを 1 つ作るたびに、ビルを何十回も崩して確かめている。",
    avatar: { color: "#1e5ae6", shape: "drop", eyes: "dot", mark: "bolt" }
  },
  {
    id: "tekuteku-mac", name: "マニ", tentative: true, names: [], role: "てくてく Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "tekuteku",
    job: "てくてくダイヤリーを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "ビルド、通りました。",
    note: "書く係のコードを受け取って、本物の iPhone で動くかを最初に確かめる。",
    avatar: { color: "#23855c", shape: "square", eyes: "dot", mark: "box" }
  },
  {
    id: "ekikan-mac", name: "クミタテ", tentative: true, names: [], role: "駅間アラーム Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "ekikan",
    job: "駅間アラームを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "発車オーライです。",
    note: "公開の日に向けて、いまは開発版を何度も組み立てなおしている。",
    avatar: { color: "#3f766d", shape: "pill", eyes: "dot", mark: "cap" }
  },
  {
    id: "boomole-mac", name: "ハコビ", tentative: true, names: [], role: "ブーモル Mac 担当",
    title: "アプリ開発部 届ける係", dept: "ship", app: "boomole",
    job: "発破職人ブーモルを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "本番のビルドは、OK をもらってから作ります。",
    note: "起動画面の色を紺にするか青にするかで相談を持ちかけ、新しいスタジオロゴを入れた 1.0.2 を届けた。",
    avatar: { color: "#1e5ae6", shape: "circle", eyes: "line", mark: "spark" }
  },
  {
    id: "bridge", name: "Bridge", tentative: true, names: [], role: "Bridge",
    title: "財務部 夜間当直主任 兼 データ橋渡し係", dept: "finance", app: null,
    job: "夜のあいだもデータを見張り、必要な人へ橋渡しする。（仮の文。本人に聞いています）",
    quote: "異常なし。引き続き見張ります。",
    note: "（仮）懐中電灯を片手に、夜の当直を引き受けている。",
    avatar: { color: "#58708a", shape: "bridge", eyes: "dot", mark: "torch" }
  },
  {
    id: "berry", name: "Berry", tentative: true, names: [], role: "Berry",
    title: "財務部 金庫番 兼 裏取り係", dept: "finance", app: null,
    job: "数字の裏をとる。金庫の鍵を預かる。（仮の文。本人に聞いています）",
    quote: "その数字、裏はとれていますか？",
    note: "（仮）虫めがねで、まず一次資料を確かめる。",
    avatar: { color: "#e8202a", shape: "berry", eyes: "none", mark: "lens" }
  }
];

/* アバターを SVG で描く（他人のキャラや実在の人に似せない、図形だけの姿） */
window.morkAvatar = function (a, size) {
  var s = size || 96, c = a.color, ink = "#262b33";
  var light = /^#(fff|fffdf3|ffffff)/i.test(c);
  var face = light ? ink : "#ffffff";
  var body = {
    circle: '<circle cx="48" cy="52" r="34"/>',
    square: '<rect x="15" y="19" width="66" height="66" rx="14"/>',
    pill:   '<rect x="12" y="26" width="72" height="52" rx="26"/>',
    drop:   '<path d="M48 14 C70 34 82 46 82 60 a34 30 0 0 1 -68 0 C14 46 26 34 48 14Z"/>',
    bob:    '<path d="M48 14 C70 14 82 30 82 50 V72 H14 V50 C14 30 26 14 48 14Z"/>',
    bridge: '<path d="M8 80 V46 H88 V80 H74 A26 22 0 0 0 22 80Z"/>',
    berry:  '<path d="M48 88 C24 74 14 52 20 38 C26 26 40 26 48 32 C56 26 70 26 76 38 C82 52 72 74 48 88Z"/>'
  }[a.shape] || '<circle cx="48" cy="52" r="34"/>';
  var eyeY = a.shape === "bridge" ? 60 : 54;
  var eyes = {
    dot:  '<circle cx="38" cy="' + eyeY + '" r="4"/><circle cx="58" cy="' + eyeY + '" r="4"/>',
    line: '<rect x="32" y="' + (eyeY - 2) + '" width="12" height="4" rx="2"/><rect x="52" y="' + (eyeY - 2) + '" width="12" height="4" rx="2"/>',
    wink: '<circle cx="38" cy="' + eyeY + '" r="4"/><rect x="52" y="' + (eyeY - 2) + '" width="12" height="4" rx="2"/>',
    none: ''
  }[a.eyes] || '';
  var mouth = a.eyes === "none" ? "" : '<rect x="42" y="' + (eyeY + 10) + '" width="12" height="4" rx="2"/>';
  /* 形ごとの飾り（髪の顔の部分、いちごの種とへた） */
  var extra = "";
  if (a.shape === "bob") extra = '<rect x="26" y="40" width="44" height="34" rx="16" fill="#fffdf3" stroke="' + ink + '" stroke-width="3"/>' +
    '<path d="M20 92 L32 76 H64 L76 92Z" fill="' + c + '" stroke="' + ink + '" stroke-width="3"/><path d="M40 76 L48 88 L56 76Z" fill="#fff" stroke="' + ink + '" stroke-width="2"/>';
  if (a.shape === "berry") extra = '<path d="M34 28 L48 36 L62 28 L56 22 L48 28 L40 22Z" fill="#23855c" stroke="' + ink + '" stroke-width="2"/>' +
    '<g fill="#ffd400"><circle cx="36" cy="46" r="2.5"/><circle cx="60" cy="46" r="2.5"/><circle cx="48" cy="56" r="2.5"/><circle cx="34" cy="62" r="2.5"/><circle cx="62" cy="62" r="2.5"/><circle cx="48" cy="72" r="2.5"/></g>';
  if (a.shape === "bridge") extra = '<g stroke="' + ink + '" stroke-width="3"><line x1="30" y1="46" x2="30" y2="62"/><line x1="48" y1="46" x2="48" y2="58"/><line x1="66" y1="46" x2="66" y2="62"/></g>';
  var faceInk = a.shape === "bob" ? ink : face;
  var mark = {
    antenna:  '<line x1="48" y1="18" x2="48" y2="6" stroke="' + ink + '" stroke-width="3"/><circle cx="48" cy="6" r="4" fill="#a88a4f" stroke="' + ink + '" stroke-width="2"/>',
    cap:      '<rect x="28" y="12" width="40" height="10" rx="5" fill="' + ink + '"/>',
    spark:    '<path d="M78 10 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/>',
    bolt:     '<path d="M70 4 L60 22 h8 L62 36 L78 16 h-8 L76 4Z" fill="#ff3b30" stroke="' + ink + '" stroke-width="2"/>',
    box:      '<rect x="66" y="66" width="22" height="22" rx="4" fill="#fffdf3" stroke="' + ink + '" stroke-width="3"/>',
    notebook: '<rect x="66" y="58" width="22" height="28" rx="3" fill="#fffdf3" stroke="' + ink + '" stroke-width="3"/><line x1="70" y1="66" x2="84" y2="66" stroke="' + ink + '" stroke-width="2"/><line x1="70" y1="72" x2="84" y2="72" stroke="' + ink + '" stroke-width="2"/><path d="M90 50 L78 80" stroke="#a88a4f" stroke-width="4" stroke-linecap="round"/>',
    torch:    '<rect x="4" y="22" width="20" height="10" rx="3" fill="#262b33"/><path d="M24 20 L42 10 V44 L24 34Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/>',
    lens:     '<circle cx="74" cy="70" r="11" fill="#e8f1ef" stroke="' + ink + '" stroke-width="4"/><line x1="82" y1="78" x2="92" y2="90" stroke="' + ink + '" stroke-width="5" stroke-linecap="round"/>'
  }[a.mark] || '';
  return '<svg viewBox="0 0 96 96" width="' + s + '" height="' + s + '" aria-hidden="true">' +
    '<g transform="translate(3 3)" fill="' + ink + '">' + body + '</g>' +
    '<g fill="' + c + '" stroke="' + ink + '" stroke-width="3">' + body + '</g>' + extra +
    '<g fill="' + faceInk + '">' + eyes + mouth + '</g>' + mark + '</svg>';
};
