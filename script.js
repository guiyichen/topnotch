// 观音灵签签文数据 - 100条上上签
const qiangData = [
    { num: "怡宝签", text: "上上签：天开地辟结良缘，日吉时良万事全。若得此签非小可，人行中正帝王宣。" },
    { num: "Siu boss签", text: "上上签：春风得意马蹄疾，一日看尽长安花。功名富贵皆如愿，前程似锦乐无涯。" },
    { num: "钱宝贝签", text: "上上签：金榜题名时已到，青云直上步云霄。贵人相助前程好，福禄双全在今朝。" },
    { num: "静姐签", text: "上上签：一锄掘地要求泉，努力求之得最先。无意俄然遇知己，相逢携手上青天。" },
    { num: "梦媛签", text: "上上签：奔波阻隔重重险，带水拖泥去度山。更望他乡求用事，千山万水复回还。" },
    { num: "亮总签", text: "上上签：茂林松柏正兴旺，雨雪风霜总莫为。异日忽然鸿鹄飞，功名成就栋梁材。" },
    { num: "燕子公主签", text: "上上签：欲求胜事可非常，争奈亲姻日暂忙。到头竟必成中箭，贵人指引贵人乡。" },
    { num: "燕姐签", text: "上上签：花开富贵满园春，月圆人圆事事成。家宅平安多吉庆，财源广进福满门。" },
    { num: "镗弟签", text: "上上签：龙腾虎跃展宏图，事业蒸蒸日上时。贵人相助添助力，前程似锦乐无涯。" },
    { num: "波哥签", text: "上上签：桃李满天下，春风得意时。细致入微，不遗余力。" },
    { num: "Penny签", text: "上上签：人鱼马甲线，今日桃花运，宜约会。" },
    { num: "Carry签", text: "上上签：今日福禄双至，宜出行，不宜久坐。" },
    { num: "惠仪签", text: "上上签：今日犯桃花，宜吃喝玩乐，不宜工作。" },
    { num: "波哥签", text: "上上签：福泽绵长，宜行善积德，不宜闷闷不乐。" },
    { num: "梦媛签", text: "上上签：宜开业大吉，生意兴隆，财源广进，万事如意。" },
    { num: "燕姐签", text: "上上签：事业兴旺如日中，欢乐无穷，不宜操心劳碌。" },
    { num: "怡宝签", text: "上上签：宜开心恋爱，不宜烦恼。" },
    { num: "钱宝贝签", text: "上上签：宜心胸豁达，不宜钻牛角尖；花开堪折直须折，莫待无花空折枝。" },
    { num: "小莫签", text: "上上签：青春正年少，心想事成乐无涯，前程似锦不可量。记得多沟通交流" },
    { num: "镗弟签", text: "上上签：新婚快乐，早生贵子，幸福美满。" },
    { num: "燕子公主签", text: "上上签：美貌如花，宜出门逛街，不宜宅在家。" },
    { num: "静姐签", text: "上上签：累了多休息，好好放松自己，多爱自己，你是最棒的。" },
    { num: "Alin姐签", text: "上上签：爱情运旺，宜约会，不宜宅在家，你值得拥有最好的。" },
    { num: "平姐签", text: "上上签：家庭事业辛苦，记得多休息，多爱自己，你是难以逾越的高山。" },
    { num: "Siu boss签", text: "上上签：无私无畏，默默付出，多爱惜自己，少熬夜。" },
    { num: "敏君签", text: "上上签：大雨过后见彩虹，好事多磨终有成，富贵荣华在眼前。" },
    { num: "勇哥签", text: "上上签：积极向上，事业兴旺如日中，前程似锦乐无涯。" },
    { num: "德丰哥哥签", text: "上上签：春风得意马嘀驰，化作神龙上九天，最爱秦始皇" },
    { num: "青姐签", text: "上上签：温柔善良，宜多笑，练瑜伽。" },
    { num: "亮总签", text: "上上签：单币A8，迟早财富自由，无私奉献，无所畏惧。" },
    { num: "青姐签", text: "上上签：天降祥瑞满人间，福星高照保平安。家宅兴旺多吉庆，财源滚滚福无边。" },
    { num: "海洋哥签", text: "上上签：日出东方红似火，朝霞满天照前程。事业兴旺如日中，功名成就乐无穷。" },
    { num: "燕子公主签", text: "上上签：月圆花好正当时，良辰美景不可失。姻缘美满家和谐，夫妻恩爱到白头。" },
    { num: "永杨哥签", text: "上上签：低调务实，脚踏实地，前途光明，楷模中的楷模。" }
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
        // 手机端显示摇一摇提示
        shakingArea.querySelector('p').textContent = '🙏 心诚则灵，点击下方按钮启用摇一摇';
        shakeHint.style.display = 'block';
        
        // iOS需要用户交互后才能请求权限
        if (isIOS()) {
            showIOSPermissionButton();
        } else {
            // Android等设备直接请求权限
            requestMotionPermission();
        }
    } else {
        // 桌面端显示点击提示
        shakingArea.querySelector('p').textContent = '🙏 心诚则灵，点击签筒抽签';
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
                    // 权限被拒绝，回退到点击模式
                    fallbackToClickMode();
                }
            })
            .catch(error => {
                console.error('权限请求失败:', error);
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
    shakingArea.querySelector('p').textContent = '🙏 心诚则灵，摇一摇手机抽签';
    shakeHint.querySelector('p').textContent = '📱 现在可以摇动手机抽签了';
    shakeHint.querySelector('.shake-animation').style.display = 'block';
}

// 回退到点击模式
function fallbackToClickMode() {
    shakingArea.querySelector('p').textContent = '🙏 心诚则灵，点击签筒抽签';
    shakeHint.style.display = 'none';
    qiangTong.addEventListener('click', startDrawing);
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