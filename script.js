document.addEventListener('DOMContentLoaded', function() {
    // 处理导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'white';
        }
    });

    // 星座选择功能
    document.querySelectorAll('.zodiac-item').forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他选中状态
            document.querySelectorAll('.zodiac-item').forEach(i => i.classList.remove('selected'));
            // 添加选中状态
            this.classList.add('selected');
            // 保存选择的星座
            const zodiac = this.dataset.zodiac;
            localStorage.setItem('selectedZodiac', zodiac);
        });
    });

    // 支付按钮点击处理
    const payButtons = document.querySelectorAll('.pay-button');
    payButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.dataset.plan;
            handlePayment(plan);
        });
    });

    // 登录/注册模态框功能
    const modal = document.getElementById('authModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const closeBtn = document.querySelector('.close');

    // 关闭模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 切换登录/注册表单
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.tab === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });

    // 发送验证码功能
    document.querySelector('.send-code').addEventListener('click', function() {
        this.disabled = true;
        let countdown = 60;
        this.textContent = `${countdown}秒后重试`;
        
        const timer = setInterval(() => {
            countdown--;
            this.textContent = `${countdown}秒后重试`;
            if (countdown === 0) {
                clearInterval(timer);
                this.disabled = false;
                this.textContent = '发送验证码';
            }
        }, 1000);
    });

    // FAQ 展开/收起功能
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggleIcon = this.querySelector('.toggle-icon');
            
            // 关闭其他所有问题
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0px';
                    item.querySelector('.toggle-icon').style.transform = 'rotate(0deg)';
                }
            });
            
            // 切换当前问题的状态
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = '0px';
                toggleIcon.style.transform = 'rotate(0deg)';
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggleIcon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // 处理开始占卜按钮点击
    document.querySelector('.start-btn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.querySelector('.fortune-form input[type="text"]').value;
        const birthTime = document.querySelector('.fortune-form input[type="date"]').value;
        const zodiac = document.querySelector('.fortune-form select').value;
        
        // 验证表单
        if (!name || !birthTime || !zodiac) {
            alert('请填写完整的信息！');
            return;
        }
        
        // 显示加载提示
        alert('正在为您生成占卜结果，请稍候...');
        
        // 模拟加载过程
        setTimeout(() => {
            const resultDetails = generateFortune(zodiac);
            
            // 更新结果模态框内容
            document.querySelector('.luck-score .stars').textContent = resultDetails.stars;
            document.querySelector('.luck-score .summary').textContent = resultDetails.summary;
            document.querySelector('.result-detail').textContent = resultDetails.detail;
            document.querySelector('.result-tips').textContent = resultDetails.tips;
            document.querySelector('.vip-content').textContent = resultDetails.vipContent;
            
            // 显示结果模态框
            document.getElementById('resultModal').style.display = 'block';
        }, 1500);
    });

    // 生成运势内容
    function generateFortune(zodiac) {
        const fortunes = {
            stars: ['⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
            summaries: ['运势欠佳', '运势平稳', '运势不错', '运势极佳'],
            details: [
                '今日运势偏弱，可能会遇到一些小困扰。事业上需谨慎行事，容易出现判断失误；感情方面可能会有一些误会，沟通时需要更加耐心；财运方面不宜大额支出或投资。',
                '今日运势平稳，适合处理日常事务。工作中会遇到一些小挑战，但都在可控范围内；感情生活中有一些小惊喜，适合与伴侣共度温馨时光；财运一般，适合理财规划。',
                '今日运势向好，是适合主动出击的日子。工作上会遇到不错的机会，适合展示才能；桃花运不错，单身的朋友可能会遇到心动的对象；财运走强，可能有意外收获。',
                '今日运势极佳，是实现目标的黄金时期。事业发展势头强劲，重要决策都能获得支持；感情方面有重大突破，易收获真挚情感；财运亨通，适合把握投资机会。'
            ],
            tips: [
                '建议：\n1. 工作方面保持低调，避免冲突\n2. 感情上需要多一些包容\n3. 财务方面要谨慎控制支出',
                '建议：\n1. 工作中保持稳扎稳打的态度\n2. 感情上可以制造一些小惊喜\n3. 适合制定长期理财计划',
                '建议：\n1. 工作上主动争取机会\n2. 多参加社交活动扩展人脉\n3. 可以考虑稳健的投资',
                '建议：\n1. 大胆推进重要计划\n2. 表达真实情感\n3. 把握投资良机'
            ],
            vipContent: [
                '开通会员解锁以下内容：\n- 具体易出现问题的时间段\n- 细节风险提醒\n- 个性化改运方案\n- 专业占星师建议',
                '开通会员解锁以下内容：\n- 重点发展机会分析\n- 潜在问题预警\n- 运势提升方案\n- 专业占星师指导',
                '开通会员解锁以下内容：\n- 黄金机遇时间点\n- 贵人相助提醒\n- 机遇把握建议\n- 专业占星师指点',
                '开通会员解锁以下内容：\n- 关键机遇精准分析\n- 事业突破方向指引\n- 财运高峰预测\n- 专业占星师一对一咨询'
            ]
        };
        
        // 随机选择运势等级（0-3）
        const level = Math.floor(Math.random() * 4);
        
        return {
            stars: fortunes.stars[level],
            summary: fortunes.summaries[level],
            detail: fortunes.details[level],
            tips: fortunes.tips[level],
            vipContent: fortunes.vipContent[level]
        };
    }

    // 为结果模态框的关闭按钮添加事件
    document.querySelectorAll('#resultModal .close').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('resultModal').style.display = 'none';
        });
    });

    // 升级按钮点击事件
    document.querySelector('.upgrade-btn').addEventListener('click', function() {
        const plan = this.dataset.plan;
        document.getElementById('resultModal').style.display = 'none';
        handlePayment(plan);
    });

    // 添加登录按钮点击事件
    document.querySelector('.login-btn').addEventListener('click', function() {
        document.getElementById('authModal').style.display = 'block';
    });

    // 添加关闭按钮点击事件
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('authModal').style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('authModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // 切换登录/注册表单
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            document.querySelectorAll('.auth-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // 添加当前标签的active类
            this.classList.add('active');
            
            // 切换表单显示
            if (this.dataset.tab === 'login') {
                document.querySelector('.login-form').style.display = 'flex';
                document.querySelector('.register-form').style.display = 'none';
            } else {
                document.querySelector('.login-form').style.display = 'none';
                document.querySelector('.register-form').style.display = 'flex';
            }
        });
    });
});

