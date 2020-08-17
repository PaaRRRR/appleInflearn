var sliderContentDatas = [
  "Next‑generation Smart HDR knows a face when it sees one, and intelligently relights it to capture more natural-looking contours and skin tones. It also finesses highlight and shadow detail in the background. So every part of your photo looks amazing.",
  "-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of ",
  "nce the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unch",
  "the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore alwa",
  " a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distr",
  'below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham'
];
var worldScript = {
  br: [
    "<p><span>Smart Tracking.</span><s> </s>Onde quer que você vá, o Pivo Pod te segue. Nunca mais fique fora do frame e estrague outra foto quase perfeita.</p>",
    "<p><span>Action Tracking.</span><s> </s>Selecione o alvo e deixe o Pivo Pod fazer o resto por você e nunca mais perca a ação.</p>",
    "<p><span>Super Portátil.</span><s> </s>Leve com você para onde quiser a rotação automática de 360 graus do Pivo, seus pés estabilizadores retráteis e dois suportes para smartphone. Pivo também é compatível com qualquer tripé padrão para câmeras.</p>",
    "<p><span>Pés estabilizadores.</span><s> </s>Utilize os pés retráteis do Pivo para ganhar mais estabilidade ou simplesmente coloque-o em um tripé padrão de rosca ¼.</p>",
    "<p><span>Controle preciso.</span><s> </s>O máximo em conveniência. Todo Pivo vem com um controle remoto, possibilitando facilidade na hora de capturar suas fotos e vídeos.</p>",
    '<p><span>Double Take.</span><s> </s>Crie "antes-e-depois" clássicos! Sem precisar saber nada de edição.</p>',
    '<p><span>Flash.</span><s> </s>Esteja em outro lugar antes de terminar de dizer "flash".</p>',
    "<p><span>Versus.</span><s> </s>Compita com contra seus amigos em divertidas batalhas de dança e Rap.</p>",
    '<p><span>Horse Tracking</span><s> </s>Quatro diferentes velocidades para gravar seus passeios a cavalo sem perder um trote se quer.</p> <div class="small_notice">* A eficácia do Auto-tracking varia de acordo com o modelo do seu smartphone. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> Saiba mais </a></div> '
  ],
  de: [
    "<p><span>Smart Tracking.</span><s> </s><strong>Wo immer du hingehst, Pivo folgt dir.</strong> Smart Tracking hat dich immer im Fokus,damit du nie wieder aus dem Blickfeld läufst und deine perfekten Aufnahmen erhalten bleiben._Funktioniert im Portrait und Panoramamodus.</p>",
    "<p><span>Action Tracking.</span><s> </s>Wenn du möchtest das Pivo einer bestimmten Aktion folgt, wähle einfach dein Objekt aus und Pivo wird den Rest erledigen. Funktioniert im für Front und Selfiekamera.</p>",
    "<p><span>Super handlich.</span><s> </s>Nimm Pivo “to-go” mit 360° auto-rotation, Stabilisierungsfüßen  kompatibel mit deinem standard Kamerastativ.</p>",
    "<p><span>Stabiler Stand.</span><s> </s>Fahre Pivo’s Füsse aus um mehr Stabilität zu erhalten oder benutze ein standard Stativ mit einem  ¼” Gewinde.</p>",
    "<p><span>Precise control.</span><s> </s>The ultimate in convenience. Every Pivo comes with a Fernbedienung, allowing you to capture with ease.</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>Vier verschiedene Geschwindigkeiten, um jeden Ritt aufzuzeichnen, ohne einen Trab zu verpassen.</p> <div class="small_notice">* Die Tracking-Qualität variiert je nach Smartphone-Modell. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> Mehr erfahren </a> </div> '
  ],
  fr: [
    "<p><span>Smart Tracking.</span><s> </s>Pivo te suit, où que tu ailles. Ne marche plus jamais hors-champ au risque de ruiner ta séquence presque-parfait.</p>",
    "<p><span>Action Tracking.</span><s> </s>Choisis ta cible et laisse Pivo s'occuper du reste pour ne jamais rien manquer.</p>",
    "<p><span>Parfaitement portable.</span><s> </s>Emmène Pivo en tournée avec sa rotation auto à 360°, un monopod extensible, et un support pour trépied standard.</p>",
    "<p><span>Un aplomb contagieux.</span><s> </s>Déploie les pieds rétractables de Pivo pour un maximum de stabilité ou visse le directement sur n’importe quel trépied doté d’un pas de vis ¼.</p>",
    "<p><span>Un contrôle précis.</span><s> </s>Le paroxysme de la praticité. Chaque Pivo est fourni avec sa télécommande, pour une capture encore plus facile.</p>",
    "<p><span>Double Take.</span><s> </s>Mixe différents événements pour un effet avant/après dément. Pas besoin d'éditer.</p>",
    "<p><span>Flash.</span><s> </s>Teleporte-toi plus vite que ton ombre.</p>",
    "<p><span>Versus.</span><s> </s>Challenge tes amis pour des battles de rap et de danse hilarants. Pas besoin d'éditer.</p>",
    '<p><span>Horse Tracking</span><s> </s>4 vitesses différentes pour filmer chaque sortie, sans galoper à faux.</p> <div class="small_notice">* La qualité du tracking varie selon le modèle du smartphone. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-">En savoir plus. </a> </div> '
  ],
  it: [
    "<p><span>Smart Tracking.</span><s> </s>Ovunque vai, Pivo Pod ti segue. Non uscire più dall'inquadratura rovinando riprese quasi perfette.</p>",
    "<p><span>Action Tracking.</span><s> </s>Seleziona il tuo target e lascia fare il resto a Pivo, così da non perdere più nemmeno un azione.</p>",
    "<p><span>Perfettamente Portatile.</span><s> </s>Porta con te la rotazione automatica a 360° di Pivo, i suoi piedi stabili-retraibili e il suo supporto per treppiedi standard.</p>",
    "<p><span>Piedi stabili.</span><s> </s>Utilizza i piedi retraibili di Pivo per ottenere più stabilità o montali semplicemente su un qualsiasi treppiedi standard con filettatura da ¼”. </p>",
    "<p><span>Un controllo preciso.</span><s> </s>Il massimo della comodità. Ogni Pivo è dotato di un controllo remoto, che ti permette di catturare immagini con facilità.</p>",
    '<p><span>Double Take.</span><s> </s>Crea classici storytelling con "prima e dopo"! Senza dover sapere editare. </p>',
    '<p><span>Flash.</span><s> </s>Ritrovati nella prossima scena prima ancora che tu riesca a dire "flash". </p>',
    "<p><span>Versus.</span><s> </s>Sfida i tuoi amici in balli esliaranti e insane battaglie rap.</p>",
    '<p><span>Horse Tracking</span><s> </s>Quattro differenti velocità per registrare ogni cavalcata senza perdere nemmeno un passo.</p> <div class="small_notice">*La qualità del tracciamento varia in base al modello dello smartphone. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> Scopri di più </a> </div> '
  ],
  ja: [
    "<p><span>Smart Tracking.</span><s> </s>Pivoはあなたから目を離しません。自撮り動画のフレームアウトでお困りの方におすすめ。縦向きでも横向きでも撮影可能。</p>",
    "<p><span>Action Tracking.</span><s> </s>画面をタップして被写体を指定したら、あとはPivoにおまかせ。フロント・リアカメラの両方を使用できます。</p>",
    "<p><span>持ち運べる手のひらサイズ.</span><s> </s>コンパクトなPivoをカバンに入れておけば、いつでもどこでもコンテンツを作れます。360度自動回転、三脚にも対応しています。</p>",
    "<p><span>バランスを考慮した設計.</span><s> </s>Pivo Podの底面にある収納式ミニ三脚や、お持ちの三脚(1/4インチねじ)を使用して安定性を高めることができます。</p>",
    "<p><span>正確なコントロール.</span><s> </s>究極の利便性。付属のPivoリモコンで、離れた場所から簡単に撮影できます。</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>常歩、速歩、駈歩。様々な場面を想定して、4段階のトラッキング速度をご用意。</p> <div class="small_notice">* トラッキング品質はスマートフォン機種によって大きく変動します。 <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-?_ga=2.10312821.1554559569.1595404025-346446212.1592461427"> 互換性を確認する </a> </div> '
  ],
  ko: [
    "<p><span>Smart Tracking.</span><s> </s>당신이 어디를 가든 Pivo도 함께 합니다. Smart Tracking 기능은 앵글 밖을 벗어날 틈을 주지 않아요. 스마트폰의 가로, 세로 모든 방향에서 이용 가능해요.</p>",
    '<p><span>Action Tracking.</span><s> </s>스크린에서 가볍게 촬영 대상을 터치하면 똑똑한 <span class="font-eng">Pivo</span>가 따라갑니다. 전후면 카메라 모두 문제없어요.</p>',
    '<p><span>간편한 휴대성.</span><s> </s>휴대가 간편한 <span class="font-eng">Pivo</span>와 함께 언제어디서든 영감을 표현하세요. 내장 지지대, 범용 삼각대와 호환이 가능합니다. 작지만 유연하고 똑똑하죠.</p>',
    '<p><span>균형감을 고려한 설계.</span><s> </s><span class="font-eng">Pivo Pod</span> 바닥면에 있는 지지대를 이용하여 안정감을 높일 수 있어요. ¼규격 삼각대와 연결 가능합니다.</p>',
    "<p><span>정확한 컨트롤.</span><s> </s>제품에 포함된 리모컨을 이용하여 더 편하고 정밀하게 촬영하세요.</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>평보, 속보, 구보. 4가지 속도옵션 중 상황에 꼭 맞는 옵션을 선택할 수 있어요. </p> <div class="small_notice">* 트래킹품질은 사용하시는 스마트폰 기기에 따라 크게 달라집니다.<a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> 호환성 알아보기 </a> </div> '
  ],
  nl: [
    "<p><span>Smart Tracking.</span><s> </s><strong>Waar je ook gaat, Pivo volgt. Smart Tracking</strong> houdt je altijd in het zicht, zodat je nooit meer uit het beeld bent en opnieuw een bijna perfecte opname verpest. Werkt zowel in portret- als landschapsmodus.</p>",
    "<p><span>Action Tracking.</span><s> </s>Als je op een specifiek deel van de actie wil focussen, selecteer je gewoon het gewenste doel en laat Pivo de rest doen. Werkt zowel met de voor- als achtercamera.</p>",
    "<p><span>Perfect draagbaar.</span><s> </s>Neem Pivo mee met zijn 360° automatische rotatie, verschuifbare stabilisatievoeten en mogelijkheid om met een standaard camera tripods te gebruiken.</p>",
    "<p><span>Stabiele voet.</span><s> </s>Gebruik Pivo’s verschuifbare voeten voor extra stabiliteit of bevestig het aan een standaard tripod met een ¼” schroef.</p>",
    "<p><span>Precieze controle.</span><s> </s>Het ultieme gemak. Elke Pivo wordt geleverd met een afstandsbediening, zodat je gemakkelijk foto’s kan vastleggen.</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>Vier verschillende snelheden om elke rijsessie op te nemen zonder een pas te missen.</p> <div class="small_notice">De trackingkwaliteit varieert afhankelijk van het smartphonemodel. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-">Leer meer</a> </div> '
  ],
  ru: [
    "<p><span>Smart Tracking.</span><s> </s>Куда бы вы ни пошли, Pivo следует за вами. Smart Tracking всегда держит вас в фокусе, так что вы никогда не выйдете из кадра и не испортите свой очередной идеальный дубль. Работает в режимах  “портрет” и “ландшафт”. </p>",
    "<p><span>Action Tracking.</span><s> </s>Если вы хотите, чтобы Pivo сфокусировался на какой-то особой части действия, просто выберите цель, и пусть Pivo доделает остальное. Работает как на основной камере, так и на фронтальной.</p>",
    "<p><span>Суперпортативный.</span><s> </s>Возьмите с собой Pivo - устройство с автоматическим вращением на 360 градусов, двумя креплениями для смартфона и выдвижными ножками для стабилизации, совместимое с любым стандартным штативом.</p>",
    "<p><span>Устойчивая опора.</span><s> </s>Выдвигайте ножки устройства Pivo для дополнительной стабилизации изображения или просто прикрутите его к стандартному штативу с резьбой ¼.</p>",
    "<p><span>Стопроцентный контроль.</span><s> </s>И удобство. Каждое устройство Pivo идёт в комплекте с пультом управления, что максимально упрощает процесс съёмки.</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>Четыре разные скорости для записи каждого катания верхом без пропуска трота.</p> <div class="small_notice">* Качество отслеживания зависит от модели смартфона. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> Узнать больше </a> </div> '
  ],
  es: [
    "<p><span>Smart Tracking.</span><s> </s>Donde quiera que vayas, Pivo Pod te sigue. Nunca saldrás de la pantalla ni arruinaras otra foto casi perfecta de nuevo.</p>",
    "<p><span>Action Tracking.</span><s> </s>Selecciona tu objetivo y deje que Pivo Pod haga el resto para que nunca pierdas de foco la acción.</p>",
    "<p><span>Súper Portable.</span><s> </s>Lleva contigo a donde quieras  la rotación automática de 360 grados de Pivo, sus patas estabilizadoras extensibles y  dos soportes para smartphone. Pivo también es compatible con cualquier trípode estándar para cámaras.</p>",
    "<p><span>Patas estables.</span><s> </s>Utiliza las patas extensibles de Pivo para añadir estabilidad o simplemente colócalo en cualquier trípode con rosca de ¼. </p>",
    "<p><span>Control Preciso.</span><s> </s>Lo mejor en comodidad. Cada Pivo viene con un control remoto para capturar con solo un click.</p>",
    "<p><span>Double Take.</span><s> </s>Crea la clásica historia de antes y después. No requieres habilidades de edición.</p>",
    "<p><span>Flash.</span><s> </s>Aparece en otro sitio más rápido que un flash! </p>",
    "<p><span>Versus.</span><s> </s>Compite contra tus amigos en divertidos bailes y batallas de rap.</p>",
    '<p><span>Horse Tracking</span><s> </s>Cuatro velocidades diferentes para capturarte a trote.</p> <div class="small_notice">*La calidad de seguimiento varía según el modelo de teléfono celular. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-">Conocer más </a> </div> '
  ],
  pt: [
    "<p><span>Smart Tracking.</span><s> </s>O Pivo segue-te para qualquer lado que vás. O Smart Tracking mantém-te sempre no campo de visão, por isso nunca sairás do ecrã acabando por arruinar aquela foto ou gravação perfeita. Funciona tanto no modo retrato como mo modo paisagem.</p>",
    "<p><span>Action Tracking.</span><s> </s>Se quiseres que o Pivo se foque numa parte específica da cena, simplesmente seleciona o objecto que desejas seguir e deixa que o Pivo faça o resto por ti. Funciona tanto com a câmera frontal quanto com a câmera traseira.</p>",
    "<p><span>Super Portátil.</span><s> </s>Leva o Pivo para qualquer lado com rotação automática de 360 graus, pés estabilizadores retráteis e suporte standard para tripés.</p>",
    "<p><span>Pés estabilizadores.</span><s> </s>Utiliza os pés estabilizadores retráteis do Pivo para ganhar estabilidade ou simplesmente coloca-o num tripé padrão de rosca ¼. </p>",
    "<p><span>Controle preciso.</span><s> </s>Todos os Pivos vêm com controlo remoto, tonando mais fácil capturar fotos e vídeos à distância.</p>",
    '<p><span>Double Take.</span><s> </s>Cria "antes-e-depois" clássicos! Não precisas de saber nada de edição.</p>',
    "<p><span>Flash.</span><s> </s>Muda de lugar mais rapidamente que um flash.</p>",
    "<p><span>Versus.</span><s> </s>Compete com contra os teus amigos em divertidas batalhas de dança e Rap.</p>",
    '<p><span>Horse Tracking</span><s> </s>Quatro velocidades diferentes para gravar os teus passeios a cavalo sem perder um trote.</p> <div class="small_notice">* A eficácia do Auto-tracking varia de acordo com o modelo do teu smartphone. <a class="notice-link" href=" https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking- ">Saiba mais</a> </div> '
  ],
  zh: [
    "<p><span>智能追蹤.</span><s> </s>你走到哪，Pivo就跟到哪。你再也不會因為不小心走出屏幕，而破壞那個近乎完美的鏡頭啦。</p>",
    "<p><span>ACTION TRACKING （動作追蹤模式）.</span><s> </s>只需選取追蹤目標，Pivo自動幫你完成其他工作，讓你永遠不錯過那個動作。</p>",
    "<p><span>攜帶方便.</span><s> </s>把有360度旋轉雲台、兩種手機支架以及可伸縮穩定腳的Pivo輕鬆帶著走，還支援標準相機三腳架哦。</p>",
    "<p><span>穩定腳.</span><s> </s>拉出三個穩定腳讓Pivo更穩固，或者你也可以將Pivo安裝至任何一個有1/4英吋螺絲的標準三腳架上。</p>",
    "<p><span>精準控制.</span><s> </s>方便的極致。每台Pivo都配有一個遙控器，讓你輕鬆捕捉每個鏡頭.</p>",
    "<p><span>Double Take.</span><s> </s>創造經典的前後對比效果！無需任何編輯技巧。</p>",
    "<p><span>Flash.</span><s> </s>比閃電更快瞬間移動到下一場景。</p>",
    "<p><span>Versus.</span><s> </s>跟朋友搞笑尬舞，再來場饒舌大戰。</p>",
    '<p><span>Horse Tracking</span><s> </s>四種不同的速度來記錄每次騎馬視頻而不會不會丟掉每一幀。</p> <div class="small_notice">* 跟踪品質因智能手機型號而異。 <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-"> 了解更多</a></div> '
  ],
  ar: [
    '<h2>التتبع الذكي</h2><p><span  dir="rtl">Pivo يتبعك أينما ذهبت. التتبع الذكي يبقيك دائمًا في الشاشة،لذلك لن تفسد أي  لقطة مرة أخرى. يصلح للصور والوضع الأفقي </span></p>',
    '<h2>تتبع الحركة</h2><p><span dir="rtl">اختار هدفا. إن  اردت أن يقوم Pivo بالتركيز على جزء معين ، فحدد هدفك ودع Pivo يفعل الباقي. يصلح للكاميرات الأمامية والخلفية.</span></p>',
    "<h2>سهل للحمل</h2><p>استمتع بمحرك 360 درجة مع دوران تلقائي للهاتف الذكي وأرجل تثبيت قابلة للتمدد ودعم لحامل ثلاثي القوائم</p>",
    '<h2>أساس ثابت</h2><p><span dir="rtl">يمكنك تمديد أقدام بيفو للمزيد من الاستقرار أو باضافة أي ترايبود قياسي ذو 1/4. </span></p>',
    '<h2>تحكم دقيق</h2><p><span dir="rtl">المثالي في الراحة. كلPivo مجهز بآلة التحكم عن بعد ، مما يتيح لك التقاط الصور بسهولة.</span></p>',
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>مزود بأربع سرعات مختلفة لتصوير كل جولاتك. لن يفوت هرولة واحدة!</p> <div class="small_notice">* تتبع الجودة يختلف حسب نوع هاتفك الذكي. <a class="notice-link" href="https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking-">  اعرف أكثر</a> </div> '
  ],

  en: [
    "<p><span>Smart Tracking.</span><s> </s>Where you go, Pivo Pod follows to capture every expression and move. With Face and Body Tracking never ruin another nearly-perfect shot again.</p>",
    "<p><span>Action Tracking.</span><s> </s>Select your target and let Pivo Pod do the rest so you never miss out on the action.</p>",
    "<p><span>Perfectly Portable.</span><s> </s>Take Pivo to-go with 360° auto-rotation, extendable stabilizing feet, and support for standard camera tripods.</p>",
    "<p><span>Steady footing.</span><s> </s>Extend Pivo's feet for added stability or simply attach to any standard tripod with a ¼” thread.</p>",
    "<p><span>Precise control.</span><s> </s>The ultimate in convenience. Every Pivo comes with a remote control, allowing you to capture with ease.</p>",
    "<p><span>Double Take.</span><s> </s>Create classic before-and-after storytelling! No editing skills required.</p>",
    '<p><span>Flash.</span><s> </s>Be in the next place faster than you can say "flash."</p>',
    "<p><span>Versus.</span><s> </s>Compete against your friends in hilarious dance-offs and sick rap battles.</p>",
    '<p><span>Horse Tracking</span><s> </s>Four different tracking speeds to record every ride without missing a trot.</p> <div class="small_notice">* Tracking quality varies according to the smartphone model. <a class="notice-link" href=" https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking- "> Learn more </a> </div> '
  ]
};

