<template>
  <div class="foto-admin">
    <div class="fa-wrap">
      <h1 class="admin-title">
        <span class="admin-title__icon">🖼</span>
        Управління фото секцій
      </h1>

      <!-- Header Logo indicator -->
      <div class="header-logo-info">
        <ButtonBlef text="Логотип у шапці (Header Logo)" />
        <p class="header-logo-hint">Секція <strong>headerLogo</strong> — це логотип у верхній частині сайту (header).</p>
      </div>

      <!-- Форма додавання/редагування -->
      <div class="form-box">
        <h2 class="form-box__title">
          <span class="form-box__dot"></span>
          {{ editingId ? 'Редагувати фото' : 'Додати нове фото' }}
        </h2>

        <div class="form-group">
          <label>Секція:</label>
          <select v-model="form.section" required>
            <option value="">Оберіть секцію</option>
            <optgroup label="--- Головна ---">
              <option value="headerLogo">🔷 Header Logo (логотип у шапці)</option>
              <option value="hero">Hero (Головна)</option>
              <option value="ourProcess">Our Process (фон)</option>
              <option value="ourProcess1">Our Process - Картка 1</option>
              <option value="ourProcess2">Our Process - Картка 2</option>
              <option value="ourProcess3">Our Process - Картка 3</option>
            </optgroup>
            <optgroup label="--- About ---">
              <option value="about">About Hero</option>
              <option value="generalHero">General Hero (About)</option>
              <option value="generalHeroSide">General Hero - Фото поруч з текстом</option>
              <option value="history">History Work</option>
              <option value="difficulties">Difficulties (фон)</option>
              <option value="difficulties1">👷 Працівник 1 (Difficulties)</option>
              <option value="difficulties2">👷 Працівник 2 (Difficulties)</option>
              <option value="difficulties3">👷 Працівник 3 (Difficulties)</option>
            </optgroup>
            <optgroup label="--- Portfolio ---">
              <option value="portfolio">Portfolio Hero</option>
              <option value="generalHeroPortfolio">General Hero Portfolio</option>
              <option value="portfolioSec1">Portfolio Sec - Картка 1</option>
              <option value="portfolioSec2">Portfolio Sec - Картка 2</option>
              <option value="portfolioSec3">Portfolio Sec - Картка 3</option>
            </optgroup>
            <optgroup label="--- Сервіси ---">
              <option value="services">Services Hero</option>
              <option value="collectedServices">Collected Services (картки)</option>
              <option value="kitchen">Kitchen Service</option>
              <option value="bathroom">Bathroom Service</option>
              <option value="tiles">Tiles Service</option>
              <option value="painting">Spackling / Painting Service</option>
              <option value="electric">Electrical Work Service</option>
              <option value="plumbing">Plumbing Service</option>
            </optgroup>
            <optgroup label="--- Інформаційний блок (DetalsInformation) ---">
              <option value="fotoImgTest">Foto Img Test</option>
              <option value="infoportfolio">Portfolio картка</option>
              <option value="carousel">Carousel (слайдер)</option>
              <option value="beforeAfterLeft">Before/After - Ліво</option>
              <option value="beforeAfterRight">Before/After - Право</option>
              <option value="imgsBlocFoto">Imgs Bloc Foto (форма)</option>
            </optgroup>
          </select>
        </div>

        <!-- Завантаження файлу -->
        <div class="form-group">
          <label>Фото:</label>
          <div class="upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="onDrop">
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="file-input-hidden"
              @change="onFileChange"
            />
            <div v-if="previewUrl" class="upload-preview">
              <img :src="previewUrl" alt="preview" />
              <button type="button" class="remove-photo" @click.stop="removePhoto">✕</button>
            </div>
            <div v-else class="upload-placeholder">
              <span class="upload-icon">📷</span>
              <p>Натисни або перетягни фото сюди</p>
              <p class="upload-hint">JPG, PNG, WEBP до 10MB</p>
            </div>
          </div>
          <!-- При редагуванні показуємо поточне фото якщо нового не вибрано -->
          <div v-if="editingId && form.currentImageUrl && !previewUrl" class="current-photo">
            <p class="current-label">Поточне фото:</p>
            <img :src="`http://localhost:3001/${form.currentImageUrl}`" alt="current" class="current-img" />
            <p class="current-hint">Завантаж нове фото щоб замінити</p>
          </div>
        </div>

        <div class="form-group">
          <label>Назва (title):</label>
          <input v-model="form.title" type="text" placeholder="Заголовок фото" />
        </div>

        <div class="form-group">
          <label>Опис / Підзаголовок:</label>
          <textarea v-model="form.description" placeholder="Опис або підзаголовок"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Порядок:</label>
            <input v-model.number="form.order" type="number" min="0" />
          </div>
          <div class="form-group checkbox">
            <label>
              <input v-model="form.isActive" type="checkbox" />
              Активне
            </label>
          </div>
        </div>

        <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>

        <div class="form-actions">
          <button @click="saveImage" class="btn-save" :disabled="saving">
            {{ saving ? 'Збереження...' : (editingId ? 'Оновити' : 'Додати') }}
          </button>
          <button v-if="editingId" @click="cancelEdit" class="btn-cancel">Скасувати</button>
        </div>
      </div>

      <!-- Список фото по секціях -->
      <div class="sections-list">
        <div v-for="section in sections" :key="section.name" class="section-block">
          <h3 class="section-title">
            <span class="section-title__bar"></span>
            {{ section.label }}
          </h3>

          <div v-if="imagesBySection[section.name]?.length" class="images-grid">
            <div
              v-for="img in imagesBySection[section.name]"
              :key="img.id"
              class="image-card"
              :class="{ inactive: !img.isActive }"
            >
              <div class="image-preview">
                <img :src="`http://localhost:3001/${img.imageUrl}`" :alt="img.title || 'Image'" />
                <span v-if="!img.isActive" class="inactive-badge">Неактивне</span>
              </div>
              <div class="image-info">
                <p class="image-title">{{ img.title || 'Без назви' }}</p>
                <p class="image-desc">{{ img.description || '—' }}</p>
                <p class="image-order">Порядок: {{ img.order }}</p>
              </div>
              <div class="image-actions">
                <button @click="editImage(img)" class="btn-edit">✏️ Редагувати</button>
                <button @click="deleteImage(img.id)" class="btn-delete">🗑 Видалити</button>
              </div>
            </div>
          </div>
          <p v-else class="no-images">Немає зображень для цієї секції</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ButtonBlef from '../components/ui/ButtonBlef.vue'

