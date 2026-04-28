<template>
  <div class="foto-admin">
    <div class="container">
      <h1 class="admin-title">Управління фото секцій</h1>

      <!-- Форма додавання/редагування -->
      <div class="form-box">
        <h2>{{ editingId ? 'Редагувати фото' : 'Додати нове фото' }}</h2>

        <div class="form-group">
          <label>Секція:</label>
          <select v-model="form.section" required>
            <option value="">Оберіть секцію</option>
            <optgroup label="--- Головна ---">
              <option value="hero">Hero (Головна)</option>
              <option value="ourProcess">Our Process (фон)</option>
              <option value="ourProcess1">Our Process - Картка 1</option>
              <option value="ourProcess2">Our Process - Картка 2</option>
              <option value="ourProcess3">Our Process - Картка 3</option>
            </optgroup>
            <optgroup label="--- About ---">
              <option value="about">About Hero</option>
              <option value="generalHero">General Hero (About)</option>
              <option value="history">History Work</option>
              <option value="difficulties">Difficulties</option>
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
          <h3 class="section-title">{{ section.label }}</h3>

          <div v-if="imagesBySection[section.name]?.length" class="images-grid">
            <div
              v-for="img in imagesBySection[section.name]"
              :key="img.id"
              class="image-card"
              :class="{ inactive: !img.isActive }"
            >
              <div class="image-preview">
                <img :src="`http://localhost:3001/${img.imageUrl}`" :alt="img.title || 'Image'" />
              </div>
              <div class="image-info">
                <p class="image-title">{{ img.title || 'Без назви' }}</p>
                <p class="image-desc">{{ img.description || '—' }}</p>
                <p class="image-order">Порядок: {{ img.order }}</p>
              </div>
              <div class="image-actions">
                <button @click="editImage(img)" class="btn-edit">Редагувати</button>
                <button @click="deleteImage(img.id)" class="btn-delete">Видалити</button>
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
export default {
  name: 'fotoAdm',
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
        { name: 'hero', label: 'Hero (Головна)' },
        { name: 'ourProcess', label: 'Our Process (фон)' },
        { name: 'ourProcess1', label: 'Our Process - Картка 1' },
        { name: 'ourProcess2', label: 'Our Process - Картка 2' },
        { name: 'ourProcess3', label: 'Our Process - Картка 3' },
        { name: 'about', label: 'About Hero' },
        { name: 'generalHero', label: 'General Hero (About)' },
        { name: 'history', label: 'History Work' },
        { name: 'difficulties', label: 'Difficulties' },
        { name: 'portfolio', label: 'Portfolio Hero' },
        { name: 'generalHeroPortfolio', label: 'General Hero Portfolio' },
        { name: 'portfolioSec1', label: 'Portfolio Sec - Картка 1' },
        { name: 'portfolioSec2', label: 'Portfolio Sec - Картка 2' },
        { name: 'portfolioSec3', label: 'Portfolio Sec - Картка 3' },
        { name: 'services', label: 'Services Hero' },
        { name: 'collectedServices', label: 'Collected Services (картки)' },
        { name: 'kitchen', label: 'Kitchen Service' },
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
.foto-admin {
  padding: 40px 20px;
  min-height: 100vh;
  background: #f0f2f5;
}

.admin-title {
  text-align: center;
  margin-bottom: 40px;
  color: #1e3a8a;
  font-size: 28px;
}

.form-box {
  background: white;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-box h2 {
  margin-bottom: 24px;
  color: #111;
  font-size: 20px;
}

.form-group {
  margin-bottom: 20px;
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
  color: #374151;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  cursor: pointer;
}

/* === Upload Area === */
.file-input-hidden {
  display: none;
}

.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f0f7ff;
}

.upload-placeholder {
  text-align: center;
  padding: 30px 20px;
  color: #6b7280;
}

.upload-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 10px;
}

.upload-placeholder p {
  margin: 4px 0;
  font-size: 14px;
}

.upload-hint {
  color: #9ca3af;
  font-size: 12px !important;
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
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-photo:hover {
  background: #ef4444;
}

.current-photo {
  margin-top: 12px;
}

.current-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.current-img {
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.current-hint {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

.upload-error {
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 12px;
  background: #fef2f2;
  padding: 8px 12px;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  gap: 12px;
}

.btn-save, .btn-cancel {
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-save {
  background: #22c55e;
  color: white;
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

/* === Sections list === */
.sections-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-block {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
}

.section-title {
  margin-bottom: 20px;
  color: #1e3a8a;
  font-size: 16px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.image-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.image-card.inactive {
  opacity: 0.55;
}

.image-preview {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f3f4f6;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-info {
  padding: 12px;
}

.image-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
}

.image-desc {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.image-order {
  font-size: 12px;
  color: #9ca3af;
}

.image-actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-edit:hover, .btn-delete:hover {
  opacity: 0.8;
}

.btn-edit {
  background: #3b82f6;
  color: white;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

.no-images {
  color: #9ca3af;
  font-style: italic;
  font-size: 14px;
}

@media (max-width: 768px) {
  .images-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