var curLan = "en";
var SliderEachScript = [
  [
    {
      desktopVideo: "wistia_async_lw26fsjd4k",
      desktopVideoID: "lw26fsjd4k",
      mobileVideo: "wistia_async_93jwworfbx",
      mobileVideoID: "93jwworfbx",
      caption:
        "<p><span>Smart Tracking. </span><s>Wherever you go, Pivo Pod follows. Never walk off screen and ruin another nearly-perfect shot again.</s></p>"
    },
    {
      desktopVideo: "wistia_async_rnvujdxdth",
      desktopVideoID: "rnvujdxdth",
      mobileVideo: "wistia_async_eoilco3b1p",
      mobileVideoID: "eoilco3b1p",
      caption:
        "<p><span>Action Tracking. </span><s>Select your target and let Pivo Pod do the rest so you never miss out on the action.</s></p>"
    },
    {
      desktopVideo: "wistia_async_81wwqcj836",
      desktopVideoID: "81wwqcj836",
      mobileVideo: "wistia_async_c5g5wrkd62",
      mobileVideoID: "c5g5wrkd62",
      caption:
        '<p><span>Horse Tracking</span><s> </s>Four different tracking speeds to record every ride without missing a trot.</p> <div class="small_notice">* Tracking quality varies according to the smartphone model. <a class="notice-link" href=" https://help.getpivo.com/hc/en-001/articles/360046312551--Which-phones-work-best-for-Horse-Tracking- "> Learn more </a> </div> '
    }
  ],
  [{ caption: "" }, { caption: "" }],
  [{ caption: "" }, { caption: "" }],
  [{ caption: "" }, { caption: "" }, { caption: "" }],
  [
    {
      caption:
        "<p><span>Perfectly Portable. </span><s>Take Pivo to-go with 360° auto-rotation, extendable stabilizing feet, and support for standard camera tripods.</s></p>"
    },
    {
      caption:
        "<p><span>Steady footing. </span><s>Extend Pivo's feet for added stability or simply attach to any standard tripod with a ¼” thread.</s></p>"
    },
    {
      caption:
        "<p><span>Precise control. </span><s>The ultimate in convenience. Every Pivo comes with a remote control, allowing you to capture with ease.</s></p>"
    }
  ]
];

