// 观音灵签签文数据 - 100签（参考：https://www.51chouqian.com/guanyinlingqian/）
const qiangData = [
    { num: "第1签", text: "上上签：天开地辟结良缘，日吉时良万事全。若得此签非小可，人行中正帝王宣。" },
    { num: "第2签", text: "上上签：一锄掘地要求泉，努力求之得最先。无意俄然遇知己，相逢携手上青天。" },
    { num: "第3签", text: "上上签：奔波阻隔重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。" },
    { num: "第4签", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。" },
    { num: "第5签", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。" },
    { num: "第6签", text: "上上签：投身岩下铜鸟居，须是还他大丈夫。拾得营谋谁可得，通行天地此人无。" },
    { num: "第7签", text: "上上签：奔波役役重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。" },
    { num: "第8签", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。" },
    { num: "第9签", text: "上上签：烦君勿作私心事，此意偏宜说问公。一片明心光皎洁，宛如皎月正天中。" },
    { num: "第10签", text: "上上签：石藏无价玉和珍，只管他乡外客寻。宛如持灯更觅火，不如收拾枉劳心。" },
    { num: "第11签", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。" },
    { num: "第12签", text: "上上签：时临否极泰当来，抖擞从君出暗埃。若遇卯寅佳信至，管教立志事和谐。" },
    { num: "第13签", text: "上上签：自小生身富贵家，眼前万物总奢华。蒙君赐紫金腰带，四海声名定可夸。" },
    { num: "第14签", text: "上上签：宛如仙鹤出凡笼，脱得凡笼路路通。南北东西无阻隔，任君直上九霄宫。" },
    { num: "第15签", text: "上上签：触人口气最难吞，忽有灾危祸到门。卵破巢空无宿处，深为稳便把心存。" },
    { num: "第16签", text: "上上签：愁眉思虑暂时开，启出云霄喜自来。宛如粪土中藏玉，良工荐举出尘埃。" },
    { num: "第17签", text: "上上签：莫听闲言说是非，晨昏只好念阿弥。若将狂话为真实，书饼如何止得饥。" },
    { num: "第18签", text: "上上签：金乌西坠兔东升，日夜循环至古今。僧道得之无不利，士农工商各从心。" },
    { num: "第19签", text: "上上签：急水滩头放艇时，狂风作浪欲何为。待他浪静风平后，稳载船归过不危。" },
    { num: "第20签", text: "上上签：当春久雨喜开晴，玉兔金乌渐渐明。旧事消散新事遂，看看一跳入龙门。" },
    { num: "第21签", text: "上上签：阴阳道合总由天，女嫁男婚喜偎然。但见龙蛇相会合，熊罴入梦乐团圆。" },
    { num: "第22签", text: "上上签：旱时田里皆枯槁，谢天甘雨落林梢。蛟龙意兴功行满，直入青云路不遥。" },
    { num: "第23签", text: "上上签：欲攀仙桂蟾宫去，岂虑天门不放开。谋望一般音信好，高人自送岭头来。" },
    { num: "第24签", text: "上上签：不成邻里不成家，水泡痴人似落花。若问君恩须得力，到头方见事如麻。" },
    { num: "第25签", text: "上上签：过了忧危事几重，从今再立永无空。宽心自有宽心计，得遇高人立大功。" },
    { num: "第26签", text: "上上签：上下传来事总虚，天边接得一封书。书中许我功名遂，直到终时亦是虚。" },
    { num: "第27签", text: "上上签：一谋一用一番书，虑后思前不敢为。时到贵人相助力，如山墙立可安居。" },
    { num: "第28签", text: "上上签：东方月上正婵娟，顷刻云遮亦暗存。或有圆时还有缺，更言非者亦闲言。" },
    { num: "第29签", text: "上上签：宝剑出匣耀光明，在匣全然不惹尘。今得贵人携出现，有威有势众人钦。" },
    { num: "第30签", text: "上上签：劝君切莫向他求，似鹤飞来暗箭投。若去采薪蛇在草，恐遭毒口也忧愁。" },
    { num: "第31签", text: "上上签：清闲无忧静处坐，饱后吃茶时坐卧。汝下身心不用忙，必定不招冤与祸。" },
    { num: "第32签", text: "上上签：前程杳杳定无疑，石中藏玉有谁知。一朝良匠分明剖，始觉安然碧玉期。" },
    { num: "第33签", text: "上上签：内藏无价宝和珍，得玉何须外界寻。不如等待高人识，宽心犹且更宽心。" },
    { num: "第34签", text: "上上签：行藏出入礼义恭，言必忠良信必聪。心不了然且静澈，光明红日正当空。" },
    { num: "第35签", text: "上上签：衣冠重整旧家风，道是无穹却有功。扫却当途荆棘刺，三人约议再和同。" },
    { num: "第36签", text: "上上签：欲待身安运泰时，风中灯烛不相宜。不如收拾深堂坐，庶免光摇静处期。" },
    { num: "第37签", text: "上上签：月照天书静处期，忽遭云雾又昏迷。宽心祈待云霞散，此时更改好施为。" },
    { num: "第38签", text: "上上签：镜月当空出匣时，刹那云雾暗迷离。宽心守待浮云散，更改相宜可望为。" },
    { num: "第39签", text: "上上签：天边消息实难思，切莫多心望强求。若把石头磨作镜，精神枉费一时休。" },
    { num: "第40签", text: "上上签：红轮西坠兔东升，阴长阳消百事亨。若是女人宜望用，增添财禄福其心。" },
    { num: "第41签", text: "上上签：无限好言君记取，却为认贼将作子。莫贪眼下有些甜，更虑他年前样看。" },
    { num: "第42签", text: "上上签：皇君圣后总为恩，复待祈禳无损增。一切有情皆受用，人间天上得期亨。" },
    { num: "第43签", text: "上上签：天地交泰万物新，自形自色自怡神。森罗万象皆精彩，事事和谐得称人。" },
    { num: "第44签", text: "上上签：棋逢敌手要藏机，黑白盘中未决时。到底欲知谁胜负，须教先着相机宜。" },
    { num: "第45签", text: "上上签：温柔自古胜刚强，积善之门大吉昌。若是有人占此卦，宛如正渴遇琼浆。" },
    { num: "第46签", text: "上上签：劝君耐守旧生涯，把定心肠勿起歹。直待有人轻着力，枯枝老树再生花。" },
    { num: "第47签", text: "上上签：锦上添花色愈鲜，运来禄马喜双全。时人莫恨功名晚，一举登科四海传。" },
    { num: "第48签", text: "上上签：昆鸟秋来化作鹏，好游快乐喜飞腾。翱翔万里云霄去，余外诸禽总不能。" },
    { num: "第49签", text: "上上签：营为期望在春前，谁料秋来又不然。直遇清江贵公子，一生活计始安全。" },
    { num: "第50签", text: "上上签：五湖四海任君行，高挂帆篷自在撑。若得顺风随即至，满船宝贝喜层层。" },
    { num: "第51签", text: "上上签：夏日炎天日最长，人人愁热闷非常。天公也解诸人意，故遣薰风特送凉。" },
    { num: "第52签", text: "上上签：水中捉月费工夫，费尽工夫却又无。莫说闲言并乱语，枉劳心力强身孤。" },
    { num: "第53签", text: "上上签：失意翻成得意时，龙吟虎啸两相宜。青云有路终须到，许我功名必可期。" },
    { num: "第54签", text: "上上签：梦中得宝醒来无，自谓南山只是锄。苦问婚姻并问病，别寻生路得相宜。" },
    { num: "第55签", text: "上上签：父贤传子子传孙，衣禄丰盈只在天。金马玉堂人快乐，饥时吃饭困时眠。" },
    { num: "第56签", text: "上上签：涧小石粗流水响，力劳撑驾恐损伤。路须指出前江去，风静潮平尽不妨。" },
    { num: "第57签", text: "上上签：说是说非风过耳，好衣好禄自然当。君莫记取当年事，汝意还与我意同。" },
    { num: "第58签", text: "上上签：直上重楼去藏身，四围荆棘绕为林。天高君命长和短，得意翻成失意人。" },
    { num: "第59签", text: "上上签：大鹏展翅绕天涯，时运来时福自来。若问前程何处去，青云直上步瑶台。" },
    { num: "第60签", text: "上上签：抱薪救火火增烟，烧却三千及大千。若问营谋并出入，不如收拾枉劳心。" },
    { num: "第61签", text: "上上签：日上吟诗月下歌，逢场作戏笑呵呵。相逢会意难藏匿，喝彩声中有谩他。" },
    { num: "第62签", text: "上上签：晨昏全赖佛扶持，虽是逢危不见危。若得贵人来接引，此时福禄自相随。" },
    { num: "第63签", text: "上上签：昔日行船失了针，今朝依旧海中寻。若还寻得原针在，也费工夫也费心。" },
    { num: "第64签", text: "上上签：譬若初三四五缺，半无半有未圆全。等待十五良宵夜，到处光明到处圆。" },
    { num: "第65签", text: "上上签：眼前欢喜未为欢，亦不危时亦不安。割肉补疮为甚事，不如守旧待时光。" },
    { num: "第66签", text: "上上签：路险马行人去远，失群羊困虎相当。危难船过风翻浪，春暮花残天降霜。" },
    { num: "第67签", text: "上上签：一条金线秤君心，无减无增无重轻。为人平生心正直，文章全具艺光明。" },
    { num: "第68签", text: "上上签：门庭清吉梦祯祥，积善于门大吉昌。讼理婚成蚕又熟，病逢良药得安康。" },
    { num: "第69签", text: "上上签：冬来岭上一枝梅，叶落枝枯总不摧。但得阳春悄急至，依然还我作花魁。" },
    { num: "第70签", text: "上上签：朝朝恰似采花蜂，飞出西南又走东。春尽花残无觅处，此心不变旧行踪。" },
    { num: "第71签", text: "上上签：认知仓空不满仓，因何终日把心忙。只恨儿孙无见识，误我终身走四方。" },
    { num: "第72签", text: "上上签：弄蜂须要求他蜜，只怕遭他尾上针。虽是眼前有异路，暗里深藏荆棘林。" },
    { num: "第73签", text: "上上签：春来雷震百虫鸣，番身一转离泥中。始知出入还来往，一朝变化便成龙。" },
    { num: "第74签", text: "上上签：宛如仙鹤出凡笼，脱得凡笼路路通。南北东西无阻隔，任君直上九霄宫。" },
    { num: "第75签", text: "上上签：恰如抱虎过高山，战战兢兢胆碎寒。幸得山前逢妙手，方能保得一身安。" },
    { num: "第76签", text: "上上签：鱼龙混杂意和同，耐守寒潭未济中。不觉一日头角耸，禹门一跳过龙宫。" },
    { num: "第77签", text: "上上签：梦中说得是多财，声名云外总虚来。水远山遥难信定，贵人一指笑颜开。" },
    { num: "第78签", text: "上上签：冷水未烧白沸汤，不寒不热有温凉。要行天下无他事，为有身中百艺强。" },
    { num: "第79签", text: "上上签：虚空结愿保平安，保得人安愿未还。得兔忘蹄真绝迹，敢将初誓谩轻瞒。" },
    { num: "第80签", text: "上上签：直上重楼去藏身，四围荆棘绕为林。天高君命长和短，得意翻成失意人。" },
    { num: "第81签", text: "上上签：炎炎烈火焰连天，焰里还生一朵莲。到底得成终不害，依然生叶长根枝。" },
    { num: "第82签", text: "上上签：彼亦俦中一辈贤，劝君特达与周旋。此时宾主欢相会，他日王侯却并肩。" },
    { num: "第83签", text: "上上签：譬若初三四五缺，半无半有未圆全。等待十五良宵夜，到处光明到处圆。" },
    { num: "第84签", text: "上上签：因名丧德如何事，切恐吉中变化凶。酒醉不知何处去，青松影里梦朦胧。" },
    { num: "第85签", text: "上上签：春来雷震百虫鸣，番身一转离泥中。始知出入还来往，一朝变化便成龙。" },
    { num: "第86签", text: "上上签：春来花发映阳台，万里车来进宝财。若得禹门三级浪，恰如平地一声雷。" },
    { num: "第87签", text: "上上签：人行半岭日衔山，峻岭崖岩未可攀。仰望上天垂护佑，此身犹在太虚间。" },
    { num: "第88签", text: "上上签：木雕一虎在当门，须是有威不害人。分明说过无妨事，忧恼迟疑恐惧心。" },
    { num: "第89签", text: "上上签：出入营谋大吉昌，似玉无瑕石中藏。如今幸得良工识，他日功名四海扬。" },
    { num: "第90签", text: "上上签：忽朝一信下天墀，宝贝船装满载归。若问前程成底事，始终应得贵人提。" },
    { num: "第91签", text: "上上签：好展愁眉出众来，前途改变喜多财。一条大路如天阔，凡有施为尽放怀。" },
    { num: "第92签", text: "上上签：自幼常为虑，营谋可谓强。若问前程事，云间月正光。" },
    { num: "第93签", text: "上上签：鸾凤翔毛雨淋漓，当时却被雀儿欺。终教一日云开达，依旧还君整羽衣。" },
    { num: "第94签", text: "上上签：君子莫听小人言，凡事皆当理在先。但能依理行将去，天相吉人自保全。" },
    { num: "第95签", text: "上上签：事业功名暮与朝，荣华物态不胜饶。报君记取他年事，汝意还与我意同。" },
    { num: "第96签", text: "上上签：巍巍宝塔不寻常，八面玲珑尽放光。劝君立志勤顶礼，作善苍天降福祥。" },
    { num: "第97签", text: "上上签：五十功名心已灰，那知富贵逼人来。更行好事存方寸，寿比冈陵位鼎台。" },
    { num: "第98签", text: "上上签：出入行藏礼义恭，言必忠良信必聪。心不了然且静澈，光明红日正当空。" },
    { num: "第99签", text: "上上签：等闲骑鹤下扬州，半表平生志未酬。骑鹤扬州人不识，丹心空付水东流。" },
    { num: "第100签", text: "上上签：佛神灵通与君知，痴人说事转昏迷。老人求得灵签去，不如守旧待时来。" }
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

// 检测是否为手机设备
function detectMobile() {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    
    if (isMobile) {
        // 手机端显示摇一摇和点击提示
        shakingArea.querySelector('p').textContent = '🙏 心诚则灵，摇一摇或点击签筒抽签';
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
        shakingArea.querySelector('p').textContent = '🙏 心诚则灵';
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
    permissionBtn.textContent = '🔓 启用摇一摇功能';
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
                    console.log('权限被拒绝，使用备选方案');
                    fallbackToClickMode();
                }
            })
            .catch(error => {
                console.error('权限请求失败:', error);
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
    shakeHint.querySelector('p').textContent = '📱 摇一摇手机或点击签筒开始抽签';
    shakeHint.querySelector('.shake-animation').style.display = 'block';
}

// 回退到点击模式（保持摇一摇提示）
function fallbackToClickMode() {
    shakingArea.querySelector('p').textContent = '🙏 心诚则灵，摇一摇或点击签筒抽签';
    shakeHint.querySelector('p').textContent = '📱 摇一摇手机或点击签筒开始抽签';
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
    fallbackHint.textContent = '💡 摇一摇功能需要授权，点击签筒也可以抽签';
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
    console.log('页面加载完成，开始检测设备...');
    detectMobile();
    
    // 添加调试信息
    console.log('设备信息:', {
        userAgent: navigator.userAgent,
        isMobile: isMobile,
        isIOS: isIOS(),
        hasDeviceMotion: typeof DeviceMotionEvent !== 'undefined',
        hasPermissionAPI: typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'
    });
});

function startDrawing() {
    if (isDrawing) return;
    isDrawing = true;

    console.log('开始抽签动画...');
    
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
        const randomIndex = Math.floor(Math.random() * qiangData.length);
        const result = qiangData[randomIndex];
        
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
    document.getElementById('qiang-number').textContent = result.num;
    document.getElementById('qiang-text').textContent = result.text;
    resultModal.style.display = 'block';
}

function closeModal() {
    resultModal.style.display = 'none';
}