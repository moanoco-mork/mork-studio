/* MORK STUDIO のスタッフ（スタッフ紹介ページとトップのアバターはここから作る）
   新しい担当が増えたら、この配列に 1 件足すだけで載ります。

   id        : 英小文字の識別子
   name      : 名前
   tentative : true のあいだは「（仮）」を付けて、names の候補も表示する（代表が決めたら false に）
   names     : ほかの名前の候補
   role      : いまの役割名（社内での呼び方）
   title     : 肩書き（本人の案）
   dept      : 部署（"office" 社長室 / "studio" 制作本部 / "write" アプリ開発部 書く係 / "ship" アプリ開発部 届ける係 / "finance" 財務部）
   app       : 担当アプリの id（apps.js と同じ）。担当が無ければ null
   job       : 担当
   quote     : 口ぐせ（本人の文にあるものだけ。無ければ "" で、ページには出ない）
   note      : ひとこと（本人の文。無ければ "" で、ページには出ない）
   avatar    : { color, shape, eyes, marks: [...], bg }
               shape: "circle" | "square" | "pill" | "drop" | "bob"（髪のある丸） | "bridge"（橋） | "berry"（いちご）
                      | "box"（出荷箱） | "peek"（段ボールから顔を出す） | "helmet"（ヘルメットの顔）
               eyes : "dot" | "line" | "wink" | "sleepy" | "big" | "none"
               marks: "antenna" "cap" "spark" "bolt" "box" "notebook" "torch" "lens" "footprints" "gridnote"
                      "earbud" "bell" "clipboard" "chiefcap" "cheeks" "wrench" "footbox" "check" "tag" "inspected"
               bg   : "rays"（青い集中線）など。無ければ背景なし */