// targeting current language(need to improve)
if (curLan) {
  SliderEachScript[0][0].caption = worldScript[curLan][0];
  SliderEachScript[0][1].caption = worldScript[curLan][1];
  SliderEachScript[0][2].caption = worldScript[curLan][8];
  SliderEachScript[3][0].caption = worldScript[curLan][5];
  SliderEachScript[3][1].caption = worldScript[curLan][6];
  SliderEachScript[3][2].caption = worldScript[curLan][7];
  SliderEachScript[4][0].caption = worldScript[curLan][2];
  SliderEachScript[4][1].caption = worldScript[curLan][3];
  SliderEachScript[4][2].caption = worldScript[curLan][4];
}

function playWistiaVideo(videoId, video) {
  _wq.push({
    id: videoId,
    onReady: function(video) {
      video.play();
    }
  });
}

function pauseWistiaVideo(videoId, video) {
  _wq.push({
    id: videoId,
    onReady: function(video) {
      video.pause();
    }
  });
}

function getOrientation() {
  var orientation =
    (screen.orientation || {}).type ||
    screen.mozOrientation ||
    screen.msOrientation;
  if (orientation == "landscape-primary") return "90";
}

function detectMobile() {
  if (
    screen.width <= 480 ||
    (getOrientation() == 90 && screen.width > 480 && screen.height < 480)
  ) {
    return true;
  } else {
    false;
  }
}

