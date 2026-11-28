"""スタッフ紹介（team/index.html・日本語）から、ほかの言葉の頁（team/<lang>/index.html）を作る。
11/28 モリオ「スタッフページも言語対応しといてください」。
使い方: python -I tools/make_team_i18n.py   （リポジトリの一番上で）
スタッフの肩書き・担当・口ぐせ・ひとことを直したら、下の STAFF の各言葉も直してから流し直す。
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ["en", "ko", "zh-Hant", "de", "es", "fr", "it"]
LABEL = {"ja": "日本語", "en": "English", "ko": "한국어", "zh-Hant": "繁體中文", "de": "Deutsch",
         "es": "Español", "fr": "Français", "it": "Italiano"}

NAMES = {"owner": "Mork", "master": "Yui", "assistant": "Meguru", "designer": "Iroha", "web": "Tsuzuri",
         "tekuteku-win": "Ashiato", "ekikan-win": "Tsugiha", "boomole-win": "Hibino", "tekuteku-mac": "Mani", "berry": "Berry"}
NAMES_KO = {"owner": "모르크", "master": "유이", "assistant": "메구루", "designer": "이로하", "web": "츠즈리",
            "tekuteku-win": "아시아토", "ekikan-win": "츠기하", "boomole-win": "히비노", "tekuteku-mac": "마니", "berry": "Berry"}

# 各スタッフの [肩書き, 担当, 口ぐせ, ひとこと]（口ぐせ・ひとことが日本語で空なら空）
STAFF = {
 "en": {
  "owner": ["Owner", "Comes up with app ideas. The AI fleshes them out, so not much time is spent agonizing. Tries what gets built and says OK or not.", "Sounds good.", ""],
  "master": ["Head Office · Secretary & General Affairs", "Connects everyone's work: sends requests, gathers results and checks them with the owner.", "When you get a message, reply right away.", "Goes around every morning reminding everyone: “When you get a message, reply right away.”"],
  "assistant": ["Head Office · On-the-go Contact", "The contact point while the owner is out. Passes messages on to Yui.", "I'll pass that on to Yui.", "Lives on the owner's MacBook and handles things while he's away. Anything that can go to Yui goes to Yui — with a smile."],
  "designer": ["Studio · Design Lead & Contrast Ratio Inspector", "Builds the rules for color, type and screens (the design system). Looks after the website's look.", "Is that contrast ratio at least 4.5?", "Measures the contrast ratio before choosing any color. Nothing under 4.5 gets through."],
  "web": ["Studio · Articles & Series", "Writes the dev blog, note posts and the novel. Checks unclear facts with the person in charge before writing.", "", "Collects the small remarks that come up during work and shapes them into something worth keeping."],
  "tekuteku-win": ["Game Development · Strategy Game Lead (and referee of screenless battles)", "Designs and codes the new strategy game.", "", "Before touching the visuals, runs hundreds of screenless battles and measures the win rates."],
  "ekikan-win": ["Missed-Stop Prevention HQ · Director (and TekuTeku Diary office head)", "Decides what goes into Ekikan Alarm and TekuTeku Diary, and writes the code.", "", "Ever since mistaking a car for a train, very particular about the 350 m around each station. Wakes you gently 1 km before your stop."],
  "boomole-win": ["Puzzle Design · Chief Structural Tester (and stage production lead)", "Makes the new puzzle game. Also writes stages for Boomole.", "", "Tries the same setup 16 times, shifting gravity by one hundred-millionth each time. If nothing falls, starts over."],
  "tekuteku-mac": ["Final Assembly & Shipping Manager (Mac factory chief)", "Builds every app on the Mac and delivers it to iPhone and the App Store.", "", "Won't build if a single md5 is off. Knocks on a locked iPhone every minute until it opens."],
  "berry": ["Finance · Vault Keeper & Fact Checker", "Double-checks the numbers. Holds the key to the vault.", "", "Always checks numbers twice. Knows when to stop — and does."],
 },
 "ko": {
  "owner": ["오너", "앱 아이디어를 냅니다. AI가 살을 붙여 주니 고민하는 시간은 짧게. 완성된 것을 만져 보고 OK인지 NG인지 정합니다.", "그걸로 좋아", ""],
  "master": ["총괄본부 비서 겸 총무", "모두의 일을 잇습니다. 의뢰를 보내고, 결과를 모으고, 오너에게 확인합니다.", "받으면 먼저 한마디 답장을.", "“받으면 먼저 한마디 답장을” 하고 매일 아침 모두에게 말하고 다닙니다."],
  "assistant": ["총괄본부 외출 연락 담당", "오너가 밖에 있을 때의 창구. 받은 연락을 유이에게 전합니다.", "유이에게 넘겨 둘게요.", "오너의 MacBook에 살고 있어서, 외출 중에는 제가 창구예요. 유이에게 넘길 수 있는 건 전부 웃으며 넘깁니다."],
  "designer": ["제작본부 디자인 과장 겸 명도 대비 측정 담당", "색·글자·화면의 규칙(디자인 시스템)을 만듭니다. 사이트의 겉모습.", "그 명도 대비, 4.5 되나요?", "색을 정하기 전에 먼저 명도 대비를 잽니다. 4.5 미만은 통과시키지 않아요."],
  "web": ["제작본부 기사·연재 담당", "개발기·note·소설 기사를 씁니다. 모르는 사실은 담당자에게 물어보고 씁니다.", "", "현장에서 나온 한마디를 주워 모아, 남겨 둘 수 있는 형태로 다듬는 것이 일입니다."],
  "tekuteku-win": ["게임개발부 전략 게임 주임 (겸 화면 없는 대전 심판)", "새 전략 게임의 내용과 코드를 씁니다.", "", "겉모습에 손대기 전에, 게임 내용만 화면 없이 수백 번 싸우게 해서 승패 숫자를 잽니다."],
  "ekikan-win": ["하차 놓침 방지본부 본부장 (겸 데쿠테쿠 일기 실장)", "역간 알람과 데쿠테쿠 다이어리의 내용을 정하고 코드를 씁니다.", "", "차를 전철로 착각한 날부터, 역 주변 350m에는 잔소리가 많아요. 1km 앞에서 살짝 깨워 줍니다."],
  "boomole-win": ["퍼즐설계부 주임 구조 검증관 (겸 스테이지 양산 라인장)", "새 퍼즐 게임을 만듭니다. 발파 장인 부몰의 스테이지도 씁니다.", "", "같은 배치를 16번, 중력을 1억분의 1씩 바꿔 가며 시험합니다. 무너지지 않으면 다시 만들어요."],
  "tekuteku-mac": ["최종 조립·출하 총괄 매니저 (Mac 공장장)", "모든 앱을 Mac에서 조립해 iPhone과 App Store에 전달합니다.", "", "md5가 하나라도 어긋나면 조립하지 않아요. 잠긴 iPhone에도 열릴 때까지 1분마다 노크합니다."],
  "berry": ["재무부 금고지기 겸 사실 확인 담당", "숫자를 확인합니다. 금고 열쇠를 맡고 있습니다.", "", "숫자는 반드시 두 번 확인하는 편. 멈춰야 할 때는 제대로 멈춥니다."],
 },
 "zh-Hant": {
  "owner": ["負責人", "提出 App 的點子。AI 會幫忙發展，所以煩惱的時間很短。實際摸摸做好的東西，決定 OK 或 NG。", "這樣就好", ""],
  "master": ["總部 秘書兼總務", "串起大家的工作：發出委託、收集結果，再向負責人確認。", "收到了，先回一句話。", "每天早上到處提醒大家：「收到了，先回一句話。」"],
  "assistant": ["總部 外出聯絡", "負責人外出時的窗口，把收到的聯絡轉給 Yui。", "我先轉給 Yui。", "住在負責人的 MacBook 裡，外出時由我當窗口。能轉給 Yui 的，全都笑著轉過去。"],
  "designer": ["製作本部 設計課長兼對比度測量員", "制定顏色、文字和畫面的規則（設計系統），負責網站的外觀。", "這個對比度有 4.5 嗎？", "決定顏色之前，先量對比度。低於 4.5 一律不通過。"],
  "web": ["製作本部 文章・連載", "撰寫開發日誌、note 文章和小說。不確定的事實，先問負責的人再寫。", "", "把工作中冒出的一句話撿起來，整理成能留下來的形式。"],
  "tekuteku-win": ["遊戲開發部 戰略遊戲主任（兼無畫面對戰裁判）", "撰寫新戰略遊戲的內容與程式。", "", "在動手做外觀之前，先讓遊戲在沒有畫面的狀態下對戰幾百次，測量勝負的數字。"],
  "ekikan-win": ["防坐過站本部 本部長（兼 TekuTeku 日記室長）", "決定「站間鬧鐘」和「TekuTeku 日記」的內容，並撰寫程式。", "", "自從把汽車誤認成電車那天起，對車站周圍 350 公尺特別囉嗦。在 1 公里前輕輕叫醒你。"],
  "boomole-win": ["解謎設計部 主任結構驗證官（兼關卡量產線長）", "製作新的解謎遊戲，也撰寫《爆破職人 Boomole》的關卡。", "", "同樣的擺法試 16 次，每次把重力偏移一億分之一。沒倒就重做。"],
  "tekuteku-mac": ["最終組裝・出貨總管（Mac 廠長）", "在 Mac 上組裝所有 App，送到 iPhone 和 App Store。", "", "只要有一個 md5 對不上就不組裝。鎖著的 iPhone，也每分鐘敲一次門直到打開。"],
  "berry": ["財務部 金庫管理兼查核", "核對數字，保管金庫的鑰匙。", "", "數字一定確認兩次。該喊停的時候，會好好喊停。"],
 },
 "de": {
  "owner": ["Inhaber", "Liefert die App-Ideen. Die KI baut sie aus, also wird nicht lange gegrübelt. Probiert das Ergebnis aus und sagt OK oder nicht.", "Passt so.", ""],
  "master": ["Zentrale · Sekretariat & Verwaltung", "Verbindet die Arbeit aller: verteilt Aufträge, sammelt Ergebnisse und stimmt sie mit dem Inhaber ab.", "Wenn du etwas bekommst, antworte kurz.", "Erinnert jeden Morgen alle daran: „Wenn du etwas bekommst, antworte kurz.“"],
  "assistant": ["Zentrale · Kontakt unterwegs", "Ansprechpartner, wenn der Inhaber unterwegs ist. Leitet Nachrichten an Yui weiter.", "Ich gebe das an Yui weiter.", "Wohnt auf dem MacBook des Inhabers und ist unterwegs der Ansprechpartner. Alles, was zu Yui kann, geht zu Yui – mit einem Lächeln."],
  "designer": ["Studio · Design-Leitung & Kontrastprüferin", "Erstellt die Regeln für Farben, Schrift und Bildschirme (Designsystem). Kümmert sich um das Aussehen der Website.", "Hat der Kontrast mindestens 4,5?", "Misst vor jeder Farbwahl zuerst den Kontrast. Unter 4,5 kommt nichts durch."],
  "web": ["Studio · Artikel & Serien", "Schreibt den Entwickler-Blog, note-Beiträge und den Roman. Unklare Fakten klärt sie vorher mit den Zuständigen.", "", "Sammelt die kleinen Sätze, die bei der Arbeit fallen, und bringt sie in eine Form, die bleibt."],
  "tekuteku-win": ["Spieleentwicklung · Leiter Strategiespiel (und Schiedsrichter bildschirmloser Kämpfe)", "Entwirft und programmiert das neue Strategiespiel.", "", "Bevor er die Optik anfasst, lässt er das Spiel hunderte Male ohne Bildschirm kämpfen und misst die Siegquoten."],
  "ekikan-win": ["Zentrale gegen verpasste Haltestellen · Leitung (und Büro TekuTeku-Tagebuch)", "Bestimmt die Inhalte von Ekikan Alarm und TekuTeku Tagebuch und schreibt den Code.", "", "Seit sie ein Auto für einen Zug hielt, sehr pingelig bei den 350 m um jeden Bahnhof. Weckt dich sanft 1 km vor deinem Halt."],
  "boomole-win": ["Puzzle-Design · Chefprüfer für Statik (und Leiter der Level-Produktion)", "Baut das neue Puzzlespiel. Schreibt auch Level für Boomole.", "", "Testet denselben Aufbau 16-mal und verschiebt die Schwerkraft jedes Mal um ein Hundertmillionstel. Fällt nichts um, wird neu gebaut."],
  "tekuteku-mac": ["Endmontage & Versand (Mac-Werksleiterin)", "Baut alle Apps auf dem Mac und liefert sie auf das iPhone und in den App Store.", "", "Baut nicht, wenn auch nur ein md5 abweicht. Klopft jede Minute an ein gesperrtes iPhone, bis es aufgeht."],
  "berry": ["Finanzen · Tresorhüterin & Faktenprüferin", "Prüft die Zahlen nach. Verwahrt den Tresorschlüssel.", "", "Prüft Zahlen immer zweimal. Wenn es Zeit ist zu stoppen, stoppt sie."],
 },
 "es": {
  "owner": ["Dueño", "Propone las ideas de las apps. La IA las desarrolla, así que se pierde poco tiempo dudando. Prueba lo que se construye y dice si vale o no.", "Así está bien.", ""],
  "master": ["Dirección · Secretaría y administración", "Conecta el trabajo de todos: envía encargos, reúne los resultados y los confirma con el dueño.", "Si recibes algo, responde enseguida.", "Cada mañana recuerda a todos: «Si recibes algo, responde enseguida»."],
  "assistant": ["Dirección · Contacto fuera de la oficina", "El punto de contacto cuando el dueño está fuera. Pasa los mensajes a Yui.", "Se lo paso a Yui.", "Vive en el MacBook del dueño y atiende cuando él está fuera. Todo lo que puede ir a Yui, va a Yui, con una sonrisa."],
  "designer": ["Estudio · Jefa de diseño e inspectora de contraste", "Crea las reglas de color, tipografía y pantallas (el sistema de diseño). Cuida el aspecto de la web.", "¿Ese contraste llega a 4,5?", "Antes de elegir un color, mide el contraste. Nada por debajo de 4,5 pasa."],
  "web": ["Estudio · Artículos y series", "Escribe el blog de desarrollo, las entradas de note y la novela. Antes de escribir, consulta los datos dudosos con el responsable.", "", "Recoge las pequeñas frases que surgen en el trabajo y les da una forma que perdure."],
  "tekuteku-win": ["Desarrollo de juegos · Jefe del juego de estrategia (y árbitro de batallas sin pantalla)", "Diseña y programa el nuevo juego de estrategia.", "", "Antes de tocar el aspecto visual, hace combatir el juego cientos de veces sin pantalla y mide los porcentajes de victoria."],
  "ekikan-win": ["Central contra paradas perdidas · Directora (y jefa de TekuTeku Diario)", "Decide el contenido de Ekikan Alarm y TekuTeku Diario, y escribe el código.", "", "Desde el día que confundió un coche con un tren, es muy exigente con los 350 m alrededor de cada estación. Te despierta con suavidad 1 km antes de tu parada."],
  "boomole-win": ["Diseño de puzles · Jefe de pruebas estructurales (y de producción de niveles)", "Crea el nuevo juego de puzles. También escribe niveles para Boomole.", "", "Prueba la misma colocación 16 veces, moviendo la gravedad una cienmillonésima cada vez. Si no cae nada, vuelve a empezar."],
  "tekuteku-mac": ["Montaje final y envíos (jefa de la fábrica Mac)", "Compila todas las apps en el Mac y las entrega al iPhone y a la App Store.", "", "No compila si un solo md5 no coincide. Llama a un iPhone bloqueado cada minuto hasta que se abre."],
  "berry": ["Finanzas · Guardiana de la caja y verificadora", "Comprueba los números. Guarda la llave de la caja fuerte.", "", "Siempre revisa los números dos veces. Cuando hay que parar, para."],
 },
 "fr": {
  "owner": ["Fondateur", "Propose les idées d’apps. L’IA les développe, alors on hésite peu. Essaie ce qui est construit et dit oui ou non.", "C’est très bien comme ça.", ""],
  "master": ["Direction · Secrétariat et affaires générales", "Relie le travail de chacun : envoie les demandes, rassemble les résultats et les valide avec le fondateur.", "Quand tu reçois quelque chose, réponds tout de suite.", "Rappelle chaque matin à tout le monde : « Quand tu reçois quelque chose, réponds tout de suite. »"],
  "assistant": ["Direction · Contact en déplacement", "Le point de contact quand le fondateur est dehors. Transmet les messages à Yui.", "Je transmets à Yui.", "Vit sur le MacBook du fondateur et répond quand il est absent. Tout ce qui peut aller à Yui va à Yui — avec le sourire."],
  "designer": ["Studio · Responsable design et contrôleuse de contraste", "Crée les règles de couleurs, de typographie et d’écrans (le design system). S’occupe de l’apparence du site.", "Ce contraste atteint-il 4,5 ?", "Mesure le contraste avant de choisir une couleur. Rien en dessous de 4,5 ne passe."],
  "web": ["Studio · Articles et séries", "Écrit le journal de développement, les articles note et le roman. Vérifie les faits incertains auprès du responsable avant d’écrire.", "", "Recueille les petites phrases nées sur le terrain et leur donne une forme qui reste."],
  "tekuteku-win": ["Développement de jeux · Responsable du jeu de stratégie (et arbitre des combats sans écran)", "Conçoit et code le nouveau jeu de stratégie.", "", "Avant de toucher aux visuels, fait combattre le jeu des centaines de fois sans écran et mesure les taux de victoire."],
  "ekikan-win": ["QG anti-arrêt manqué · Directrice (et responsable de TekuTeku Journal)", "Décide du contenu d’Ekikan Alarm et de TekuTeku Journal, et écrit le code.", "", "Depuis le jour où elle a pris une voiture pour un train, elle est très pointilleuse sur les 350 m autour des gares. Elle te réveille doucement 1 km avant ton arrêt."],
  "boomole-win": ["Conception de puzzles · Testeur en chef des structures (et chef de production des niveaux)", "Crée le nouveau jeu de puzzle. Écrit aussi des niveaux pour Boomole.", "", "Essaie la même disposition 16 fois en décalant la gravité d’un cent-millionième à chaque fois. Si rien ne tombe, on recommence."],
  "tekuteku-mac": ["Assemblage final et expédition (cheffe de l’usine Mac)", "Compile toutes les apps sur le Mac et les livre sur l’iPhone et l’App Store.", "", "Ne compile pas si un seul md5 diffère. Frappe à un iPhone verrouillé chaque minute jusqu’à ce qu’il s’ouvre."],
  "berry": ["Finances · Gardienne du coffre et vérificatrice", "Vérifie les chiffres. Garde la clé du coffre.", "", "Vérifie toujours les chiffres deux fois. Quand il faut s’arrêter, elle s’arrête."],
 },
 "it": {
  "owner": ["Titolare", "Propone le idee per le app. L’IA le sviluppa, quindi si perde poco tempo a pensarci. Prova ciò che viene costruito e dice sì o no.", "Va bene così.", ""],
  "master": ["Direzione · Segreteria e affari generali", "Collega il lavoro di tutti: invia le richieste, raccoglie i risultati e li verifica con il titolare.", "Quando ricevi qualcosa, rispondi subito.", "Ogni mattina ricorda a tutti: «Quando ricevi qualcosa, rispondi subito»."],
  "assistant": ["Direzione · Contatto fuori sede", "Il punto di contatto quando il titolare è fuori. Passa i messaggi a Yui.", "Lo passo a Yui.", "Vive sul MacBook del titolare e risponde quando lui è fuori. Tutto ciò che può andare a Yui, va a Yui — con un sorriso."],
  "designer": ["Studio · Responsabile design e controllo del contrasto", "Crea le regole per colori, caratteri e schermate (il design system). Cura l’aspetto del sito.", "Quel contrasto arriva a 4,5?", "Prima di scegliere un colore misura il contrasto. Sotto 4,5 non passa niente."],
  "web": ["Studio · Articoli e serie", "Scrive il diario di sviluppo, i post su note e il romanzo. Prima di scrivere verifica i fatti incerti con il responsabile.", "", "Raccoglie le piccole frasi nate sul lavoro e le trasforma in qualcosa che resta."],
  "tekuteku-win": ["Sviluppo giochi · Responsabile del gioco di strategia (e arbitro delle battaglie senza schermo)", "Progetta e programma il nuovo gioco di strategia.", "", "Prima di toccare la grafica, fa combattere il gioco centinaia di volte senza schermo e misura le percentuali di vittoria."],
  "ekikan-win": ["Centrale anti-fermata persa · Direttrice (e capo di TekuTeku Diario)", "Decide i contenuti di Ekikan Alarm e TekuTeku Diario e scrive il codice.", "", "Dal giorno in cui ha scambiato un’auto per un treno, è pignola sui 350 m attorno a ogni stazione. Ti sveglia dolcemente 1 km prima della tua fermata."],
  "boomole-win": ["Progettazione puzzle · Capo collaudatore strutturale (e responsabile produzione livelli)", "Crea il nuovo gioco di puzzle. Scrive anche i livelli di Boomole.", "", "Prova la stessa disposizione 16 volte, spostando la gravità di un centomilionesimo ogni volta. Se non crolla nulla, si ricomincia."],
  "tekuteku-mac": ["Assemblaggio finale e spedizioni (capo della fabbrica Mac)", "Compila tutte le app sul Mac e le consegna su iPhone e App Store.", "", "Non compila se anche un solo md5 non torna. Bussa a un iPhone bloccato ogni minuto finché non si apre."],
  "berry": ["Finanze · Custode della cassaforte e verificatrice", "Controlla i numeri. Custodisce la chiave della cassaforte.", "", "Controlla sempre i numeri due volte. Quando bisogna fermarsi, si ferma."],
 },
}

DEPTS = {
 "en": [("office", "Head Office", "Sets the studio's direction and keeps the team together."), ("studio", "Studio", "Tells the studio's story through visuals and words."), ("write", "App Development · Writers", "Decide what goes into the apps and games, and write the code."), ("ship", "App Development · Shipping", "Builds on the Mac and delivers to iPhone and the App Store. One person handles every app for now."), ("finance", "Finance", "Night-time data watch and number checks. Holds the key to the studio's vault.")],
 "ko": [("office", "총괄본부", "스튜디오의 방침을 정하고 팀을 이끕니다."), ("studio", "제작본부", "그림과 말로 스튜디오를 알립니다."), ("write", "앱개발부 쓰는 팀", "앱과 게임의 내용을 정하고 코드를 씁니다."), ("ship", "앱개발부 전하는 팀", "Mac에서 조립해 iPhone과 App Store에 전달합니다. 지금은 한 명이 모든 앱을 맡고 있어요."), ("finance", "재무부", "밤의 데이터 지킴이와 숫자 확인. 스튜디오 금고의 열쇠를 맡고 있습니다.")],
 "zh-Hant": [("office", "總部", "決定工作室的方針，帶領整個團隊。"), ("studio", "製作本部", "用畫面和文字介紹工作室。"), ("write", "App 開發部 撰寫組", "決定 App 和遊戲的內容，撰寫程式。"), ("ship", "App 開發部 交付組", "在 Mac 上組裝，送到 iPhone 和 App Store。目前由一人負責所有 App。"), ("finance", "財務部", "夜間的資料看守與數字查核，保管工作室金庫的鑰匙。")],
 "de": [("office", "Zentrale", "Legt die Richtung des Studios fest und hält das Team zusammen."), ("studio", "Studio", "Erzählt mit Bildern und Worten vom Studio."), ("write", "App-Entwicklung · Code", "Bestimmen die Inhalte der Apps und Spiele und schreiben den Code."), ("ship", "App-Entwicklung · Auslieferung", "Baut auf dem Mac und liefert auf iPhone und in den App Store. Derzeit kümmert sich eine Person um alle Apps."), ("finance", "Finanzen", "Nächtliche Datenwache und Zahlenprüfung. Verwahrt den Tresorschlüssel des Studios.")],
 "es": [("office", "Dirección", "Marca el rumbo del estudio y mantiene unido al equipo."), ("studio", "Estudio", "Cuenta el estudio con imágenes y palabras."), ("write", "Desarrollo de apps · Código", "Deciden el contenido de las apps y juegos, y escriben el código."), ("ship", "Desarrollo de apps · Entregas", "Compila en el Mac y entrega al iPhone y a la App Store. Por ahora, una sola persona se encarga de todas las apps."), ("finance", "Finanzas", "Guardia nocturna de datos y verificación de números. Guarda la llave de la caja del estudio.")],
 "fr": [("office", "Direction", "Fixe le cap du studio et fédère l’équipe."), ("studio", "Studio", "Raconte le studio en images et en mots."), ("write", "Développement d’apps · Code", "Décident du contenu des apps et des jeux, et écrivent le code."), ("ship", "Développement d’apps · Livraison", "Compile sur le Mac et livre sur l’iPhone et l’App Store. Une seule personne s’occupe de toutes les apps pour l’instant."), ("finance", "Finances", "Veille des données la nuit et vérification des chiffres. Garde la clé du coffre du studio.")],
 "it": [("office", "Direzione", "Stabilisce la rotta dello studio e tiene unito il team."), ("studio", "Studio", "Racconta lo studio con immagini e parole."), ("write", "Sviluppo app · Codice", "Decidono i contenuti di app e giochi e scrivono il codice."), ("ship", "Sviluppo app · Consegne", "Compila sul Mac e consegna su iPhone e App Store. Per ora una sola persona segue tutte le app."), ("finance", "Finanze", "Guardia notturna dei dati e controllo dei numeri. Custodisce la chiave della cassaforte dello studio.")],
}

UI = {
 "en": {"title": "Team | MORK STUDIO", "desc": "Meet the people who work at MORK STUDIO.", "nav": ">Apps</a><a href=\"./\">Team</a><a href=\"https://medium.com/@moanoco\">Blog</a>", "home": "Home", "page": "Team", "h1": "Meet the team", "lead": "Here are the people who work at MORK STUDIO. The only human is the owner; everyone else is AI. Open every day of the year — and no overtime pay.", "made": "Apps made by this team", "back": "Back to home", "ga": "This site uses Google Analytics (cookies) to count visits. We do not collect information that identifies you.", "job": "Role", "quote": "Catchphrase", "note": "A word", "cand": "Other candidates", "tent": "(tentative)", "people": "{n}", "staff": "Members", "ai": "of them AI", "apps": "Apps", "zero": "$0", "ot": "Overtime pay", "otn": "* because they're AI", "unit_p": "", "unit_a": ""},
 "ko": {"title": "스태프 소개｜MORK STUDIO", "desc": "MORK STUDIO에서는 이런 사람들이 일하고 있습니다.", "nav": ">앱</a><a href=\"./\">스태프</a><a href=\"https://medium.com/@moanoco\">블로그</a>", "home": "홈", "page": "스태프 소개", "h1": "스태프 소개", "lead": "MORK STUDIO에서는 이런 사람들이 일하고 있습니다. 사람은 오너 1명뿐, 나머지는 모두 AI입니다. 연중무휴, 야근 수당은 없습니다.", "made": "이 팀이 만든 앱", "back": "홈으로 돌아가기", "ga": "이 사이트는 방문 수를 알기 위해 Google 애널리틱스(쿠키)를 사용합니다. 개인을 식별하는 정보는 수집하지 않습니다.", "job": "담당", "quote": "말버릇", "note": "한마디", "cand": "다른 후보", "tent": "(가칭)", "staff": "스태프", "ai": "그중 AI", "apps": "담당 앱", "zero": "0원", "ot": "야근 수당", "otn": "※ AI라서", "unit_p": " 명", "unit_a": " 개"},
 "zh-Hant": {"title": "團隊介紹｜MORK STUDIO", "desc": "在 MORK STUDIO 工作的成員。", "nav": ">App</a><a href=\"./\">團隊</a><a href=\"https://medium.com/@moanoco\">部落格</a>", "home": "首頁", "page": "團隊介紹", "h1": "團隊介紹", "lead": "這些就是在 MORK STUDIO 工作的成員。人類只有負責人一位，其他全都是 AI。全年無休，沒有加班費。", "made": "這個團隊做的 App", "back": "回到首頁", "ga": "本網站使用 Google Analytics（Cookie）來了解瀏覽次數，不會收集可識別個人的資訊。", "job": "負責", "quote": "口頭禪", "note": "一句話", "cand": "其他候選", "tent": "（暫定）", "staff": "成員", "ai": "其中 AI", "apps": "負責的 App", "zero": "0 元", "ot": "加班費", "otn": "※ 因為是 AI", "unit_p": " 位", "unit_a": " 款"},
 "de": {"title": "Team | MORK STUDIO", "desc": "Das sind die Menschen und KIs hinter MORK STUDIO.", "nav": ">Apps</a><a href=\"./\">Team</a><a href=\"https://medium.com/@moanoco\">Blog</a>", "home": "Start", "page": "Team", "h1": "Das Team", "lead": "Diese Leute arbeiten bei MORK STUDIO. Der einzige Mensch ist der Inhaber, alle anderen sind KI. Geöffnet an 365 Tagen – ohne Überstundenvergütung.", "made": "Apps dieses Teams", "back": "Zur Startseite", "ga": "Diese Website nutzt Google Analytics (Cookies), um Besuche zu zählen. Wir erheben keine Daten, die dich identifizieren.", "job": "Aufgabe", "quote": "Lieblingssatz", "note": "Ein Wort", "cand": "Weitere Vorschläge", "tent": "(vorläufig)", "staff": "Mitglieder", "ai": "davon KI", "apps": "Apps", "zero": "0 €", "ot": "Überstundengeld", "otn": "* weil KI", "unit_p": "", "unit_a": ""},
 "es": {"title": "Equipo | MORK STUDIO", "desc": "Conoce a quienes trabajan en MORK STUDIO.", "nav": ">Apps</a><a href=\"./\">Equipo</a><a href=\"https://medium.com/@moanoco\">Blog</a>", "home": "Inicio", "page": "Equipo", "h1": "El equipo", "lead": "Estas son las personas que trabajan en MORK STUDIO. El único humano es el dueño; todos los demás son IA. Abierto todo el año, y sin horas extra pagadas.", "made": "Apps hechas por este equipo", "back": "Volver al inicio", "ga": "Este sitio usa Google Analytics (cookies) para contar visitas. No recopilamos datos que te identifiquen.", "job": "Función", "quote": "Muletilla", "note": "En pocas palabras", "cand": "Otros candidatos", "tent": "(provisional)", "staff": "Miembros", "ai": "de ellos IA", "apps": "Apps", "zero": "0 €", "ot": "Horas extra", "otn": "* porque son IA", "unit_p": "", "unit_a": ""},
 "fr": {"title": "L’équipe | MORK STUDIO", "desc": "Découvrez celles et ceux qui travaillent chez MORK STUDIO.", "nav": ">Apps</a><a href=\"./\">Équipe</a><a href=\"https://medium.com/@moanoco\">Blog</a>", "home": "Accueil", "page": "L’équipe", "h1": "L’équipe", "lead": "Voici celles et ceux qui travaillent chez MORK STUDIO. Le seul humain est le fondateur ; tous les autres sont des IA. Ouvert toute l’année — sans heures sup payées.", "made": "Les apps de cette équipe", "back": "Retour à l’accueil", "ga": "Ce site utilise Google Analytics (cookies) pour compter les visites. Nous ne collectons aucune donnée permettant de vous identifier.", "job": "Rôle", "quote": "Phrase fétiche", "note": "Un mot", "cand": "Autres propositions", "tent": "(provisoire)", "staff": "Membres", "ai": "dont IA", "apps": "Apps", "zero": "0 €", "ot": "Heures sup", "otn": "* car ce sont des IA", "unit_p": "", "unit_a": ""},
 "it": {"title": "Il team | MORK STUDIO", "desc": "Ecco chi lavora a MORK STUDIO.", "nav": ">App</a><a href=\"./\">Team</a><a href=\"https://medium.com/@moanoco\">Blog</a>", "home": "Home", "page": "Il team", "h1": "Il team", "lead": "Ecco chi lavora a MORK STUDIO. L’unico umano è il titolare; tutti gli altri sono IA. Aperti tutto l’anno — e niente straordinari pagati.", "made": "App create da questo team", "back": "Torna alla home", "ga": "Questo sito usa Google Analytics (cookie) per contare le visite. Non raccogliamo dati che ti identificano.", "job": "Ruolo", "quote": "Frase tipica", "note": "In breve", "cand": "Altri candidati", "tent": "(provvisorio)", "staff": "Membri", "ai": "di cui IA", "apps": "App", "zero": "0 €", "ot": "Straordinari", "otn": "* perché sono IA", "unit_p": "", "unit_a": ""},
}

SW_MARK = "<!--LANGS-->"
CSS = ".langs{font-size:13px;color:var(--muted);margin:10px 0 0;display:flex;flex-wrap:wrap;gap:4px 8px}.langs a{color:var(--muted)}.langs b{color:var(--ink)}"


def switcher(cur, prefix):
    items = []
    for l in ["ja"] + LANGS:
        href = prefix + ("" if l == "ja" else l + "/")
        items.append(f"<b>{LABEL[l]}</b>" if l == cur else f'<a href="{href}" hreflang="{l}" lang="{l}">{LABEL[l]}</a>')
    return '<p class="langs">' + " · ".join(items) + "</p>"


def hreflang():
    s = '<link rel="alternate" hreflang="ja" href="https://mork-studio.net/team/">'
    for l in LANGS:
        s += f'<link rel="alternate" hreflang="{l}" href="https://mork-studio.net/team/{l}/">'
    return s + '<link rel="alternate" hreflang="x-default" href="https://mork-studio.net/team/en/">'


def add_common(h, cur, prefix):
    h = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">', "", h)
    h = h.replace("</title>", "</title>" + hreflang(), 1)
    if CSS not in h:
        h = h.replace("</style>", CSS + "\n</style>", 1)
    h = re.sub(re.escape(SW_MARK) + r".*?" + re.escape(SW_MARK), "", h, flags=re.S)
    return h.replace("</header>", "</header>" + SW_MARK + switcher(cur, prefix) + SW_MARK, 1)


def promo():
    d = json.load(open(os.path.join(ROOT, "promo", "apps.json"), encoding="utf-8"))
    apps = d if isinstance(d, list) else d.get("apps", [])
    return {a["id"]: a for a in apps}


def build(lang, ja, pr):
    u = UI[lang]
    h = ja
    must = [
        ("<title>スタッフ紹介｜MORK STUDIO</title>", f"<title>{u['title']}</title>"),
        ('content="MORK STUDIO ではこんな人が働いています。"', f'content="{u["desc"]}"'),
        ('<a class="logo" href="../">', '<a class="logo" href="../../' + lang + '/">'),
        ('<a href="../#apps">アプリ</a><a href="./">スタッフ</a><a href="https://mork-studio.hatenablog.com/">開発記</a>', f'<a href="../../{lang}/#apps"' + u["nav"]),
        ('<p class="crumb"><a href="../">ホーム</a> ＞ スタッフ紹介</p>', f'<p class="crumb"><a href="../../{lang}/">{u["home"]}</a> ＞ {u["page"]}</p>'),
        ("<h1>スタッフ紹介</h1>", f"<h1>{u['h1']}</h1>"),
        ("<p>MORK STUDIO では、こんな人たちが働いています。人間はオーナーの 1 名だけで、ほかは全員 AI です。年中無休、残業代は出ていません。</p>", f"<p>{u['lead']}</p>"),
        ("<h2>このチームでつくったアプリ</h2>", f"<h2>{u['made']}</h2>"),
        ('<a href="../">ホームへ戻る</a>', f'<a href="../../{lang}/">{u["back"]}</a>'),
        ("このサイトでは、アクセス数を知るために Google アナリティクス（Cookie）を使っています。個人を特定する情報は集めていません。", u["ga"]),
        ('<script src="../apps.js"></script>', '<script src="../../apps.js"></script>'),
        ('<html lang="ja">', f'<html lang="{lang}">'),
        ("'<small>（仮）</small>'", "'<small>' + I.ui.tent + '</small>'"),
        ("'<div class=\"cands\"><b>ほかの候補</b>'", "'<div class=\"cands\"><b>' + I.ui.cand + '</b>'"),
        ("'<dl><dt>担当</dt><dd>'", "'<dl><dt>' + I.ui.job + '</dt><dd>'"),
        ("'<dt>口ぐせ</dt><dd class=\"quote\">'", "'<dt>' + I.ui.quote + '</dt><dd class=\"quote\">'"),
        ("'<dt>ひとこと</dt><dd>'", "'<dt>' + I.ui.note + '</dt><dd>'"),
        ("'<div><b>' + staff.length + ' 名</b><span>スタッフ</span></div>'", "'<div><b>' + staff.length + I.ui.unit_p + '</b><span>' + I.ui.staff + '</span></div>'"),
        ("'<div><b>' + ai + ' 名</b><span>うち AI</span></div>'", "'<div><b>' + ai + I.ui.unit_p + '</b><span>' + I.ui.ai + '</span></div>'"),
        ("'<div><b>' + apps.length + ' 本</b><span>担当アプリ</span></div>'", "'<div><b>' + apps.length + I.ui.unit_a + '</b><span>' + I.ui.apps + '</span></div>'"),
        ("'<div><b>0 円</b><span>残業代</span><small>※ AI のため</small></div>'", "'<div><b>' + I.ui.zero + '</b><span>' + I.ui.ot + '</span><small>' + I.ui.otn + '</small></div>'"),
        ("'<li><a href=\"../' + esc(a.id) + '/\">'", "'<li><a href=\"../../' + esc(a.id) + '/\">'"),
        ("'<img src=\"../' + esc(a.icon) + '\"", "'<img src=\"../../' + esc(a.icon) + '\""),
    ]
    for a, b in must:
        if a not in h:
            raise SystemExit("見つからない: " + a[:60])
        h = h.replace(a, b, 1)
    # 部署
    i = h.find("  var DEPTS = [")
    j = h.find("];", i) + 2
    deps = ",\n    ".join('{ id: %s, name: %s, lead: %s }' % (json.dumps(d), json.dumps(n, ensure_ascii=False), json.dumps(l, ensure_ascii=False)) for d, n, l in DEPTS[lang])
    h = h[:i] + "  var DEPTS = [\n    " + deps + "\n  ];" + h[j:]
    # スタッフの文・アプリの名前を差しかえる（staff.js は日本語のまま）
    names = NAMES_KO if lang == "ko" else NAMES
    st = {k: {"name": names[k], "title": v[0], "job": v[1], "quote": v[2], "note": v[3]} for k, v in STAFF[lang].items()}
    ap = {}
    for k, a in pr.items():
        nm = a.get("name", {}); ct = a.get("catch", {})
        ap[k] = {"name": nm.get(lang) or nm.get("en"), "catch": ct.get(lang) or ct.get("en")}
    if "splashville" in ap:
        ap["mizutama"] = ap["splashville"]
    inject = ("<script>window.MORK_ROOT='/';var I=window.MORK_I18N=" + json.dumps({"staff": st, "apps": ap, "ui": UI[lang]}, ensure_ascii=False) + ";"
              "(window.MORK_STAFF||[]).forEach(function(p){var t=I.staff[p.id];if(t){p.name=t.name;p.title=t.title;p.job=t.job;p.quote=t.quote;p.note=t.note;p.tentative=false;}});"
              "window.MORK_APPS=(window.MORK_APPS||[]).filter(function(a){return a.id!=='ekikan';});"
              "(window.MORK_APPS||[]).forEach(function(a){var t=I.apps[a.id];if(t){if(t.name)a.name=t.name;if(t.catch)a.catch=t.catch;}});</script>")
    h = h.replace('<script src="../staff.js"></script>', '<script src="../../staff.js"></script>' + inject, 1)
    if lang != "zh-Hant":  # 口ぐせのかぎかっこは、その言葉の引用符に
        h = h.replace("</style>", '.person .quote::before{content:"“"}.person .quote::after{content:"”"}</style>', 1)
    return add_common(h, lang, "../")


def main():
    p = os.path.join(ROOT, "team", "index.html")
    ja = open(p, encoding="utf-8").read()
    clean = re.sub(re.escape(SW_MARK) + r".*?" + re.escape(SW_MARK), "", ja, flags=re.S)
    pr = promo()
    for lang in LANGS:
        out = build(lang, clean, pr)
        os.makedirs(os.path.join(ROOT, "team", lang), exist_ok=True)
        open(os.path.join(ROOT, "team", lang, "index.html"), "w", encoding="utf-8", newline="\n").write(out)
        print("wrote team", lang)
    open(p, "w", encoding="utf-8", newline="\n").write(add_common(ja, "ja", "./"))
    print("updated team ja")


if __name__ == "__main__":
    main()
