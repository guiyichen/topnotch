/**
 * i18n.js - Internationalization module for Oracle Fortune Sticks
 * Supports Chinese (zh) and English (en)
 */

const I18N = {
  zh: {
    ui: {
      siteTitle: "有求必应签",
      clickToDrawHint: "🙏 心诚则灵，点击签筒抽签",
      shakeToDrawHint: "📱 摇一摇开始抽签",
      shakeOrClickHint: "🙏 心诚则灵，摇一摇或点击签筒抽签",
      shakeOrClickDetail: "📱 摇一摇手机或点击签筒开始抽签",
      enableShake: "🔓 启用摇一摇功能",
      shakePermissionDenied: "权限被拒绝，使用备选方案",
      shakeFallbackHint: "💡 摇一摇功能需要授权，点击签筒也可以抽签",
      congrats: "恭喜求得",
      back: "返回",
      interpret: "解签",
      close: "关闭",
      donate: "随喜功德",
      donationTitle: "随喜功德",
      donationMessage: "您的随喜功德，功不唐捐",
      donationNote: "随心随喜，感恩善缘",
      wechatPay: "微信支付",
      alipay: "支付宝",
      signExplanation: "签文解释",
      signText: "签文：",
      interpretation: "解签：",
      detailedReading: "详细解签",
      tabCareer: "事业",
      tabLove: "姻缘",
      tabHealth: "健康",
      tabWealth: "财运",
      unlockContent: "解锁查看完整内容",
      unlockButton: "解锁详细解签 $1.99",
      payForDraw: "付费抽签 $0.99",
      dailyLimitTitle: "今日免费次数已用完",
      dailyLimitMsg: "每天可免费抽签 {n} 次",
      comeback: "明天再来",
      paymentFailed: "支付创建失败，请稍后重试",
      networkError: "网络错误，请稍后重试",
      paymentVerifyFailed: "支付验证失败，请联系客服",
      paymentVerifyError: "验证支付时出错，请刷新页面重试",
      defaultExplanation: "此签寓意吉祥，凡事皆宜。保持诚心正念，积极向上，必能心想事成。",
      lockedCareerPreview: "此签事业运势极佳，适合开创新局面...",
      lockedLovePreview: "姻缘天注定，此签主良缘已至...",
      lockedHealthPreview: "身体康健，精力充沛...",
      lockedWealthPreview: "财运亨通，正财偏财皆有收获...",
      langSwitch: "中文"
    },
    signs: [
      { num: "第1签", text: "上上签：天开地辟结良缘，日吉时良万事全。若得此签非小可，人行中正帝王宣。", freeExplanation: "此签开天辟地之象，万事俱全之兆。主行事端正、贵人扶持，凡事光明坦荡，婚姻事业皆宜。宜把握时机，大胆进取。" },
      { num: "第2签", text: "上上签：一锄掘地要求泉，努力求之得最先。无意俄然遇知己，相逢携手上青天。", freeExplanation: "此签掘地得泉之象，努力有成之兆。主勤奋必得回报，且将在不经意间遇到贵人知己，携手共进，前程似锦。" },
      { num: "第3签", text: "上上签：奔波阻隔重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。", freeExplanation: "此签跋山涉水之象，历尽艰辛之兆。虽眼前奔波劳苦、阻隔重重，但终将拨云见日。外出求谋需耐心，终有回转之时。" },
      { num: "第4签", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。", freeExplanation: "此签松柏长青之象，根基稳固之兆。主任凭风雨侵袭而不动摇，终有一日如鸿鹄高飞，功名成就，成为栋梁之才。" },
      { num: "第5签", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。", freeExplanation: "此签非同寻常之象，贵人指引之兆。虽眼下为家事姻缘所忙碌，但最终必能如愿以偿，有贵人从旁指点明路。" },
      { num: "第6签", text: "上上签：投身岩下铜鸟居，须是还他大丈夫。拾得营谋谁可得，通行天地此人无。", freeExplanation: "此签大丈夫立志之象，通达天地之兆。主胸怀大志者方能成事，营谋所得皆因气魄过人，前途通行无阻。" },
      { num: "第7签", text: "上上签：奔波役役重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。", freeExplanation: "此签风尘仆仆之象，辗转求索之兆。虽一路奔波劳碌，跋山涉水，但坚持到底便有转机，远行终有归期。" },
      { num: "第8签", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。", freeExplanation: "此签松柏凌霜之象，厚积薄发之兆。主根基深厚，不惧风雨考验，蓄势待发之后必将一飞冲天，功成名就。" },
      { num: "第9签", text: "上上签：烦君勿作私心事，此意偏宜说问公。一片明心光皎洁，宛如皎月正天中。", freeExplanation: "此签皓月当空之象，光明磊落之兆。主凡事宜公不宜私，保持一颗明澈之心，自然通达顺遂，如明月照人间。" },
      { num: "第10签", text: "上上签：石藏无价玉和珍，只管他乡外客寻。宛如持灯更觅火，不如收拾枉劳心。", freeExplanation: "此签珍宝自藏之象，反求诸己之兆。提醒勿舍近求远，身边已有宝藏。安心守本份，不必向外奔波劳心。" },
      { num: "第11签", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。", freeExplanation: "此签志在必得之象，终有着落之兆。虽一时为亲事姻缘忙碌分心，但目标明确终能达成，贵人从旁相助不可少。" },
      { num: "第12签", text: "上上签：时临否极泰当来，抖擞从君出暗埃。若遇卯寅佳信至，管教立志事和谐。", freeExplanation: "此签否极泰来之象，拨云见日之兆。困境即将过去，好消息将至。振作精神、坚定志向，诸事和顺指日可待。" },
      { num: "第13签", text: "上上签：自小生身富贵家，眼前万物总奢华。蒙君赐紫金腰带，四海声名定可夸。", freeExplanation: "此签富贵荣华之象，声名远扬之兆。主出身有根基，得上位赏识，名利双收，声名传播四海。宜感恩惜福。" },
      { num: "第14签", text: "上上签：宛如仙鹤出凡笼，脱得凡笼路路通。南北东西无阻隔，任君直上九霄宫。", freeExplanation: "此签仙鹤出笼之象，自由通达之兆。主摆脱束缚后前路畅通无阻，东西南北任意遨游，直上青云之志可成。" },
      { num: "第15签", text: "上上签：触人口气最难吞，忽有灾危祸到门。卵破巢空无宿处，深为稳便把心存。", freeExplanation: "此签居安思危之象，未雨绸缪之兆。提醒切忌意气用事，当以稳重处世。凡事小心谨慎，方能化险为夷。" },
      { num: "第16签", text: "上上签：愁眉思虑暂时开，启出云霄喜自来。宛如粪土中藏玉，良工荐举出尘埃。", freeExplanation: "此签拨云见日之象，金玉出土之兆。愁云即将散去，好事自然来临。如同璞玉遇良匠，才华终将被识，贵人举荐可期。" },
      { num: "第17签", text: "上上签：莫听闲言说是非，晨昏只好念阿弥。若将狂话为真实，书饼如何止得饥。", freeExplanation: "此签定心安神之象，不惑于人之兆。主勿听信闲言碎语，坚守本心修行为上。空话无益于事，踏实行动方为正道。" },
      { num: "第18签", text: "上上签：金乌西坠兔东升，日夜循环至古今。僧道得之无不利，士农工商各从心。", freeExplanation: "此签日月轮转之象，各安其道之兆。主万事遵循自然规律，无论何业何行，顺天应人则事事有利，各遂其心。" },
      { num: "第19签", text: "上上签：急水滩头放艇时，狂风作浪欲何为。待他浪静风平后，稳载船归过不危。", freeExplanation: "此签风浪行舟之象，以静制动之兆。眼下形势急迫，不宜强行。耐心等候风平浪静，自然安全归来，无灾无险。" },
      { num: "第20签", text: "上上签：当春久雨喜开晴，玉兔金乌渐渐明。旧事消散新事遂，看看一跳入龙门。", freeExplanation: "此签雨过天晴之象，鱼跃龙门之兆。久困之局即将解开，旧愁消散新运来临。好事将至，飞黄腾达指日可待。" },
      { num: "第21签", text: "上上签：阴阳道合总由天，女嫁男婚喜偎然。但见龙蛇相会合，熊罴入梦乐团圆。", freeExplanation: "此签天作之合之象，姻缘美满之兆。主婚姻恋爱大吉，阴阳调和、夫妻和顺，有添丁之喜，家庭团圆幸福。" },
      { num: "第22签", text: "上上签：旱时田里皆枯槁，谢天甘雨落林梢。蛟龙意兴功行满，直入青云路不遥。", freeExplanation: "此签久旱逢甘雨之象，时来运转之兆。困顿已久之事终得解脱，如蛟龙得水，直冲云霄，功成名就不远矣。" },
      { num: "第23签", text: "上上签：欲攀仙桂蟾宫去，岂虑天门不放开。谋望一般音信好，高人自送岭头来。", freeExplanation: "此签蟾宫折桂之象，金榜题名之兆。主学业功名大利，心中所谋必有好消息传来，高人主动相助，无需忧虑。" },
      { num: "第24签", text: "上上签：不成邻里不成家，水泡痴人似落花。若问君恩须得力，到头方见事如麻。", freeExplanation: "此签因果循环之象，脚踏实地之兆。提醒勿做空想之人，需依靠实力与人脉。凡事务实，方能理清头绪、有所成就。" },
      { num: "第25签", text: "上上签：过了忧危事几重，从今再立永无空。宽心自有宽心计，得遇高人立大功。", freeExplanation: "此签劫后重生之象，柳暗花明之兆。历经重重忧患已至转折点，放宽心胸自有出路，贵人相助可建大功。" },
      { num: "第26签", text: "上上签：上下传来事总虚，天边接得一封书。书中许我功名遂，直到终时亦是虚。", freeExplanation: "此签虚实相间之象，看破功名之兆。提醒世事虚实难辨，功名利禄终归如梦。宜淡泊名利、看透本质，心自安宁。" },
      { num: "第27签", text: "上上签：一谋一用一番书，虑后思前不敢为。时到贵人相助力，如山墙立可安居。", freeExplanation: "此签贵人扶助之象，稳如磐石之兆。虽当下犹豫不决、瞻前顾后，但时机到来自有贵人助力，安居乐业指日可待。" },
      { num: "第28签", text: "上上签：东方月上正婵娟，顷刻云遮亦暗存。或有圆时还有缺，更言非者亦闲言。", freeExplanation: "此签月有圆缺之象，世事无常之兆。提醒月满则亏是自然之理，勿因一时阴晴而忧虑，也勿听信闲言，淡然处之。" },
      { num: "第29签", text: "上上签：宝剑出匣耀光明，在匣全然不惹尘。今得贵人携出现，有威有势众人钦。", freeExplanation: "此签宝剑出鞘之象，锋芒毕露之兆。主才华将得到展示的机会，在贵人提携下光芒四射，威望日增，令人敬佩。" },
      { num: "第30签", text: "上上签：劝君切莫向他求，似鹤飞来暗箭投。若去采薪蛇在草，恐遭毒口也忧愁。", freeExplanation: "此签防人之心之象，慎防暗箭之兆。提醒不宜轻易求人，须防小人暗算。凡事靠自己，小心谨慎方为上策。" },
      { num: "第31签", text: "上上签：清闲无忧静处坐，饱后吃茶时坐卧。汝下身心不用忙，必定不招冤与祸。", freeExplanation: "此签清静自在之象，无忧无虑之兆。主当下宜守静不宜妄动，安心享受平淡生活，不惹是非自然远离灾祸。" },
      { num: "第32签", text: "上上签：前程杳杳定无疑，石中藏玉有谁知。一朝良匠分明剖，始觉安然碧玉期。", freeExplanation: "此签石中藏玉之象，怀才待识之兆。前程虽暂时模糊不明，但内在价值终将被发现。静候伯乐，前途自然明朗。" },
      { num: "第33签", text: "上上签：内藏无价宝和珍，得玉何须外界寻。不如等待高人识，宽心犹且更宽心。", freeExplanation: "此签珍宝自藏之象，内修其德之兆。宝物就在自身，无需外求。放宽心态，静待识货之人出现，一切自有安排。" },
      { num: "第34签", text: "上上签：行藏出入礼义恭，言必忠良信必聪。心不了然且静澈，光明红日正当空。", freeExplanation: "此签行正坐端之象，光明正大之兆。主以礼义待人、忠信处事，保持内心清澈宁静，自然前途光明如日中天。" },
      { num: "第35签", text: "上上签：衣冠重整旧家风，道是无穹却有功。扫却当途荆棘刺，三人约议再和同。", freeExplanation: "此签重整旗鼓之象，破旧立新之兆。主清除障碍、恢复正道，与人合作共议可再创辉煌，团结一心事必成。" },
      { num: "第36签", text: "上上签：欲待身安运泰时，风中灯烛不相宜。不如收拾深堂坐，庶免光摇静处期。", freeExplanation: "此签避风守静之象，韬光养晦之兆。眼下运势不稳如风中残烛，不宜冒进。安心守静、蓄养精力，待时机成熟再行动。" },
      { num: "第37签", text: "上上签：月照天书静处期，忽遭云雾又昏迷。宽心祈待云霞散，此时更改好施为。", freeExplanation: "此签云遮皓月之象，守候光明之兆。虽一时被迷雾遮蔽，但放宽心等待，云散月明之时即是大展宏图之日。" },
      { num: "第38签", text: "上上签：镜月当空出匣时，刹那云雾暗迷离。宽心守待浮云散，更改相宜可望为。", freeExplanation: "此签明镜蒙尘之象，拨云见月之兆。暂时困惑迷茫不必慌张，耐心等待浮云散去，时机一到便可放手施为。" },
      { num: "第39签", text: "上上签：天边消息实难思，切莫多心望强求。若把石头磨作镜，精神枉费一时休。", freeExplanation: "此签顺其自然之象，勿强求之兆。远方消息难以揣测，切勿过度期待。强求好比磨石为镜，枉费心力，不如随缘。" },
      { num: "第40签", text: "上上签：红轮西坠兔东升，阴长阳消百事亨。若是女人宜望用，增添财禄福其心。", freeExplanation: "此签日月更替之象，阴阳调和之兆。主运势平顺，百事亨通。尤利女性主事，财禄增添，福气自来。" },
      { num: "第41签", text: "上上签：无限好言君记取，却为认贼将作子。莫贪眼下有些甜，更虑他年前样看。", freeExplanation: "此签明辨是非之象，居安思危之兆。提醒勿被甜言蜜语迷惑、勿贪眼前小利。需长远考量，识别真伪，方保安全。" },
      { num: "第42签", text: "上上签：皇君圣后总为恩，复待祈禳无损增。一切有情皆受用，人间天上得期亨。", freeExplanation: "此签天恩浩荡之象，众生受福之兆。主上天庇佑、恩泽广施，诚心祈福必有回应，人间天上皆得亨通。" },
      { num: "第43签", text: "上上签：天地交泰万物新，自形自色自怡神。森罗万象皆精彩，事事和谐得称人。", freeExplanation: "此签天地交泰之象，万象更新之兆。大吉之签，主万事和谐、称心如意。顺应天道自然，一切精彩纷呈。" },
      { num: "第44签", text: "上上签：棋逢敌手要藏机，黑白盘中未决时。到底欲知谁胜负，须教先着相机宜。", freeExplanation: "此签棋逢对手之象，相机而动之兆。竞争激烈之际需隐藏策略、审时度势，抢占先机者胜。宜智取不宜蛮干。" },
      { num: "第45签", text: "上上签：温柔自古胜刚强，积善之门大吉昌。若是有人占此卦，宛如正渴遇琼浆。", freeExplanation: "此签以柔克刚之象，积善余庆之兆。大吉之签，主柔和处世胜过刚强，多行善举必得福报，如久渴逢甘露般畅快。" },
      { num: "第46签", text: "上上签：劝君耐守旧生涯，把定心肠勿起歹。直待有人轻着力，枯枝老树再生花。", freeExplanation: "此签枯木逢春之象，守旧待时之兆。主当下宜安守本分、莫生邪念，待机缘巧合有人相助，便如枯木开花般迎来新生。" },
      { num: "第47签", text: "上上签：锦上添花色愈鲜，运来禄马喜双全。时人莫恨功名晚，一举登科四海传。", freeExplanation: "此签锦上添花之象，功名双全之兆。大吉之签，主好运来时福禄齐至。莫嫌功名来迟，一朝得意便名扬天下。" },
      { num: "第48签", text: "上上签：昆鸟秋来化作鹏，好游快乐喜飞腾。翱翔万里云霄去，余外诸禽总不能。", freeExplanation: "此签鲲鹏展翅之象，一飞冲天之兆。主格局远大、志向高远，时机成熟便可翱翔万里，非凡夫俗子可比。" },
      { num: "第49签", text: "上上签：营为期望在春前，谁料秋来又不然。直遇清江贵公子，一生活计始安全。", freeExplanation: "此签守候贵人之象，柳暗花明之兆。计划虽多有波折、不如预期，但终将遇到命中贵人，从此生计安稳、无忧无虑。" },
      { num: "第50签", text: "上上签：五湖四海任君行，高挂帆篷自在撑。若得顺风随即至，满船宝贝喜层层。", freeExplanation: "此签扬帆远航之象，顺风顺水之兆。大吉之签，主四海通达、自由自在，顺风而行满载而归，财运亨通、收获丰厚。" },
      { num: "第51签", text: "上上签：夏日炎天日最长，人人愁热闷非常。天公也解诸人意，故遣薰风特送凉。", freeExplanation: "此签天赐清凉之象，苦尽甘来之兆。虽身处困热烦闷之中，但上天自会体恤，送来及时的慰藉与转机。" },
      { num: "第52签", text: "上上签：水中捉月费工夫，费尽工夫却又无。莫说闲言并乱语，枉劳心力强身孤。", freeExplanation: "此签水中捞月之象，务实为上之兆。提醒勿追求虚幻不实之事，空费力气终无所得。少说空话，脚踏实地方为正道。" },
      { num: "第53签", text: "上上签：失意翻成得意时，龙吟虎啸两相宜。青云有路终须到，许我功名必可期。", freeExplanation: "此签失意转运之象，龙虎呈祥之兆。大吉之签，主困境即将逆转为顺境，功名之路终将通达，未来可期。" },
      { num: "第54签", text: "上上签：梦中得宝醒来无，自谓南山只是锄。苦问婚姻并问病，别寻生路得相宜。", freeExplanation: "此签梦醒求实之象，另辟蹊径之兆。提醒勿沉迷于虚幻梦想，凡事需务实。若旧路不通，不妨换个方向，必有转机。" },
      { num: "第55签", text: "上上签：父贤传子子传孙，衣禄丰盈只在天。金马玉堂人快乐，饥时吃饭困时眠。", freeExplanation: "此签家道兴旺之象，知足常乐之兆。主家族传承有序、衣食丰足，享受当下简单的快乐，随遇而安即是福气。" },
      { num: "第56签", text: "上上签：涧小石粗流水响，力劳撑驾恐损伤。路须指出前江去，风静潮平尽不妨。", freeExplanation: "此签逆水行舟之象，待时而动之兆。眼下路途艰难、费力劳心，但只要找对方向，待风平浪静时便可安然前行。" },
      { num: "第57签", text: "上上签：说是说非风过耳，好衣好禄自然当。君莫记取当年事，汝意还与我意同。", freeExplanation: "此签随风而逝之象，自在洒脱之兆。主勿在意他人是非闲话，福禄自然而来。放下过去的恩怨，向前看方为上策。" },
      { num: "第58签", text: "上上签：直上重楼去藏身，四围荆棘绕为林。天高君命长和短，得意翻成失意人。", freeExplanation: "此签高处不胜寒之象，谨慎行事之兆。提醒得意之时更需警惕，荆棘环绕需步步小心，切忌得意忘形以免乐极生悲。" },
      { num: "第59签", text: "上上签：大鹏展翅绕天涯，时运来时福自来。若问前程何处去，青云直上步瑶台。", freeExplanation: "此签大鹏展翅之象，鸿图大展之兆。大吉之签，主时运到来、福气自至，前途直上青云，登上高位指日可待。" },
      { num: "第60签", text: "上上签：抱薪救火火增烟，烧却三千及大千。若问营谋并出入，不如收拾枉劳心。", freeExplanation: "此签抱薪救火之象，方法需改之兆。提醒当前方法不当，越努力反而越糟。宜停下反思、调整策略，切勿盲目蛮干。" },
      { num: "第61签", text: "上上签：日上吟诗月下歌，逢场作戏笑呵呵。相逢会意难藏匿，喝彩声中有谩他。", freeExplanation: "此签逢场作戏之象，表里如一之兆。提醒社交场合虽需应酬，但真假难辨。宜保持真心，勿被表面的热闹迷惑。" },
      { num: "第62签", text: "上上签：晨昏全赖佛扶持，虽是逢危不见危。若得贵人来接引，此时福禄自相随。", freeExplanation: "此签佛光护佑之象，逢凶化吉之兆。主虽有危难但暗中有庇护，加上贵人接引，化险为夷，福禄随之而来。" },
      { num: "第63签", text: "上上签：昔日行船失了针，今朝依旧海中寻。若还寻得原针在，也费工夫也费心。", freeExplanation: "此签海底捞针之象，执着寻觅之兆。提醒某些失去之物虽可追寻，但耗费心力极大。宜权衡得失，放下执念或许更好。" },
      { num: "第64签", text: "上上签：譬若初三四五缺，半无半有未圆全。等待十五良宵夜，到处光明到处圆。", freeExplanation: "此签月缺待圆之象，渐入佳境之兆。目前尚不圆满，但如月亮渐盈，耐心等待十五月圆时，一切将光明圆满。" },
      { num: "第65签", text: "上上签：眼前欢喜未为欢，亦不危时亦不安。割肉补疮为甚事，不如守旧待时光。", freeExplanation: "此签守旧待时之象，忍耐为上之兆。眼前表面的好坏都不可全信，切忌用急躁的方式解决问题，不如安守本分等待时机。" },
      { num: "第66签", text: "上上签：路险马行人去远，失群羊困虎相当。危难船过风翻浪，春暮花残天降霜。", freeExplanation: "此签行路艰险之象，多加小心之兆。当前处境险峻，如独行险路、孤羊遇虎。宜格外谨慎，避免冒险，待危期过去再行事。" },
      { num: "第67签", text: "上上签：一条金线秤君心，无减无增无重轻。为人平生心正直，文章全具艺光明。", freeExplanation: "此签公正无私之象，才德兼备之兆。主心地正直如金秤般公平，凭真才实学立身处世，文艺才华光明磊落。" },
      { num: "第68签", text: "上上签：门庭清吉梦祯祥，积善于门大吉昌。讼理婚成蚕又熟，病逢良药得安康。", freeExplanation: "此签门庭吉祥之象，百事如意之兆。大吉之签，主家宅平安、积善得福，婚姻顺遂、疾病得愈，诸事皆圆满。" },
      { num: "第69签", text: "上上签：冬来岭上一枝梅，叶落枝枯总不摧。但得阳春悄急至，依然还我作花魁。", freeExplanation: "此签寒梅傲雪之象，坚韧不拔之兆。虽处逆境如冬日枯枝，但根基未损。春天一到，必将重新绽放，成为群芳之首。" },
      { num: "第70签", text: "上上签：朝朝恰似采花蜂，飞出西南又走东。春尽花残无觅处，此心不变旧行踪。", freeExplanation: "此签采蜂忙碌之象，坚守初心之兆。虽东奔西走终日忙碌，但提醒需有定力，莫等花期已过才后悔，当珍惜当下机遇。" },
      { num: "第71签", text: "上上签：认知仓空不满仓，因何终日把心忙。只恨儿孙无见识，误我终身走四方。", freeExplanation: "此签空忙一场之象，教育为本之兆。提醒仓库本空却终日忙碌是因方向不对，宜培养后辈见识，勿因短见而奔波一生。" },
      { num: "第72签", text: "上上签：弄蜂须要求他蜜，只怕遭他尾上针。虽是眼前有异路，暗里深藏荆棘林。", freeExplanation: "此签弄蜂取蜜之象，利中有害之兆。提醒追求利益时要防风险，看似好路实则暗藏荆棘。宜仔细辨别，趋利避害。" },
      { num: "第73签", text: "上上签：春来雷震百虫鸣，番身一转离泥中。始知出入还来往，一朝变化便成龙。", freeExplanation: "此签春雷惊蛰之象，化龙腾飞之兆。大吉之签，主蛰伏已久的力量即将爆发，一朝翻身便成龙，飞黄腾达、前途无量。" },
      { num: "第74签", text: "上上签：宛如仙鹤出凡笼，脱得凡笼路路通。南北东西无阻隔，任君直上九霄宫。", freeExplanation: "此签冲破牢笼之象，自由翱翔之兆。主即将突破限制、摆脱困境，四方通达无阻碍，如鹤归天，前途一片光明。" },
      { num: "第75签", text: "上上签：恰如抱虎过高山，战战兢兢胆碎寒。幸得山前逢妙手，方能保得一身安。", freeExplanation: "此签抱虎过山之象，险中求安之兆。虽处境凶险令人胆寒，但幸有高人相助化解危机。宜谨慎行事，遇事多求助于能人。" },
      { num: "第76签", text: "上上签：鱼龙混杂意和同，耐守寒潭未济中。不觉一日头角耸，禹门一跳过龙宫。", freeExplanation: "此签鱼龙混杂之象，蓄势待发之兆。虽暂时混迹平庸之中，但坚持隐忍，终有一日脱颖而出，鱼跃龙门。" },
      { num: "第77签", text: "上上签：梦中说得是多财，声名云外总虚来。水远山遥难信定，贵人一指笑颜开。", freeExplanation: "此签虚实相参之象，贵人点拨之兆。梦中的财富虚名不可信，但有贵人一指点拨便能拨开迷雾，豁然开朗。" },
      { num: "第78签", text: "上上签：冷水未烧白沸汤，不寒不热有温凉。要行天下无他事，为有身中百艺强。", freeExplanation: "此签百艺傍身之象，中庸平和之兆。主凭一身本领行走天下，不温不火却恰到好处。技多不压身，能力是最好的保障。" },
      { num: "第79签", text: "上上签：虚空结愿保平安，保得人安愿未还。得兔忘蹄真绝迹，敢将初誓谩轻瞒。", freeExplanation: "此签还愿践诺之象，诚信为本之兆。提醒许下的誓愿不可忘记，得到平安之后应感恩还愿，切忌忘恩负义。" },
      { num: "第80签", text: "上上签：直上重楼去藏身，四围荆棘绕为林。天高君命长和短，得意翻成失意人。", freeExplanation: "此签高楼危处之象，戒骄戒躁之兆。虽身居高位，但周围险阻环伺。得意时更需清醒，以免乐极生悲、失意收场。" },
      { num: "第81签", text: "上上签：炎炎烈火焰连天，焰里还生一朵莲。到底得成终不害，依然生叶长根枝。", freeExplanation: "此签火中生莲之象，劫后重生之兆。大吉之签，虽身处烈火般的困境，但如莲花般出淤泥而不染，终将安然无恙、生机勃勃。" },
      { num: "第82签", text: "上上签：彼亦俦中一辈贤，劝君特达与周旋。此时宾主欢相会，他日王侯却并肩。", freeExplanation: "此签结交贤能之象，同行并进之兆。主当前结识的朋友非等闲之辈，宜真诚相待、用心交往，日后必能共攀高峰。" },
      { num: "第83签", text: "上上签：譬若初三四五缺，半无半有未圆全。等待十五良宵夜，到处光明到处圆。", freeExplanation: "此签月缺渐圆之象，万事渐成之兆。当前虽不完满，但事态正朝好的方向发展。保持耐心，待到圆满之时一切光明。" },
      { num: "第84签", text: "上上签：因名丧德如何事，切恐吉中变化凶。酒醉不知何处去，青松影里梦朦胧。", freeExplanation: "此签名利误身之象，吉中藏凶之兆。提醒勿因追名逐利而丧失品德，好事中也可能暗藏变数。宜保持清醒、戒骄戒躁。" },
      { num: "第85签", text: "上上签：春来雷震百虫鸣，番身一转离泥中。始知出入还来往，一朝变化便成龙。", freeExplanation: "此签惊蛰破土之象，脱胎换骨之兆。蛰伏已久终将迎来春雷，一旦觉醒便如蛟龙出水，命运巨变、前途光明。" },
      { num: "第86签", text: "上上签：春来花发映阳台，万里车来进宝财。若得禹门三级浪，恰如平地一声雷。", freeExplanation: "此签春花烂漫之象，财宝入门之兆。大吉之签，主春回大地、好运降临，财源广进。如能再跃龙门，更将一鸣惊人。" },
      { num: "第87签", text: "上上签：人行半岭日衔山，峻岭崖岩未可攀。仰望上天垂护佑，此身犹在太虚间。", freeExplanation: "此签半岭行路之象，天佑平安之兆。虽前路崎岖、山高难攀，但有上天护佑，身处险境亦能安然无恙。宜虔诚祈福。" },
      { num: "第88签", text: "上上签：木雕一虎在当门，须是有威不害人。分明说过无妨事，忧恼迟疑恐惧心。", freeExplanation: "此签纸老虎之象，虚惊一场之兆。令人害怕之事其实有名无实，看似凶险实则无害。放下恐惧疑虑，坦然面对即可。" },
      { num: "第89签", text: "上上签：出入营谋大吉昌，似玉无瑕石中藏。如今幸得良工识，他日功名四海扬。", freeExplanation: "此签美玉出石之象，才华得识之兆。大吉之签，主营谋顺利、才如美玉被伯乐发掘，功名成就将扬名四海。" },
      { num: "第90签", text: "上上签：忽朝一信下天墀，宝贝船装满载归。若问前程成底事，始终应得贵人提。", freeExplanation: "此签满载而归之象，喜从天降之兆。大吉之签，主突然收到好消息，财宝丰收而归。前程有贵人始终提携，安心前行。" },
      { num: "第91签", text: "上上签：好展愁眉出众来，前途改变喜多财。一条大路如天阔，凡有施为尽放怀。", freeExplanation: "此签愁去喜来之象，大道通天之兆。大吉之签，主愁眉舒展、前途一片光明，大路朝天走，尽管放开手脚施展抱负。" },
      { num: "第92签", text: "上上签：自幼常为虑，营谋可谓强。若问前程事，云间月正光。", freeExplanation: "此签月明云间之象，苦尽甘来之兆。虽自小忧虑操劳、为营生奔忙，但前程终如云中明月般光明，一切努力都值得。" },
      { num: "第93签", text: "上上签：鸾凤翔毛雨淋漓，当时却被雀儿欺。终教一日云开达，依旧还君整羽衣。", freeExplanation: "此签凤凰涅槃之象，拨云见天之兆。虽一时落魄被人欺辱，但鸾凤终非池中物，待到云开之日，定能重整旗鼓、光彩照人。" },
      { num: "第94签", text: "上上签：君子莫听小人言，凡事皆当理在先。但能依理行将去，天相吉人自保全。", freeExplanation: "此签以理服人之象，正道自保之兆。主勿听小人谗言挑拨，凡事依理而行。只要走正道，上天自会保佑吉人安全。" },
      { num: "第95签", text: "上上签：事业功名暮与朝，荣华物态不胜饶。报君记取他年事，汝意还与我意同。", freeExplanation: "此签功名朝夕之象，荣华富贵之兆。主事业功名兴旺、荣华丰饶。铭记因果轮回之理，善念善行方能长久享福。" },
      { num: "第96签", text: "上上签：巍巍宝塔不寻常，八面玲珑尽放光。劝君立志勤顶礼，作善苍天降福祥。", freeExplanation: "此签宝塔放光之象，积善成德之兆。主立志行善、诚心礼佛，如宝塔般八面玲珑光芒四射，苍天必降福祥于善者。" },
      { num: "第97签", text: "上上签：五十功名心已灰，那知富贵逼人来。更行好事存方寸，寿比冈陵位鼎台。", freeExplanation: "此签枯木逢春之象，晚年得福之兆。虽一度心灰意冷，不料富贵却不期而至。多行好事、心存善念，必享长寿高位。" },
      { num: "第98签", text: "上上签：出入行藏礼义恭，言必忠良信必聪。心不了然且静澈，光明红日正当空。", freeExplanation: "此签光明正大之象，忠信立身之兆。主以礼义恭敬待人、以忠良诚信处世，内心澄澈清明，前途如正午红日般辉煌。" },
      { num: "第99签", text: "上上签：等闲骑鹤下扬州，半表平生志未酬。骑鹤扬州人不识，丹心空付水东流。", freeExplanation: "此签壮志未酬之象，知己难觅之兆。虽有骑鹤下扬州的逍遥，却感怀一身抱负无人赏识。宜坚守丹心，静候知音。" },
      { num: "第100签", text: "上上签：佛神灵通与君知，痴人说事转昏迷。老人求得灵签去，不如守旧待时来。", freeExplanation: "此签佛意点化之象，守旧待时之兆。佛已以灵签告知天意，切勿自作聪明。安守当下、静候时机，一切自有天意安排。" }
    ]
  },
  en: {
    ui: {
      siteTitle: "Oracle Fortune Sticks",
      clickToDrawHint: "\uD83D\uDE4F Be sincere, tap the jar to draw",
      shakeToDrawHint: "\uD83D\uDCF1 Shake to draw a fortune stick",
      shakeOrClickHint: "\uD83D\uDE4F Be sincere, shake or tap to draw",
      shakeOrClickDetail: "\uD83D\uDCF1 Shake your phone or tap the jar to begin",
      enableShake: "\uD83D\uDD13 Enable Shake to Draw",
      shakePermissionDenied: "Permission denied, using tap mode",
      shakeFallbackHint: "\uD83D\uDCA1 Shake requires permission. You can also tap the jar",
      congrats: "Your Fortune",
      back: "Back",
      interpret: "Reading",
      close: "Close",
      donate: "Donate",
      donationTitle: "Support Us",
      donationMessage: "Your generous support helps keep the oracle alive",
      donationNote: "Every gift is appreciated",
      wechatPay: "WeChat Pay",
      alipay: "Alipay",
      signExplanation: "Fortune Reading",
      signText: "Fortune Text: ",
      interpretation: "Interpretation: ",
      detailedReading: "Detailed Reading",
      tabCareer: "Career",
      tabLove: "Love",
      tabHealth: "Health",
      tabWealth: "Wealth",
      unlockContent: "Unlock full reading",
      unlockButton: "Unlock Detailed Reading $1.99",
      payForDraw: "Pay $0.99 for Extra Draw",
      dailyLimitTitle: "Daily Free Draws Used Up",
      dailyLimitMsg: "You get {n} free draws per day",
      comeback: "Come Back Tomorrow",
      paymentFailed: "Payment failed. Please try again later",
      networkError: "Network error. Please try again later",
      paymentVerifyFailed: "Payment verification failed. Please contact support",
      paymentVerifyError: "Payment verification error. Please refresh and try again",
      defaultExplanation: "This fortune is auspicious. All things are favorable. Stay sincere and positive, and your wishes shall come true.",
      lockedCareerPreview: "Excellent career prospects, ideal for new ventures...",
      lockedLovePreview: "Destined love awaits, a perfect match is near...",
      lockedHealthPreview: "Good health and vitality...",
      lockedWealthPreview: "Prosperous finances, gains in all areas...",
      langSwitch: "EN"
    },
    signs: [
      { num: "Stick #1", text: "Supreme Fortune: Heaven and earth unite in blessed union, auspicious day brings all things to fruition. This fortune is no small matter to receive, walk the righteous path and greatness you'll achieve.", freeExplanation: "A sign of heaven and earth in harmony. All affairs align perfectly — career, marriage, and ventures are all favorable. Seize the moment and act boldly with noble support." },
      { num: "Stick #2", text: "Supreme Fortune: Dig the earth with patience seeking hidden spring, hard work and effort shall rewards soon bring. By chance you'll meet a kindred soul so true, together climbing heights beneath skies blue.", freeExplanation: "A sign of digging deep and finding water. Diligence will be rewarded, and you will unexpectedly meet a trusted ally. Together you will forge ahead to a brilliant future." },
      { num: "Stick #3", text: "Supreme Fortune: Through perilous roads and rivers deep you wade, mud-soaked and weary on this long crusade. Though foreign shores may call you far from home, all paths shall lead you back from where you roam.", freeExplanation: "A sign of crossing mountains and rivers through hardship. Though the road ahead is arduous, perseverance will clear the clouds. Patience in distant endeavors will eventually bring you full circle." },
      { num: "Stick #4", text: "Supreme Fortune: The pine and cypress flourish green and tall, unmoved by rain or snow or winter's call. One day the swan shall soar through endless sky, achieving fame as pillars standing high.", freeExplanation: "A sign of evergreen resilience and strong foundations. Stand firm against all storms, and one day you will soar like the great swan, achieving fame and becoming a pillar of excellence." },
      { num: "Stick #5", text: "Supreme Fortune: You seek great things beyond the common way, yet family matters claim your busy day. At last your arrow surely hits the mark, a noble guide shall light the path through dark.", freeExplanation: "A sign of extraordinary destiny and noble guidance. Though currently occupied with family and relationship matters, success is assured. A benefactor will point the way forward." },
      { num: "Stick #6", text: "Supreme Fortune: Beneath the cliff the bronze bird makes its nest, only the brave and bold shall pass this test. What cunning plans could match this hero's gain, through heaven and earth none walk so free of chain.", freeExplanation: "A sign of great ambition and boundless reach. Only those with bold vision can achieve great things. Your courage and spirit will open all doors and clear every path." },
      { num: "Stick #7", text: "Supreme Fortune: Through dust and toil the weary traveler goes, crossing swift rivers facing countless woes. In distant lands you'll seek your fortune's call, but every road leads homeward after all.", freeExplanation: "A sign of tireless journeying and persistent seeking. Though the road is long and wearying, persistence brings its own rewards. Every distant journey has a homecoming." },
      { num: "Stick #8", text: "Supreme Fortune: The forest thrives with pine and cedar strong, through frost and tempest standing all year long. Then suddenly a great hawk takes to flight, achieving glory soaring to new height.", freeExplanation: "A sign of deep roots and gradual power. Your strong foundation will weather any storm. After building your strength in patience, you will rise suddenly to great heights and achievement." },
      { num: "Stick #9", text: "Supreme Fortune: Let not your heart be drawn to selfish schemes, seek public good and follow righteous dreams. A heart as clear as purest crystal light, shines like the moon at zenith burning bright.", freeExplanation: "A sign of the bright moon overhead, of integrity and honor. Act with fairness over self-interest, keep a pure heart, and success will follow naturally like moonlight across the land." },
      { num: "Stick #10", text: "Supreme Fortune: Within the stone lie jade and treasures rare, yet people search in foreign lands elsewhere. Like holding lanterns searching still for fire, stop seeking outward what's already higher.", freeExplanation: "A sign of treasures hidden within. Do not seek far afield when treasure lies close at hand. Tend to what you already have rather than exhausting yourself chasing distant dreams." },
      { num: "Stick #11", text: "Supreme Fortune: Great things you seek beyond the common way, though family duties fill your every day. The arrow shall at last strike home and true, a noble friend shall guide the way for you.", freeExplanation: "A sign of determined pursuit and eventual fulfillment. Though distracted by family obligations, your clear goals will be achieved. The help of a benefactor is indispensable." },
      { num: "Stick #12", text: "Supreme Fortune: When darkness peaks the dawn must surely rise, shake off the dust and lift your weary eyes. When spring arrives good tidings come your way, resolve and harmony shall rule the day.", freeExplanation: "A sign that the worst is over and better times are near. Good news is on its way. Gather your strength, hold firm to your purpose, and harmony in all affairs will soon follow." },
      { num: "Stick #13", text: "Supreme Fortune: Born into wealth with splendor all around, with every luxury and comfort found. The emperor bestows a golden sash, your fame across four seas shall make a splash.", freeExplanation: "A sign of wealth and widespread renown. You have strong foundations and will gain recognition from those in power. Both fame and fortune shall be yours. Be grateful and cherish your blessings." },
      { num: "Stick #14", text: "Supreme Fortune: Like sacred crane released from mortal cage, once free the open road becomes your stage. No barrier in north south east or west, soar straight to heaven's palace with the best.", freeExplanation: "A sign of the crane freed from its cage, of boundless freedom. Once you break free from constraints, every direction opens before you. Your ambition to reach the highest heights will be fulfilled." },
      { num: "Stick #15", text: "Supreme Fortune: Harsh words and spite are bitter pills to take, then sudden troubles come for trouble's sake. When nest is wrecked and shelter swept away, keep steady heart and caution rule the day.", freeExplanation: "A sign to prepare for the unexpected and plan ahead. Avoid impulsive reactions; conduct yourself with steadiness. Exercise great caution in all matters to turn danger into safety." },
      { num: "Stick #16", text: "Supreme Fortune: Your furrowed brow shall soon begin to clear, from clouded skies a ray of joy draws near. Like precious jade concealed in common earth, a craftsman's eye shall recognize your worth.", freeExplanation: "A sign of hidden jade revealed, of clouds parting for sunshine. Your worries will soon dissolve as good fortune arrives. Like rough jade found by a master craftsman, your talents will be recognized and championed." },
      { num: "Stick #17", text: "Supreme Fortune: Pay no heed to gossip flying round, in morning prayer let peaceful heart be found. If you mistake wild talk for what is true, drawn pictures of bread shall not nourish you.", freeExplanation: "A sign of inner calm and discernment. Do not be swayed by idle gossip; keep faith and stay true to your path. Empty words accomplish nothing — only sincere action leads to real results." },
      { num: "Stick #18", text: "Supreme Fortune: The golden sun descends the silver moon ascends, through day and night the endless cycle bends. All walks of life find fortune in this sign, each follows their own heart by grand design.", freeExplanation: "A sign of natural cycles and universal balance. Follow the natural order of things, and whatever your calling or profession, all will prosper. Let each pursue their heart's true path." },
      { num: "Stick #19", text: "Supreme Fortune: Upon the rapids wild you launch your boat, while howling winds whip waves around your float. But wait until the storm has blown away, then safely sail to harbor on calm day.", freeExplanation: "A sign of riding out the storm with patience. The current situation is turbulent — do not force your way through. Wait for calm waters, and you will return home safely without mishap." },
      { num: "Stick #20", text: "Supreme Fortune: Long spring rains end as skies begin to clear, the sun and moon grow bright and ever near. Old troubles fade as new fortunes arise, a mighty leap sends you beyond the skies.", freeExplanation: "A sign of rain clearing and the dragon gate opening. The long period of stagnation is about to end. Old worries dissolve as new luck arrives — great success and advancement are imminent." },
      { num: "Stick #21", text: "Supreme Fortune: In heaven's plan the yin and yang unite, the bride and groom embrace in pure delight. When dragon meets the serpent blessings flow, sweet dreams of children make the family glow.", freeExplanation: "A sign of a heavenly match and blissful marriage. Romance and marriage are greatly blessed, with harmony between partners. There is joy of new additions to the family and happiness all around." },
      { num: "Stick #22", text: "Supreme Fortune: In drought the withered fields lie parched and bare, then heaven sends sweet rain beyond compare. The dragon rises full of strength and might, ascending straight to glory's dazzling height.", freeExplanation: "A sign of long drought meeting sweet rain, of fortunes turning. What has been stuck will finally break free. Like the dragon finding water, you will soar to the clouds — success is near." },
      { num: "Stick #23", text: "Supreme Fortune: You wish to pluck the cassia on the moon, why fear the gates of heaven won't open soon. Good tidings come for all your plans in store, wise helpers climb the peak to reach your door.", freeExplanation: "A sign of winning the laurel and the highest honors. Academic and career pursuits are greatly favored. Good news about your plans is certain, and wise mentors will actively seek you out." },
      { num: "Stick #24", text: "Supreme Fortune: No neighbor's bond nor family hearth you claim, like bubbles chasing petals down the stream. If you rely on favor to succeed, you'll find at last affairs tangled like weed.", freeExplanation: "A sign of cause and consequence, of grounding yourself in reality. Do not be a dreamer — rely on true skill and genuine connections. Be practical and you will untangle complexity and achieve real results." },
      { num: "Stick #25", text: "Supreme Fortune: Through dangers passed and sorrows left behind, from this day forth new purpose you shall find. A peaceful heart will find a peaceful way, meet noble guides and build a grand display.", freeExplanation: "A sign of rebirth after trials, of light at the end of the tunnel. You have weathered many storms and reached the turning point. Open your heart and a benefactor will help you accomplish great deeds." },
      { num: "Stick #26", text: "Supreme Fortune: Rumors drift like smoke from high and low, a letter comes from heaven's edge aglow. It promises that fame shall be fulfilled, yet all returns to dust when life is stilled.", freeExplanation: "A sign of seeing through worldly illusions. Worldly matters are hard to distinguish between real and false, and glory fades like a dream. Cultivate detachment from fame and fortune, and find true peace of mind." },
      { num: "Stick #27", text: "Supreme Fortune: With plans in hand you ponder left and right, too cautious yet to step into the light. When timing's ripe a patron lends their hand, firm as a mountain wall on which you'll stand.", freeExplanation: "A sign of noble assistance and rock-solid stability. Though you hesitate now, weighing every option, when the time is right a benefactor will appear. A secure and prosperous life awaits." },
      { num: "Stick #28", text: "Supreme Fortune: The eastern moon rises fair and bright, then clouds sweep in and steal away the light. Sometimes it's full and sometimes carved away, ignore the gossips — let them have their say.", freeExplanation: "A sign of the moon's waxing and waning, of life's impermanence. Remember that fullness naturally gives way to decline. Do not fret over temporary changes or heed idle talk; accept it all with equanimity." },
      { num: "Stick #29", text: "Supreme Fortune: The precious sword bursts forth in brilliant glow, while sheathed in darkness none its worth could know. Now brought to light by one of noble birth, it shines with power winning all the earth.", freeExplanation: "A sign of the sword unsheathed, of dazzling brilliance revealed. Your hidden talents will soon have their stage. Under a patron's guidance, your radiance will shine forth, earning respect and admiration from all." },
      { num: "Stick #30", text: "Supreme Fortune: Seek nothing from the hand of other folk, for cranes that fly may draw an arrow's stroke. The one who gathers wood may tread on snakes, beware the venom that betrayal makes.", freeExplanation: "A sign of guarded vigilance against hidden threats. Do not rely too easily on others, and watch for those who scheme behind your back. Self-reliance and caution are the wisest course." },
      { num: "Stick #31", text: "Supreme Fortune: In quiet ease just sit without a care, sip tea when full and rest beyond compare. Release your busy body and your mind, no grudge or grief shall be the thing you find.", freeExplanation: "A sign of serene contentment and freedom from worry. Now is the time for stillness rather than action. Enjoy the simple life, avoid stirring up trouble, and misfortune will stay far away." },
      { num: "Stick #32", text: "Supreme Fortune: The road ahead seems dim and hard to trace, yet jade lies hidden in the stone's embrace. One day a master craftsman splits the veil, revealing emerald treasures without fail.", freeExplanation: "A sign of concealed jade awaiting discovery. Though the future seems unclear for now, your true value will eventually be revealed. Wait patiently for your champion, and the path will brighten." },
      { num: "Stick #33", text: "Supreme Fortune: Within yourself lie treasures rich and rare, why seek for jade when it's already there. Just wait until a connoisseur comes round, keep calm and calmer still till you are found.", freeExplanation: "A sign of inner treasure and self-cultivation. The riches you seek are already within you. Relax and be patient — the right person who recognizes your worth will come in due time." },
      { num: "Stick #34", text: "Supreme Fortune: In all your ways let courtesy hold sway, speak truth with wisdom every single day. Though clouds may dim your sight keep spirit clear, the noonday sun shines bright without a peer.", freeExplanation: "A sign of uprightness and radiant integrity. Treat others with propriety and act with loyalty and sincerity. Keep your inner world calm and clear, and your future will shine like the sun at its zenith." },
      { num: "Stick #35", text: "Supreme Fortune: Restore the honor of your family name, though it seems lost there's glory yet to claim. Clear thorny brambles blocking every lane, three allies meet and harmony shall reign.", freeExplanation: "A sign of renewal and fresh beginnings. Clear away obstacles, restore the proper path, and collaborate with trusted partners to rebuild. Unity of purpose will ensure success." },
      { num: "Stick #36", text: "Supreme Fortune: You wish for peace when fortune turns your way, but candles flicker when the fierce winds play. Retreat instead to shelter deep inside, in stillness wait and let the storm subside.", freeExplanation: "A sign of lying low and conserving energy. Your current fortune is unsteady like a candle in the wind. Do not rush forward — rest quietly, build your reserves, and act when conditions are truly ripe." },
      { num: "Stick #37", text: "Supreme Fortune: The moonlit scroll gleams in the tranquil night, then sudden mist obscures the guiding light. Keep heart at ease and wait for clouds to part, then seize the moment with a willing heart.", freeExplanation: "A sign of moonlight veiled by clouds, of waiting for clarity. Though temporarily obscured by confusion, keep your spirits up. When the fog lifts, the time will be perfect to pursue your grandest plans." },
      { num: "Stick #38", text: "Supreme Fortune: The mirror moon emerges bright and clear, then fleeting mist makes everything appear. With patient heart just wait for clouds to break, then act with purpose for ambition's sake.", freeExplanation: "A sign of temporary confusion giving way to clarity. Do not panic in moments of uncertainty. Wait patiently for the clouds to scatter, and when the moment arrives, act with full confidence." },
      { num: "Stick #39", text: "Supreme Fortune: News from afar is difficult to know, don't strain your heart or let your worries grow. To polish stones until they shine like glass, wastes precious strength — just let the seasons pass.", freeExplanation: "A sign of following nature's course without forcing outcomes. Distant tidings are beyond your control — do not obsess. Forcing results is like grinding stone into a mirror — fruitless. Go with the flow instead." },
      { num: "Stick #40", text: "Supreme Fortune: The crimson sun descends the moon ascends, as yin grows strong all fortune smoothly bends. For women now the outlook's doubly blessed, with wealth and comfort filling every chest.", freeExplanation: "A sign of yin-yang harmony and smooth transitions. Fortune flows evenly and all endeavors prosper. Especially favorable for women taking the lead — wealth and blessings increase naturally." },
      { num: "Stick #41", text: "Supreme Fortune: Remember well the honeyed words you hear, for wolves may hide in sheepskin drawing near. Don't crave the sweetness offered at your feet, consider well what future years may meet.", freeExplanation: "A sign of discernment and foresight. Do not be deceived by flattery or tempted by short-term gains. Think long-term, distinguish truth from deception, and protect yourself wisely." },
      { num: "Stick #42", text: "Supreme Fortune: The grace of heaven pours on every soul, with faithful prayer no blessing takes its toll. All sentient beings partake of heaven's care, good fortune flows through earth and sky and air.", freeExplanation: "A sign of abundant heavenly blessings for all. Heaven's protection and grace are generous — sincere prayers will be answered. Both in this world and beyond, all shall prosper smoothly." },
      { num: "Stick #43", text: "Supreme Fortune: When heaven and earth unite all things renew, each form and color shines in brilliant hue. Ten thousand wonders fill the world with art, all things in harmony to glad the heart.", freeExplanation: "A supreme sign of cosmic harmony and total renewal. Everything aligns in perfect balance — all affairs are harmonious and satisfying. Follow the natural way and life will be wonderfully vibrant." },
      { num: "Stick #44", text: "Supreme Fortune: When matched with rivals hide your strategy, on the black and white board wait patiently. To learn who claims the victory at last, the one who moves with cunning wins the cast.", freeExplanation: "A sign of strategic thinking in competitive times. When facing strong opponents, conceal your plans and assess the situation carefully. The one who seizes the initiative wisely will prevail — use intellect, not brute force." },
      { num: "Stick #45", text: "Supreme Fortune: Since ancient times the gentle beats the strong, through gates of virtue blessings march along. If you should draw this fortune from the lot, like nectar to the thirsty — all you've sought.", freeExplanation: "A supreme sign of gentleness overcoming force, of goodness rewarded. Kindness in dealing with others surpasses aggression. Practice virtue and blessings will pour forth like sweet rain on parched lips." },
      { num: "Stick #46", text: "Supreme Fortune: Be patient friend and keep your present road, hold firm your heart and bear the steady load. Until the day a gentle hand appears, dead branches bloom again like youthful years.", freeExplanation: "A sign of dead wood blooming anew, of faithful waiting. Stay true to your current path and resist temptation. When the right helper arrives at the right moment, renewal will come like flowers on a barren tree." },
      { num: "Stick #47", text: "Supreme Fortune: Embroidered silk grows lovelier still with thread, when fortune comes both rank and joy are wed. Let no one grieve that glory came so late, one triumph echoes far from gate to gate.", freeExplanation: "A supreme sign of blessings upon blessings, of fame and fortune together. When good luck arrives, everything comes at once. Do not regret late success — one great achievement will ring across the land." },
      { num: "Stick #48", text: "Supreme Fortune: In autumn small birds transform into the roc, with joy they soar beyond the mountain's rock. Ten thousand miles through clouds and sky they range, no common bird can match this wondrous change.", freeExplanation: "A sign of the great roc spreading its wings, of limitless ambition. Your vision is far beyond the ordinary, and when the time is ripe you will soar across vast distances that no lesser spirit can match." },
      { num: "Stick #49", text: "Supreme Fortune: Your plans were set for spring but autumn came, with different winds that fanned a different flame. Until you meet the noble river's son, your life finds peace and fortune is begun.", freeExplanation: "A sign of waiting for the right benefactor. Plans may twist and turn beyond expectation, but you will eventually meet the patron destined for you. From that moment, your livelihood becomes secure and worry-free." },
      { num: "Stick #50", text: "Supreme Fortune: Across five lakes and four seas freely roam, with sails raised high you steer your vessel home. When favoring winds arrive without delay, your ship returns with treasures on display.", freeExplanation: "A supreme sign of smooth sailing and abundant returns. Freedom, prosperity, and adventure are yours — ride the favorable winds and return laden with rewards. Financial fortune is especially strong." },
      { num: "Stick #51", text: "Supreme Fortune: In summer's blaze the days stretch long and hot, the people swelter tired in their lot. But heaven reads the suffering below, and sends a gentle breeze to ease the woe.", freeExplanation: "A sign of heavenly comfort in times of hardship. Though you are weighed down by heat and frustration, relief is divinely ordained. Timely solace and a turning point are on the way." },
      { num: "Stick #52", text: "Supreme Fortune: To catch the moon's reflection costs you dear, you'll spend your effort and it won't appear. Speak not in vain or let wild fancies grow, wasted strength leaves body worn and low.", freeExplanation: "A sign of grasping at illusions, of grounding yourself. Do not chase the impossible or waste energy on fantasies. Stop the empty talk, put your feet on solid ground, and pursue what is real." },
      { num: "Stick #53", text: "Supreme Fortune: Misfortune turns to fortune in a flash, the dragon roars the tiger makes a dash. The road to glory must at last be found, your fame and honor soon shall know no bound.", freeExplanation: "A supreme sign of reversal and triumph. The tide turns dramatically from hardship to glory. The path to success will open wide — your future achievement is assured and boundless." },
      { num: "Stick #54", text: "Supreme Fortune: In dreams you held a treasure in your hand, but waking found just hoe and common land. For questions of the heart or health you seek, try different roads and find a brighter peak.", freeExplanation: "A sign of awakening from illusion and finding a new way. Do not cling to fantasies — face reality squarely. If one path is blocked, change direction and you will surely find the opening you need." },
      { num: "Stick #55", text: "Supreme Fortune: From father down to son and grandson's line, with heaven's grace provisions flow like wine. In golden halls the people live content, eat when hungry sleep when strength is spent.", freeExplanation: "A sign of prosperous family legacy and simple contentment. The family line thrives in abundance. Enjoy the straightforward pleasures of life — knowing when to eat, rest, and be at peace is true happiness." },
      { num: "Stick #56", text: "Supreme Fortune: Through narrow gorge and rocks the waters roar, the boatman toils and struggles all the more. Point your way toward the river broad and free, when storms have passed you'll sail on gentle sea.", freeExplanation: "A sign of rowing against the current, of waiting for calm waters. The journey right now is difficult and draining. Find the right direction and wait for conditions to improve, then smooth sailing awaits." },
      { num: "Stick #57", text: "Supreme Fortune: Let gossip drift like wind across your ear, fine clothes and fortune come to those sincere. Don't dwell upon the grievances of old, your heart and mine the same bright tale have told.", freeExplanation: "A sign of letting go and moving forward freely. Do not be bothered by others' chatter — blessings will come naturally. Release old grudges, look ahead, and find that our hearts share the same wisdom." },
      { num: "Stick #58", text: "Supreme Fortune: You climb the tower high to hide away, but thorns surround you thick in grim display. Heaven's will may lengthen or may end, the proud may fall where fortune will not bend.", freeExplanation: "A sign of danger at the heights, of the need for caution. Though you may stand in a lofty position, threats lurk all around. Stay vigilant in times of success lest pride brings an unexpected fall." },
      { num: "Stick #59", text: "Supreme Fortune: The mighty roc spreads wings from shore to shore, when fortune's tide rolls in blessings pour. Ask where the road of destiny may lead, straight up through azure clouds at dazzling speed.", freeExplanation: "A supreme sign of the roc in flight and grand ambition realized. When your time comes, blessings arrive of their own accord. The path ahead leads straight upward to the highest positions of honor and success." },
      { num: "Stick #60", text: "Supreme Fortune: Fighting fire with kindling feeds the blaze, a thousand worlds consumed in smoky haze. For ventures in or out don't force the pace, retreat and rest to find a calmer space.", freeExplanation: "A sign that your current approach is counterproductive. The harder you push, the worse things become. Stop, reflect, and change your strategy entirely — do not persist blindly in a failing method." },
      { num: "Stick #61", text: "Supreme Fortune: By daylight verse by moonlight song you play, performing smiles at every gathering's fray. Behind the cheers and laughter truths reside, not all the praise is honest deep inside.", freeExplanation: "A sign to look beneath the surface of social pleasantries. Though entertaining company is part of life, not everything is as it seems. Maintain your sincerity and do not be fooled by surface appearances." },
      { num: "Stick #62", text: "Supreme Fortune: From dawn to dusk the Buddha guards your way, though dangers loom they never hold their sway. When noble guides arrive to take your hand, both wealth and blessings spread across the land.", freeExplanation: "A sign of divine protection and turning danger into fortune. Though threats appear, unseen guardians shield you. With a benefactor's guidance, peril transforms into prosperity and blessings multiply." },
      { num: "Stick #63", text: "Supreme Fortune: Long ago a needle fell into the sea, and still today you search unceasingly. If by some chance the needle comes to light, the cost in time and worry dims its might.", freeExplanation: "A sign of searching for a needle in the ocean. Some things lost can be recovered, but at tremendous cost of effort and heartache. Weigh whether the pursuit is worthwhile, or whether letting go brings greater peace." },
      { num: "Stick #64", text: "Supreme Fortune: Like the young moon on the third or fourth night, half dark half bright not fully formed in light. But wait until the fifteenth evening clear, then brilliant fullness shines from ear to ear.", freeExplanation: "A sign of the waxing moon growing toward fullness. Things are not yet complete, but they are progressing steadily. Have patience — when the full moon arrives, all shall be bright and perfectly whole." },
      { num: "Stick #65", text: "Supreme Fortune: The joy before you may not joy remain, in safety's arms you still may feel the strain. Don't cut your flesh to patch a wound elsewhere, hold steady now and let time be your care.", freeExplanation: "A sign of patience and restraint above hasty action. Surface appearances are unreliable right now. Do not use desperate measures to fix problems — maintain your position and wait for the right moment." },
      { num: "Stick #66", text: "Supreme Fortune: On perilous roads the horse and rider strain, a lost sheep faces tigers on the plain. Through crashing waves the battered vessel sails, spring fades as frost descends on withered trails.", freeExplanation: "A sign of hazardous conditions requiring extreme caution. The current situation is fraught with danger on every side. Exercise the greatest care, avoid unnecessary risks, and wait for the danger to pass." },
      { num: "Stick #67", text: "Supreme Fortune: A golden thread weighs justly every heart, no more no less a balanced work of art. When one lives straight and honest all life through, their craft and writings shine with brilliant hue.", freeExplanation: "A sign of fairness and combined virtue with talent. A heart as true and balanced as a golden scale will see you through. Rely on genuine skill and integrity, and your work will radiate brilliance." },
      { num: "Stick #68", text: "Supreme Fortune: The household gleams with blessings pure and bright, through virtuous deeds great fortune comes alight. Disputes resolve and marriage finds its place, illness meets its cure through heaven's grace.", freeExplanation: "A supreme sign of household harmony and everything going well. Peace at home, blessings from good deeds, successful marriage, recovered health — all matters reach their perfect resolution." },
      { num: "Stick #69", text: "Supreme Fortune: In winter on the ridge one plum tree stands, though leaves have fallen bare are all its strands. But when the warm spring quietly draws near, it blooms again the fairest flower here.", freeExplanation: "A sign of the winter plum enduring hardship. Though you face adversity like a bare tree in winter, your core remains strong. When spring arrives, you will bloom magnificently and stand above all others." },
      { num: "Stick #70", text: "Supreme Fortune: Like busy bees from dawn to dark you fly, from west to south to east across the sky. When spring has passed and flowers start to fade, hold true your course before the bloom decayed.", freeExplanation: "A sign of restless busyness and staying true to your purpose. Though you rush about endlessly, remember to have focus and direction. Seize opportunities while they last — do not wait until it is too late to act." },
      { num: "Stick #71", text: "Supreme Fortune: You know the barn is empty nothing stored, yet still you rush about with anxious word. The fault lies in the young who lack the sight, their ignorance sends you wandering through night.", freeExplanation: "A sign of misdirected effort and the importance of wisdom. Busyness without clear direction is futile. Invest in knowledge and foresight for the next generation, rather than running blindly in all directions." },
      { num: "Stick #72", text: "Supreme Fortune: Who plays with bees must seek the honey sweet, but watch the sting that waits beneath the treat. Though paths ahead seem promising and new, thorns lie in wait concealed from open view.", freeExplanation: "A sign of hidden thorns within attractive opportunities. When pursuing profit, always guard against the risks that come with it. What looks like a clear path may conceal dangers — examine everything carefully." },
      { num: "Stick #73", text: "Supreme Fortune: When spring thunder shakes the sleeping earth, a thousand creatures stir to find rebirth. From mud they rise and learn to come and go, transformed at once into a dragon's glow.", freeExplanation: "A supreme sign of the spring awakening and dragon transformation. Powers long dormant are about to burst forth. In one dramatic moment of change, you will rise from obscurity to dazzling prominence." },
      { num: "Stick #74", text: "Supreme Fortune: A sacred crane escapes its earthly bars, once free the pathways open past the stars. No wall in any quarter blocks your flight, ascend directly to the heaven's height.", freeExplanation: "A sign of breaking through all limitations. You are about to shatter the constraints that hold you back. With all four directions open and unobstructed, your future gleams with boundless possibility." },
      { num: "Stick #75", text: "Supreme Fortune: Like carrying a tiger through mountain steep, each trembling step makes courage hard to keep. But at the summit waits a master's hand, who guides you safely down to level land.", freeExplanation: "A sign of peril met with expert rescue. Though the situation is terrifying and dangerous, a skilled helper will appear at the critical moment. Be cautious in all things and seek aid from capable people." },
      { num: "Stick #76", text: "Supreme Fortune: Among the fish and dragons none can tell, who patient waits within the frozen well. Then one fine day the horns begin to show, through Dragon Gate in one great leap you'll go.", freeExplanation: "A sign of hidden potential among the ordinary, of biding your time. Though you blend in with the crowd for now, persistent patience will pay off. One day you will break free and leap through the Dragon Gate to glory." },
      { num: "Stick #77", text: "Supreme Fortune: In dreams you speak of riches piled high, fame floats on clouds that vanish through the sky. The mountains far the rivers winding wide, one word from a wise friend makes joy reside.", freeExplanation: "A sign of seeing past illusion to find true guidance. Dreamed-of wealth and hollow fame are not to be trusted. But when a wise mentor offers a single word of direction, clarity and happiness emerge at once." },
      { num: "Stick #78", text: "Supreme Fortune: The water yet unboiled stays lukewarm still, not cold not hot just temperate at will. To walk the world you need no other thing, just master every craft and art you bring.", freeExplanation: "A sign of versatile skill and balanced temperament. A steady, moderate approach combined with broad capability is your greatest asset. Many skills ensure your security — ability is the best protection in any circumstance." },
      { num: "Stick #79", text: "Supreme Fortune: You made a vow to heaven for your peace, when safety came you let your prayers cease. Like one who snares the hare then drops the trap, don't dare forget the promise in your lap.", freeExplanation: "A sign to honor your commitments and show gratitude. Vows made in times of need must not be forgotten once peace returns. Fulfill your promises faithfully — to break your word invites misfortune." },
      { num: "Stick #80", text: "Supreme Fortune: You climb the tower seeking sheltered heights, while thorny thickets guard on every side. The proud man riding fortune's fragile tide, may find his triumph turn to sorrow's slide.", freeExplanation: "A sign of precarious success requiring humility. Though you stand in a position of power, dangers surround you on all sides. Stay alert and humble during prosperous times, lest arrogance leads to a bitter downfall." },
      { num: "Stick #81", text: "Supreme Fortune: Fierce flames rage upward scorching through the sky, yet from the fire a lotus blooms on high. Through every trial it emerges whole, with leaves and roots intact a living soul.", freeExplanation: "A supreme sign of the lotus born from fire, of triumph through adversity. Even in the most extreme hardship, you will emerge unscathed and renewed — like the lotus that blooms pure and radiant from the flames." },
      { num: "Stick #82", text: "Supreme Fortune: Among your peers a worthy soul you'll find, engage with them through courtesy refined. Today you share a feast as host and guest, tomorrow stand as equals with the best.", freeExplanation: "A sign of valuable friendships and mutual advancement. The people you meet now are no ordinary acquaintances. Treat them with genuine sincerity, and in the future you will rise together to the highest levels." },
      { num: "Stick #83", text: "Supreme Fortune: Like the crescent moon still young and slight, half shadowed yet with half reflecting light. Just wait until the fifteenth evening falls, then brilliant glow illuminates all walls.", freeExplanation: "A sign of gradual progress toward completeness. Though circumstances are not yet ideal, they improve steadily day by day. Keep your patience — when the time of fullness arrives, everything will be bathed in light." },
      { num: "Stick #84", text: "Supreme Fortune: To sacrifice your virtue chasing fame, beware that good luck turns to bitter shame. Lost in wine you'll wander without aim, in pine tree shadows dreaming without name.", freeExplanation: "A sign of hidden peril within apparent good fortune. Do not sacrifice your integrity in the pursuit of recognition. Even favorable circumstances can harbor unexpected reversals. Stay clear-headed and grounded." },
      { num: "Stick #85", text: "Supreme Fortune: The spring thunder rolls and all the creatures wake, they twist and turn their muddy bonds to break. Now understanding life's eternal round, in one great change a dragon shall be found.", freeExplanation: "A sign of the great awakening and total transformation. After long dormancy, the thunder of spring announces your moment. Once awakened, you will undergo a complete metamorphosis — rising like a dragon into a brilliant future." },
      { num: "Stick #86", text: "Supreme Fortune: In springtime flowers bloom upon the stage, great carts of treasure come from every gauge. If you should leap the Dragon Gate's three tiers, like sudden thunder ringing in all ears.", freeExplanation: "A supreme sign of springtime abundance and wealth arriving. Spring returns, luck descends, and riches flow in from all directions. Should you also achieve a breakthrough, the impact will be as dramatic as a thunderclap." },
      { num: "Stick #87", text: "Supreme Fortune: Halfway up the ridge the sun meets peak, the cliffs ahead seem jagged harsh and bleak. Look up to heaven's canopy so wide, your body rests in boundless space inside.", freeExplanation: "A sign of heavenly protection on a difficult journey. Though the road is steep and the heights daunting, divine guardians watch over you. Even in precarious situations, you will be kept safe. Maintain your faith." },
      { num: "Stick #88", text: "Supreme Fortune: A wooden tiger guards the entrance gate, it looks so fierce but harms not small nor great. The truth is told there's nothing here to fear, release your doubt and let your mind be clear.", freeExplanation: "A sign of false alarm — the threat is not real. What frightens you is actually powerless and harmless, all bark and no bite. Let go of your fear and anxiety, face the situation calmly, and you will be fine." },
      { num: "Stick #89", text: "Supreme Fortune: Your ventures forth and back bring splendid gain, like flawless jade within the rock's domain. Now fortune sends a craftsman keen of eye, your fame shall reach the corners of the sky.", freeExplanation: "A supreme sign of flawless jade discovered by a master. All your endeavors prosper brilliantly. Your talent, like perfect jade, has found its champion — fame and achievement will spread across the four seas." },
      { num: "Stick #90", text: "Supreme Fortune: A message drops from heaven's court one morn, a ship with treasures stacked returns reborn. If you should ask what future holds in store, a noble patron guides you evermore.", freeExplanation: "A supreme sign of unexpected good news and abundant returns. Wonderful tidings arrive out of the blue, and your ship comes in laden with rewards. A devoted patron supports your journey from start to finish." },
      { num: "Stick #91", text: "Supreme Fortune: Unfurl your brow and step beyond the crowd, the road ahead gleams wealthy bright and proud. A highway broad as heaven stretches wide, do all you wish with nothing left to hide.", freeExplanation: "A supreme sign of liberation and boundless opportunity. All your worries dissolve as a magnificent future unfolds. The road ahead is wide as the sky itself — pursue your ambitions with full confidence and abandon." },
      { num: "Stick #92", text: "Supreme Fortune: Since childhood days you've carried worry's weight, with tireless toil you've labored early and late. But ask about the future's promised land, the moon shines bright above where proud clouds stand.", freeExplanation: "A sign of hard-earned reward and a brilliant future. Though you have worked and worried since youth, all that effort was not in vain. The path ahead gleams like moonlight through clouds — every struggle has been worthwhile." },
      { num: "Stick #93", text: "Supreme Fortune: The phoenix drenched in rain has lost its sheen, and common sparrows mock the fallen queen. But one fine day the clouds will roll apart, restored in glory feathers bright and smart.", freeExplanation: "A sign of the phoenix in temporary disgrace, destined for restoration. Though you may be humbled and mocked by lesser rivals, a phoenix never stays down for long. When the clouds clear, you will rise resplendent once more." },
      { num: "Stick #94", text: "Supreme Fortune: A noble heart should heed no petty tongue, let reason rule in every right and wrong. Walk only by the compass true and fair, and heaven shields the just beyond compare.", freeExplanation: "A sign of righteousness and divine protection. Ignore the slander of small-minded people and let principle guide all your decisions. Walk the honest path and heaven itself will guarantee your safety." },
      { num: "Stick #95", text: "Supreme Fortune: From dusk to dawn your name and deeds resound, with honor wealth and splendor all around. Remember well the lessons years will teach, your heart and mine in understanding reach.", freeExplanation: "A sign of flourishing career and abundant honor. Professional success and prosperity abound. Keep in mind the principles of cause and effect — sustained blessings come from sustained goodness." },
      { num: "Stick #96", text: "Supreme Fortune: The mighty pagoda stands beyond compare, with light from every facet bright and fair. Resolve to serve with reverence and with prayer, and heaven rains down blessings everywhere.", freeExplanation: "A sign of the radiant pagoda and accumulated virtue. Commit yourself to doing good and honoring the sacred. Like a pagoda gleaming from every angle, your virtue will attract heaven's abundant blessings." },
      { num: "Stick #97", text: "Supreme Fortune: Past fifty years your hopes had turned to grey, then riches came unbidden on their way. Keep doing good and guard a gentle heart, with long life and high honor you'll depart.", freeExplanation: "A sign of late-blooming fortune and unexpected wealth. Even when hope had faded, prosperity arrived uninvited. Continue your good deeds and kind heart, and longevity and distinguished status will be your reward." },
      { num: "Stick #98", text: "Supreme Fortune: In every deed let courtesy be king, speak loyal words let honest wisdom ring. Keep still your heart like water crystal clear, the noonday sun commands the dome up here.", freeExplanation: "A sign of luminous integrity and faithful character. Greet the world with respect, speak with honesty, and maintain a clear and tranquil mind. Your future blazes with the brilliance of the midday sun." },
      { num: "Stick #99", text: "Supreme Fortune: You rode a crane through fabled towns with ease, yet half your dreams still float upon the breeze. The crane-borne wanderer no one seems to know, a loyal heart poured out like river's flow.", freeExplanation: "A sign of unfulfilled ambition and the search for recognition. Though you travel with grace and freedom, your true talents remain unappreciated. Hold fast to your convictions — the audience worthy of your gifts will appear in time." },
      { num: "Stick #100", text: "Supreme Fortune: The oracle reveals its truth to you, yet foolish minds turn wisdom's words askew. With sacred fortune stick now in your hand, be still and wait for destiny's command.", freeExplanation: "A sign of divine wisdom and patient trust. The oracle has spoken — do not overthink or second-guess its message. Guard the present, wait quietly for the right moment, and trust that all unfolds according to heaven's plan." }
    ]
  }
};

let currentLang = 'en';

/**
 * Detect the user's preferred language.
 * Priority: localStorage('lang') > navigator.language > default 'en'
 */
function detectLanguage() {
  var saved = localStorage.getItem('lang');
  if (saved && I18N[saved]) {
    return saved;
  }
  var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('fr')) return 'fr';
  return 'en';
}

/**
 * Set the active language, persist to localStorage, update the document,
 * and re-render all translatable elements on the page.
 */
function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // Re-render all elements with a data-i18n attribute
  var elements = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elements.length; i++) {
    var key = elements[i].getAttribute('data-i18n');
    var translated = t(key);
    if (translated !== key) {
      elements[i].textContent = translated;
    }
  }

  // Re-render elements with data-i18n-placeholder
  var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < placeholders.length; j++) {
    var pKey = placeholders[j].getAttribute('data-i18n-placeholder');
    var pTranslated = t(pKey);
    if (pTranslated !== pKey) {
      placeholders[j].placeholder = pTranslated;
    }
  }

  // Re-render elements with data-i18n-title
  var titles = document.querySelectorAll('[data-i18n-title]');
  for (var k = 0; k < titles.length; k++) {
    var tKey = titles[k].getAttribute('data-i18n-title');
    var tTranslated = t(tKey);
    if (tTranslated !== tKey) {
      titles[k].title = tTranslated;
    }
  }

  // Update page title
  document.title = t('siteTitle');
}

/**
 * Get the translated string for a given key in the current language.
 * Returns the key itself if no translation is found.
 */
function t(key) {
  return I18N[currentLang].ui[key] || key;
}

/**
 * Get the current language code.
 */
function getCurrentLang() {
  return currentLang;
}

/**
 * Get the signs array for the current language.
 * Use this in script.js instead of qiangData directly.
 */
function getSignData() {
  return I18N[currentLang].signs;
}

// Auto-detect language on load
currentLang = detectLanguage();