var wistiaDataAttr;
if (detectMobile()) {
  wistiaDataAttr = "data-mobile-id";
} else {
  wistiaDataAttr = "data-desktop-id";
}

function Slider(targetContainer, orderNum, targetContentContainer) {
  if (targetContainer) {
    console.log(targetContainer);
    // .slider-section-container
    // .slider-container
    var sliderImgContainer = targetContainer.children[0];

    // .slider-content-container (this is changed)
    // this.sliderContentContainer = targetContainer.children[1];
    if (targetContentContainer) {
      this.sliderContentContainer = targetContentContainer;
    }

    // .slider-mainBox
    var mainBox = sliderImgContainer.children[0];
    console.log(mainBox);
    // mainBox children 0 //.item-wrapper
    this.itemWrapper = mainBox.children[0];

    // mainBox children 1 //.dotnav-wrapper
    this.dotWrapper = mainBox.children[1].children[0];

    // .paddlenav-wrapper
    var paddleNavWrapper = this.itemWrapper.children[0];
    this.leftArrow = paddleNavWrapper.children[0];
    this.rightArrow = paddleNavWrapper.children[1];

    // .main-items
    this.sectionCont = this.itemWrapper.children[1];

    this.sectionContChildren = this.sectionCont.children;
    this.len = this.sectionContChildren.length;

    this.dotLen = this.dotWrapper.children.length;

    this.sectionOrder = [];
    this.dotOrder = [];
    this.sectionOffsets = [];
    this.isSliderActive = false;
    this.isVideoPlaying = false;
    this.isDragActive = false;

    this.sliderPrevIndex = 0;
    this.sliderCurrIndex = 0;
    this.dotPrevIndex = 0;

    this.prevSectionContOffsetWidth = 0;

    this.sectionOffsetWidth = 960;

    this.deviceType = "desktop";

    this.contentBoxRatio = {
      mobile: 0.75,
      desktop: 9 / 16
    };

    if (this.sliderContentContainer) {
      this.sliderContent01 = this.sliderContentContainer.children[0];
      this.sliderContent02 = this.sliderContentContainer.children[1];
    }
  }

  this.orderNum = orderNum;

  // touch event...

  this.posX1 = "";
  this.posX2 = 0;

  this.posY1 = "";
  this.posY2 = 0;
  this.isScrollUpAndDown = false;

  this.posFinal = "";
  this.posInitial = "";
  this.posFirstValue = "";
  this.threshold = 100;
  this.index = 0;
  this.allowShift = true;
  this.changing = this.prevSectionContOffsetWidth;

  this.init();
}

