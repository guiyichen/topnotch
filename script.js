// 观音灵签签文数据 - 100条上上签
const qiangData = [
    { num: "你要爱是兴怡", text: "上上签：天开地辟结良缘，日吉时良万事全。若得此签非小可，人行中正帝王宣。" },
    { num: "你要爱是Siu boss", text: "上上签：春风得意马蹄疾，一日看尽长安花。功名富贵皆如愿，前程似锦乐无涯。" },
    { num: "你要爱是钱德勒", text: "上上签：金榜题名时已到，青云直上步云霄。贵人相助前程好，福禄双全在今朝。" },
    { num: "你要爱是静静", text: "上上签：一锄掘地要求泉，努力求之得最先。无意俄然遇知己，相逢携手上青天。" },
    { num: "你要爱是梦媛", text: "上上签：奔波阻隔重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。" },
    { num: "你要爱是亮总", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。" },
    { num: "你要爱是燕子", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。" },
    { num: "你要爱是小燕子", text: "上上签：花开富贵满园春，月圆人圆事事成。家宅平安多吉庆，财源广进福满门。" },
    { num: "你要爱是啊蹚", text: "上上签：龙腾虎跃展宏图，事业蒸蒸日上时。贵人相助添助力，前程似锦乐无涯。" },
    { num: "你要爱是永杨哥", text: "上上签：凤凰于飞在岐山，鸣声嘹亮动九天。夫妻和睦家兴旺，子孙满堂福绵绵。" },
    { num: "你要爱是波哥", text: "上上签：桃李满天下，春风得意时。功名成就非难事，富贵荣华在眼前。" },
    { num: "你要爱是Penny", text: "上上签：今日桃花运，宜约会，不宜动怒。" },
    { num: "你要爱是Carry", text: "上上签：今日福禄双至，宜出行，不宜久坐。" },
    { num: "你要爱是慧仪", text: "上上签：今日犯桃花，宜吃喝玩乐，不宜工作。" },
    { num: "你要爱是波哥", text: "上上签：福泽绵长，宜行善积德，不宜闷闷不乐。" },
    { num: "你要爱是梦媛", text: "上上签：桂花飘香满人间，金秋时节正当时。家宅兴旺多吉庆，财源滚滚福无边。" },
    { num: "你要爱是梦媛", text: "上上签：宜开业大吉，生意兴隆，财源广进，万事如意。" },
    { num: "你要爱是小燕子", text: "上上签：事业兴旺如日中，欢乐无穷，不宜操心劳碌。" },
    { num: "你要爱是兴怡", text: "上上签：宜开心恋爱，不宜烦恼。" },
    { num: "你要爱是钱德勒", text: "上上签：宜心胸豁达，不宜钻牛角尖；花开堪折直须折，莫待无花空折枝。" },
    { num: "你要爱是小莫", text: "上上签：青春正年少，心想事成乐无涯，前程似锦不可量。记得多沟通交流" },
    { num: "你要爱是啊蹚", text: "上上签：新婚快乐，早生贵子，幸福美满。" },
    { num: "你要爱是燕子", text: "上上签：美貌如花，宜出门逛街，不宜宅在家。" },
    { num: "你要爱是静静", text: "上上签：累了多休息，好好放松自己，多爱自己，你是最棒的。" },
    { num: "你要爱是Alin", text: "上上签：爱情运旺，宜约会，不宜宅在家，你值得拥有最好的。" },
    { num: "你要爱是平姐", text: "上上签：家庭事业辛苦，记得多休息，多爱自己，你是难以逾越的高山。" },
    { num: "你要爱是Siu boss", text: "上上签：无私无畏，默默付出，多爱惜自己，少熬夜。" },
    { num: "你要爱是敏君", text: "上上签：大雨过后见彩虹，好事多磨终有成，富贵荣华在眼前。" },
    { num: "你要爱是勇林", text: "上上签：积极向上，事业兴旺如日中，前程似锦乐无涯。" },
    { num: "你要爱是德丰", text: "上上签：春风得意马嘀驰，化作神龙上九天，最爱秦始皇" },
    { num: "你要爱是青姐", text: "上上签：温柔善良，宜多笑，练瑜伽。" },
    { num: "你要爱是亮总", text: "上上签：单币A8，迟早财富自由，无私奉献，无所畏惧。" },
    { num: "你要爱是青姐", text: "上上签：天降祥瑞满人间，福星高照保平安。家宅兴旺多吉庆，财源滚滚福无边。" },
    { num: "你要爱是海洋", text: "上上签：日出东方红似火，朝霞满天照前程。事业兴旺如日中，功名成就乐无穷。" },
    { num: "你要爱是燕子", text: "上上签：月圆花好正当时，良辰美景不可失。姻缘美满家和谐，夫妻恩爱到白头。" },
    { num: "你要爱是永杨", text: "上上签：低调务实，脚踏实地，前途光明，楷模中的楷模。" }
];

const qiangTong = document.getElementById('qiang-tong');
const resultModal = document.getElementById('result-modal');
const drawnQiang = document.getElementById('drawn-qiang');
let isDrawing = false; // 防止重复点击

qiangTong.addEventListener('click', startDrawing);

function startDrawing() {
    if (isDrawing) return;
    isDrawing = true;

    // 1. 开始摇晃动画
    qiangTong.classList.add('shaking');
    
    // 2. 模拟摇晃一段时间后停止
    setTimeout(() => {
        qiangTong.classList.remove('shaking');
        
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