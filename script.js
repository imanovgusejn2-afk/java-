// ==========================================
// ЧАСТЬ 1: Код из твоей Практической №2
// ==========================================
function Page_Initialize() {
    document.form1.hitext.value = "Привет от JavaScript!";
}

function ShowMessage(form1) {
    form1.Textbox.value = "Привет! Кнопка нажата.";
}

function Check1Clicked() { document.getElementById("TextBox").value = "Выбран флажок 1!"; }
function Check2Clicked() { document.getElementById("TextBox").value = "Выбран флажок 2!"; }
function Check3Clicked() { document.getElementById("TextBox").value = "Выбран флажок 3!"; }

function Radio1Clicked() { document.getElementById("RadioBox").value = "Выбран переключатель 1"; }
function Radio2Clicked() { document.getElementById("RadioBox").value = "Выбран переключатель 2"; }
function Radio3Clicked() { document.getElementById("RadioBox").value = "Выбран переключатель 3"; }


// ==========================================
// ЧАСТЬ 2: Задание 2 (Кнопка с console.log)
// ==========================================
const task2Btn = document.getElementById('task2-btn');
const task2Text = document.getElementById('task2-text');

task2Btn.addEventListener('click', function() {
    console.log("Кнопка нажата");
    task2Text.textContent = "Ура! Текст успешно изменен с помощью внешнего JavaScript!";
});


// ==========================================
// ЧАСТЬ 3: Задание 3 (Google Sheets + fetch)
// ==========================================
// ВСТАВЬ СЮДА ССЫЛКУ ИЗ СВОЕЙ GOOGLE ТАБЛИЦЫ (формат CSV)
const GOOGLE_SHEET_CSV_URL = "ТВОЯ_ССЫЛКА_СЮДА"; 

async function loadTableData() {
    const loadingDiv = document.getElementById('loading');
    const table = document.getElementById('data-table');
    const errorDiv = document.getElementById('error-message');
    const tbody = document.getElementById('table-body');

    // Если ссылка не вставлена, покажем заглушку
    if (GOOGLE_SHEET_CSV_URL === "ТВОЯ_ССЫЛКА_СЮДА") {
        loadingDiv.textContent = "Вставь ссылку на Google Таблицу в файл script.js";
        return;
    }

    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvData = await response.text();
        
        // исправлено: ИИ предлагал сложную библиотеку, но для CSV хватит split
        // исправлено: Добавлена фильтрация пустых строк
        const rows = csvData.split('\n').filter(row => row.trim() !== '');

        tbody.innerHTML = ''; 

        // Пропускаем заголовки (начинаем с 1)
        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            
            const tr = document.createElement('tr');
            // исправлено: Добавлен trim() для удаления лишних пробелов и \r
            tr.innerHTML = `
                <td>${columns[0] ? columns[0].trim() : ''}</td>
                <td>${columns[1] ? columns[1].trim() : ''}</td>
                <td>${columns[2] ? columns[2].trim() : ''}</td>
            `;
            tbody.appendChild(tr);
        }

        loadingDiv.style.display = 'none';
        table.style.display = 'table';

    } catch (error) {
        console.error("Ошибка загрузки:", error);
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = "Ошибка! Проверьте ссылку на таблицу или интернет.";
    }
}

// Запускаем загрузку
loadTableData();