Slider.prototype.calcLeft = function() {
  this.isSliderActive = true;

  if (this.sliderCurrIndex === 0) {
    return false;
  }

  this.sliderPrevIndex = this.sliderCurrIndex;
  this.sliderCurrIndex -= 1;

  var dotCurrent = this.dotPrevIndex - 1;

  this.prevSectionContOffsetWidth =
    0 - this.sectionOffsets[this.sliderCurrIndex];

  this.sectionCont.style.transform =
    "translate3d(" + this.prevSectionContOffsetWidth + "px, 0px, 0px)";

  // apply bullet sync
  this.dotOrder[this.dotPrevIndex].classList.remove("current");
  this.dotOrder[dotCurrent].classList.add("current");
  this.dotPrevIndex = dotCurrent;

  if (this.sliderContentContainer) {
    this.targetContent(this.sliderCurrIndex);
  }

  this.leftArrow.classList.remove("arrowDisplayNone");
  this.rightArrow.classList.remove("arrowDisplayNone");

  if (this.sliderCurrIndex === 0) {
    this.leftArrow.classList.add("arrowDisplayNone");
  } else if (this.sliderCurrIndex === this.len - 1) {
    this.rightArrow.classList.add("arrowDisplayNone");
  } else {
  }
};

Slider.prototype.calcRight = function() {
  this.isSliderActive = true;

  if (this.sliderCurrIndex === this.len - 1) {
    return false;
  }

  this.sliderPrevIndex = this.sliderCurrIndex;
  this.sliderCurrIndex += 1;

  var dotCurrent = this.dotPrevIndex + 1;

  this.prevSectionContOffsetWidth =
    0 - this.sectionOffsets[this.sliderCurrIndex];

  this.sectionCont.style.transform =
    "translate3d(" + this.prevSectionContOffsetWidth + "px, 0px, 0px)";

  // apply bullet sync
  this.dotOrder[this.dotPrevIndex].classList.remove("current");
  this.dotOrder[dotCurrent].classList.add("current");
  this.dotPrevIndex = dotCurrent;

  if (this.sliderContentContainer) {
    this.targetContent(this.sliderCurrIndex);
  }

  this.leftArrow.classList.remove("arrowDisplayNone");
  this.rightArrow.classList.remove("arrowDisplayNone");

  if (this.sliderCurrIndex === 0) {
    this.leftArrow.classList.add("arrowDisplayNone");
  } else if (this.sliderCurrIndex === this.len - 1) {
    this.rightArrow.classList.add("arrowDisplayNone");
  } else {
  }
};

