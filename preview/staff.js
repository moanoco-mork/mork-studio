/* MORK STUDIO のスタッフ（スタッフ紹介ページとトップのアバターはここから作る）
   新しい担当が増えたら、この配列に 1 件足すだけで載ります。

   id        : 英小文字の識別子
   name      : 名前
   hidden    : true にすると、どのページにも出さない（一時的に外すとき）
   tentative : true のあいだは「（仮）」を付けて、names の候補も表示する
   names     : ほかの名前の候補
   role      : 社内での呼び方
   title     : 肩書き（本人の案）
   dept      : 部署（"office" 社長室 / "studio" 制作本部 / "write" アプリ開発部 書く係 / "ship" アプリ開発部 届ける係 / "finance" 財務部）
   app       : 担当アプリの id（apps.js と同じ）。担当が無ければ null
   job       : 担当
   quote     : 口ぐせ（無ければ "" で、ページには出ない）
   note      : ひとこと（無ければ "" で、ページには出ない）
   avatar    : 人のキャラクターの組み合わせ（下の morkAvatar が描く）
     skin    : 肌の色
     hair    : 髪型 "short" | "bob" | "bun" | "side" | "messy" | "long" | "crop"
     hairColor
     outfit  : 服 "tee" | "hoodie" | "jacket" | "overall" | "apron" | "vest"
     color   : 服の色（スタジオの色かアプリの色）
     eyes    : "dot" | "smile" | "sleepy" | "wink" | "round"
     hat     : "none" | "helmet" | "chiefcap" | "bandana"
     items   : 持ち物・小物の配列
     bg      : 背景 "rays"（青い集中線）など。無ければなし */