export default {
  name: 'fotoAdm',
  components: { ButtonBlef },
  data() {
    return {
      images: [],
      editingId: null,
      saving: false,
      uploadError: '',
      selectedFile: null,
      previewUrl: '',
      form: {
        section: '',
        title: '',
        description: '',
        order: 0,
        isActive: true,
        currentImageUrl: '',
      },
      sections: [
        { name: 'headerLogo', label: '🔷 Header Logo (логотип у шапці)' },
        { name: 'hero', label: 'Hero (Головна)' },
        { name: 'ourProcess', label: 'Our Process (фон)' },
        { name: 'ourProcess1', label: 'Our Process - Картка 1' },
        { name: 'ourProcess2', label: 'Our Process - Картка 2' },
        { name: 'ourProcess3', label: 'Our Process - Картка 3' },
        { name: 'about', label: 'About Hero' },
        { name: 'generalHero', label: 'General Hero (About)' },
        { name: 'generalHeroSide', label: 'General Hero - Фото поруч з текстом' },
        { name: 'history', label: 'History Work' },
        { name: 'difficulties', label: 'Difficulties (фон)' },
        { name: 'difficulties1', label: '👷 Працівник 1 (Difficulties)' },
        { name: 'difficulties2', label: '👷 Працівник 2 (Difficulties)' },
        { name: 'difficulties3', label: '👷 Працівник 3 (Difficulties)' },
        { name: 'portfolio', label: 'Portfolio Hero' },
        { name: 'generalHeroPortfolio', label: 'General Hero Portfolio' },
        { name: 'portfolioSec1', label: 'Portfolio Sec - Картка 1' },
        { name: 'portfolioSec2', label: 'Portfolio Sec - Картка 2' },
        { name: 'portfolioSec3', label: 'Portfolio Sec - Картка 3' },
        { name: 'services', label: 'Services Hero' },
        { name: 'collectedServices', label: 'Collected Services (картки)' },
        { name: 'kitchen', label: 'Kitchen Service' },
        { name: 'bathroom', label: 'Bathroom Service' },
        { name: 'tiles', label: 'Tiles Service' },
        { name: 'painting', label: 'Spackling / Painting Service' },
        { name: 'electric', label: 'Electrical Work Service' },
        { name: 'plumbing', label: 'Plumbing Service' },
        { name: 'fotoImgTest', label: 'Foto Img Test' },
        { name: 'infoportfolio', label: 'Portfolio картка (DetalsInfo)' },
        { name: 'carousel', label: 'Carousel (слайдер)' },
        { name: 'beforeAfterLeft', label: 'Before/After - Ліво' },
        { name: 'beforeAfterRight', label: 'Before/After - Право' },
        { name: 'imgsBlocFoto', label: 'Imgs Bloc Foto (форма)' },
      ],
    }
  },
  computed: {
    imagesBySection() {
      const grouped = {}
      this.sections.forEach((s) => {
        grouped[s.name] = this.images.filter((img) => img.section === s.name)
      })
      return grouped
    },
  },
  async mounted() {
    await this.fetchImages()
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInputRef.click()
    },
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.setFile(file)
    },
    onDrop(e) {
      const file = e.dataTransfer.files[0]
      if (!file) return
      this.setFile(file)
    },
    setFile(file) {
      if (file.size > 10 * 1024 * 1024) {
        this.uploadError = 'Файл занадто великий (максимум 10MB)'
        return
      }
      this.selectedFile = file
      this.previewUrl = URL.createObjectURL(file)
      this.uploadError = ''
    },
    removePhoto() {
      this.selectedFile = null
      this.previewUrl = ''
      if (this.$refs.fileInputRef) this.$refs.fileInputRef.value = ''
    },
    async fetchImages() {
      try {
        const response = await fetch('http://localhost:3001/section-images')
        this.images = await response.json()
      } catch (error) {
        console.error('Помилка завантаження:', error)
      }
    },
    async saveImage() {
      if (!this.form.section) {
        this.uploadError = 'Оберіть секцію'
        return
      }
      if (!this.editingId && !this.selectedFile) {
        this.uploadError = 'Виберіть фото'
        return
      }

      this.saving = true
      this.uploadError = ''

      try {
        const formData = new FormData()
        if (this.selectedFile) formData.append('file', this.selectedFile)
        formData.append('section', this.form.section)
        formData.append('title', this.form.title || '')
        formData.append('description', this.form.description || '')
        formData.append('order', String(this.form.order || 0))
        formData.append('isActive', String(this.form.isActive))

        const url = this.editingId
          ? `http://localhost:3001/section-images/upload/${this.editingId}`
          : 'http://localhost:3001/section-images/upload'

        const response = await fetch(url, {
          method: this.editingId ? 'PUT' : 'POST',
          body: formData,
        })

        if (response.ok) {
          await this.fetchImages()
          this.resetForm()
        } else {
          const err = await response.json()
          this.uploadError = err.message || 'Помилка збереження'
        }
      } catch (error) {
        this.uploadError = 'Помилка з\'єднання з сервером'
        console.error(error)
      } finally {
        this.saving = false
      }
    },
    editImage(img) {
      this.editingId = img.id
      this.form = {
        section: img.section,
        title: img.title || '',
        description: img.description || '',
        order: img.order,
        isActive: img.isActive,
        currentImageUrl: img.imageUrl,
      }
      this.selectedFile = null
      this.previewUrl = ''
      this.uploadError = ''
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async deleteImage(id) {
      if (!confirm('Видалити це фото?')) return
      try {
        await fetch(`http://localhost:3001/section-images/${id}`, { method: 'DELETE' })
        await this.fetchImages()
      } catch (error) {
        console.error('Помилка видалення:', error)
      }
    },
    cancelEdit() {
      this.resetForm()
    },
    resetForm() {
      this.editingId = null
      this.selectedFile = null
      this.previewUrl = ''
      this.uploadError = ''
      this.form = {
        section: '',
        title: '',
        description: '',
        order: 0,
        isActive: true,
        currentImageUrl: '',
      }
      if (this.$refs.fileInputRef) this.$refs.fileInputRef.value = ''
    },
  },
}
</script>