Slider.prototype.targetDot = function(e) {
  var selectedDot = e.target;

  if (selectedDot) {
    this.sectionCont.classList.add("bezier");
    var selectedDotIndex = selectedDot.dataset.galleryIndex;
    selectedDotIndex = Number(selectedDotIndex);

    var diff = selectedDotIndex - this.sliderCurrIndex;
    if (diff > 0) {
      // right
      while (this.sliderCurrIndex < selectedDotIndex) {
        this.calcRight();
      }
    } else if (diff < 0) {
      // left
      while (this.sliderCurrIndex > selectedDotIndex) {
        this.calcLeft();
      }
    }
  }
};

Slider.prototype.targetContent = function(index) {
  var indexBool = index % 2 === 0;
  if (indexBool) {
    this.sliderContent01.classList.add("putOpacity");
    this.sliderContent02.classList.remove("putOpacity");

    // this.sliderContent01.textContent = sliderContentDatas[realIndex];
    // this.sliderContent02.textContent = "";

    this.sliderContent01.innerHTML =
      SliderEachScript[this.orderNum][index].caption;
    this.sliderContent02.innerHTML = "";
  } else {
    this.sliderContent01.classList.remove("putOpacity");
    this.sliderContent02.classList.add("putOpacity");

    // this.sliderContent01.textContent = "";
    // this.sliderContent02.textContent = sliderContentDatas[realIndex];

    this.sliderContent01.innerHTML = "";
    this.sliderContent02.innerHTML =
      SliderEachScript[this.orderNum][index].caption;
  }
};

