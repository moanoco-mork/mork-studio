"""トップページ（index.html・日本語）から、ほかの言葉のトップページ（<lang>/index.html）を作る。
11/28 モリオ「トップページも多言語して置いてください」。
使い方: python -I tools/make_top_i18n.py   （リポジトリの一番上で）
日本語の index.html を直したら、これを流し直す。アプリの一覧は apps.js をそのまま読み、
名前とひとことは promo/apps.json の各言葉の文を使う（無い言葉は英語）。
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ["en", "ko", "zh-Hant", "de", "es", "fr", "it"]
LABEL = {"ja": "日本語", "en": "English", "ko": "한국어", "zh-Hant": "繁體中文", "de": "Deutsch",
         "es": "Español", "fr": "Français", "it": "Italiano"}

# 日本語 → 各言葉（index.html の中の文だけ）
T = {
 "MORK STUDIO｜AI のチームでつくるアプリ": {
  "en": "MORK STUDIO | Apps made by an AI team", "ko": "MORK STUDIO | AI 팀이 만드는 앱", "zh-Hant": "MORK STUDIO｜由 AI 團隊打造的 App",
  "de": "MORK STUDIO | Apps von einem KI-Team", "es": "MORK STUDIO | Apps hechas por un equipo de IA", "fr": "MORK STUDIO | Des apps créées par une équipe d’IA", "it": "MORK STUDIO | App create da un team di IA"},
 "MORK STUDIO は、モルクと AI のチームがアプリをつくる小さなスタジオです。": {
  "en": "MORK STUDIO is a small studio where Mork and a team of AI staff make apps.", "ko": "MORK STUDIO는 모르크와 AI 팀이 앱을 만드는 작은 스튜디오입니다.", "zh-Hant": "MORK STUDIO 是由 Mork 與 AI 團隊一起製作 App 的小工作室。",
  "de": "MORK STUDIO ist ein kleines Studio, in dem Mork mit einem KI-Team Apps entwickelt.", "es": "MORK STUDIO es un pequeño estudio donde Mork y un equipo de IA crean apps.", "fr": "MORK STUDIO est un petit studio où Mork crée des apps avec une équipe d’IA.", "it": "MORK STUDIO è un piccolo studio dove Mork crea app con un team di IA."},
 '>アプリ</a><a href="team/">スタッフ</a><a href="https://mork-studio.hatenablog.com/">開発記</a>': {
  "en": '>Apps</a><a href="../team/">Team</a><a href="https://medium.com/@moanoco">Blog</a>',
  "ko": '>앱</a><a href="../team/">스태프</a><a href="https://medium.com/@moanoco">블로그</a>',
  "zh-Hant": '>App</a><a href="../team/">團隊</a><a href="https://medium.com/@moanoco">部落格</a>',
  "de": '>Apps</a><a href="../team/">Team</a><a href="https://medium.com/@moanoco">Blog</a>',
  "es": '>Apps</a><a href="../team/">Equipo</a><a href="https://medium.com/@moanoco">Blog</a>',
  "fr": '>Apps</a><a href="../team/">Équipe</a><a href="https://medium.com/@moanoco">Blog</a>',
  "it": '>App</a><a href="../team/">Team</a><a href="https://medium.com/@moanoco">Blog</a>'},
 'AI のチームで、<span class="nw">アプリを</span><span class="nw">つくっています。</span>': {
  "en": "We make apps with a team of AI.", "ko": "AI 팀과 함께 앱을 만들고 있습니다.", "zh-Hant": "我們和 AI 團隊一起製作 App。",
  "de": "Wir entwickeln Apps mit einem KI-Team.", "es": "Creamos apps con un equipo de IA.", "fr": "Nous créons des apps avec une équipe d’IA.", "it": "Creiamo app con un team di IA."},
 "オーナーのモルクが「こんなアプリがほしい」と言うと、AI のスタッフが分担して、設計・デザイン・開発まで進めます。小さなアプリを、どんどんつくっています。": {
  "en": "When Mork, the owner, says “I want an app like this,” the AI staff split up the work and take it through planning, design and development. We keep making small, useful apps.",
  "ko": "오너 모르크가 “이런 앱이 있으면 좋겠다”고 말하면, AI 스태프가 일을 나눠 기획·디자인·개발까지 진행합니다. 작은 앱을 계속 만들고 있습니다.",
  "zh-Hant": "當負責人 Mork 說「想要這樣的 App」，AI 成員們就分工完成企劃、設計到開發。我們持續製作小而實用的 App。",
  "de": "Wenn Mork, der Inhaber, sagt „Ich hätte gern so eine App“, teilen sich die KI-Mitarbeiter die Arbeit – von der Planung über das Design bis zur Entwicklung. So entstehen laufend kleine Apps.",
  "es": "Cuando Mork, el dueño, dice «quiero una app así», el equipo de IA se reparte el trabajo: planificación, diseño y desarrollo. Seguimos creando apps pequeñas.",
  "fr": "Quand Mork, le fondateur, dit « j’aimerais une app comme ça », l’équipe d’IA se répartit le travail : conception, design et développement. Nous créons sans cesse de petites apps.",
  "it": "Quando Mork, il titolare, dice «vorrei un’app così», lo staff di IA si divide il lavoro: progettazione, design e sviluppo. Creiamo continuamente piccole app."},
 '>アプリを見る</a><a class="btn" href="team/">スタッフ紹介</a>': {
  "en": '>See our apps</a><a class="btn" href="../team/">Meet the team</a>', "ko": '>앱 보기</a><a class="btn" href="../team/">스태프 소개</a>', "zh-Hant": '>看看 App</a><a class="btn" href="../team/">團隊介紹</a>',
  "de": '>Apps ansehen</a><a class="btn" href="../team/">Das Team</a>', "es": '>Ver las apps</a><a class="btn" href="../team/">El equipo</a>', "fr": '>Voir les apps</a><a class="btn" href="../team/">L’équipe</a>', "it": '>Vedi le app</a><a class="btn" href="../team/">Il team</a>'},
 "公開中のアプリ": {"en": "Apps available", "ko": "공개 중인 앱", "zh-Hant": "已上架的 App", "de": "Verfügbare Apps", "es": "Apps disponibles", "fr": "Apps disponibles", "it": "App disponibili"},
 "<h2>アプリ</h2>": {"en": "<h2>Apps</h2>", "ko": "<h2>앱</h2>", "zh-Hant": "<h2>App</h2>", "de": "<h2>Apps</h2>", "es": "<h2>Apps</h2>", "fr": "<h2>Apps</h2>", "it": "<h2>App</h2>"},
 "新しい順に並べています。": {"en": "Newest first.", "ko": "최신순으로 정렬했습니다.", "zh-Hant": "依新到舊排列。", "de": "Neueste zuerst.", "es": "Las más nuevas primero.", "fr": "Les plus récentes d’abord.", "it": "Le più recenti per prime."},
 "アプリの数": {"en": "Number of apps", "ko": "앱 수", "zh-Hant": "App 數量", "de": "Anzahl der Apps", "es": "Número de apps", "fr": "Nombre d’apps", "it": "Numero di app"},
 "<span>近日公開</span>": {"en": "<span>Coming soon</span>", "ko": "<span>출시 예정</span>", "zh-Hant": "<span>即將推出</span>", "de": "<span>Bald verfügbar</span>", "es": "<span>Próximamente</span>", "fr": "<span>Bientôt</span>", "it": "<span>In arrivo</span>"},
 "アプリの一覧を表示するには JavaScript を有効にしてください。": {"en": "Please enable JavaScript to see the list of apps.", "ko": "앱 목록을 보려면 JavaScript를 켜 주세요.", "zh-Hant": "請啟用 JavaScript 以顯示 App 列表。", "de": "Bitte aktiviere JavaScript, um die App-Liste zu sehen.", "es": "Activa JavaScript para ver la lista de apps.", "fr": "Activez JavaScript pour voir la liste des apps.", "it": "Attiva JavaScript per vedere l’elenco delle app."},
 "<h2>スタッフ</h2>": {"en": "<h2>Team</h2>", "ko": "<h2>스태프</h2>", "zh-Hant": "<h2>團隊</h2>", "de": "<h2>Team</h2>", "es": "<h2>Equipo</h2>", "fr": "<h2>Équipe</h2>", "it": "<h2>Team</h2>"},
 "オーナーのモルクと、AI のスタッフでつくっています。": {"en": "Made by Mork, the owner, and the AI staff.", "ko": "오너 모르크와 AI 스태프가 만듭니다.", "zh-Hant": "由負責人 Mork 與 AI 成員一起製作。", "de": "Gemacht von Mork, dem Inhaber, und den KI-Mitarbeitern.", "es": "Hecho por Mork, el dueño, y el equipo de IA.", "fr": "Réalisé par Mork, le fondateur, et l’équipe d’IA.", "it": "Fatto da Mork, il titolare, e dallo staff di IA."},
 "スタッフの数": {"en": "Team size", "ko": "스태프 수", "zh-Hant": "成員人數", "de": "Teamgröße", "es": "Tamaño del equipo", "fr": "Taille de l’équipe", "it": "Dimensione del team"},
 "<span>スタッフ</span>": {"en": "<span>Members</span>", "ko": "<span>스태프</span>", "zh-Hant": "<span>成員</span>", "de": "<span>Mitglieder</span>", "es": "<span>Miembros</span>", "fr": "<span>Membres</span>", "it": "<span>Membri</span>"},
 '<a class="staff-link" href="team/">': {l: '<a class="staff-link" href="../team/">' for l in LANGS},
 "<b>スタッフ紹介</b><br>MORK STUDIO では、こんな人たちが働いています →": {
  "en": "<b>Meet the team</b><br>Here’s who works at MORK STUDIO (Japanese) →", "ko": "<b>스태프 소개</b><br>MORK STUDIO에서 일하는 사람들 (일본어) →", "zh-Hant": "<b>團隊介紹</b><br>在 MORK STUDIO 工作的成員（日文）→",
  "de": "<b>Das Team</b><br>Wer bei MORK STUDIO arbeitet (auf Japanisch) →", "es": "<b>El equipo</b><br>Quién trabaja en MORK STUDIO (en japonés) →", "fr": "<b>L’équipe</b><br>Qui travaille chez MORK STUDIO (en japonais) →", "it": "<b>Il team</b><br>Chi lavora a MORK STUDIO (in giapponese) →"},
 "<h2>X の最新の投稿</h2>": {"en": "<h2>Latest on X</h2>", "ko": "<h2>X 최신 게시물</h2>", "zh-Hant": "<h2>X 最新貼文</h2>", "de": "<h2>Neu auf X</h2>", "es": "<h2>Lo último en X</h2>", "fr": "<h2>Derniers posts sur X</h2>", "it": "<h2>Ultimi post su X</h2>"},
 '<a href="https://x.com/mork_studio">@mork_studio をフォロー →</a>': {l: '<a href="https://x.com/mork_studio_en">Follow @mork_studio_en →</a>' for l in LANGS},
 "<h2>開発記</h2>": {"en": "<h2>Dev blog</h2>", "ko": "<h2>개발기</h2>", "zh-Hant": "<h2>開發日誌</h2>", "de": "<h2>Entwickler-Blog</h2>", "es": "<h2>Blog de desarrollo</h2>", "fr": "<h2>Journal de développement</h2>", "it": "<h2>Diario di sviluppo</h2>"},
 "モルクが、AI のチームとアプリをつくる毎日を書いています。うまくいったことも、失敗も。": {
  "en": "Mork writes about making apps with an AI team every day — the wins and the mistakes.", "ko": "모르크가 AI 팀과 앱을 만드는 매일을 씁니다. 잘된 일도, 실패도.", "zh-Hant": "Mork 記錄每天和 AI 團隊製作 App 的日常，成功和失敗都寫。",
  "de": "Mork schreibt über den Alltag beim App-Bauen mit einem KI-Team – Erfolge und Fehler.", "es": "Mork escribe sobre crear apps con un equipo de IA cada día: los aciertos y los errores.", "fr": "Mork raconte le quotidien de la création d’apps avec une équipe d’IA — réussites et erreurs.", "it": "Mork racconta ogni giorno come crea app con un team di IA: successi ed errori."},
 '<span>ブログ（はてなブログ）</span><a href="https://mork-studio.hatenablog.com/">MORK STUDIO 開発記 →</a><span>note</span><a href="https://note.com/mork_studio">MORK STUDIO の note →</a><span>X（旧 Twitter）</span><a href="https://x.com/mork_studio">@mork_studio →</a>': {
  l: '<span>Medium (English)</span><a href="https://medium.com/@moanoco">MORK STUDIO on Medium →</a><span>X (English)</span><a href="https://x.com/mork_studio_en">@mork_studio_en →</a><span>note (Japanese)</span><a href="https://note.com/mork_studio">MORK STUDIO on note →</a>' for l in LANGS},
 '<div>X：<a href="https://x.com/mork_studio">@mork_studio</a>　note：<a href="https://note.com/mork_studio">mork_studio</a></div>': {
  l: '<div>X: <a href="https://x.com/mork_studio_en">@mork_studio_en</a>　Medium: <a href="https://medium.com/@moanoco">@moanoco</a></div>' for l in LANGS},
 "お問い合わせ：": {"en": "Contact: ", "ko": "문의: ", "zh-Hant": "聯絡我們：", "de": "Kontakt: ", "es": "Contacto: ", "fr": "Contact : ", "it": "Contatti: "},
 "このサイトでは、アクセス数を知るために Google アナリティクス（Cookie）を使っています。個人を特定する情報は集めていません。": {
  "en": "This site uses Google Analytics (cookies) to count visits. We do not collect information that identifies you.",
  "ko": "이 사이트는 방문 수를 알기 위해 Google 애널리틱스(쿠키)를 사용합니다. 개인을 식별하는 정보는 수집하지 않습니다.",
  "zh-Hant": "本網站使用 Google Analytics（Cookie）來了解瀏覽次數，不會收集可識別個人的資訊。",
  "de": "Diese Website nutzt Google Analytics (Cookies), um Besuche zu zählen. Wir erheben keine Daten, die dich identifizieren.",
  "es": "Este sitio usa Google Analytics (cookies) para contar visitas. No recopilamos datos que te identifiquen.",
  "fr": "Ce site utilise Google Analytics (cookies) pour compter les visites. Nous ne collectons aucune donnée permettant de vous identifier.",
  "it": "Questo sito usa Google Analytics (cookie) per contare le visite. Non raccogliamo dati che ti identificano."},
 'b.setAttribute("data-lang","ja")': {l: 'b.setAttribute("data-lang","en")' for l in LANGS},
 'a.textContent="X の投稿を見る"': {l: 'a.textContent="View on X"' for l in LANGS},
}
# 画面に出す短い言葉（カードの中・JS から使う）
UI = {
 "released": {"en": "Available", "ko": "공개 중", "zh-Hant": "已上架", "de": "Verfügbar", "es": "Disponible", "fr": "Disponible", "it": "Disponibile"},
 "soon": {"en": "Coming soon", "ko": "출시 예정", "zh-Hant": "即將推出", "de": "Bald verfügbar", "es": "Próximamente", "fr": "Bientôt", "it": "In arrivo"},
 "more": {"en": "Learn more", "ko": "자세히 보기", "zh-Hant": "了解更多", "de": "Mehr erfahren", "es": "Más información", "fr": "En savoir plus", "it": "Scopri di più"},
 "privacy": {"en": "Privacy", "ko": "개인정보", "zh-Hant": "隱私權", "de": "Datenschutz", "es": "Privacidad", "fr": "Confidentialité", "it": "Privacy"},
 "icon": {"en": " icon", "ko": " 아이콘", "zh-Hant": " 圖示", "de": " Symbol", "es": " icono", "fr": " icône", "it": " icona"},
 "badge_alt": {l: "Download on the App Store" for l in LANGS},
 "note": {"en": "Newest first. Now available on {p}.", "ko": "최신순으로 정렬했습니다. 지금 {p}에서 이용할 수 있습니다.", "zh-Hant": "依新到舊排列。目前提供 {p} 版。", "de": "Neueste zuerst. Jetzt verfügbar für {p}.", "es": "Las más nuevas primero. Ya disponible en {p}.", "fr": "Les plus récentes d’abord. Disponible sur {p}.", "it": "Le più recenti per prime. Ora disponibili su {p}."},
}
GENRE = {
 "ナビゲーション": {"en": "Navigation", "ko": "내비게이션", "zh-Hant": "導航", "de": "Navigation", "es": "Navegación", "fr": "Navigation", "it": "Navigazione"},
 "ライフスタイル": {"en": "Lifestyle", "ko": "라이프스타일", "zh-Hant": "生活風格", "de": "Lifestyle", "es": "Estilo de vida", "fr": "Style de vie", "it": "Stile di vita"},
 "ゲーム": {"en": "Games", "ko": "게임", "zh-Hant": "遊戲", "de": "Spiele", "es": "Juegos", "fr": "Jeux", "it": "Giochi"},
 "仕事効率化": {"en": "Productivity", "ko": "생산성", "zh-Hant": "生產力工具", "de": "Produktivität", "es": "Productividad", "fr": "Productivité", "it": "Produttività"},
 "ユーティリティ": {"en": "Utilities", "ko": "유틸리티", "zh-Hant": "工具程式", "de": "Dienstprogramme", "es": "Utilidades", "fr": "Utilitaires", "it": "Utility"},
}


def promo_texts():
    d = json.load(open(os.path.join(ROOT, "promo", "apps.json"), encoding="utf-8"))
    apps = d if isinstance(d, list) else d.get("apps", [])
    out = {"partybox": {"name": {"en": "Real Party Game Box"}, "catch": {
        "en": "Link the iPhones in the room. Cards and original party games, all in one.",
        "ko": "그 자리의 iPhone을 연결해서. 트럼프도 오리지널 게임도 이거 하나로.",
        "zh-Hant": "把在場的 iPhone 連起來，撲克牌和原創遊戲，一個 App 全包。",
        "de": "Verbinde die iPhones im Raum. Kartenspiele und eigene Partyspiele in einer App.",
        "es": "Conecta los iPhone de todos. Cartas y juegos de fiesta originales, en una sola app.",
        "fr": "Reliez les iPhone de tout le monde. Jeux de cartes et jeux de soirée originaux, tout en un.",
        "it": "Collega gli iPhone di tutti. Carte e giochi di gruppo originali, tutto in una app."}}}
    for a in apps:
        out[a["id"]] = {"name": a.get("name", {}), "catch": a.get("catch", {})}
    if "splashville" in out:  # みずたまタウンの海外での名前
        out["mizutama"] = out["splashville"]
    return out


def switcher(cur, prefix):
    """言葉の切りかえ（ヘッダーの下の小さな行）。prefix は日本語のトップへの相対パス。"""
    items = []
    for l in ["ja"] + LANGS:
        href = prefix + ("" if l == "ja" else l + "/")
        if l == cur:
            items.append(f'<b>{LABEL[l]}</b>')
        else:
            items.append(f'<a href="{href}" hreflang="{l}" lang="{l}">{LABEL[l]}</a>')
    return '<p class="langs">' + " · ".join(items) + "</p>"


def hreflang_links():
    s = '<link rel="alternate" hreflang="ja" href="https://mork-studio.net/">'
    for l in LANGS:
        s += f'<link rel="alternate" hreflang="{l}" href="https://mork-studio.net/{l}/">'
    s += '<link rel="alternate" hreflang="x-default" href="https://mork-studio.net/en/">'
    return s


CSS = ".langs{font-size:13px;color:var(--muted);margin:10px 0 0;display:flex;flex-wrap:wrap;gap:4px 8px}.langs a{color:var(--muted)}.langs b{color:var(--ink)}"
SW_MARK = "<!--LANGS-->"


def add_common(html, cur, prefix):
    """日本語版・各言葉版に共通の物（切りかえ・hreflang・CSS）を入れる。何度流しても1つだけ。"""
    html = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">', "", html)
    html = html.replace("</title>", "</title>" + hreflang_links(), 1)
    if CSS not in html:
        html = html.replace("</style>", CSS + "\n</style>", 1)
    html = re.sub(re.escape(SW_MARK) + r".*?" + re.escape(SW_MARK), "", html, flags=re.S)
    html = html.replace("</header>", "</header>" + SW_MARK + switcher(cur, prefix) + SW_MARK, 1)
    return html


def build(lang, ja, promo):
    h = ja
    h = h.replace('"新しい順に並べています。いまは " + pubs', '"@@NOTE@@" + pubs', 1)
    for src, tr in T.items():
        if src not in h:
            raise SystemExit(f"見つからない文: {src[:40]}")
        h = h.replace(src, tr[lang])
    h = h.replace('<html lang="ja">', f'<html lang="{lang}">', 1)
    # パス：一つ下のフォルダから見る
    h = h.replace('<a class="logo" href="./">', '<a class="logo" href="./">')
    h = h.replace('<script src="apps.js">', '<script src="../apps.js">').replace('<script src="staff.js">', '<script src="../staff.js">').replace('<script src="x-posts.js"></script>', '<script src="../x-posts-en.js"></script>')  # 日本語以外は英語の X（@mork_studio_en）の投稿を出す
    h = h.replace('var BASE = "";', 'var BASE = "../";')
    # 1行目の google-site-verification は日本語版だけに残す
    h = re.sub(r'<meta name="google-site-verification"[^>]*>', "", h)
    # カードの文を言葉ごとにする（apps.js はそのまま）
    names = {k: v["name"].get(lang) or v["name"].get("en") for k, v in promo.items() if v["name"]}
    catches = {k: v["catch"].get(lang) or v["catch"].get("en") for k, v in promo.items() if v["catch"]}
    genres = {k: v[lang] for k, v in GENRE.items()}
    ui = {k: v[lang] for k, v in UI.items()}
    inject = ("<script>window.MORK_I18N=" + json.dumps({"names": names, "catches": catches, "genres": genres, "ui": ui}, ensure_ascii=False) + ";"
              "(function(){var I=window.MORK_I18N;"
              # 11/28 モリオ：日本語以外のトップは、駅間アラームの代わりに Railnap（駅間の海外版）へつなぐ
              "window.MORK_APPS=(window.MORK_APPS||[]).filter(function(a){return a.id!=='ekikan';});"
              "(window.MORK_APPS||[]).forEach(function(a){if(I.names[a.id])a.name=I.names[a.id];if(I.catches[a.id])a.catch=I.catches[a.id];if(I.genres[a.genre])a.genre=I.genres[a.genre];if(a.icon&&a.icon.indexOf('http')!==0)a.icon='../'+a.icon;});})();</script>")
    h = h.replace('<script src="../staff.js">', inject + '<script src="../staff.js">', 1)
    rep = [
        ('alt: a.name + "のアイコン"', 'alt: a.name + MORK_I18N.ui.icon'),
        ('src: "assets/app-store-badge-ja.svg", alt: "App Store からダウンロード", width: 120, height: 44',
         'src: "../assets/app-store-badge-en.svg", alt: MORK_I18N.ui.badge_alt, width: 132, height: 44'),
        ('text: "近日公開" }));', 'text: MORK_I18N.ui.soon }));'),
        ('text: released ? "公開中" : "近日公開"', 'text: released ? MORK_I18N.ui.released : MORK_I18N.ui.soon'),
        ('text: "くわしく見る"', 'text: MORK_I18N.ui.more'),
        ('text: "プライバシー"', 'text: MORK_I18N.ui.privacy'),
        ('"@@NOTE@@" + pubs.map(function (p) { return (PLATFORM[p] || p) + " 版"; }).join("・") + "を公開中です。"',
         'MORK_I18N.ui.note.replace("{p}", pubs.map(function (p) { return PLATFORM[p] || p; }).join(", "))'),
        ('el("a", { href: a.id + "/" }', 'el("a", { href: "../" + a.id + "/" }'),
        ('"Google Play で見る"', '"Google Play"'),
    ]
    for a, b in rep:
        if a not in h:
            raise SystemExit(f"見つからないコード: {a[:50]}")
        h = h.replace(a, b)
    h = add_common(h, lang, "../")
    return h


def main():
    p = os.path.join(ROOT, "index.html")
    ja = open(p, encoding="utf-8").read()
    ja_clean = re.sub(re.escape(SW_MARK) + r".*?" + re.escape(SW_MARK), "", ja, flags=re.S)
    promo = promo_texts()
    for lang in LANGS:
        out = build(lang, ja_clean, promo)
        os.makedirs(os.path.join(ROOT, lang), exist_ok=True)
        open(os.path.join(ROOT, lang, "index.html"), "w", encoding="utf-8", newline="\n").write(out)
        print("wrote", lang)
    open(p, "w", encoding="utf-8", newline="\n").write(add_common(ja, "ja", "./"))
    print("updated ja")


if __name__ == "__main__":
    main()