<style scoped>
/* ══════════════════════════════════════════
   BASE
══════════════════════════════════════════ */
.foto-admin {
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
  padding: 0 0 80px;
}

.fa-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 0;
}

/* ══════════════════════════════════════════
   TITLE
══════════════════════════════════════════ */
.admin-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 30px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 36px;
  letter-spacing: -0.3px;
}

.admin-title__icon {
  font-size: 32px;
}

/* ══════════════════════════════════════════
   HEADER LOGO INFO
══════════════════════════════════════════ */
.header-logo-info {
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(37, 99, 235, 0.12);
  border: 1.5px solid rgba(59, 130, 246, 0.4);
  border-radius: 16px;
  padding: 18px 24px;
  margin-bottom: 36px;
}

.header-logo-hint {
  font-size: 14px;
  color: #93c5fd;
  margin: 0;
  line-height: 1.5;
}

.header-logo-hint strong {
  color: #60a5fa;
}

/* ══════════════════════════════════════════
   FORM BOX
══════════════════════════════════════════ */
.form-box {
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  padding: 36px;
  margin-bottom: 48px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

.form-box__title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 28px;
}

.form-box__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
}

/* ══════════════════════════════════════════
   FORM FIELDS
══════════════════════════════════════════ */
.form-group {
  margin-bottom: 22px;
}