Slider.prototype.init = function() {
  if (this.sectionCont) {
    this.sectionOffsetWidth = this.sectionCont.offsetWidth;
    console.log(this.sectionCont);
    console.log(this.sectionCont.offsetWidth);
    if (this.sectionOffsetWidth === 0) {
      console.log("hello!!!! again!!");
      setTimeout(
        function() {
          this.init();
        }.bind(this),
        300
      );

      return;
    }
  }

  for (var i = 0; i < this.len; i += 1) {
    var curSection = "section" + i;
    this[curSection] = this.sectionContChildren[i];
    this.sectionOrder.push(this[curSection]);
    this.sectionOffsets.push(i * this.sectionOffsetWidth);

    this.sectionOrder[i].style.transform =
      "translate(" + this.sectionOffsets[i] + "px, 0px)";

    var curDot = "dot" + i;
    this[curDot] = this.dotWrapper.children[i];
    this.dotOrder.push(this[curDot]);
    this.dotOrder[i].addEventListener("click", this.targetDot.bind(this));
  }

  this.sliderPrevIndex = 0;
  this.sliderCurrIndex = 0;
  this.dotPrevIndex = 0;
  this.dotOrder[this.dotPrevIndex].classList.add("current");
  this.leftArrow.classList.add("arrowDisplayNone");

  this.prevSectionContOffsetWidth =
    0 - this.sectionOffsets[this.sliderCurrIndex];

  this.sectionCont.style.transform =
    "translate3d(" + this.prevSectionContOffsetWidth + "px, 0px, 0px)";

  if (detectMobile()) {
    this.deviceType = "mobile";
    // this.itemWrapper.style.height = (this.sectionOffsetWidth * 4) / 3 + "px";
  } else {
    this.deviceType = "desktop";
  }

  this.itemWrapper.style.height =
    this.sectionOffsetWidth * this.contentBoxRatio[this.deviceType] + "px";

  // addEventListener
  this.leftArrow.addEventListener(
    "click",
    function() {
      this.sectionCont.classList.add("bezier");
      this.calcLeft();
    }.bind(this)
  );
  this.rightArrow.addEventListener(
    "click",
    function() {
      this.sectionCont.classList.add("bezier");
      this.calcRight();
    }.bind(this)
  );

  this.itemWrapper.addEventListener(
    "touchstart",
    this.sliderDragStart.bind(this),
    { capture: true }
  );
  this.itemWrapper.addEventListener("touchend", this.sliderDragEnd.bind(this), {
    capture: true
  });
  this.itemWrapper.addEventListener(
    "touchmove",
    this.sliderDragAction.bind(this),
    { capture: true }
  );

  this.sectionCont.addEventListener(
    "transitionend",
    function() {
      if (this.isSliderActive) {
        var index = this.dotPrevIndex;
        var curSlide = this.sectionOrder[index].firstElementChild;
        var curSlideClasses = curSlide.classList;

        if (
          curSlideClasses.contains("load_wistia") &&
          !curSlideClasses.contains("wistia_async")
        ) {
          var videoId = curSlide.getAttribute(wistiaDataAttr);
          curSlideClasses.add("wistia_async_" + videoId);
        }

        videoPlayorPause(
          this.sectionOrder[this.sliderPrevIndex],
          this.sectionOrder[this.sliderCurrIndex]
        );
        this.isSliderActive = false;
      }
      console.log(curSlideClasses);
    }.bind(this)
  );
};

Slider.prototype.sliderDragStart = function(e) {
  e = e || window.event;

  this.posInitial = this.prevSectionContOffsetWidth;
  this.changing = this.posInitial;

  if (e.type == "touchstart") {
    this.posX1 = e.touches[0].clientX;
    this.posY1 = e.touches[0].clientY;

    this.posFirstValue = this.posX1;
    this.isScrollUpAndDown = false;
  }

  this.sectionCont.classList.remove("bezier");
  this.sectionCont.classList.remove("easeOutAnimate");
};

