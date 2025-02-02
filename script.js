// JavaScript for tab switching and quiz logic

// Tab switching functionality
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = tab.id === tabId + '-tab' ? 'block' : 'none';
    });
}

// Initialize the page with the quiz tab visible
document.addEventListener('DOMContentLoaded', () => {
    showTab('quiz');
});

const questions = [
    { question: "What is the primary purpose of a stock?", options: ["Ownership in a company", "A form of debt", "A type of insurance", "A savings account"], answer: "Ownership in a company" },
    { question: "What does ETF stand for?", options: ["Exchange Traded Fund", "Exchange Traded Finance", "Equity Transfer Fund", "Equity Transfer Finance"], answer: "Exchange Traded Fund" },
    { question: "What is a dividend?", options: ["A payment made to shareholders", "A type of loan", "A stock purchase", "An investment strategy"], answer: "A payment made to shareholders" },
    { question: "What is the difference between a stock and a bond?", options: ["Stocks represent ownership, bonds represent debt", "Stocks are risk-free, bonds are risky", "Stocks pay interest, bonds pay dividends", "There is no difference"], answer: "Stocks represent ownership, bonds represent debt" },
    { question: "What is a mutual fund?", options: ["A pool of funds from multiple investors to buy securities", "A type of stock", "A short-term investment", "A loan issued by a bank"], answer: "A pool of funds from multiple investors to buy securities" },
    { question: "What is an index fund?", options: ["A mutual fund that tracks a market index", "A fund that only invests in bonds", "A type of savings account", "A loan issued by a company"], answer: "A mutual fund that tracks a market index" },
    { question: "What does 'liquidity' refer to in finance?", options: ["The ease of converting an asset into cash", "The level of risk associated with an investment", "The profitability of a company", "The amount of debt a company has"], answer: "The ease of converting an asset into cash" },
    { question: "What is diversification in investing?", options: ["Spreading investments across various assets to reduce risk", "Investing in a single asset for higher returns", "The process of buying and selling assets frequently", "Investing only in international markets"], answer: "Spreading investments across various assets to reduce risk" },
    { question: "What is a credit score?", options: ["A measure of creditworthiness based on past borrowing behavior", "A score given to stocks based on their performance", "The interest rate on a loan", "A measure of a company's profitability"], answer: "A measure of creditworthiness based on past borrowing behavior" },
    { question: "What is inflation?", options: ["The rate at which the general level of prices for goods and services rises", "A measure of company profits", "The amount of money a company owes", "The process of selling assets"], answer: "The rate at which the general level of prices for goods and services rises" },
    { question: "What is the difference between gross and net income?", options: ["Gross income is before taxes, net income is after taxes", "Net income is before taxes, gross income is after taxes", "Gross income is the total revenue, net income is the total profit", "There is no difference"], answer: "Gross income is before taxes, net income is after taxes" },
    { question: "What is a 401(k) plan?", options: ["A retirement savings plan offered by employers", "A type of mutual fund", "A short-term investment account", "A form of insurance"], answer: "A retirement savings plan offered by employers" },
    { question: "What is a bond?", options: ["A loan issued by a company or government", "A type of stock", "A form of insurance", "A savings account"], answer: "A loan issued by a company or government" },
    { question: "What does 'market capitalization' mean?", options: ["The total value of a company's outstanding shares of stock", "The amount of cash a company has", "The total debt of a company", "The revenue generated by a company"], answer: "The total value of a company's outstanding shares of stock" },
    { question: "What is a bull market?", options: ["A market where prices are rising or expected to rise", "A market where prices are falling", "A market with no significant change in prices", "A market with high volatility"], answer: "A market where prices are rising or expected to rise" }
];


let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let level = 1;
let badges = [];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const progressBar = document.getElementById('progress-bar');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');
const xpBox = document.getElementById('xp-box');
const levelElement = document.getElementById('level');
const badgesElement = document.getElementById('badges');

const XP_PER_QUESTION = 10; // XP earned per correct answer

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => {
            selectedAnswer = option;
            document.querySelectorAll('#answers button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            nextButton.disabled = false;
        };
        answersElement.appendChild(button);
    });

    nextButton.disabled = true;
    updateProgressBar();
    updateStats();
}

function checkAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        updateXPBox();
        levelUp();
    }

    currentQuestionIndex++;
    selectedAnswer = null;
    loadQuestion();
}

function updateProgressBar() {
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function updateStats() {
    scoreElement.textContent = `Score: ${score}`;
    questionNumberElement.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
}

function updateXPBox() {
    // Calculate XP percentage based on score
    const xpTotal = score * XP_PER_QUESTION;
    const xpMax = questions.length * XP_PER_QUESTION;
    xpBox.textContent = `XP: ${xpTotal} / ${xpMax}`;
}

function levelUp() {
    if (score % 5 === 0) { // Example level-up condition
        level++;
        levelElement.textContent = `Level: ${level}`;
        badges.push(`Level ${level} Badge`);
        updateBadges();
    }
}

function updateBadges() {
    badgesElement.innerHTML = '';
    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge';
        badgeElement.textContent = badge;
        badgesElement.appendChild(badgeElement);
    });
}

function showFinalScore() {
    questionElement.textContent = 'Quiz Complete!';
    answersElement.innerHTML = '';
    nextButton.style.display = 'none';
    progressBar.style.width = '100%';
}

// Event listener for the 'Next' button
nextButton.onclick = () => {
    if (selectedAnswer) {
        checkAnswer();
    }
};

// JavaScript for Tab Navigation
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // Remove active class from all tab content and buttons
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Show the selected tab content and add active class to button
        document.getElementById(`${tabId}-container`).classList.add('active');
        button.classList.add('active');
    });
});

// Script to handle tab switching
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = tab.id === tabId + '-tab' ? 'block' : 'none';
    });
}

// Initialize the page with the first tab visible (Modules tab in this case)
document.addEventListener('DOMContentLoaded', () => {
    showTab('modules');
});


// Initial Load of Quiz
loadQuestion();