.form-row {
  display: flex;
  gap: 24px;
  align-items: flex-end;
}

.form-row .form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #94a3b8;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  font-size: 14px;
  background: #111827;
  color: #f1f5f9;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.form-group select option,
.form-group select optgroup {
  background: #1e293b;
  color: #e2e8f0;
}

.form-group textarea {
  min-height: 90px;
  resize: vertical;
}

.form-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0;
  font-size: 14px;
  color: #cbd5e1;
}

.form-group.checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

/* ══════════════════════════════════════════
   UPLOAD AREA
══════════════════════════════════════════ */
.file-input-hidden {
  display: none;
}

.upload-area {
  border: 2px dashed rgba(100, 116, 139, 0.4);
  border-radius: 16px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.5);
}

.upload-area:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.07);
}

.upload-placeholder {
  text-align: center;
  padding: 30px 20px;
  color: #64748b;
}

.upload-icon {
  font-size: 44px;
  display: block;
  margin-bottom: 12px;
}

.upload-placeholder p {
  margin: 4px 0;
  font-size: 14px;
  color: #94a3b8;
}

.upload-hint {
  color: #64748b !important;
  font-size: 12px !important;
  margin-top: 6px !important;
}

.upload-preview {
  position: relative;
  width: 100%;
}

.upload-preview img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.remove-photo {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-photo:hover {
  background: #ef4444;
}

.current-photo {
  margin-top: 14px;
}

.current-label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 6px;
}

.current-img {
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.current-hint {
  font-size: 12px;
  color: #475569;
  margin-top: 5px;
}

/* ══════════════════════════════════════════
   ERROR
══════════════════════════════════════════ */
.upload-error {
  color: #fca5a5;
  font-size: 13px;
  margin-bottom: 14px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 10px 14px;
  border-radius: 10px;
}

/* ══════════════════════════════════════════
   FORM ACTIONS
══════════════════════════════════════════ */
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn-save,
.btn-cancel {
  padding: 12px 30px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-save:hover,
.btn-cancel:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-save {
  background: #16a34a;
  color: white;
}

.btn-cancel {
  background: #475569;
  color: white;
}

/* ══════════════════════════════════════════
   SECTIONS LIST
══════════════════════════════════════════ */
.sections-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section-block {
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  font-size: 15px;
  font-weight: 700;
  color: #cbd5e1;
}

.section-title__bar {
  width: 4px;
  height: 18px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 2px;
  flex-shrink: 0;
}

/* ══════════════════════════════════════════
   IMAGES GRID
══════════════════════════════════════════ */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.image-card {
  background: #1e293b;
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.3);
}

.image-card.inactive {
  opacity: 0.45;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #0f172a;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-card:hover .image-preview img {
  transform: scale(1.04);
}

.inactive-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(239, 68, 68, 0.85);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
}

.image-info {
  padding: 14px 14px 10px;
}

.image-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
  color: #f1f5f9;
}

.image-desc {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}

.image-order {
  font-size: 11px;
  color: #475569;
}

.image-actions {
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 9px 6px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn-edit {
  background: #2563eb;
  color: white;
}

.btn-delete {
  background: #dc2626;
  color: white;
}

.no-images {
  color: #475569;
  font-style: italic;
  font-size: 14px;
  padding: 8px 0;
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width: 768px) {
  .fa-wrap {
    padding: 32px 16px 0;
  }

  .form-box {
    padding: 24px 20px;
    border-radius: 20px;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .admin-title {
    font-size: 22px;
  }
}
</style>