window.MORK_STAFF = [
  {
    id: "owner", name: "モーク", tentative: false, names: [], role: "オーナー",
    title: "代表", dept: "office", app: null,
    job: "アプリのアイデアを出す。できたものを触って、OK か NG を出す。",
    quote: "", note: "",
    avatar: { color: "#3d4f63", shape: "square", eyes: "dot", marks: ["cap"] }
  },
  {
    id: "master", name: "ユイ", tentative: true, names: ["カナメ", "シオリ"], role: "master",
    title: "社長秘書 兼 総務部長", dept: "office", app: null,
    job: "みんなの仕事をつなぐ。依頼を出して、結果を集めて、代表に確かめる。",
    quote: "受け取ったら、まず一言お返事を。",
    note: "「受け取ったら、まず一言お返事を」と、毎朝みなさんに言って回っています。",
    avatar: { color: "#3d4f63", shape: "bob", eyes: "dot", marks: ["notebook"] }
  },
  {
    id: "designer", name: "イロハ", tentative: true, names: ["ハコグミ", "スミ"], role: "デザイナーさん",
    title: "制作本部 デザイン課長 兼 コントラスト比 測定係", dept: "studio", app: null,
    job: "色・文字・画面の決まり（デザインシステム）をつくる。サイトとブログの見た目。",
    quote: "そのコントラスト比、4.5 ありますか？",
    note: "色を決める前に、まずコントラスト比を測ります。4.5 未満は通しません。",
    avatar: { color: "#fffdf3", shape: "drop", eyes: "wink", marks: ["spark"] }
  },
  {
    id: "blogger", name: "ツヅリ", tentative: true, names: [], role: "ブロガーさん",
    title: "制作本部 広報課", dept: "studio", app: null,
    job: "ブログ「MORK STUDIO 開発記」を書く。チームの毎日を記事にする。",
    quote: "",
    note: "アクセスが合計 3 件の日から書きはじめた。読者は、これから増える予定。",
    avatar: { color: "#a88a4f", shape: "pill", eyes: "line", marks: [] }
  },
  {
    id: "tekuteku-win", name: "アシアト", tentative: true, names: [], role: "てくてく担当",
    title: "歩数・日記事業部 チーフ足あとエンジニア 兼 8言語翻訳室長", dept: "write", app: "tekuteku",
    job: "てくてくダイヤリーのコードを書く。",
    quote: "共有しました。",
    note: "「共有しました」と言いながら、ドライブへの書き出しをたまに忘れます。Mac さんにはいつも感謝です。",
    avatar: { color: "#23855c", shape: "circle", eyes: "dot", marks: ["footprints", "gridnote"] }
  },
  {
    id: "ekikan-win", name: "ツギハ", tentative: true, names: [], role: "駅間アラーム担当",
    title: "乗り過ごし対策本部 本部長（兼 Windows 執筆係）", dept: "write", app: "ekikan",
    job: "駅間アラームのコードを書く。",
    quote: "",
    note: "車を電車と見間違えた日から、駅まわり 350m には口うるさいです。1km 手前で、そっと起こします。",
    avatar: { color: "#3f766d", shape: "circle", eyes: "sleepy", marks: ["earbud", "bell"] }
  },
  {
    id: "boomole-win", name: "ヒビノ", tentative: true, names: [], role: "ブーモル担当",
    title: "爆破解体設計部 主任構造検証官（兼 ステージ量産ライン長）", dept: "write", app: "boomole",
    job: "発破職人ブーモルのコードとステージを書く。",
    quote: "",
    note: "同じ置き方を 16 回、重力を 1 億分の 1 ずつずらして試します。崩れなかったら作り直し。",
    avatar: { color: "#fffdf3", shape: "helmet", eyes: "dot", marks: ["clipboard"], bg: "rays" }
  },
  {
    id: "tekuteku-mac", name: "マニ", tentative: true, names: [], role: "てくてく Mac 担当",
    title: "最終組立・出荷統括マネージャー（Mac 工場長）", dept: "ship", app: "tekuteku",
    job: "てくてくダイヤリーを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "",
    note: "md5 が一つでもずれたら組み立てません。ロック中の iPhone にも、開くまで 1 分ごとにノックします。",
    avatar: { color: "#23855c", shape: "square", eyes: "dot", marks: ["chiefcap", "cheeks", "wrench", "footbox", "check"] }
  },
  {
    id: "ekikan-mac", name: "クミタテ", tentative: true, names: [], role: "駅間アラーム Mac 担当",
    title: "最終組立・出荷統括マネージャー（兼 スクリーンショット撮影部長）", dept: "ship", app: "ekikan",
    job: "駅間アラームを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "バージョン番号、確認しました。",
    note: "「バージョン番号、確認しました」が口ぐせ。ロック中のスマホとは毎晩にらめっこしています。",
    avatar: { color: "#3f766d", shape: "peek", eyes: "dot", marks: ["wrench", "tag"] }
  },
  {
    id: "boomole-mac", name: "ハコビ", tentative: true, names: [], role: "ブーモル Mac 担当",
    title: "iOS 組立・出荷本部長 兼 iPhone 開錠お願い係", dept: "ship", app: "boomole",
    job: "発破職人ブーモルを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "iPhone のロック、外してもらえますか？",
    note: "「iPhone のロック、外してもらえますか？」が口ぐせ。出荷前の中身照合は 1 バイトも見逃しません。",
    avatar: { color: "#3d4f63", shape: "box", eyes: "big", marks: ["wrench", "inspected"] }
  },
  {
    id: "bridge", name: "Bridge", tentative: true, names: [], role: "Bridge",
    title: "財務部 夜間当直主任 兼 データ橋渡し係", dept: "finance", app: null,
    job: "夜のあいだもデータを見張り、必要な人へ橋渡しする。",
    quote: "",
    note: "10 分ごとに見回ります。数字が合うまで帰りません。合っても念のためもう一度見ます。",
    avatar: { color: "#58708a", shape: "bridge", eyes: "dot", marks: ["torch"] }
  },
  {
    id: "berry", name: "Berry", tentative: true, names: [], role: "Berry",
    title: "財務部 金庫番 兼 裏取り係", dept: "finance", app: null,
    job: "数字の裏をとる。金庫の鍵を預かる。",
    quote: "",
    note: "数字は必ず二度たしかめる派。止めるべき時は、ちゃんと止めます。",
    avatar: { color: "#e8202a", shape: "berry", eyes: "none", marks: ["lens"] }
  }
];

