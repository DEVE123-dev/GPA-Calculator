/* ===== GPA CALCULATOR — script.js ===== */

const GRADE_MAP = {
  '':   null,
  'HD': 5,
  'D':  4,
  'C':  3,
  'P':  2,
  'CP': 1,
  'F':  0,
};

const GRADE_OPTIONS = ['', 'HD', 'D', 'C', 'P', 'CP', 'F'];

const GRADE_LABELS = {
  'HD': 'High Distinction',
  'D':  'Distinction',
  'C':  'Credit',
  'P':  'Pass',
  'CP': 'Conditional Pass',
  'F':  'Fail',
};

const STORAGE_KEY = 'gpa_calculator_data';
let rowCounter = 0;
let autoSaveTimeout = null;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const tbody       = document.getElementById('subjectBody');
const gpaDisplay  = document.getElementById('gpaDisplay');
const gpaBand     = document.getElementById('gpaBand');
const totalCreds  = document.getElementById('totalCredits');
const totalPts    = document.getElementById('totalPoints');
const addBtn      = document.getElementById('addBtn');
const resetBtn    = document.getElementById('resetBtn');
const exportBtn   = document.getElementById('exportBtn');
const saveBtn     = document.getElementById('saveBtn');
const loadBtn     = document.getElementById('loadBtn');
const fileInput   = document.getElementById('fileInput');
const helperText  = document.getElementById('helperText');
const autoSaveStatus = document.getElementById('autoSaveStatus');

// ── Row creation ──────────────────────────────────────────────────────────────
function createRow() {
  rowCounter++;
  const id  = rowCounter;
  const tr  = document.createElement('tr');
  tr.dataset.rowId = id;

  tr.innerHTML = `
    <td><span class="row-num" id="num-${id}"></span></td>

    <td>
      <input
        type="text"
        class="subject-name"
        placeholder="e.g. Mathematics"
        maxlength="60"
        aria-label="Subject name"
      />
    </td>

    <td>
      <div class="select-wrap">
        <select class="grade-select" aria-label="Select grade">
          ${GRADE_OPTIONS.map(g =>
            `<option value="${g}">${g === '' ? '— Select —' : `${g} (${GRADE_MAP[g]})`}</option>`
          ).join('')}
        </select>
      </div>
    </td>

    <td>
      <input
        type="number"
        class="credit-input"
        placeholder="1"
        min="0.5"
        max="99"
        step="0.5"
        aria-label="Credit points"
      />
    </td>

    <td>
      <span class="grade-points-cell" id="pts-${id}">—</span>
    </td>

    <td>
      <button class="btn-remove" title="Remove row" aria-label="Remove subject">✕</button>
    </td>
  `;

  // Events
  tr.querySelector('.grade-select').addEventListener('change', () => {
    updateRowPoints(tr);
    recalculate();
    scheduleAutoSave();
  });

  tr.querySelector('.credit-input').addEventListener('input', () => {
    validateCredits(tr);
    updateRowPoints(tr);
    recalculate();
    scheduleAutoSave();
  });

  tr.querySelector('.subject-name').addEventListener('input', () => {
    scheduleAutoSave();
  });

  tr.querySelector('.btn-remove').addEventListener('click', () => {
    removeRow(tr);
  });

  return tr;
}

function addRow() {
  const tr = createRow();
  tbody.appendChild(tr);
  refreshRowNumbers();
  updateRemoveButtons();
  recalculate();
  // Focus the name field of the new row
  tr.querySelector('.subject-name').focus();
}

function removeRow(tr) {
  const rows = tbody.querySelectorAll('tr');
  if (rows.length <= 1) return; // guard
  tr.style.animation = 'none';
  tr.style.opacity = '0';
  tr.style.transform = 'translateX(10px)';
  tr.style.transition = 'opacity 0.2s, transform 0.2s';
  setTimeout(() => {
    tr.remove();
    refreshRowNumbers();
    updateRemoveButtons();
    recalculate();
  }, 200);
}

function refreshRowNumbers() {
  tbody.querySelectorAll('tr').forEach((tr, i) => {
    const numEl = tr.querySelector('.row-num');
    if (numEl) numEl.textContent = i + 1;
  });
}

function updateRemoveButtons() {
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(tr => {
    const btn = tr.querySelector('.btn-remove');
    if (btn) btn.disabled = rows.length === 1;
  });
}

