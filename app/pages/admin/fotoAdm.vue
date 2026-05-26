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
                :src="resolveUrl(pv.imageUrl)"
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
            <optgroup label="--- Info Cards (ImgCloud) ---">
              <option value="imgCloud">🖼 ImgCloud — одне фото для всіх Info Cards</option>
            </optgroup>
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
              <option value="historyWork1">📸 History Work - Блок 1</option>
              <option value="historyWork2">📸 History Work - Блок 2</option>
              <option value="historyWork3">📸 History Work - Блок 3</option>
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
              <option value="fireplacePhoto1">🔥 Fireplace - Велике фото 1</option>
              <option value="fireplacePhoto2">🔥 Fireplace - Велике фото 2</option>
              <option value="fireplacePhoto3">🔥 Fireplace - Велике фото 3</option>
              <option value="luxuryPhoto1">✨ Luxury Living - Велике фото 1</option>
              <option value="luxuryPhoto2">✨ Luxury Living - Велике фото 2</option>
              <option value="luxuryPhoto3">✨ Luxury Living - Велике фото 3</option>
            </optgroup>
            <optgroup label="--- Карусель (Portfolio) ---">
              <option value="kitchenCarousel">🍳 Kitchen - Карусель</option>
              <option value="bathroomCarousel">🚿 Bathroom - Карусель</option>
              <option value="tilesCarousel">🔲 Tiles - Карусель</option>
              <option value="paintingCarousel">🎨 Painting - Карусель</option>
              <option value="fireplaceCarousel">🔥 Fireplace - Карусель</option>
              <option value="luxuryCarousel">✨ Luxury Living - Карусель</option>
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
              <option value="fireplaceBefore1">🔥 Fireplace — До 1</option>
              <option value="fireplaceAfter1">🔥 Fireplace — Після 1</option>
              <option value="fireplaceBefore2">🔥 Fireplace — До 2</option>
              <option value="fireplaceAfter2">🔥 Fireplace — Після 2</option>
              <option value="fireplaceBefore3">🔥 Fireplace — До 3</option>
              <option value="fireplaceAfter3">🔥 Fireplace — Після 3</option>
              <option value="luxuryBefore1">✨ Luxury Living — До 1</option>
              <option value="luxuryAfter1">✨ Luxury Living — Після 1</option>
              <option value="luxuryBefore2">✨ Luxury Living — До 2</option>
              <option value="luxuryAfter2">✨ Luxury Living — Після 2</option>
              <option value="luxuryBefore3">✨ Luxury Living — До 3</option>
              <option value="luxuryAfter3">✨ Luxury Living — Після 3</option>
            </optgroup>
            <optgroup label="--- Сервіси ---">
              <option value="services">Services Hero</option>
              <option value="collectedServices">Collected Services (всі картки — старе)</option>
              <option value="collectedKitchen">🍳 Collected — Kitchen</option>
              <option value="collectedBathroom">🚿 Collected — Bathroom</option>
              <option value="collectedTiles">🔲 Collected — Tiles</option>
              <option value="collectedPainting">🎨 Collected — Spackling / Painting</option>
              <option value="collectedElectrical">⚡ Collected — Electrical Work</option>
              <option value="collectedPlumbing">🔧 Collected — Plumbing</option>
              <option value="kitchen">Kitchen Service</option>
              <option value="bathroom">Bathroom Service</option>
              <option value="tiles">Tiles Service</option>
              <option value="painting">Spackling / Painting Service</option>
              <option value="fireplace">Fireplace Projects Service</option>
              <option value="luxury">Luxury Living Service</option>
            </optgroup>
            <optgroup label="--- Info Cards (ImgCloud) ---">
              <option value="imgCloud">🖼 ImgCloud — одне фото для всіх Info Cards</option>
            </optgroup>
            <optgroup label="--- Info Cards (всі сторінки) ---">
              <option value="infoBlock1">📌 Info Block 1 — Construction Quality</option>
              <option value="infoBlock2">📌 Info Block 2 — Clear Deadlines</option>
              <option value="infoBlock3">📌 Info Block 3 — Transparent Pricing</option>
              <option value="infoBlock4">📌 Info Block 4 — Experienced Team</option>
              <option value="infoBlock5">📌 Info Block 5 — Work Guarantee</option>
              <option value="infoBlock6">📌 Info Block 6 — Personalized Approach</option>
            </optgroup>
            <optgroup label="--- Інформаційний блок (DetalsInformation) ---">
              <option value="fotoImgTest">Foto</option>
              <option value="infoportfolio">Portfolio картка</option>
              <option value="carousel">Carousel (слайдер)</option>
              <option value="beforeAfterLeft">Before/After - Ліво</option>
              <option value="beforeAfterRight">Before/After - Право</option>
              <option value="imgsBlocFoto">Коттакна форма фото</option>
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
            <img :src="resolveUrl(form.currentImageUrl)" alt="current" class="current-img" />
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

      <!-- Галерея з фільтром і групуванням -->
      <div class="gallery-filter-bar">
        <input
          v-model="gallerySearch"
          class="gallery-search"
          type="text"
          placeholder="Пошук по секції або назві фото..."
        />
        <span class="gallery-total">{{ filteredImagesTotal }} фото</span>
      </div>

      <div class="sections-list">
        <div
          v-for="group in groupedImages"
          :key="group.section"
          class="section-block"
        >
          <h3 class="section-title">
            <span class="section-title__bar"></span>
            {{ getSectionLabel(group.section) }}
            <span class="section-count">{{ group.images.length }}</span>
          </h3>

          <div class="images-grid">
            <div
              v-for="img in group.images"
              :key="img.id"
              class="image-card"
              :class="{ inactive: !img.isActive }"
            >
              <div class="image-preview">
                <img :src="resolveUrlTs(img.imageUrl, imageTimestamps[img.id])" :alt="img.title || 'Image'" />
                <span v-if="!img.isActive" class="inactive-badge">Неактивне</span>
              </div>
              <div class="image-info">
                <p class="image-title">{{ img.title || 'Без назви' }}</p>
                <p class="image-desc">{{ img.description || '—' }}</p>
                <p class="image-order">Порядок: {{ img.order }}</p>
              </div>
              <div class="image-actions">
                <button @click="editImage(img)" class="btn-edit">✏️ Редагувати</button>
                <button @click="rotateImage(img.id, 'ccw')" class="btn-rotate" title="Повернути ліво">↺</button>
                <button @click="rotateImage(img.id, 'cw')" class="btn-rotate" title="Повернути право">↻</button>
                <button @click="deleteImage(img.id)" class="btn-delete">🗑 Видалити</button>
              </div>
            </div>
          </div>
        </div>

        <p v-if="images.length && !groupedImages.length" class="no-images">
          Нічого не знайдено по запиту "{{ gallerySearch }}"
        </p>
        <p v-if="!images.length" class="no-images">Немає зображень</p>
      </div>
    </div>
  </div>
