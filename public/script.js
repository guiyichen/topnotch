// 签文数据现在由 i18n.js 提供，通过 getSignData() 获取
// 保留 qiangData 作为兼容引用
const qiangData = [
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
];

const qiangTong = document.getElementById('qiang-tong');
const resultModal = document.getElementById('result-modal');
const drawnQiang = document.getElementById('drawn-qiang');
const shakingArea = document.getElementById('shaking-area');
const shakeHint = document.getElementById('shake-hint');
let isDrawing = false; // 防止重复点击
let isMobile = false; // 是否为手机设备
let lastShakeTime = 0; // 上次摇动时间
let shakeThreshold = 15; // 摇动阈值
let currentQiang = null; // 当前抽到的签

// 检测是否为手机设备
function detectMobile() {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    
    if (isMobile) {
        // 手机端显示摇一摇和点击提示
        shakingArea.querySelector('p').textContent = t('shakeOrClickHint');
        shakeHint.style.display = 'block';
        
        // 手机端始终添加点击事件
        qiangTong.addEventListener('click', startDrawing);
        
        // iOS需要用户交互后才能请求权限
        if (isIOS()) {
            showIOSPermissionButton();
        } else {
            // Android等设备直接请求权限
            requestMotionPermission();
        }
    } else {
        // 桌面端显示点击提示
        shakingArea.querySelector('p').textContent = t('clickToDrawHint');
        shakeHint.style.display = 'none';
        qiangTong.addEventListener('click', startDrawing);
    }
}

// 检测是否为iOS设备
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// 显示iOS权限请求按钮
function showIOSPermissionButton() {
    const permissionBtn = document.createElement('button');
    permissionBtn.id = 'permission-btn';
    permissionBtn.textContent = t('enableShake');
    permissionBtn.style.cssText = `
        background: linear-gradient(145deg, #FFD700, #FFA500);
        color: #8B4513;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 10px;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        transition: all 0.3s ease;
    `;
    
    permissionBtn.addEventListener('click', function() {
        requestMotionPermission();
        permissionBtn.remove();
    });
    
    permissionBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)';
    });
    
    permissionBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
    });
    
    shakeHint.appendChild(permissionBtn);
}

// 请求设备运动权限
function requestMotionPermission() {
    // iOS 13+ 需要请求权限
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    setupShakeDetection();
                    updateUIForShakeMode();
                } else {
                    // 权限被拒绝，保持摇一摇UI但添加点击备选
                    console.log('Permission denied, using fallback');
                    fallbackToClickMode();
                }
            })
            .catch(error => {
                console.error('Permission request failed:', error);
                // 权限请求失败，保持摇一摇UI但添加点击备选
                fallbackToClickMode();
            });
    } else {
        // 不支持权限请求，直接设置摇动检测
        setupShakeDetection();
        updateUIForShakeMode();
    }
}

// 更新UI为摇动模式
function updateUIForShakeMode() {
    shakingArea.querySelector('p').textContent = '🙏 心诚则灵，摇一摇或点击签筒抽签';
    shakeHint.querySelector('p').textContent = t('shakeOrClickDetail');
    shakeHint.querySelector('.shake-animation').style.display = 'block';
}

// 回退到点击模式（保持摇一摇提示）
function fallbackToClickMode() {
    shakingArea.querySelector('p').textContent = '🙏 心诚则灵，摇一摇或点击签筒抽签';
    shakeHint.querySelector('p').textContent = t('shakeOrClickDetail');
    shakeHint.querySelector('.shake-animation').style.display = 'block';
    
    // 移除权限按钮（如果存在）
    const permissionBtn = document.getElementById('permission-btn');
    if (permissionBtn) {
        permissionBtn.remove();
    }
    
    // 点击事件已经在detectMobile中添加了，不需要重复添加
    
    // 显示提示信息
    const fallbackHint = document.createElement('div');
    fallbackHint.style.cssText = `
        font-size: 0.8rem;
        color: #999;
        margin-top: 10px;
        text-align: center;
    `;
    fallbackHint.textContent = t('shakeFallbackHint');
    shakeHint.appendChild(fallbackHint);
}