// ── Validation ────────────────────────────────────────────────────────────────
function validateCredits(tr) {
  const input = tr.querySelector('.credit-input');
  const val   = parseFloat(input.value);
  if (input.value !== '' && (isNaN(val) || val <= 0)) {
    input.classList.add('error');
    return false;
  }
  input.classList.remove('error');
  return true;
}

// ── Per-row grade points display ──────────────────────────────────────────────
function updateRowPoints(tr) {
  const id       = tr.dataset.rowId;
  const ptsEl    = document.getElementById(`pts-${id}`);
  const grade    = tr.querySelector('.grade-select').value;
  const creditRaw = tr.querySelector('.credit-input').value;
  const credit   = creditRaw === '' ? 1 : parseFloat(creditRaw);
  const gradeVal = GRADE_MAP[grade];

  if (gradeVal === null || isNaN(credit) || credit <= 0) {
    ptsEl.textContent = '—';
    ptsEl.className   = 'grade-points-cell';
  } else {
    const pts = gradeVal * credit;
    ptsEl.textContent = pts % 1 === 0 ? pts : pts.toFixed(1);
    ptsEl.className   = 'grade-points-cell has-value';
  }
}

// ── GPA calculation ───────────────────────────────────────────────────────────
function recalculate() {
  let sumPoints  = 0;
  let sumCredits = 0;
  let hasError   = false;
  let validRows  = 0;

  tbody.querySelectorAll('tr').forEach(tr => {
    const grade     = tr.querySelector('.grade-select').value;
    const creditRaw = tr.querySelector('.credit-input').value;
    const credit    = creditRaw === '' ? 1 : parseFloat(creditRaw);
    const gradeVal  = GRADE_MAP[grade];

    if (!validateCredits(tr)) { hasError = true; return; }
    if (gradeVal === null) return; // no grade selected → skip

    if (isNaN(credit) || credit <= 0) { hasError = true; return; }

    sumPoints  += gradeVal * credit;
    sumCredits += credit;
    validRows++;
  });

  helperText.textContent = hasError ? 'Fix invalid credit points (must be > 0).' : '';

  // Update totals
  totalCreds.textContent = sumCredits % 1 === 0 ? sumCredits : sumCredits.toFixed(1);
  totalPts.textContent   = sumPoints  % 1 === 0 ? sumPoints  : sumPoints.toFixed(2);

  // Update GPA
  if (validRows === 0 || sumCredits === 0) {
    gpaDisplay.textContent = '—';
    gpaDisplay.className   = 'result-value';
    gpaBand.textContent    = '';
    gpaBand.className      = 'result-sub';
    return;
  }

  const gpa = sumPoints / sumCredits;
  gpaDisplay.textContent = gpa.toFixed(2);

  // Colour + band
  let cls, band;
  if (gpa < 2) {
    cls  = 'gpa-low';
    band = 'Failing';
  } else if (gpa < 3) {
    cls  = 'gpa-mid';
    band = 'Pass';
  } else if (gpa < 4) {
    cls  = 'gpa-mid';
    band = 'Credit';
  } else if (gpa < 4.5) {
    cls  = 'gpa-high';
    band = 'Distinction';
  } else {
    cls  = 'gpa-high';
    band = 'High Distinction';
  }

  gpaDisplay.className = `result-value ${cls} gpa-updated`;
  gpaBand.textContent  = band;
  gpaBand.className    = `result-sub ${cls.replace('gpa-', '')}`;

  // Remove animation class after it plays
  gpaDisplay.addEventListener('animationend', () => {
    gpaDisplay.classList.remove('gpa-updated');
  }, { once: true });
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function resetAll() {
  if (!confirm('Are you sure you want to reset all data? This cannot be undone.')) {
    return;
  }
  
  // Fade rows out
  tbody.querySelectorAll('tr').forEach((tr, i) => {
    setTimeout(() => {
      tr.style.transition = 'opacity 0.15s';
      tr.style.opacity = '0';
    }, i * 30);
  });

  setTimeout(() => {
    tbody.innerHTML = '';
    rowCounter = 0;
    addRow();
    helperText.textContent = '';
    saveToLocalStorage();
  }, 200);
}

// ── LocalStorage ──────────────────────────────────────────────────────────────
function scheduleAutoSave() {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    saveToLocalStorage();
    showAutoSaveStatus();
  }, 500);
}