window.MORK_STAFF_ALL = [
  {
    id: "owner", name: "モーク", tentative: false, names: [], role: "オーナー",
    title: "代表", dept: "office", app: null,
    job: "アプリのアイデアを出す。できたものを触って、OK か NG を出す。",
    quote: "それでいいよ", note: "",
    avatar: { skin: "#f2cfae", hair: "crop", hairColor: "#262b33", outfit: "hoodie", color: "#3d4f63", eyes: "dot", hat: "none", items: ["mug"] }
  },
  {
    id: "master", name: "ユイ", tentative: false, names: [], role: "master",
    title: "社長秘書 兼 総務部長", dept: "office", app: null,
    job: "みんなの仕事をつなぐ。依頼を出して、結果を集めて、代表に確かめる。",
    quote: "受け取ったら、まず一言お返事を。",
    note: "「受け取ったら、まず一言お返事を」と、毎朝みなさんに言って回っています。",
    avatar: { skin: "#f6d6b8", hair: "bob", hairColor: "#4a3428", outfit: "jacket", color: "#3d4f63", eyes: "smile", hat: "none", items: ["notebook"] }
  },
  {
    id: "designer", name: "イロハ", tentative: false, names: [], role: "デザイナーさん",
    title: "制作本部 デザイン課長 兼 コントラスト比 測定係", dept: "studio", app: null,
    job: "色・文字・画面の決まり（デザインシステム）をつくる。サイトとブログの見た目。",
    quote: "そのコントラスト比、4.5 ありますか？",
    note: "色を決める前に、まずコントラスト比を測ります。4.5 未満は通しません。",
    avatar: { skin: "#f6d6b8", hair: "bun", hairColor: "#3d4f63", outfit: "tee", color: "#fffdf3", eyes: "wink", hat: "none", items: ["starpin", "swatch"] }
  },
  {
    id: "web", name: "ツヅリ", tentative: false, names: [], role: "WEB 担当",
    title: "制作本部 WEB 担当", dept: "studio", app: null,
    job: "スタジオのウェブまわりを整える。",
    quote: "",
    note: "現場で生まれた一言を拾い集め、残しておける形に整えるのが仕事です。",
    avatar: { skin: "#f2cfae", hair: "side", hairColor: "#6b4a33", outfit: "vest", color: "#a88a4f", eyes: "dot", hat: "none", items: ["pen"] }
  },
  {
    id: "tekuteku-win", name: "アシアト", tentative: false, names: [], role: "てくてく担当",
    title: "歩数・日記事業部 チーフ足あとエンジニア 兼 8言語翻訳室長", dept: "write", app: "tekuteku",
    job: "てくてくダイヤリーのコードを書く。",
    quote: "共有しました。",
    note: "「共有しました」と言いながら、ドライブへの書き出しをたまに忘れます。Mac さんにはいつも感謝です。",
    avatar: { skin: "#f2cfae", hair: "messy", hairColor: "#262b33", outfit: "tee", color: "#23855c", eyes: "dot", hat: "none", items: ["footprints", "gridnote"] }
  },
  {
    id: "ekikan-win", name: "ツギハ", tentative: false, names: [], role: "駅間アラーム担当",
    title: "乗り過ごし対策本部 本部長（兼 Windows 執筆係）", dept: "write", app: "ekikan",
    job: "駅間アラームのコードを書く。",
    quote: "",
    note: "車を電車と見間違えた日から、駅まわり 350m には口うるさいです。1km 手前で、そっと起こします。",
    avatar: { skin: "#f6d6b8", hair: "short", hairColor: "#58708a", outfit: "hoodie", color: "#3f766d", eyes: "sleepy", hat: "none", items: ["earbud", "bell"] }
  },
  {
    id: "boomole-win", name: "ヒビノ", tentative: false, names: [], role: "ブーモル担当",
    title: "爆破解体設計部 主任構造検証官（兼 ステージ量産ライン長）", dept: "write", app: "boomole",
    job: "発破職人ブーモルのコードとステージを書く。",
    quote: "",
    note: "同じ置き方を 16 回、重力を 1 億分の 1 ずつずらして試します。崩れなかったら作り直し。",
    avatar: { skin: "#f2cfae", hair: "short", hairColor: "#6b4a33", outfit: "vest", color: "#1e5ae6", eyes: "round", hat: "helmet", items: ["clipboard"], bg: "rays" }
  },
  {
    id: "tekuteku-mac", name: "マニ", tentative: false, names: [], role: "てくてく Mac 担当",
    title: "最終組立・出荷統括マネージャー（Mac 工場長）", dept: "ship", app: "tekuteku",
    job: "てくてくダイヤリーを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "",
    note: "md5 が一つでもずれたら組み立てません。ロック中の iPhone にも、開くまで 1 分ごとにノックします。",
    avatar: { skin: "#f6d6b8", hair: "short", hairColor: "#262b33", outfit: "overall", color: "#23855c", eyes: "dot", hat: "chiefcap", items: ["cheeks", "checkpin", "wrench", "footbox"] }
  },
  {
    id: "ekikan-mac", name: "クミタテ", tentative: false, names: [], role: "駅間アラーム Mac 担当",
    title: "最終組立・出荷統括マネージャー（兼 スクリーンショット撮影部長）", dept: "ship", app: "ekikan",
    job: "駅間アラームを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "バージョン番号、確認しました。",
    note: "「バージョン番号、確認しました」が口ぐせ。ロック中のスマホとは毎晩にらめっこしています。",
    avatar: { skin: "#f2cfae", hair: "messy", hairColor: "#4a3428", outfit: "tee", color: "#3f766d", eyes: "round", hat: "none", items: ["cardboard", "tag", "wrench"] }
  },
  {
    id: "boomole-mac", name: "ハコビ", tentative: false, names: [], role: "ブーモル Mac 担当",
    title: "iOS 組立・出荷本部長 兼 iPhone 開錠お願い係", dept: "ship", app: "boomole",
    job: "発破職人ブーモルを Mac で組み立てて、iPhone と App Store に届ける。",
    quote: "iPhone のロック、外してもらえますか？",
    note: "「iPhone のロック、外してもらえますか？」が口ぐせ。出荷前の中身照合は 1 バイトも見逃しません。",
    avatar: { skin: "#f6d6b8", hair: "crop", hairColor: "#262b33", outfit: "apron", color: "#3d4f63", eyes: "dot", hat: "bandana", items: ["shipbox", "wrench"] }
  },
  {
    id: "bridge", name: "Bridge", tentative: false, names: [], role: "Bridge",
    title: "財務部 夜間当直主任 兼 データ橋渡し係", dept: "finance", app: null,
    job: "夜のあいだもデータを見張り、必要な人へ橋渡しする。",
    quote: "",
    note: "10 分ごとに見回ります。数字が合うまで帰りません。合っても念のためもう一度見ます。",
    avatar: { skin: "#f2cfae", hair: "side", hairColor: "#262b33", outfit: "jacket", color: "#58708a", eyes: "dot", hat: "none", items: ["bridgepin", "torch"] }
  },
  {
    id: "berry", name: "Berry", tentative: false, names: [], role: "Berry",
    title: "財務部 金庫番 兼 裏取り係", dept: "finance", app: null,
    job: "数字の裏をとる。金庫の鍵を預かる。",
    quote: "",
    note: "数字は必ず二度たしかめる派。止めるべき時は、ちゃんと止めます。",
    avatar: { skin: "#f6d6b8", hair: "long", hairColor: "#6b4a33", outfit: "vest", color: "#e8202a", eyes: "smile", hat: "none", items: ["berrypin", "lens"] }
  }
];
window.MORK_STAFF = window.MORK_STAFF_ALL.filter(function (p) { return !p.hidden; });