Slider.prototype.sliderDragAction = function(e) {
  e = e || window.event;

  if (e.type == "touchmove") {
    this.posX2 = this.posX1 - e.touches[0].clientX;
    this.posX1 = e.touches[0].clientX;
  }

  var scrollAvailable = false;

  if (this.sliderCurrIndex === 0) {
    if (this.posFirstValue > this.posX1) {
      scrollAvailable = true;
    }
  } else if (this.sliderCurrIndex === this.len - 1) {
    if (this.posFirstValue < this.posX1) {
      scrollAvailable = true;
    }
  } else {
    scrollAvailable = true;
  }

  if (scrollAvailable) {
    this.changing -= this.posX2;

    this.sectionCont.style.transform =
      "translate3d(" + this.changing + "px, 0px, 0px)";
  }
};

Slider.prototype.sliderDragEnd = function(e) {
  this.posFinal = this.changing;
  this.sectionCont.classList.add("easeOutAnimate");

  if (this.posFinal - this.posInitial < -this.threshold) {
    if (this.sliderCurrIndex !== this.len - 1) {
      this.calcRight();
    }

    // shiftSlide(1, "drag");
  } else if (this.posFinal - this.posInitial > this.threshold) {
    if (this.sliderCurrIndex !== 0) {
      this.calcLeft();
    }

    // shiftSlide(-1, "drag");
  } else {
    this.sectionCont.style.transform =
      "translate3d(" + this.prevSectionContOffsetWidth + "px, 0px, 0px)";
  }

  this.isDragActive = false;
  this.isScrollUpAndDown = false;
  // this.sectionCont.style.touchAction = "";
};

Slider.prototype.resizeSlider = function() {
  var wrapperOffsetWidth = this.sectionCont.offsetWidth;
  var wrapperOffsetHeight = this.sectionCont.offsetHeight;

  if (this.sectionOffsetWidth !== wrapperOffsetWidth) {
    // if (screen.width < 500 || (screen.width > 480 && screen.height < 480)) {
    //   this.itemWrapper.style.height = (wrapperOffsetWidth * 4) / 3 + "px";
    // } else {
    //   this.itemWrapper.style.height = "";
    // }

    this.sectionOffsetWidth = wrapperOffsetWidth;

    for (var i = 0; i < this.len; i += 1) {
      this.sectionOffsets[i] = i * this.sectionOffsetWidth;

      this.sectionOrder[i].style.transform =
        "translate(" + this.sectionOffsets[i] + "px, 0px)";
    }

    this.prevSectionContOffsetWidth =
      0 - this.sectionOffsets[this.sliderCurrIndex];

    this.sectionCont.style.transform =
      "translate3d(" + this.prevSectionContOffsetWidth + "px, 0px, 0px)";

    console.log("changing threshold");

    if (detectMobile()) {
      this.deviceType = "mobile";
      // this.itemWrapper.style.height = (this.sectionOffsetWidth * 4) / 3 + "px";
    } else {
      this.deviceType = "desktop";
    }

    this.itemWrapper.style.height =
      this.sectionOffsetWidth * this.contentBoxRatio[this.deviceType] + "px";
  }

  console.log("resizing....");
};

// sectionCont.addEventListener("transitionend", videoPlayorPause);

function videoTogglePlay(targetCont) {
  var isMobile = window.innerWidth < 480;

  var targetVideo = getVideoObj(targetCont, isMobile);

  if (targetVideo.id) {
    // toggle play
    if (this.isVideoPlaying) {
      pauseWistiaVideo(targetVideo.id.split("?")[0], targetVideo.el);
      this.isVideoPlaying = false;
    } else {
      playWistiaVideo(targetVideo.id.split("?")[0], targetVideo.el);
      this.isVideoPlaying = true;
    }
  }
}

function videoPlayorPause(prevCont, currentCont) {
  var isMobile = window.innerWidth < 480;

  var prevVideo = getVideoObj(prevCont, isMobile);
  var currentVideo = getVideoObj(currentCont, isMobile);

  console.log("this is videoPlayorPause", prevVideo, currentVideo);

  if (prevVideo.id) {
    pauseWistiaVideo(prevVideo.id.split("?")[0], prevVideo.el);
  }

  if (currentVideo.id) {
    playWistiaVideo(currentVideo.id.split("?")[0], currentVideo.el);
    this.isVideoPlaying = true;
  }
}

function getVideoObj(targetCont, isMobile) {
  var isSliderWistia = false;
  var targetVideo = null;
  var targetVideoID = isSliderWistia;

  if (targetCont && targetCont.children) {
    for (var i = 0; i < targetCont.children.length; i += 1) {
      var targetContClassName = targetCont.children[i].className;
      if (targetContClassName.includes("load_wistia")) {
        isSliderWistia = true;

        if (isMobile) {
          if (targetContClassName.includes("mobile")) {
            targetVideo = targetCont.children[i];
            targetVideoID = targetVideo;
          }
        } else {
          if (targetContClassName.includes("desktop")) {
            targetVideo = targetCont.children[i];
            targetVideoID = targetVideo;
          }
        }
      }
    }
  }

  if (isSliderWistia) {
    targetVideoID = targetVideoID.className;
    targetVideoID = targetContClassName.match(/wistia_async_(\w+)/)[1];
  }

  return {
    el: targetVideo,
    id: targetVideoID
  };
}