function saveToLocalStorage() {
  try {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      rows: []
    };

    tbody.querySelectorAll('tr').forEach(tr => {
      const name = tr.querySelector('.subject-name').value;
      const grade = tr.querySelector('.grade-select').value;
      const credit = tr.querySelector('.credit-input').value;
      
      data.rows.push({ name, grade, credit });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    const data = JSON.parse(saved);
    if (!data.rows || data.rows.length === 0) return false;

    // Clear existing rows
    tbody.innerHTML = '';
    rowCounter = 0;

    // Load saved rows
    data.rows.forEach(rowData => {
      const tr = createRow();
      tbody.appendChild(tr);
      
      tr.querySelector('.subject-name').value = rowData.name || '';
      tr.querySelector('.grade-select').value = rowData.grade || '';
      tr.querySelector('.credit-input').value = rowData.credit || '';
      
      updateRowPoints(tr);
    });

    refreshRowNumbers();
    updateRemoveButtons();
    recalculate();
    
    return true;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return false;
  }
}

function showAutoSaveStatus() {
  autoSaveStatus.textContent = 'Auto-saved';
  autoSaveStatus.style.opacity = '1';
  
  setTimeout(() => {
    autoSaveStatus.style.opacity = '0.5';
  }, 2000);
}

// ── Import/Export JSON ────────────────────────────────────────────────────────
function exportToJSON() {
  try {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      gpa: gpaDisplay.textContent,
      totalCredits: totalCreds.textContent,
      totalPoints: totalPts.textContent,
      rows: []
    };

    tbody.querySelectorAll('tr').forEach(tr => {
      const name = tr.querySelector('.subject-name').value;
      const grade = tr.querySelector('.grade-select').value;
      const credit = tr.querySelector('.credit-input').value;
      
      if (name || grade || credit) {
        data.rows.push({ name, grade, credit });
      }
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    const filename = `GPA_Data_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.json`;
    
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
  } catch (error) {
    console.error('Export failed:', error);
    showNotification('Export failed. Please try again.', 'error');
  }
}

function importFromJSON(file) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      if (!data.rows || !Array.isArray(data.rows)) {
        throw new Error('Invalid file format');
      }

      // Clear existing rows
      tbody.innerHTML = '';
      rowCounter = 0;

      // Load imported rows
      if (data.rows.length === 0) {
        addRow();
      } else {
        data.rows.forEach(rowData => {
          const tr = createRow();
          tbody.appendChild(tr);
          
          tr.querySelector('.subject-name').value = rowData.name || '';
          tr.querySelector('.grade-select').value = rowData.grade || '';
          tr.querySelector('.credit-input').value = rowData.credit || '';
          
          updateRowPoints(tr);
        });
      }

      refreshRowNumbers();
      updateRemoveButtons();
      recalculate();
      saveToLocalStorage();
      
      showNotification('Data imported successfully!', 'success');
    } catch (error) {
      console.error('Import failed:', error);
      showNotification('Import failed. Invalid file format.', 'error');
    }
  };
  
  reader.onerror = () => {
    showNotification('Failed to read file.', 'error');
  };
  
  reader.readAsText(file);
}

function showNotification(message, type = 'info') {
  helperText.textContent = message;
  helperText.style.color = type === 'error' ? 'var(--red)' : type === 'success' ? 'var(--green)' : 'var(--text-muted)';
  
  setTimeout(() => {
    helperText.textContent = '';
    helperText.style.color = '';
  }, 3000);
}

// ── Init ──────────────────────────────────────────────────────────────────────
addBtn.addEventListener('click', addRow);
resetBtn.addEventListener('click', resetAll);
saveBtn.addEventListener('click', exportToJSON);
loadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    importFromJSON(e.target.files[0]);
    e.target.value = ''; // Reset input
  }
});

// ── Keyboard Shortcuts ────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifier = isMac ? e.metaKey : e.ctrlKey;
  
  // Ctrl/Cmd + Enter: Add new row
  if (modifier && e.key === 'Enter') {
    e.preventDefault();
    addRow();
  }
  
  // Ctrl/Cmd + S: Save as JSON
  if (modifier && e.key === 's') {
    e.preventDefault();
    exportToJSON();
  }
  
  // Ctrl/Cmd + E: Export PDF
  if (modifier && e.key === 'e') {
    e.preventDefault();
    exportToPDF();
  }
  
  // Ctrl/Cmd + R: Reset (with confirmation)
  if (modifier && e.key === 'r') {
    e.preventDefault();
    resetAll();
  }
});

// ── Export PDF ────────────────────────────────────────────────────────────────
exportBtn.addEventListener('click', exportToPDF);