/* アバター：かわいい人のキャラクター（胸から上）。黒い線とぼかさない影。
   実在の人や有名なキャラクターには似せない、図形の組み合わせだけで描く */
(function () {
  var uid = 0;
  window.morkAvatar = function (a, size) {
    var s = size || 96, id = "av" + (++uid);
    var ink = "#262b33", cream = "#fffdf3", orange = "#f08a24", blush = "#f19b8f";
    var st = ' stroke="' + ink + '" stroke-width="2.5" stroke-linejoin="round"';
    var items = a.items || [], has = function (k) { return items.indexOf(k) >= 0; };
    var skin = a.skin || "#f2cfae", hc = a.hairColor || ink, c = a.color || "#3d4f63";
    var light = /^#(fff|fffdf3|ffffff)/i.test(c);
    var o = [];

    /* 背景 */
    if (a.bg === "rays") {
      var r = "";
      for (var i = 0; i < 12; i++) {
        var a1 = i * 30 * Math.PI / 180, a2 = (i * 30 + 15) * Math.PI / 180;
        r += '<path d="M48 40 L' + (48 + 90 * Math.cos(a1)).toFixed(1) + " " + (40 + 90 * Math.sin(a1)).toFixed(1) + " L" + (48 + 90 * Math.cos(a2)).toFixed(1) + " " + (40 + 90 * Math.sin(a2)).toFixed(1) + 'Z"/>';
      }
      o.push('<clipPath id="' + id + 'c"><rect x="2" y="2" width="92" height="92" rx="16"/></clipPath><g clip-path="url(#' + id + 'c)"><rect width="96" height="96" fill="#3c8cff"/><g fill="#1e5ae6">' + r + '</g></g><rect x="2" y="2" width="92" height="92" rx="16" fill="none"' + st + "/>");
    }

    var BODY = "M12 96 C12 78 25 70 48 70 C71 70 84 78 84 96Z";
    var HEAD = '<circle cx="48" cy="42" r="21"/>';
    /* 髪（後ろ） */
    var hairBack = {
      bob:  "M25 40 C25 21 36 16 48 16 C60 16 71 21 71 40 V60 C71 64 65 65 63 61 V46 H33 V61 C31 65 25 64 25 60Z",
      long: "M25 40 C25 21 36 16 48 16 C60 16 71 21 71 40 V74 C71 78 64 78 63 74 V50 H33 V74 C32 78 25 78 25 74Z"
    }[a.hair];

    /* 影（体＋頭）*/
    o.push('<g transform="translate(3 3)" fill="' + ink + '"><path d="' + BODY + '"/>' + HEAD + (hairBack ? '<path d="' + hairBack + '"/>' : "") + "</g>");
    if (hairBack) o.push('<path d="' + hairBack + '" fill="' + hc + '"' + st + "/>");
    if (a.hair === "bun") o.push('<circle cx="48" cy="17" r="8" fill="' + hc + '"' + st + "/>");

    /* 体と服 */
    o.push('<path d="' + BODY + '" fill="' + c + '"' + st + "/>");
    o.push('<rect x="42" y="58" width="12" height="14" fill="' + skin + '"' + st + "/>");
    var lineInk = light ? ink : "rgba(255,255,255,.55)";
    var outfit = {
      tee:     '<path d="M39 71 Q48 79 57 71" fill="' + skin + '"' + st + "/>",
      hoodie:  '<path d="M32 74 C38 82 58 82 64 74" fill="none"' + st + '/><g stroke="' + ink + '" stroke-width="2"><line x1="43" y1="79" x2="42" y2="88"/><line x1="53" y1="79" x2="54" y2="88"/></g>',
      jacket:  '<path d="M40 70 L48 86 L56 70Z" fill="#fff"' + st + '/><path d="M40 70 L44 82 L36 76Z M56 70 L52 82 L60 76Z" fill="' + c + '"' + st + "/>",
      overall: '<path d="M39 71 Q48 79 57 71" fill="' + skin + '"' + st + '/><rect x="34" y="80" width="28" height="16" fill="' + c + '"' + st + '/><line x1="36" y1="80" x2="34" y2="72"' + st + '/><line x1="60" y1="80" x2="62" y2="72"' + st + "/>",
      apron:   '<path d="M39 71 Q48 79 57 71" fill="' + skin + '"' + st + '/><path d="M34 78 H62 V96 H34Z" fill="' + orange + '"' + st + '/><line x1="38" y1="78" x2="40" y2="71" stroke="' + orange + '" stroke-width="3"/><line x1="58" y1="78" x2="56" y2="71" stroke="' + orange + '" stroke-width="3"/>',
      vest:    '<path d="M40 70 L48 82 L56 70Z" fill="' + cream + '"' + st + '/><line x1="48" y1="82" x2="48" y2="96" stroke="' + lineInk + '" stroke-width="2"/>'
    }[a.outfit] || "";
    o.push(outfit);

    /* 頭 */
    o.push('<circle cx="27" cy="45" r="4" fill="' + skin + '"' + st + '/><circle cx="69" cy="45" r="4" fill="' + skin + '"' + st + "/>");
    o.push('<g fill="' + skin + '"' + st + ">" + HEAD + "</g>");

    /* 髪（前） */
    var hairFront = {
      short: "M27 42 C26 26 36 19 48 19 C61 19 70 26 69 42 C64 34 58 31 50 30 C46 34 38 37 27 42Z",
      crop:  "M28 38 C28 25 37 20 48 20 C59 20 68 25 68 38 C62 31 54 29 48 29 C42 29 34 31 28 38Z",
      bob:   "M27 41 C27 25 37 19 48 19 C59 19 69 25 69 41 C64 35 58 31 49 30 C43 34 35 38 27 41Z",
      long:  "M27 41 C27 25 37 19 48 19 C59 19 69 25 69 41 C64 35 58 31 49 30 C43 34 35 38 27 41Z",
      bun:   "M27 40 C27 26 37 20 48 20 C59 20 69 26 69 40 C62 33 56 30 48 30 C40 30 33 33 27 40Z",
      side:  "M27 43 C25 25 38 18 50 19 C62 20 70 28 69 42 C66 35 62 30 56 28 C48 34 37 38 27 43Z",
      messy: "M27 42 C25 30 30 22 36 22 L38 16 L43 21 L48 14 L52 21 L58 16 L60 22 C66 23 71 30 69 42 C65 35 60 32 54 31 L50 35 L46 31 C40 33 33 37 27 42Z"
    }[a.hair];
    if (hairFront && a.hat !== "helmet") o.push('<path d="' + hairFront + '" fill="' + hc + '"' + st + "/>");

    /* 顔 */
    var ey = 45, eyes = {
      dot:    '<circle cx="40" cy="' + ey + '" r="2.6"/><circle cx="56" cy="' + ey + '" r="2.6"/>',
      round:  '<circle cx="40" cy="' + ey + '" r="3.4"/><circle cx="56" cy="' + ey + '" r="3.4"/><circle cx="41" cy="' + (ey - 1) + '" r="1" fill="#fff"/><circle cx="57" cy="' + (ey - 1) + '" r="1" fill="#fff"/>',
      smile:  '<path d="M36 46 q4 -5 8 0 M52 46 q4 -5 8 0" fill="none" stroke="' + ink + '" stroke-width="2.4" stroke-linecap="round"/>',
      sleepy: '<path d="M36 45 h8 M52 45 h8" stroke="' + ink + '" stroke-width="2.4" stroke-linecap="round"/><path d="M37 45 q3 3 6 0 M53 45 q3 3 6 0" fill="none" stroke="' + ink + '" stroke-width="1.6"/>',
      wink:   '<circle cx="40" cy="' + ey + '" r="2.6"/><path d="M52 46 q4 -5 8 0" fill="none" stroke="' + ink + '" stroke-width="2.4" stroke-linecap="round"/>'
    }[a.eyes || "dot"];
    o.push('<g fill="' + ink + '">' + eyes + "</g>");
    o.push('<circle cx="35" cy="51" r="3.2" fill="' + (has("cheeks") ? orange : blush) + '" opacity="' + (has("cheeks") ? 1 : 0.75) + '"/><circle cx="61" cy="51" r="3.2" fill="' + (has("cheeks") ? orange : blush) + '" opacity="' + (has("cheeks") ? 1 : 0.75) + '"/>');
    o.push('<path d="M44 52 q4 4 8 0" fill="none" stroke="' + ink + '" stroke-width="2.2" stroke-linecap="round"/>');

    /* 帽子 */
    var hat = {
      helmet:   '<path d="M24 40 C24 21 35 14 48 14 C61 14 72 21 72 40Z" fill="#ffd400"' + st + '/><rect x="20" y="36" width="56" height="7" rx="3.5" fill="#ffd400"' + st + '/><path d="M52 16 L49 24 L54 28 L51 35" fill="none" stroke="#23855c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
      chiefcap: '<path d="M27 35 C27 18 69 18 69 35Z" fill="' + ink + '"/><rect x="27" y="30" width="42" height="5" fill="' + orange + '"/><path d="M27 35 H76 Q74 41 64 41 H27Z" fill="' + ink + '"/>',
      bandana:  '<path d="M27 36 C27 22 69 22 69 36 C62 32 34 32 27 36Z" fill="' + orange + '"' + st + '/><path d="M68 34 l8 -2 -2 8Z" fill="' + orange + '"' + st + "/>"
    }[a.hat] || "";
    o.push(hat);

    /* 手（小物を持つ位置） */
    var hand = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + skin + '"' + st + "/>"; };
    var M = {
      mug:       '<rect x="60" y="76" width="14" height="16" rx="3" fill="' + cream + '"' + st + '/><path d="M74 80 q6 0 6 5 t-6 5" fill="none"' + st + '/><path d="M64 72 q2 -3 0 -6 M69 72 q2 -3 0 -6" stroke="' + ink + '" stroke-width="1.6" fill="none"/>' + hand(60, 86),
      notebook:  '<rect x="58" y="70" width="20" height="24" rx="2.5" fill="' + cream + '"' + st + '/><g stroke="' + ink + '" stroke-width="1.6"><line x1="62" y1="77" x2="74" y2="77"/><line x1="62" y1="82" x2="74" y2="82"/><line x1="62" y1="87" x2="70" y2="87"/></g><path d="M84 66 L72 90" stroke="#a88a4f" stroke-width="3.5" stroke-linecap="round"/>' + hand(59, 88),
      swatch:    '<rect x="60" y="72" width="18" height="22" rx="3" fill="#fff"' + st + '/><rect x="63" y="75" width="12" height="5" fill="#3d4f63"/><rect x="63" y="81" width="12" height="5" fill="#58708a"/><rect x="63" y="87" width="12" height="4" fill="#ffd400"/>' + hand(60, 88),
      starpin:   '<path d="M62 20 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5Z" fill="#ffd400" stroke="' + ink + '" stroke-width="1.8"/>',
      pen:       '<path d="M60 94 L80 66" stroke="#3d4f63" stroke-width="5" stroke-linecap="round"/><path d="M80 66 L84 60 L82 67Z" fill="' + ink + '"/><path d="M86 70 C89 74 89 77 86 78 C83 77 83 74 86 70Z" fill="#3d4f63" stroke="' + ink + '" stroke-width="1.5"/>' + hand(64, 88),
      footprints:'<g fill="#fff" stroke="' + ink + '" stroke-width="1.2"><g transform="translate(38 86) rotate(-28)"><ellipse cx="0" cy="-3" rx="3" ry="4.5"/><ellipse cx="0" cy="4.5" rx="2.2" ry="2.6"/></g><g transform="translate(50 86) rotate(28)"><ellipse cx="0" cy="-3" rx="3" ry="4.5"/><ellipse cx="0" cy="4.5" rx="2.2" ry="2.6"/></g></g>',
      gridnote:  '<rect x="60" y="70" width="20" height="24" rx="2.5" fill="#fff"' + st + '/><g stroke="#9bb8ad" stroke-width="1"><line x1="62" y1="76" x2="78" y2="76"/><line x1="62" y1="81" x2="78" y2="81"/><line x1="62" y1="86" x2="78" y2="86"/><line x1="66" y1="72" x2="66" y2="92"/><line x1="72" y1="72" x2="72" y2="92"/></g>' + hand(61, 88),
      earbud:    '<circle cx="26" cy="46" r="3.6" fill="#fff"' + st + '/><rect x="24" y="48" width="4" height="8" rx="2" fill="#fff" stroke="' + ink + '" stroke-width="1.8"/>',
      bell:      '<path d="M64 80 a8 8 0 0 1 16 0 v6 l3 3 H61 l3 -3Z" fill="#ffd400"' + st + '/><circle cx="72" cy="91" r="2" fill="' + ink + '"/><path d="M84 74 q3 3 0 6 M60 74 q-3 3 0 6" stroke="' + ink + '" stroke-width="1.6" fill="none"/>' + hand(64, 90),
      clipboard: '<rect x="60" y="68" width="20" height="26" rx="2.5" fill="#fff"' + st + '/><rect x="65" y="65" width="10" height="6" rx="2" fill="#a88a4f" stroke="' + ink + '" stroke-width="1.8"/><g stroke="' + ink + '" stroke-width="1.6"><line x1="63" y1="77" x2="77" y2="77"/><line x1="63" y1="82" x2="77" y2="82"/><line x1="63" y1="87" x2="72" y2="87"/></g>' + hand(61, 90),
      checkpin:  '<circle cx="36" cy="82" r="5" fill="#23855c" stroke="' + ink + '" stroke-width="1.8"/><path d="M33.5 82 l2 2 3.5 -4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
      wrench:    '<g transform="translate(20 84) rotate(-35)"><rect x="-2.5" y="-10" width="5" height="18" rx="2.5" fill="#c7ccd3" stroke="' + ink + '" stroke-width="1.8"/><path d="M-7 -16 a7 7 0 1 0 14 0 l-3.5 3.5 h-7Z" fill="#c7ccd3" stroke="' + ink + '" stroke-width="1.8"/></g>' + hand(22, 88),
      footbox:   '<rect x="62" y="74" width="20" height="18" rx="2.5" fill="#c9a06a"' + st + '/><g fill="#fff" stroke="' + ink + '" stroke-width="1"><ellipse cx="72" cy="81" rx="2.6" ry="3.8"/><ellipse cx="72" cy="88" rx="1.9" ry="2.1"/></g>' + hand(63, 88),
      cardboard: '<path d="M8 76 L18 70 H78 L88 76Z" fill="#d8b07a"' + st + '/><rect x="10" y="76" width="76" height="20" rx="2" fill="#c9a06a"' + st + '/>' + hand(30, 76) + hand(66, 76),
      tag:       '<line x1="80" y1="78" x2="84" y2="82" stroke="' + ink + '" stroke-width="1.6"/><path d="M80 82 h12 v12 h-12 l-3 -3 v-6Z" fill="#fff" stroke="' + ink + '" stroke-width="1.8"/><circle cx="82" cy="85" r="1.3" fill="' + ink + '"/>',
      shipbox:   '<rect x="50" y="74" width="34" height="22" rx="2.5" fill="#3d4f63"' + st + '/><line x1="67" y1="74" x2="67" y2="96" stroke="#58708a" stroke-width="3"/><g transform="translate(67 86) rotate(-8)"><rect x="-13" y="-6" width="26" height="12" rx="2" fill="#fff" stroke="' + orange + '" stroke-width="2"/><text x="0" y="3" text-anchor="middle" font-size="7.5" font-weight="900" fill="' + orange + '" font-family="sans-serif">検品済</text></g>' + hand(52, 80) + hand(82, 80),
      bridgepin: '<path d="M30 86 v-6 h14 v6 h-3 a4 4 0 0 0 -8 0Z" fill="#fff" stroke="' + ink + '" stroke-width="1.6"/>',
      torch:     '<path d="M70 70 L92 52 V86Z" fill="#ffd400" opacity=".55"/><rect x="60" y="72" width="15" height="9" rx="2" transform="rotate(-25 67 76)" fill="#c7ccd3" stroke="' + ink + '" stroke-width="2"/>' + hand(62, 82),
      berrypin:  '<path d="M64 26 C58 23 58 15 64 15 C70 15 70 23 64 26Z" fill="#e8202a" stroke="' + ink + '" stroke-width="1.6"/><path d="M60 15 L64 12 L68 15 L64 16Z" fill="#23855c" stroke="' + ink + '" stroke-width="1.2"/>',
      lens:      '<circle cx="74" cy="74" r="9" fill="#e8f1ef" stroke="' + ink + '" stroke-width="3.2"/><line x1="68" y1="81" x2="62" y2="90" stroke="' + ink + '" stroke-width="4" stroke-linecap="round"/>' + hand(62, 90)
    };
    items.forEach(function (k) { if (M[k]) o.push(M[k]); });
    return '<svg viewBox="0 0 96 96" width="' + s + '" height="' + s + '" aria-hidden="true">' + o.join("") + "</svg>";
  };
})();