// 设置摇动检测
function setupShakeDetection() {
    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeCount = 0;
    let shakeStartTime = 0;
    
    window.addEventListener('devicemotion', function(event) {
        const acceleration = event.accelerationIncludingGravity;
        const x = acceleration.x;
        const y = acceleration.y;
        const z = acceleration.z;
        
        // 计算加速度变化
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);
        
        const accelerationChange = deltaX + deltaY + deltaZ;
        
        // iOS设备需要更敏感的检测
        const currentThreshold = isIOS() ? 12 : shakeThreshold;
        
        if (accelerationChange > currentThreshold) {
            const currentTime = new Date().getTime();
            
            // 防止过于频繁的摇动
            if (currentTime - lastShakeTime > 1500) {
                // 检测连续摇动
                if (shakeCount === 0) {
                    shakeStartTime = currentTime;
                }
                shakeCount++;
                
                // 如果1秒内有3次以上摇动，触发抽签
                if (currentTime - shakeStartTime < 1000 && shakeCount >= 3) {
                    lastShakeTime = currentTime;
                    shakeCount = 0;
                    startDrawing();
                    
                    // 震动反馈
                    if (navigator.vibrate) {
                        navigator.vibrate([200, 100, 200]);
                    }
                } else if (currentTime - shakeStartTime >= 1000) {
                    // 重置计数器
                    shakeCount = 0;
                }
            }
        }
        
        lastX = x;
        lastY = y;
        lastZ = z;
    }, true); // 使用捕获阶段，提高响应速度
}

// 页面加载时检测设备
document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18n UI
    initUI();
    console.log('Page loaded, detecting device...');
    detectMobile();

    // 添加调试信息
    console.log('设备信息:', {
        userAgent: navigator.userAgent,
        isMobile: isMobile,
        isIOS: isIOS(),
        hasDeviceMotion: typeof DeviceMotionEvent !== 'undefined',
        hasPermissionAPI: typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
    });

    // 检测 Stripe 支付回调
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' && params.get('session_id')) {
        handlePaymentReturn(params.get('session_id'), params.get('type'), params.get('sign'));
    } else if (params.get('payment') === 'cancelled') {
        // 清理 URL 参数
        history.replaceState({}, '', window.location.pathname);
    }
});

// Stripe 支付回调处理
async function handlePaymentReturn(sessionId, type, signNum) {
    // 清理 URL 参数
    history.replaceState({}, '', window.location.pathname);

    try {
        const resp = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        const result = await resp.json();

        if (!result.verified) {
            alert(t('paymentVerifyFailed'));
            return;
        }

        if (result.type === 'draw') {
            // 付费抽签：减少计数并自动开始抽签
            const count = parseInt(localStorage.getItem('drawCount') || '0');
            localStorage.setItem('drawCount', String(Math.max(0, count - 1)));
            setTimeout(() => startDrawing(), 500);
        } else if (result.type === 'interpretation' && result.signNum) {
            // 付费解签：记录购买并获取数据
            const purchased = JSON.parse(localStorage.getItem('purchasedSigns') || '{}');
            purchased[result.signNum] = sessionId;
            localStorage.setItem('purchasedSigns', JSON.stringify(purchased));

            // 获取详细解签数据
            const data = await fetchAndCacheInterpretation(result.signNum);
            if (data) {
                // 找到对应的签文数据并展示
                const sign = getSignData().find(q => q.num === result.signNum);
                if (sign) {
                    currentQiang = sign;
                    showExplanation();
                }
            }
        }
    } catch (err) {
        console.error('Payment verification error:', err);
        alert(t('paymentVerifyError'));
    }
}

// 每日限免相关
const DAILY_FREE_DRAWS = 3; // 每天免费 3 次

function checkDailyLimit() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('drawDate');
    const drawCount = parseInt(localStorage.getItem('drawCount') || '0');

    if (savedDate !== today) {
        // 新的一天，重置计数
        localStorage.setItem('drawDate', today);
        localStorage.setItem('drawCount', '0');
        return true;
    }

    return drawCount < DAILY_FREE_DRAWS;
}

function recordDraw() {
    const today = new Date().toDateString();
    localStorage.setItem('drawDate', today);
    const count = parseInt(localStorage.getItem('drawCount') || '0');
    localStorage.setItem('drawCount', String(count + 1));
}

function getRemainingDraws() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('drawDate');
    if (savedDate !== today) return DAILY_FREE_DRAWS;
    const count = parseInt(localStorage.getItem('drawCount') || '0');
    return Math.max(0, DAILY_FREE_DRAWS - count);
}