function exportToPDF() {
  try {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      showNotification('PDF library not loaded. Please refresh the page.', 'error');
      return;
    }

    // Check if there's any data to export
    const rows = tbody.querySelectorAll('tr');
    const hasData = Array.from(rows).some(tr => {
      const grade = tr.querySelector('.grade-select').value;
      return GRADE_MAP[grade] !== null;
    });

    if (!hasData) {
      showNotification('Please add at least one subject with a grade before exporting.', 'error');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get current date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Colors
    const accentColor = [200, 169, 110];
    const darkBg = [20, 23, 31];
    const textColor = [232, 234, 240];
    const mutedColor = [122, 128, 153];
    
    // Header
    doc.setFillColor(...darkBg);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFontSize(24);
    doc.setTextColor(...accentColor);
    doc.setFont('helvetica', 'bold');
    doc.text('GPA Calculator Report', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(...mutedColor);
    doc.setFont('helvetica', 'normal');
    doc.text('5-Point Academic Grading Scale', 20, 28);
    doc.text(dateStr, 20, 34);
    
    // GPA Results Box
    let yPos = 50;
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, yPos, 170, 35, 3, 3, 'S');
    
    const gpa = gpaDisplay.textContent;
    const band = gpaBand.textContent;
    const credits = totalCreds.textContent;
    const points = totalPts.textContent;
    
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Cumulative GPA:', 25, yPos + 10);
    
    doc.setFontSize(28);
    doc.setTextColor(...accentColor);
    doc.text(gpa, 25, yPos + 22);
    
    if (band) {
      doc.setFontSize(10);
      doc.setTextColor(...mutedColor);
      doc.setFont('helvetica', 'normal');
      doc.text(band, 25, yPos + 29);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Credit Points:', 110, yPos + 15);
    doc.text('Grade Points Earned:', 110, yPos + 25);
    
    doc.setFont('helvetica', 'normal');
    doc.text(credits, 165, yPos + 15);
    doc.text(points, 165, yPos + 25);
    
    // Grading Scale
    yPos += 45;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Grading Scale:', 20, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('HD = 5  |  D = 4  |  C = 3  |  P = 2  |  CP = 1  |  F = 0', 55, yPos);
    
    // Subjects Table
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Subjects / Units', 20, yPos);
    
    yPos += 5;
    
    // Table headers
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('#', 22, yPos + 5.5);
    doc.text('Subject / Unit Name', 30, yPos + 5.5);
    doc.text('Grade', 110, yPos + 5.5);
    doc.text('Credits', 135, yPos + 5.5);
    doc.text('Points', 165, yPos + 5.5);
    
    yPos += 8;
    
    // Table rows
    let rowNum = 1;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    rows.forEach((tr, index) => {
      const name = tr.querySelector('.subject-name').value || '—';
      const grade = tr.querySelector('.grade-select').value || '—';
      const creditRaw = tr.querySelector('.credit-input').value;
      const credit = creditRaw === '' ? '1' : creditRaw;
      const gradeVal = GRADE_MAP[grade];
      
      // Only include rows with a grade selected
      if (gradeVal === null) return;
      
      const pts = gradeVal * parseFloat(credit);
      const ptsStr = pts % 1 === 0 ? pts.toString() : pts.toFixed(1);
      
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      // Alternating row background
      if (rowNum % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(20, yPos, 170, 7, 'F');
      }
      
      doc.setFontSize(9);
      doc.text(rowNum.toString(), 22, yPos + 5);
      doc.text(name.substring(0, 35), 30, yPos + 5);
      doc.text(grade, 110, yPos + 5);
      doc.text(credit, 135, yPos + 5);
      doc.text(ptsStr, 165, yPos + 5);
      
      yPos += 7;
      rowNum++;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.setFont('helvetica', 'italic');
    const footerY = doc.internal.pageSize.height - 15;
    doc.text('GPA = Σ(Grade Value × Credit Points) ÷ Σ(Credit Points)', 20, footerY);
    doc.text('Generated by GPA Calculator', 20, footerY + 5);
    
    // Save the PDF
    const filename = `GPA_Report_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.pdf`;
    doc.save(filename);
    
    showNotification('PDF exported successfully!', 'success');
  } catch (error) {
    console.error('PDF export failed:', error);
    showNotification('PDF export failed. Please try again.', 'error');
  }
}

// Start with 3 rows or load from localStorage
const loaded = loadFromLocalStorage();
if (!loaded) {
  addRow();
  addRow();
  addRow();
}