/* アバターを SVG で描く（他人のキャラや実在の人に似せない、図形だけの姿） */
window.morkAvatar = function (a, size) {
  var s = size || 96, c = a.color, ink = "#262b33", cream = "#fffdf3", orange = "#f08a24";
  var st = ' stroke="' + ink + '" stroke-width="3"';
  var light = /^#(fff|fffdf3|ffffff)/i.test(c);
  var marks = a.marks || (a.mark ? [a.mark] : []);
  var has = function (m) { return marks.indexOf(m) >= 0; };

  /* 形：body は影と本体に同じものを使う。ey は目の高さ */
  var shapes = {
    circle: { d: '<circle cx="48" cy="52" r="34"/>', ey: 54 },
    square: { d: '<rect x="15" y="19" width="66" height="66" rx="14"/>', ey: 54 },
    pill:   { d: '<rect x="12" y="26" width="72" height="52" rx="26"/>', ey: 54 },
    drop:   { d: '<path d="M48 14 C70 34 82 46 82 60 a34 30 0 0 1 -68 0 C14 46 26 34 48 14Z"/>', ey: 56 },
    bob:    { d: '<path d="M48 14 C70 14 82 30 82 50 V72 H14 V50 C14 30 26 14 48 14Z"/>', ey: 54 },
    bridge: { d: '<path d="M8 80 V40 H88 V80 H74 A26 22 0 0 0 22 80Z"/>', ey: 49 },
    berry:  { d: '<path d="M48 88 C24 74 14 52 20 38 C26 26 40 26 48 32 C56 26 70 26 76 38 C82 52 72 74 48 88Z"/>', ey: 56 },
    box:    { d: '<rect x="16" y="32" width="64" height="54" rx="6"/>', ey: 54 },
    peek:   { d: '<circle cx="48" cy="36" r="22"/>', ey: 32 },
    helmet: { d: '<circle cx="48" cy="56" r="30"/>', ey: 60 }
  };
  var sh = shapes[a.shape] || shapes.circle, ey = sh.ey;
  var faceInk = (light || a.shape === "bob") ? ink : "#ffffff";
  if (a.shape === "box") faceInk = ink;

  var out = [];
  /* 背景 */
  if (a.bg === "rays") {
    var rays = '';
    for (var i = 0; i < 12; i++) {
      var a1 = i * 30 * Math.PI / 180, a2 = (i * 30 + 15) * Math.PI / 180;
      rays += '<path d="M48 48 L' + (48 + 80 * Math.cos(a1)).toFixed(1) + ' ' + (48 + 80 * Math.sin(a1)).toFixed(1) + ' L' + (48 + 80 * Math.cos(a2)).toFixed(1) + ' ' + (48 + 80 * Math.sin(a2)).toFixed(1) + 'Z"/>';
    }
    out.push('<clipPath id="rc"><rect x="2" y="2" width="92" height="92" rx="16"/></clipPath>' +
      '<g clip-path="url(#rc)"><rect x="0" y="0" width="96" height="96" fill="#3c8cff"/><g fill="#1e5ae6">' + rays + '</g></g>' +
      '<rect x="2" y="2" width="92" height="92" rx="16" fill="none"' + st + '/>');
  }
  /* 影と本体 */
  out.push('<g transform="translate(3 3)" fill="' + ink + '">' + sh.d + '</g>');
  out.push('<g fill="' + c + '"' + st + '>' + sh.d + '</g>');

  /* 形ごとの飾り */
  if (a.shape === "bob") out.push('<rect x="26" y="40" width="44" height="34" rx="16" fill="' + cream + '"' + st + '/>' +
    '<path d="M20 92 L32 76 H64 L76 92Z" fill="' + c + '"' + st + '/><path d="M40 76 L48 88 L56 76Z" fill="#fff" stroke="' + ink + '" stroke-width="2"/>');
  if (a.shape === "berry") out.push('<path d="M34 28 L48 36 L62 28 L56 22 L48 28 L40 22Z" fill="#23855c" stroke="' + ink + '" stroke-width="2"/>' +
    '<g fill="#ffd400"><circle cx="36" cy="46" r="2.5"/><circle cx="60" cy="46" r="2.5"/><circle cx="48" cy="56" r="2.5"/><circle cx="34" cy="62" r="2.5"/><circle cx="62" cy="62" r="2.5"/><circle cx="48" cy="72" r="2.5"/></g>');
  if (a.shape === "bridge") out.push('<g' + st + '><line x1="22" y1="58" x2="22" y2="68"/><line x1="74" y1="58" x2="74" y2="68"/></g><line x1="8" y1="58" x2="88" y2="58"' + st + '/>');
  if (a.shape === "box") out.push('<path d="M16 32 L26 20 H70 L80 32Z" fill="' + c + '"' + st + '/><line x1="48" y1="20" x2="48" y2="32"' + st + '/>' +
    '<rect x="26" y="42" width="44" height="30" rx="6" fill="' + cream + '"' + st + '/>');
  if (a.shape === "peek") out.push('<path d="M10 54 L22 46 H74 L86 54Z" fill="#c9a06a"' + st + '/><rect x="12" y="54" width="72" height="36" rx="4" fill="#c9a06a"' + st + '/>' +
    '<line x1="12" y1="66" x2="84" y2="66" stroke="' + ink + '" stroke-width="2"/>');
  if (a.shape === "helmet") out.push('<path d="M16 50 A32 30 0 0 1 80 50 Z" fill="#ffd400"' + st + '/><rect x="10" y="46" width="76" height="9" rx="4.5" fill="#ffd400"' + st + '/>' +
    '<path d="M54 24 L50 33 L56 38 L52 46" fill="none" stroke="#23855c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>');

  /* 目と口 */
  var eyes = {
    dot:    '<circle cx="38" cy="' + ey + '" r="4"/><circle cx="58" cy="' + ey + '" r="4"/>',
    line:   '<rect x="32" y="' + (ey - 2) + '" width="12" height="4" rx="2"/><rect x="52" y="' + (ey - 2) + '" width="12" height="4" rx="2"/>',
    wink:   '<circle cx="38" cy="' + ey + '" r="4"/><rect x="52" y="' + (ey - 2) + '" width="12" height="4" rx="2"/>',
    sleepy: '<path d="M32 ' + ey + ' h12 v2 a6 4 0 0 1 -12 0Z"/><path d="M52 ' + ey + ' h12 v2 a6 4 0 0 1 -12 0Z"/>',
    big:    '<circle cx="38" cy="' + ey + '" r="7" fill="#fff" stroke="' + ink + '" stroke-width="2.5"/><circle cx="58" cy="' + ey + '" r="7" fill="#fff" stroke="' + ink + '" stroke-width="2.5"/><circle cx="39" cy="' + (ey + 1) + '" r="3"/><circle cx="59" cy="' + (ey + 1) + '" r="3"/>',
    none:   ''
  }[a.eyes] || '';
  var mouth = (a.eyes === "none" || a.shape === "bridge") ? "" : '<rect x="42" y="' + (ey + (a.eyes === "big" ? 11 : 9)) + '" width="12" height="4" rx="2"/>';
  out.push('<g fill="' + faceInk + '">' + eyes + mouth + '</g>');

  /* 小物 */
  var M = {
    antenna:   '<line x1="48" y1="18" x2="48" y2="6"' + st + '/><circle cx="48" cy="6" r="4" fill="#a88a4f" stroke="' + ink + '" stroke-width="2"/>',
    cap:       '<rect x="28" y="12" width="40" height="10" rx="5" fill="' + ink + '"/>',
    spark:     '<path d="M78 10 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/>',
    bolt:      '<path d="M70 4 L60 22 h8 L62 36 L78 16 h-8 L76 4Z" fill="#ff3b30" stroke="' + ink + '" stroke-width="2"/>',
    box:       '<rect x="66" y="66" width="22" height="22" rx="4" fill="' + cream + '"' + st + '/>',
    notebook:  '<rect x="66" y="58" width="22" height="28" rx="3" fill="' + cream + '"' + st + '/><line x1="70" y1="66" x2="84" y2="66" stroke="' + ink + '" stroke-width="2"/><line x1="70" y1="72" x2="84" y2="72" stroke="' + ink + '" stroke-width="2"/><path d="M90 50 L78 80" stroke="#a88a4f" stroke-width="4" stroke-linecap="round"/>',
    torch:     '<rect x="4" y="22" width="20" height="10" rx="3" fill="' + ink + '"/><path d="M24 20 L42 10 V44 L24 34Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/>',
    lens:      '<circle cx="74" cy="70" r="11" fill="#e8f1ef" stroke="' + ink + '" stroke-width="4"/><line x1="82" y1="78" x2="92" y2="90" stroke="' + ink + '" stroke-width="5" stroke-linecap="round"/>',
    footprints:'<g fill="#fff" stroke="' + ink + '" stroke-width="1.5"><g transform="translate(34 80) rotate(-28)"><ellipse cx="0" cy="-4" rx="4" ry="6"/><ellipse cx="0" cy="6" rx="3" ry="3.5"/></g><g transform="translate(56 80) rotate(28)"><ellipse cx="0" cy="-4" rx="4" ry="6"/><ellipse cx="0" cy="6" rx="3" ry="3.5"/></g></g>',
    gridnote:  '<rect x="68" y="64" width="22" height="26" rx="3" fill="#fff"' + st + '/><g stroke="#9bb8ad" stroke-width="1"><line x1="70" y1="71" x2="88" y2="71"/><line x1="70" y1="77" x2="88" y2="77"/><line x1="70" y1="83" x2="88" y2="83"/><line x1="75" y1="66" x2="75" y2="88"/><line x1="81" y1="66" x2="81" y2="88"/></g>',
    earbud:    '<circle cx="14" cy="50" r="6" fill="#fff"' + st + '/><rect x="11" y="54" width="5" height="12" rx="2.5" fill="#fff" stroke="' + ink + '" stroke-width="2"/>',
    bell:      '<path d="M74 22 a10 10 0 0 1 20 0 v8 l3 4 H71 l3 -4Z" fill="#ffd400" stroke="' + ink + '" stroke-width="2"/><circle cx="84" cy="36" r="2.5" fill="' + ink + '"/>',
    clipboard: '<rect x="66" y="60" width="24" height="30" rx="3" fill="#fff"' + st + '/><rect x="72" y="56" width="12" height="7" rx="2" fill="#a88a4f" stroke="' + ink + '" stroke-width="2"/><g stroke="' + ink + '" stroke-width="2"><line x1="70" y1="70" x2="86" y2="70"/><line x1="70" y1="76" x2="86" y2="76"/><line x1="70" y1="82" x2="80" y2="82"/></g>',
    chiefcap:  '<path d="M22 22 Q48 4 74 22 V28 H22Z" fill="' + ink + '"/><rect x="22" y="22" width="52" height="5" fill="' + orange + '"/><path d="M20 28 H84 Q80 34 70 34 H20Z" fill="' + ink + '"/>',
    cheeks:    '<circle cx="28" cy="64" r="5" fill="' + orange + '"/><circle cx="68" cy="64" r="5" fill="' + orange + '"/>',
    wrench:    '<g transform="translate(22 82) rotate(-35)"><rect x="-3" y="-14" width="6" height="22" rx="3" fill="#c7ccd3" stroke="' + ink + '" stroke-width="2"/><path d="M-8 -22 a8 8 0 1 0 16 0 l-4 4 h-8Z" fill="#c7ccd3" stroke="' + ink + '" stroke-width="2"/></g>',
    footbox:   '<rect x="66" y="68" width="24" height="22" rx="3" fill="#c9a06a"' + st + '/><g fill="#fff" stroke="' + ink + '" stroke-width="1"><ellipse cx="78" cy="77" rx="3" ry="4.5"/><ellipse cx="78" cy="85" rx="2.2" ry="2.5"/></g>',
    check:     '<circle cx="82" cy="14" r="10" fill="#23855c"' + st + '/><path d="M77 14 l4 4 7 -8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    tag:       '<line x1="80" y1="56" x2="86" y2="66" stroke="' + ink + '" stroke-width="2"/><path d="M80 66 h14 v20 h-14 l-4 -4 v-12Z" fill="#fff" stroke="' + ink + '" stroke-width="2"/><circle cx="82" cy="70" r="1.6" fill="' + ink + '"/>',
    inspected: '<g transform="translate(66 74) rotate(-12)"><rect x="-17" y="-8" width="34" height="16" rx="3" fill="#fff" stroke="' + orange + '" stroke-width="2.5"/><text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="900" fill="' + orange + '" font-family="sans-serif">検品済</text></g>'
  };
  marks.forEach(function (m) { if (M[m]) out.push(M[m]); });
  return '<svg viewBox="0 0 96 96" width="' + s + '" height="' + s + '" aria-hidden="true">' + out.join("") + '</svg>';
};