function showPaywall() {
    // 移除已有的 paywall 防止重复
    closePaywall();
    const paywall = document.createElement('div');
    paywall.id = 'paywall-overlay';
    paywall.className = 'paywall-overlay';
    paywall.innerHTML = `
        <div class="paywall-card">
            <h3>${t('dailyLimitTitle')}</h3>
            <p>${t('dailyLimitMsg').replace('{n}', DAILY_FREE_DRAWS)}</p>
            <div class="paywall-buttons">
                <button class="pay-btn" onclick="payForDraw()">${t('payForDraw')}</button>
                <button class="later-btn" onclick="closePaywall()">${t('comeback')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(paywall);
}

function closePaywall() {
    const paywall = document.getElementById('paywall-overlay');
    if (paywall) paywall.remove();
}

async function payForDraw() {
    closePaywall();
    try {
        const resp = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'draw' }),
        });
        const data = await resp.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert(t('paymentFailed'));
        }
    } catch (err) {
        console.error('Payment error:', err);
        alert(t('networkError'));
    }
}

function startDrawing() {
    if (isDrawing) return;

    // 检查每日限免
    if (!checkDailyLimit()) {
        showPaywall();
        return;
    }

    isDrawing = true;
    recordDraw();

    console.log('Starting draw animation...');
    
    // 1. 开始摇晃动画
    qiangTong.classList.add('shaking');
    console.log('添加shaking类:', qiangTong.classList.contains('shaking'));
    
    // iOS设备添加额外的动画支持
    if (isIOS()) {
        // 强制重绘以触发动画
        qiangTong.style.transform = 'translateZ(0)';
        qiangTong.style.webkitTransform = 'translateZ(0)';
    }
    
    // 2. 模拟摇晃一段时间后停止
    setTimeout(() => {
        qiangTong.classList.remove('shaking');
        console.log('移除shaking类');
        
        // 3. 随机抽签
        const signs = getSignData();
        const randomIndex = Math.floor(Math.random() * signs.length);
        const result = signs[randomIndex];
        
        // 4. 显示和播放签支弹出动画
        drawnQiang.style.display = 'block';
        drawnQiang.classList.add('popping');

        // 5. 动画结束后显示结果
        setTimeout(() => {
            showResult(result);
            // 清理动画状态
            drawnQiang.classList.remove('popping');
            drawnQiang.style.display = 'none';
            isDrawing = false;
        }, 1500); // 1.5秒后显示结果 (需略长于 popOut 动画时间)
        
    }, 2000); // 摇晃 2 秒
}

function showResult(result) {
    currentQiang = result; // 保存当前签文
    document.getElementById('qiang-number').textContent = result.num;
    document.getElementById('qiang-text').textContent = result.text;
    resultModal.style.display = 'block';
}

function closeModal() {
    resultModal.style.display = 'none';
}

async function showExplanation() {
    if (!currentQiang) return;

    // 先关闭当前的结果弹框
    closeModal();

    // 如果已购买但缓存中无数据，先异步获取
    const isPurchasedSign = checkPurchased(currentQiang.num);
    if (isPurchasedSign && !getDetailedInterpretation(currentQiang.num)) {
        await fetchAndCacheInterpretation(currentQiang.num);
    }
    
    // 创建解签弹窗
    const explanationModal = document.createElement('div');
    explanationModal.id = 'explanation-modal';
    explanationModal.className = 'modal';
    const explanation = currentQiang.freeExplanation || t('defaultExplanation');
    const isPurchased = checkPurchased(currentQiang.num);
    const detailed = isPurchased ? getDetailedInterpretation(currentQiang.num) : null;

    explanationModal.innerHTML = `
        <div class="modal-content explanation-modal-content">
            <button class="close-icon-btn" onclick="closeExplanationModal()" aria-label="${t('close')}">×</button>
            <h2>${t('signExplanation')}</h2>
            <h3>${currentQiang.num}</h3>
            <p><strong>${t('signText')}</strong>${currentQiang.text}</p>
            <div class="explanation-content">
                <p><strong>${t('interpretation')}</strong></p>
                <p>${explanation}</p>
            </div>
            <div class="detailed-section">
                <h3 class="detailed-title">${t('detailedReading')}</h3>
                <div class="interpretation-tabs">
                    <button class="tab-button active" data-tab="career" onclick="switchTab(this, 'career')">${t('tabCareer')}</button>
                    <button class="tab-button" data-tab="love" onclick="switchTab(this, 'love')">${t('tabLove')}</button>
                    <button class="tab-button" data-tab="health" onclick="switchTab(this, 'health')">${t('tabHealth')}</button>
                    <button class="tab-button" data-tab="wealth" onclick="switchTab(this, 'wealth')">${t('tabWealth')}</button>
                </div>
                <div class="tab-panels">
                    ${isPurchased ? `
                        <div class="tab-panel active" id="panel-career">${detailed.career}</div>
                        <div class="tab-panel" id="panel-love">${detailed.love}</div>
                        <div class="tab-panel" id="panel-health">${detailed.health}</div>
                        <div class="tab-panel" id="panel-wealth">${detailed.wealth}</div>
                    ` : `
                        <div class="tab-panel active locked-panel" id="panel-career">
                            <div class="locked-text">${t('lockedCareerPreview')}</div>
                            <div class="locked-overlay">
                                <span class="lock-icon">🔒</span>
                                <span>${t('unlockContent')}</span>
                            </div>
                        </div>
                        <div class="tab-panel locked-panel" id="panel-love">
                            <div class="locked-text">${t('lockedLovePreview')}</div>
                            <div class="locked-overlay">
                                <span class="lock-icon">🔒</span>
                                <span>${t('unlockContent')}</span>
                            </div>
                        </div>
                        <div class="tab-panel locked-panel" id="panel-health">
                            <div class="locked-text">${t('lockedHealthPreview')}</div>
                            <div class="locked-overlay">
                                <span class="lock-icon">🔒</span>
                                <span>${t('unlockContent')}</span>
                            </div>
                        </div>
                        <div class="tab-panel locked-panel" id="panel-wealth">
                            <div class="locked-text">${t('lockedWealthPreview')}</div>
                            <div class="locked-overlay">
                                <span class="lock-icon">🔒</span>
                                <span>${t('unlockContent')}</span>
                            </div>
                        </div>
                        <button class="unlock-button" onclick="unlockDetailed('${currentQiang.num}')">${t('unlockButton')}</button>
                    `}
                </div>
            </div>
            <button onclick="closeExplanationModal()">${t('close')}</button>
        </div>
    `;
    document.body.appendChild(explanationModal);
    explanationModal.style.display = 'flex';
}

function closeExplanationModal() {
    const explanationModal = document.getElementById('explanation-modal');
    if (explanationModal) {
        explanationModal.remove();
    }
}

// 详细解签相关
function switchTab(btn, tabName) {
    const modal = btn.closest('.detailed-section');
    modal.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    modal.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + tabName).classList.add('active');
}

function checkPurchased(signNum) {
    const purchased = JSON.parse(localStorage.getItem('purchasedSigns') || '{}');
    return !!purchased[signNum];
}

function getDetailedInterpretation(signNum) {
    // 从 sessionStorage 缓存中读取
    const cached = sessionStorage.getItem('interp_' + signNum);
    if (cached) {
        return JSON.parse(cached);
    }
    return null;
}

async function fetchAndCacheInterpretation(signNum) {
    const purchased = JSON.parse(localStorage.getItem('purchasedSigns') || '{}');
    const sessionId = purchased[signNum];
    if (!sessionId) return null;

    try {
        const resp = await fetch(`/api/get-interpretation?session_id=${encodeURIComponent(sessionId)}&sign_num=${encodeURIComponent(signNum)}`);
        if (resp.ok) {
            const data = await resp.json();
            sessionStorage.setItem('interp_' + signNum, JSON.stringify(data));
            return data;
        }
    } catch (err) {
        console.error('Fetch interpretation error:', err);
    }
    return null;
}

async function unlockDetailed(signNum) {
    try {
        const resp = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'interpretation', signNum }),
        });
        const data = await resp.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert(t('paymentFailed'));
        }
    } catch (err) {
        console.error('Payment error:', err);
        alert(t('networkError'));
    }
}

// 打赏/随喜功德
function showDonation() {
    closeModal();

    const donationModal = document.createElement('div');
    donationModal.id = 'donation-modal';
    donationModal.className = 'modal';
    donationModal.innerHTML = `
        <div class="modal-content donation-content">
            <button class="close-icon-btn" onclick="closeDonationModal()" aria-label="${t('close')}">×</button>
            <h2>${t('donationTitle')}</h2>
            <p class="donation-message">${t('donationMessage')}</p>
            <div class="donation-qr-group">
                <div class="donation-qr-item">
                    <img src="wechat-qr.png" alt="${t('wechatPay')}" onerror="this.parentElement.style.display='none'">
                    <span>${t('wechatPay')}</span>
                </div>
                <div class="donation-qr-item">
                    <img src="alipay-qr.png" alt="${t('alipay')}" onerror="this.parentElement.style.display='none'">
                    <span>${t('alipay')}</span>
                </div>
            </div>
            <p class="donation-note">${t('donationNote')}</p>
            <button onclick="closeDonationModal()">${t('close')}</button>
        </div>
    `;
    document.body.appendChild(donationModal);
    donationModal.style.display = 'flex';
}

function closeDonationModal() {
    const donationModal = document.getElementById('donation-modal');
    if (donationModal) {
        donationModal.remove();
    }
}

// Language display names
const LANG_LABELS = {
    zh: '中文', en: 'EN', ja: '日本語', ko: '한국어', es: 'ES', fr: 'FR'
};

// i18n: Initialize UI text from language pack
function initUI() {
    document.title = t('siteTitle');
    document.getElementById('main-hint').textContent = t('clickToDrawHint');
    const shakeHintText = document.getElementById('shake-hint-text');
    if (shakeHintText) shakeHintText.textContent = t('shakeToDrawHint');
    document.getElementById('result-title').textContent = t('congrats');
    document.getElementById('btn-back').textContent = t('back');
    document.getElementById('btn-interpret').textContent = t('interpret');
    document.getElementById('btn-donate').textContent = t('donate');
    // Language selector
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = getCurrentLang();
}

// Switch language from dropdown
function switchLanguage(lang) {
    if (!lang) return;
    setLanguage(lang);
    initUI();
    detectMobile();
}