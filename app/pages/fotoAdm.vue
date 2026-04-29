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

      <!-- Video Section -->
      <div class="form-box video-box">
        <h2 class="form-box__title">
          <span class="form-box__dot" style="background:#8b5cf6"></span>
          Відео (VideoSection)
        </h2>
        <div class="form-group">
          <label>Завантажити відео (mp4):</label>
          <div class="upload-area" @click="$refs.videoFileRef.click()" style="min-height:100px">
            <input ref="videoFileRef" type="file" accept="video/*" class="file-input-hidden" @change="onVideoFileChange" />
            <div v-if="videoFileName" class="upload-placeholder">
              <span class="upload-icon">🎬</span>
              <p>{{ videoFileName }}</p>
            </div>
            <div v-else class="upload-placeholder">
              <span class="upload-icon">🎬</span>
              <p>Натисни або перетягни відео сюди</p>
              <p class="upload-hint">MP4, WebM, MOV до 200MB</p>
            </div>
          </div>
        </div>
        <p v-if="videoError" class="upload-error">{{ videoError }}</p>
        <div class="form-actions">
          <button @click="saveVideoFile" class="btn-save" :disabled="videoSaving">
            {{ videoSaving ? 'Завантаження...' : (videoSavedId ? 'Замінити відео' : 'Завантажити відео') }}
          </button>
        </div>
        <div v-if="videoUrl" style="margin-top:16px">
          <p style="font-size:13px;color:#64748b;margin-bottom:8px">Поточне відео:</p>
          <video :src="videoUrl" muted controls style="width:100%;max-height:220px;border-radius:12px;object-fit:cover"></video>
        </div>
      </div>

      <!-- Portfolio Videos -->
      <div class="form-box video-box">
        <h2 class="form-box__title">
          <span class="form-box__dot" style="background:#8b5cf6"></span>
          Відео портфоліо (VideoPortfolio)
        </h2>
        <div class="form-group">
          <label>Назва відео:</label>
          <input v-model="pvTitle" type="text" placeholder="Наприклад: Modern apartment renovation" />
        </div>
        <div class="form-group">
          <label>Категорія:</label>
          <input v-model="pvCategory" type="text" placeholder="Наприклад: Apartment" />
        </div>
        <div class="form-group">
          <label>Порядок відображення:</label>
          <input v-model.number="pvOrder" type="number" min="0" />
        </div>
        <div class="form-group">
          <label>Завантажити відео (mp4):</label>
          <div class="upload-area" @click="$refs.pvFileRef.click()" style="min-height:100px">
            <input ref="pvFileRef" type="file" accept="video/*" class="file-input-hidden" @change="onPvFileChange" />
            <div v-if="pvFileName" class="upload-placeholder">
              <span class="upload-icon">🎬</span>
              <p>{{ pvFileName }}</p>
            </div>
            <div v-else class="upload-placeholder">
              <span class="upload-icon">🎬</span>
              <p>Натисни або перетягни відео сюди</p>
              <p class="upload-hint">MP4, WebM, MOV до 200MB</p>
            </div>
          </div>
        </div>
        <p v-if="pvError" class="upload-error">{{ pvError }}</p>
        <div class="form-actions">
          <button @click="savePortfolioVideo" class="btn-save" :disabled="pvSaving">
            {{ pvSaving ? 'Завантаження...' : 'Додати відео' }}
          </button>
        </div>
        <div v-if="portfolioVideos.length" style="margin-top:24px">
          <p style="font-size:13px;color:#64748b;margin-bottom:12px">Поточні відео портфоліо:</p>
          <div style="display:flex;flex-direction:column;gap:14px">
            <div
              v-for="pv in portfolioVideos"
              :key="pv.id"
              style="background:#1e293b;border-radius:12px;padding:14px;display:flex;gap:14px;align-items:center"
            >
              <video
                :src="`http://localhost:3001/${pv.imageUrl}`"
                muted
                preload="metadata"
                style="width:140px;height:90px;border-radius:8px;object-fit:cover;flex-shrink:0"
              ></video>
              <div style="flex:1">
                <p style="font-weight:600;color:#f1f5f9;margin:0 0 4px">{{ pv.title || 'Без назви' }}</p>
                <p style="font-size:12px;color:#64748b;margin:0 0 4px">{{ pv.description || '—' }}</p>
                <p style="font-size:11px;color:#475569;margin:0">Порядок: {{ pv.order }}</p>
              </div>
              <button @click="deletePortfolioVideo(pv.id)" class="btn-delete" style="flex-shrink:0;padding:9px 14px">🗑</button>
            </div>
          </div>
        </div>
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
              <option value="directorMes">🧑‍💼 DirectorMes (фото директора)</option>
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
              <option value="kitchenPhoto1">🍳 Kitchen - Велике фото 1</option>
              <option value="kitchenPhoto2">🍳 Kitchen - Велике фото 2</option>
              <option value="kitchenPhoto3">🍳 Kitchen - Велике фото 3</option>
              <option value="bathroomPhoto1">🚿 Bathroom - Велике фото 1</option>
              <option value="bathroomPhoto2">🚿 Bathroom - Велике фото 2</option>
              <option value="bathroomPhoto3">🚿 Bathroom - Велике фото 3</option>
              <option value="tilesPhoto1">🔲 Tiles - Велике фото 1</option>
              <option value="tilesPhoto2">🔲 Tiles - Велике фото 2</option>
              <option value="tilesPhoto3">🔲 Tiles - Велике фото 3</option>
              <option value="paintingPhoto1">🎨 Painting - Велике фото 1</option>
              <option value="paintingPhoto2">🎨 Painting - Велике фото 2</option>
              <option value="paintingPhoto3">🎨 Painting - Велике фото 3</option>
              <option value="electricPhoto1">⚡ Electric - Велике фото 1</option>
              <option value="electricPhoto2">⚡ Electric - Велике фото 2</option>
              <option value="electricPhoto3">⚡ Electric - Велике фото 3</option>
              <option value="plumbingPhoto1">🔧 Plumbing - Велике фото 1</option>
              <option value="plumbingPhoto2">🔧 Plumbing - Велике фото 2</option>
              <option value="plumbingPhoto3">🔧 Plumbing - Велике фото 3</option>
            </optgroup>
            <optgroup label="--- Карусель (Portfolio) ---">
              <option value="kitchenCarousel">🍳 Kitchen - Карусель</option>
              <option value="bathroomCarousel">🚿 Bathroom - Карусель</option>
              <option value="tilesCarousel">🔲 Tiles - Карусель</option>
              <option value="paintingCarousel">🎨 Painting - Карусель</option>
              <option value="electricCarousel">⚡ Electric - Карусель</option>
              <option value="plumbingCarousel">🔧 Plumbing - Карусель</option>
            </optgroup>
            <optgroup label="--- Before/After (Сервіси) ---">
              <option value="kitchenBefore1">🍳 Kitchen — До 1</option>
              <option value="kitchenAfter1">🍳 Kitchen — Після 1</option>
              <option value="kitchenBefore2">🍳 Kitchen — До 2</option>
              <option value="kitchenAfter2">🍳 Kitchen — Після 2</option>
              <option value="kitchenBefore3">🍳 Kitchen — До 3</option>
              <option value="kitchenAfter3">🍳 Kitchen — Після 3</option>
              <option value="bathroomBefore1">🚿 Bathroom — До 1</option>
              <option value="bathroomAfter1">🚿 Bathroom — Після 1</option>
              <option value="bathroomBefore2">🚿 Bathroom — До 2</option>
              <option value="bathroomAfter2">🚿 Bathroom — Після 2</option>
              <option value="bathroomBefore3">🚿 Bathroom — До 3</option>
              <option value="bathroomAfter3">🚿 Bathroom — Після 3</option>
              <option value="tilesBefore1">🔲 Tiles — До 1</option>
              <option value="tilesAfter1">🔲 Tiles — Після 1</option>
              <option value="tilesBefore2">🔲 Tiles — До 2</option>
              <option value="tilesAfter2">🔲 Tiles — Після 2</option>
              <option value="tilesBefore3">🔲 Tiles — До 3</option>
              <option value="tilesAfter3">🔲 Tiles — Після 3</option>
              <option value="paintingBefore1">🎨 Painting — До 1</option>
              <option value="paintingAfter1">🎨 Painting — Після 1</option>
              <option value="paintingBefore2">🎨 Painting — До 2</option>
              <option value="paintingAfter2">🎨 Painting — Після 2</option>
              <option value="paintingBefore3">🎨 Painting — До 3</option>
              <option value="paintingAfter3">🎨 Painting — Після 3</option>
              <option value="electricBefore1">⚡ Electric — До 1</option>
              <option value="electricAfter1">⚡ Electric — Після 1</option>
              <option value="electricBefore2">⚡ Electric — До 2</option>
              <option value="electricAfter2">⚡ Electric — Після 2</option>
              <option value="electricBefore3">⚡ Electric — До 3</option>
              <option value="electricAfter3">⚡ Electric — Після 3</option>
              <option value="plumbingBefore1">🔧 Plumbing — До 1</option>
              <option value="plumbingAfter1">🔧 Plumbing — Після 1</option>
              <option value="plumbingBefore2">🔧 Plumbing — До 2</option>
              <option value="plumbingAfter2">🔧 Plumbing — Після 2</option>
              <option value="plumbingBefore3">🔧 Plumbing — До 3</option>
              <option value="plumbingAfter3">🔧 Plumbing — Після 3</option>
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
      videoUrl: '',
      videoSavedId: null,
      videoSaving: false,
      videoError: '',
      videoFile: null,
      videoFileName: '',
      portfolioVideos: [],
      pvFile: null,
      pvFileName: '',
      pvTitle: '',
      pvCategory: '',
      pvOrder: 0,
      pvSaving: false,
      pvError: '',
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
        { name: 'directorMes', label: '🧑‍💼 DirectorMes (фото директора)' },
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
        { name: 'kitchenPhoto1', label: '🍳 Kitchen - Велике фото 1' },
        { name: 'kitchenPhoto2', label: '🍳 Kitchen - Велике фото 2' },
        { name: 'kitchenPhoto3', label: '🍳 Kitchen - Велике фото 3' },
        { name: 'bathroomPhoto1', label: '🚿 Bathroom - Велике фото 1' },
        { name: 'bathroomPhoto2', label: '🚿 Bathroom - Велике фото 2' },
        { name: 'bathroomPhoto3', label: '🚿 Bathroom - Велике фото 3' },
        { name: 'tilesPhoto1', label: '🔲 Tiles - Велике фото 1' },
        { name: 'tilesPhoto2', label: '🔲 Tiles - Велике фото 2' },
        { name: 'tilesPhoto3', label: '🔲 Tiles - Велике фото 3' },
        { name: 'paintingPhoto1', label: '🎨 Painting - Велике фото 1' },
        { name: 'paintingPhoto2', label: '🎨 Painting - Велике фото 2' },
        { name: 'paintingPhoto3', label: '🎨 Painting - Велике фото 3' },
        { name: 'electricPhoto1', label: '⚡ Electric - Велике фото 1' },
        { name: 'electricPhoto2', label: '⚡ Electric - Велике фото 2' },
        { name: 'electricPhoto3', label: '⚡ Electric - Велике фото 3' },
        { name: 'plumbingPhoto1', label: '🔧 Plumbing - Велике фото 1' },
        { name: 'plumbingPhoto2', label: '🔧 Plumbing - Велике фото 2' },
        { name: 'plumbingPhoto3', label: '🔧 Plumbing - Велике фото 3' },
        { name: 'kitchenCarousel', label: '🍳 Kitchen - Карусель' },
        { name: 'bathroomCarousel', label: '🚿 Bathroom - Карусель' },
        { name: 'tilesCarousel', label: '🔲 Tiles - Карусель' },
        { name: 'paintingCarousel', label: '🎨 Painting - Карусель' },
        { name: 'electricCarousel', label: '⚡ Electric - Карусель' },
        { name: 'plumbingCarousel', label: '🔧 Plumbing - Карусель' },
        { name: 'kitchenBefore1', label: '🍳 Kitchen — До 1' },
        { name: 'kitchenAfter1', label: '🍳 Kitchen — Після 1' },
        { name: 'kitchenBefore2', label: '🍳 Kitchen — До 2' },
        { name: 'kitchenAfter2', label: '🍳 Kitchen — Після 2' },
        { name: 'kitchenBefore3', label: '🍳 Kitchen — До 3' },
        { name: 'kitchenAfter3', label: '🍳 Kitchen — Після 3' },
        { name: 'bathroomBefore1', label: '🚿 Bathroom — До 1' },
        { name: 'bathroomAfter1', label: '🚿 Bathroom — Після 1' },
        { name: 'bathroomBefore2', label: '🚿 Bathroom — До 2' },
        { name: 'bathroomAfter2', label: '🚿 Bathroom — Після 2' },
        { name: 'bathroomBefore3', label: '🚿 Bathroom — До 3' },
        { name: 'bathroomAfter3', label: '🚿 Bathroom — Після 3' },
        { name: 'tilesBefore1', label: '🔲 Tiles — До 1' },
        { name: 'tilesAfter1', label: '🔲 Tiles — Після 1' },
        { name: 'tilesBefore2', label: '🔲 Tiles — До 2' },
        { name: 'tilesAfter2', label: '🔲 Tiles — Після 2' },
        { name: 'tilesBefore3', label: '🔲 Tiles — До 3' },
        { name: 'tilesAfter3', label: '🔲 Tiles — Після 3' },
        { name: 'paintingBefore1', label: '🎨 Painting — До 1' },
        { name: 'paintingAfter1', label: '🎨 Painting — Після 1' },
        { name: 'paintingBefore2', label: '🎨 Painting — До 2' },
        { name: 'paintingAfter2', label: '🎨 Painting — Після 2' },
        { name: 'paintingBefore3', label: '🎨 Painting — До 3' },
        { name: 'paintingAfter3', label: '🎨 Painting — Після 3' },
        { name: 'electricBefore1', label: '⚡ Electric — До 1' },
        { name: 'electricAfter1', label: '⚡ Electric — Після 1' },
        { name: 'electricBefore2', label: '⚡ Electric — До 2' },
        { name: 'electricAfter2', label: '⚡ Electric — Після 2' },
        { name: 'electricBefore3', label: '⚡ Electric — До 3' },
        { name: 'electricAfter3', label: '⚡ Electric — Після 3' },
        { name: 'plumbingBefore1', label: '🔧 Plumbing — До 1' },
        { name: 'plumbingAfter1', label: '🔧 Plumbing — Після 1' },
        { name: 'plumbingBefore2', label: '🔧 Plumbing — До 2' },
        { name: 'plumbingAfter2', label: '🔧 Plumbing — Після 2' },
        { name: 'plumbingBefore3', label: '🔧 Plumbing — До 3' },
        { name: 'plumbingAfter3', label: '🔧 Plumbing — Після 3' },
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
    await this.fetchVideoSection()
    await this.fetchPortfolioVideos()
  },
  methods: {
    onVideoFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      if (file.size > 200 * 1024 * 1024) { this.videoError = 'Файл занадто великий (максимум 200MB)'; return }
      this.videoFile = file
      this.videoFileName = file.name
      this.videoError = ''
    },
    async saveVideoFile() {
      if (!this.videoFile) { this.videoError = 'Оберіть відео-файл'; return }
      this.videoSaving = true
      this.videoError = ''
      try {
        const formData = new FormData()
        formData.append('file', this.videoFile)
        formData.append('section', 'videoSection')
        formData.append('title', 'video')
        formData.append('isActive', 'true')
        formData.append('order', '0')

        const url = this.videoSavedId
          ? `http://localhost:3001/section-images/upload/${this.videoSavedId}`
          : 'http://localhost:3001/section-images/upload'

        const res = await fetch(url, { method: this.videoSavedId ? 'PUT' : 'POST', body: formData })
        if (!res.ok) throw new Error('Помилка завантаження')
        const saved = await res.json()
        this.videoSavedId = saved.id
        this.videoUrl = `http://localhost:3001/${saved.imageUrl}`
        this.videoFile = null
        this.videoFileName = ''
        if (this.$refs.videoFileRef) this.$refs.videoFileRef.value = ''
      } catch (e) {
        this.videoError = 'Не вдалося завантажити відео'
      } finally {
        this.videoSaving = false
      }
    },
    async fetchVideoSection() {
      try {
        const res = await fetch('http://localhost:3001/section-images/section/videoSection')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          const raw = data[0].imageUrl || ''
          this.videoUrl = raw.startsWith('http') ? raw : `http://localhost:3001/${raw}`
          this.videoSavedId = data[0].id
        }
      } catch {}
    },
    async fetchPortfolioVideos() {
      try {
        const res = await fetch('http://localhost:3001/section-images/section/videoPortfolio')
        const data = await res.json()
        if (Array.isArray(data)) {
          this.portfolioVideos = data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        }
      } catch {}
    },
    onPvFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      if (file.size > 200 * 1024 * 1024) { this.pvError = 'Файл занадто великий (максимум 200MB)'; return }
      this.pvFile = file
      this.pvFileName = file.name
      this.pvError = ''
    },
    async savePortfolioVideo() {
      if (!this.pvFile) { this.pvError = 'Оберіть відео-файл'; return }
      this.pvSaving = true
      this.pvError = ''
      try {
        const formData = new FormData()
        formData.append('file', this.pvFile)
        formData.append('section', 'videoPortfolio')
        formData.append('title', this.pvTitle || '')
        formData.append('description', this.pvCategory || '')
        formData.append('order', String(this.pvOrder || 0))
        formData.append('isActive', 'true')
        const res = await fetch('http://localhost:3001/section-images/upload', { method: 'POST', body: formData })
        if (!res.ok) throw new Error('Помилка завантаження')
        this.pvFile = null
        this.pvFileName = ''
        this.pvTitle = ''
        this.pvCategory = ''
        this.pvOrder = 0
        if (this.$refs.pvFileRef) this.$refs.pvFileRef.value = ''
        await this.fetchPortfolioVideos()
      } catch {
        this.pvError = 'Не вдалося завантажити відео'
      } finally {
        this.pvSaving = false
      }
    },
    async deletePortfolioVideo(id) {
      if (!confirm('Видалити це відео?')) return
      try {
        await fetch(`http://localhost:3001/section-images/${id}`, { method: 'DELETE' })
        await this.fetchPortfolioVideos()
      } catch {}
    },
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