</template>


<script setup>
definePageMeta({ middleware: 'admin-auth' })
const _runtimeConfig = useRuntimeConfig()
_moduleApiBase = _runtimeConfig.public.apiUrl || 'http://127.0.0.1:3001'
</script>

<script>
import ButtonBlef from '~/components/ui/ButtonBlef.vue'

let _moduleApiBase = 'http://127.0.0.1:3001'

export default {
  name: 'fotoAdm',
  components: { ButtonBlef },
  data() {
    return {
      apiBase: _moduleApiBase,
      images: [],
      imageTimestamps: {},
      gallerySearch: '',
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
        { name: 'imgCloud', label: '🖼 ImgCloud — одне фото для всіх Info Cards' },
        { name: 'headerLogo', label: '🔷 Header Logo (логотип у шапці)' },
        { name: 'hero', label: 'Hero (Головна)' },
        { name: 'directorMes', label: '🧑‍💼 DirectorMes (фото директора)' },
        { name: 'ourProcess', label: 'Our Process (фон)' },
        { name: 'ourProcess1', label: 'Our Process - Картка 1' },
        { name: 'ourProcess2', label: 'Our Process - Картка 2' },
        { name: 'ourProcess3', label: 'Our Process - Картка 3' },
         { name: 'fotoImgTest', label: 'Foto Img Test' },
        { name: 'about', label: 'About Hero' },
        { name: 'generalHero', label: 'General Hero (About)' },
        { name: 'generalHeroSide', label: 'General Hero - Фото поруч з текстом' },
        { name: 'historyWork1', label: 'History Work - Блок 1' },
        { name: 'historyWork2', label: 'History Work - Блок 2' },
        { name: 'historyWork3', label: 'History Work - Блок 3' },
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
        { name: 'fireplacePhoto1', label: '🔥 Fireplace - Велике фото 1' },
        { name: 'fireplacePhoto2', label: '🔥 Fireplace - Велике фото 2' },
        { name: 'fireplacePhoto3', label: '🔥 Fireplace - Велике фото 3' },
        { name: 'luxuryPhoto1', label: '✨ Luxury Living - Велике фото 1' },
        { name: 'luxuryPhoto2', label: '✨ Luxury Living - Велике фото 2' },
        { name: 'luxuryPhoto3', label: '✨ Luxury Living - Велике фото 3' },
        { name: 'kitchenCarousel', label: '🍳 Kitchen - Карусель' },
        { name: 'bathroomCarousel', label: '🚿 Bathroom - Карусель' },
        { name: 'tilesCarousel', label: '🔲 Tiles - Карусель' },
        { name: 'paintingCarousel', label: '🎨 Painting - Карусель' },
        { name: 'fireplaceCarousel', label: '🔥 Fireplace - Карусель' },
        { name: 'luxuryCarousel', label: '✨ Luxury Living - Карусель' },
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
        { name: 'fireplaceBefore1', label: '🔥 Fireplace — До 1' },
        { name: 'fireplaceAfter1', label: '🔥 Fireplace — Після 1' },
        { name: 'fireplaceBefore2', label: '🔥 Fireplace — До 2' },
        { name: 'fireplaceAfter2', label: '🔥 Fireplace — Після 2' },
        { name: 'fireplaceBefore3', label: '🔥 Fireplace — До 3' },
        { name: 'fireplaceAfter3', label: '🔥 Fireplace — Після 3' },
        { name: 'luxuryBefore1', label: '✨ Luxury Living — До 1' },
        { name: 'luxuryAfter1', label: '✨ Luxury Living — Після 1' },
        { name: 'luxuryBefore2', label: '✨ Luxury Living — До 2' },
        { name: 'luxuryAfter2', label: '✨ Luxury Living — Після 2' },
        { name: 'luxuryBefore3', label: '✨ Luxury Living — До 3' },
        { name: 'luxuryAfter3', label: '✨ Luxury Living — Після 3' },
        { name: 'services', label: 'Services Hero' },
        { name: 'collectedServices', label: 'Collected Services (всі картки — старе)' },
        { name: 'collectedKitchen', label: '🍳 Collected — Kitchen' },
        { name: 'collectedBathroom', label: '🚿 Collected — Bathroom' },
        { name: 'collectedTiles', label: '🔲 Collected — Tiles' },
        { name: 'collectedPainting', label: '🎨 Collected — Spackling / Painting' },
        { name: 'collectedElectrical', label: '⚡ Collected — Electrical Work' },
        { name: 'collectedPlumbing', label: '🔧 Collected — Plumbing' },
        { name: 'kitchen', label: 'Kitchen Service' },
        { name: 'bathroom', label: 'Bathroom Service' },
        { name: 'tiles', label: 'Tiles Service' },
        { name: 'painting', label: 'Spackling / Painting Service' },
        { name: 'fireplace', label: 'Fireplace Projects Service' },
        { name: 'luxury', label: 'Luxury Living Service' },
       
        { name: 'kitchenInfo1', label: '🍳 Kitchen — Design Planning' },
        { name: 'kitchenInfo2', label: '🍳 Kitchen — Cabinet Installation' },
        { name: 'kitchenInfo3', label: '🍳 Kitchen — Countertops' },
        { name: 'kitchenInfo4', label: '🍳 Kitchen — Appliance Integration' },
        { name: 'kitchenInfo5', label: '🍳 Kitchen — Lighting & Electrical' },
        { name: 'kitchenInfo6', label: '🍳 Kitchen — Final Finishing' },
        { name: 'bathroomInfo1', label: '🚿 Bathroom — Design & Layout' },
        { name: 'bathroomInfo2', label: '🚿 Bathroom — Tile Installation' },
        { name: 'bathroomInfo3', label: '🚿 Bathroom — Plumbing Fixtures' },
        { name: 'bathroomInfo4', label: '🚿 Bathroom — Waterproofing' },
        { name: 'bathroomInfo5', label: '🚿 Bathroom — Lighting' },
        { name: 'bathroomInfo6', label: '🚿 Bathroom — Final Finishing' },
        { name: 'tilesInfo1', label: '🔲 Tiles — Floor Tiling' },
        { name: 'tilesInfo2', label: '🔲 Tiles — Wall Tiling' },
        { name: 'tilesInfo3', label: '🔲 Tiles — Backsplash' },
        { name: 'tilesInfo4', label: '🔲 Tiles — Grout & Sealing' },
        { name: 'tilesInfo5', label: '🔲 Tiles — Substrate Prep' },
        { name: 'tilesInfo6', label: '🔲 Tiles — Pattern Layouts' },
        { name: 'paintingInfo1', label: '🎨 Painting — Surface Prep' },
        { name: 'paintingInfo2', label: '🎨 Painting — Interior Painting' },
        { name: 'paintingInfo3', label: '🎨 Painting — Exterior Painting' },
        { name: 'paintingInfo4', label: '🎨 Painting — Spackling & Skim Coat' },
        { name: 'paintingInfo5', label: '🎨 Painting — Texture Finishes' },
        { name: 'paintingInfo6', label: '🎨 Painting — Color Consultation' },
        { name: 'electricInfo1', label: '⚡ Electric — Panel Upgrades' },
        { name: 'electricInfo2', label: '⚡ Electric — Wiring & Rewiring' },
        { name: 'electricInfo3', label: '⚡ Electric — Outlet & Switch Install' },
        { name: 'electricInfo4', label: '⚡ Electric — Lighting Systems' },
        { name: 'electricInfo5', label: '⚡ Electric — Safety Inspections' },
        { name: 'electricInfo6', label: '⚡ Electric — Code Compliance' },
        { name: 'plumbingInfo1', label: '🔧 Plumbing — Pipe Installation' },
        { name: 'plumbingInfo2', label: '🔧 Plumbing — Fixture Replacement' },
        { name: 'plumbingInfo3', label: '🔧 Plumbing — Leak Repair' },
        { name: 'plumbingInfo4', label: '🔧 Plumbing — Drain Cleaning' },
        { name: 'plumbingInfo5', label: '🔧 Plumbing — Water Heaters' },
        { name: 'plumbingInfo6', label: '🔧 Plumbing — Full Renovations' },
        { name: 'infoportfolio', label: 'Portfolio картка (DetalsInfo)' },
        { name: 'carousel', label: 'Carousel (слайдер)' },
        { name: 'beforeAfterLeft', label: 'Before/After - Ліво' },
        { name: 'beforeAfterRight', label: 'Before/After - Право' },
        { name: 'imgsBlocFoto', label: 'Imgs Bloc Foto (форма)' },
      ],
    }
  },
  computed: {
    groupedImages() {
      const search = this.gallerySearch.toLowerCase().trim()
      const filtered = this.images.filter(img => {
        if (!search) return true
        const label = this.getSectionLabel(img.section).toLowerCase()
        const title = (img.title || '').toLowerCase()
        const section = (img.section || '').toLowerCase()
        return label.includes(search) || title.includes(search) || section.includes(search)
      })
      const grouped = {}
      for (const img of filtered) {
        if (!grouped[img.section]) grouped[img.section] = []
        grouped[img.section].push(img)
      }
      return Object.entries(grouped)
        .map(([section, images]) => ({ section, images }))
        .sort((a, b) => a.section.localeCompare(b.section))
    },
    filteredImagesTotal() {
      return this.groupedImages.reduce((sum, g) => sum + g.images.length, 0)
    },
  },
  async mounted() {
    await this.fetchImages()
    await this.fetchVideoSection()
    await this.fetchPortfolioVideos()
  },
  methods: {
    resolveUrl(url) {
      if (!url) return ''
      if (url.startsWith('http') || url.startsWith('/')) return url
      return `${this.apiBase}/${url}`
    },
    resolveUrlTs(url, ts) {
      if (!url) return ''
      if (url.startsWith('http')) return url
      return `${this.apiBase}/${url}?t=${ts || 0}`
    },
    authHeaders() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : ''
      return token ? { Authorization: `Bearer ${token}` } : {}
    },
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
          ? `${this.apiBase}/section-images/upload/${this.videoSavedId}`
          : `${this.apiBase}/section-images/upload`

        const res = await fetch(url, { method: this.videoSavedId ? 'PUT' : 'POST', headers: this.authHeaders(), body: formData })
        if (!res.ok) throw new Error('Помилка завантаження')
        const saved = await res.json()
        this.videoSavedId = saved.id
        this.videoUrl = this.resolveUrl(saved.imageUrl)
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
        const res = await fetch(`${this.apiBase}/section-images/section/videoSection`)
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          this.videoUrl = this.resolveUrl(data[0].imageUrl || '')
          this.videoSavedId = data[0].id
        }
      } catch {}
    },
    async fetchPortfolioVideos() {
      try {
        const res = await fetch(`${this.apiBase}/section-images/section/videoPortfolio`)
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
        const res = await fetch(`${this.apiBase}/section-images/upload`, { method: 'POST', headers: this.authHeaders(), body: formData })
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
        await fetch(`${this.apiBase}/section-images/${id}`, { method: 'DELETE', headers: this.authHeaders() })
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
        const response = await fetch(`${this.apiBase}/section-images`, { headers: this.authHeaders() })
        if (response.status === 401) {
          localStorage.removeItem('adminLogged')
          localStorage.removeItem('adminToken')
          window.location.href = '/admin/adm'
          return
        }
        if (!response.ok) {
          console.error('Помилка завантаження фото:', response.status)
          return
        }
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
          ? `${this.apiBase}/section-images/upload/${this.editingId}`
          : `${this.apiBase}/section-images/upload`

        const response = await fetch(url, {
          method: this.editingId ? 'PUT' : 'POST',
          headers: this.authHeaders(),
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
    async rotateImage(id, direction) {
      try {
        const res = await fetch(`${this.apiBase}/section-images/${id}/rotate`, {
          method: 'POST',
          headers: { ...this.authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ direction }),
        })
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          alert(`Помилка повороту фото (${res.status}): ${text}`)
          return
        }
        const data = await res.json()
        const img = this.images.find(i => i.id === id)
        if (img && data.imageUrl) img.imageUrl = data.imageUrl
      } catch (e) {
        alert(`Помилка повороту фото: ${e?.message || e}`)
      }
    },
    async deleteImage(id) {
      if (!confirm('Видалити це фото?')) return
      try {
        await fetch(`${this.apiBase}/section-images/${id}`, { method: 'DELETE', headers: this.authHeaders() })
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
    getSectionLabel(sectionName) {
      const section = this.sections.find(s => s.name === sectionName)
      return section ? section.label : sectionName
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
   GALLERY FILTER
══════════════════════════════════════════ */
.gallery-filter-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.gallery-search {
  flex: 1;
  padding: 12px 18px;
  background: #1e293b;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.gallery-search::placeholder {
  color: #64748b;
}

.gallery-search:focus {
  border-color: rgba(59, 130, 246, 0.5);
}

.gallery-total {
  white-space: nowrap;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  min-width: 60px;
  text-align: right;
}

.section-count {
  margin-left: auto;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #93c5fd;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
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

.btn-rotate {
  flex: 0 0 auto;
  padding: 9px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  background: #0f766e;
  color: white;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-rotate:hover {
  opacity: 0.85;
  transform: translateY(-1px);
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