// 处理支付功能
function handlePayment(plan) {
    const prices = {
        'basic': 19.9,
        'pro': 39.9,
        'vip': 99.9
    };
    
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        showAuthModal();
        return;
    }
    
    // 这里可以集成实际的支付API
    initPayment({
        amount: prices[plan],
        planType: plan,
        success: () => {
            alert('支付成功！');
            updateUserMembership(plan);
        },
        fail: (error) => {
            alert('支付失败：' + error);
        }
    });
}

// 模支付API集成
function initPayment(options) {
    // 这里应该集成实际的支付API（如支付宝或微信支付）
    const confirmPay = confirm(`确认支付 ¥${options.amount}？`);
    if (confirmPay) {
        // 模拟支付过程
        setTimeout(() => {
            options.success();
        }, 1000);
    }
}

// 更新用户会员状态
function updateUserMembership(plan) {
    // 这里应该调用后端API更新用户会员状态
    localStorage.setItem('membershipPlan', plan);
}

// 显示登录模态框
function showAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
}

// 处理登录表单提交
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // 这里应该调用实际的登录API
    if (email && password) {
        // 模拟登录成功
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('authModal').style.display = 'none';
        alert('登录成功！');
    }
});

// 处理注册表单提交
document.querySelector('.register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = this.querySelector('input[type="text"]').value;
    const code = this.querySelector('input[placeholder="验证码"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // 这里应该调用实际的注册API
    if (phone && code && password) {
        // 模拟注册成功
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('authModal').style.display = 'none';
        alert('注册成功！');
    }
});

// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});