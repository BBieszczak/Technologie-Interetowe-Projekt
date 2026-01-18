// --- Funkcja pomocnicza do wyświetlania wyniku ---
function showResult(elementId, isCorrect, message) {
    const el = document.getElementById(elementId);
    el.className = isCorrect ? 'feedback correct' : 'feedback wrong';
    el.innerText = message;
    el.style.display = 'block';
}

// 1. Radio Buttons
function checkQ1() {
    const radios = document.getElementsByName('q1');
    let val = '';
    for (let r of radios) if (r.checked) val = r.value;

    if (val === 'b') showResult('f1', true, "Świetnie! MonoBehaviour to podstawa.");
    else showResult('f1', false, "Błąd. Prawidłowa odpowiedź to MonoBehaviour.");
}

// 2. Checkboxes (Array check)
function checkQ2() {
    const correct = ['unity', 'blender', 'csharp'];
    const checkboxes = document.querySelectorAll('input[name="q2"]:checked');
    const selected = Array.from(checkboxes).map(c => c.value);

    const isCorrect = selected.length === 3 && selected.every(val => correct.includes(val));

    if (isCorrect) showResult('f2', true, "Zgadza się! Unity, Blender i C# to trzon projektu.");
    else showResult('f2', false, "Nie do końca. Upewnij się, że zaznaczyłeś tylko te technologie, o których była mowa (Unity, Blender, C#).");
}

// 3. String Match
function checkQ3() {
    const val = document.getElementById('input-q3').value.trim().toLowerCase();
    if (val === 'fbx' || val === '.fbx') showResult('f3', true, "Brawo! FBX to uniwersalny format.");
    else showResult('f3', false, "Niestety nie. Chodzi o format FBX.");
}

// 4. Drag and Drop Sort
const list = document.getElementById('sortable-list');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    setTimeout(() => e.target.style.display = 'none', 0);
});
list.addEventListener('dragend', (e) => {
    e.target.style.display = 'block';
    draggedItem = null;
});
list.addEventListener('dragover', (e) => { e.preventDefault(); });
list.addEventListener('dragenter', (e) => {
    if (e.target.tagName === 'LI') e.target.style.borderTop = "2px solid #5b4174";
});
list.addEventListener('dragleave', (e) => {
    if (e.target.tagName === 'LI') e.target.style.borderTop = "";
});
list.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        e.target.style.borderTop = "";
        list.insertBefore(draggedItem, e.target);
    }
});

function checkQ4() {
    const items = list.querySelectorAll('li');
    const order = Array.from(items).map(i => i.getAttribute('data-index'));
    if (order[0] === '1' && order[1] === '2' && order[2] === '3') {
        showResult('f4', true, "Doskonale! Kolejność jest poprawna.");
    } else {
        showResult('f4', false, "Kolejność jest niewłaściwa. Najpierw zaznaczamy, potem wybieramy export.");
    }
}

// 5. Drag Match
const draggables = document.querySelectorAll('#q5 .draggable-item');
const dropZones = document.querySelectorAll('#q5 .drop-zone');
const sourceContainer = document.getElementById('source-q5');

// Dodajemy event listenery
draggables.forEach(d => {
    d.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

dropZones.forEach(z => {
    z.addEventListener('dragover', e => e.preventDefault());
    z.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        if (z.hasChildNodes()) return; // Zablokuj jeśli już coś tam jest
        z.appendChild(draggableElement);
    });
});

// Funkcja sprawdzająca
function checkQ5() {
    let correctCount = 0;
    dropZones.forEach(z => {
        if (z.firstChild && z.firstChild.id === z.getAttribute('data-correct')) correctCount++;
    });
    if (correctCount === 3) showResult('f5', true, "Wszystkie pary dopasowane!");
    else showResult('f5', false, "Coś nie pasuje. Upewnij się, że Unity to silnik, Blender to modele, a kod C# to logika.");
}

// Funkcja Resetująca (Reset)
function resetQ5() {
    // Pobierz wszystkie przeciągalne elementy w zadaniu 5
    const allDraggables = document.querySelectorAll('#q5 .draggable-item');

    // Przenieś każdy z nich z powrotem do kontenera źródłowego
    allDraggables.forEach(item => {
        sourceContainer.appendChild(item);
    });

    // Ukryj/Wyczyść feedback
    const feedback = document.getElementById('f5');
    feedback.style.display = 'none';
    feedback.innerText = '';
}

// 6. Range Slider
function checkQ6() {
    const val = document.getElementById('slider-q6').value;
    if (val == 5) showResult('f6', true, "Zgadza się! W kodzie było public float predkosc = 5.0f;");
    else showResult('f6', false, "Niepoprawna wartość. Spójrz na zmienną 'predkosc' w sekcji kodu.");
}

// 7. Select Code
function checkQ7() {
    const val = document.getElementById('select-q7').value;
    if (val === 'correct') showResult('f7', true, "Tak jest! Time.deltaTime zapewnia płynność niezależną od FPS.");
    else showResult('f7', false, "Błąd. Potrzebujemy czegoś, co normalizuje czas klatki.");
}

// 8. Toggle
function checkQ8() {
    const isChecked = document.getElementById('toggle-q8').checked;
    if (!isChecked) showResult('f8', true, "Poprawnie! Start() wykonuje się tylko RAZ.");
    else showResult('f8', false, "Błąd. Start() uruchamia się raz. Update() działa co klatkę.");
}

// 9. Image Select + MODAL
function selectImg(el, val) {
    document.querySelectorAll('.img-option').forEach(img => img.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('q9-val').value = val;
}

function checkQ9() {
    const val = document.getElementById('q9-val').value;
    if (val === 'correct') showResult('f9', true, "Brawo! To jest panel Inspektora ze światłem.");
    else if (val === '') showResult('f9', false, "Wybierz obrazek przed sprawdzeniem.");
    else showResult('f9', false, "Nie. Poszukaj obrazka z panelem po prawej stronie (Inspector).");
}

// Logika Modala 
function openModal(src) {
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('img-modal');
    modal.style.display = "none";
}

// Zamknij modal klikając poza obrazek
window.onclick = function (event) {
    const modal = document.getElementById('img-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 10. Sequence Clicker
let currentStep = 1;
let userSequence = [];

function seqClick(btn, stepVal) {
    if (!btn.classList.contains('active')) {
        btn.classList.add('active');
        userSequence.push(stepVal);
    }
}

function checkQ10() {
    if (userSequence.length !== 3) {
        showResult('f10', false, "Kliknij wszystkie 3 przyciski w dobrej kolejności.");
        return;
    }
    if (userSequence[0] === 1 && userSequence[1] === 2 && userSequence[2] === 3) {
        showResult('f10', true, "Gratulacje! Dobra organizacja pracy to podstawa.");
    } else {
        userSequence = [];
        document.querySelectorAll('.seq-btn').forEach(b => b.classList.remove('active'));
        showResult('f10', false, "Zła kolejność. ");
    }
}