<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type PricingItem = {
  id: number
  title: string
  titleUk: string
  price: string
  categoryId: string
}

type PricingCategory = {
  id: string
  title: string
  description: string
  items: PricingItem[]
}

const apiUrl = useRuntimeConfig().public.apiUrl
const baseUrl = `${apiUrl}/pricing`
const categories = ref<PricingCategory[]>([])
const selectedCategoryId = ref('')
const loading = ref(false)
const errorMessage = ref('')

const categoryForm = ref({
  id: '',
  title: '',
  description: '',
})

const itemForm = ref({
  categoryId: '',
  title: '',
  titleUk: '',
  price: '',
})

const selectedCategory = computed(() =>
  categories.value.find((category) => category.id === selectedCategoryId.value),
)

const loadCategories = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(baseUrl)
    if (!response.ok) throw new Error('Failed to load categories')
    categories.value = await response.json()
    if (!selectedCategoryId.value && categories.value.length > 0) {
      selectedCategoryId.value = categories.value[0].id
    }
    if (!itemForm.value.categoryId && categories.value.length > 0) {
      itemForm.value.categoryId = categories.value[0].id
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const createCategory = async () => {
  if (!categoryForm.value.id || !categoryForm.value.title || !categoryForm.value.description) {
    errorMessage.value = 'Заповніть всі поля категорії'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${baseUrl}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryForm.value),
    })
    if (!response.ok) {
      throw new Error('Не вдалося створити категорію')
    }
    const created = await response.json()
    categories.value.push({ ...created, items: [] })
    selectedCategoryId.value = created.id
    categoryForm.value = { id: '', title: '', description: '' }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id: string) => {
  if (!confirm('Видалити категорію?')) return

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${baseUrl}/category/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Не вдалося видалити категорію')
    categories.value = categories.value.filter((category) => category.id !== id)
    if (selectedCategoryId.value === id) {
      selectedCategoryId.value = categories.value.length > 0 ? categories.value[0].id : ''
    }
    if (itemForm.value.categoryId === id) {
      itemForm.value.categoryId = categories.value.length > 0 ? categories.value[0].id : ''
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const createItem = async () => {
  if (!itemForm.value.categoryId || !itemForm.value.title || !itemForm.value.titleUk || !itemForm.value.price) {
    errorMessage.value = 'Заповніть всі поля елемента'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${baseUrl}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemForm.value),
    })
    if (!response.ok) throw new Error('Не вдалося створити елемент')
    const created = await response.json()
    const category = categories.value.find((cat) => cat.id === created.categoryId)
    if (category) {
      category.items.push(created)
    }
    itemForm.value.title = ''
    itemForm.value.titleUk = ''
    itemForm.value.price = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id: number) => {
  if (!confirm('Видалити елемент прайсу?')) return

  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`${baseUrl}/item/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Не вдалося видалити елемент')
    categories.value = categories.value.map((category) => ({
      ...category,
      items: category.items.filter((item) => item.id !== id),
    }))
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(loadCategories)
</script>

<template>
  <section class="pricing-admin">
    <h1>Адмінка прайсів</h1>

    <div class="form-row">
      <div class="form-block">
        <h2>Нова категорія</h2>
        <label>
          ID
          <input v-model="categoryForm.id" placeholder="roofing" />
        </label>
        <label>
          Заголовок
          <input v-model="categoryForm.title" placeholder="Roofing Services" />
        </label>
        <label>
          Опис
          <textarea v-model="categoryForm.description" placeholder="Опис категорії"></textarea>
        </label>
        <button @click.prevent="createCategory" :disabled="loading">Додати категорію</button>
      </div>

      <div class="form-block">
        <h2>Новий елемент</h2>
        <label>
          Категорія
          <select v-model="itemForm.categoryId">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
        <label>
          Назва
          <input v-model="itemForm.title" placeholder="Roof inspection" />
        </label>
        <label>
          Назва українською
          <input v-model="itemForm.titleUk" placeholder="Огляд даху" />
        </label>
        <label>
          Ціна
          <input v-model="itemForm.price" placeholder="$120" />
        </label>
        <button @click.prevent="createItem" :disabled="loading">Додати елемент</button>
      </div>
    </div>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="loading" class="status">Завантаження...</div>

    <div class="categories-list">
      <h2>Категорії прайсів</h2>
      <div v-if="categories.length === 0">Категорії не знайдені.</div>
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-header">
          <h3>{{ category.title }} ({{ category.id }})</h3>
          <button @click="deleteCategory(category.id)" :disabled="loading">Видалити категорію</button>
        </div>
        <p>{{ category.description }}</p>
        <div class="items-block">
          <h4>Елементи</h4>
          <div v-if="category.items.length === 0">Немає елементів</div>
          <ul>
            <li v-for="item in category.items" :key="item.id">
              <span>{{ item.title }} / {{ item.titleUk }} — {{ item.price }}</span>
              <button @click="deleteItem(item.id)" :disabled="loading">Видалити</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-admin {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: sans-serif;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-block {
  padding: 18px;
  border: 1px solid #b35858;
  border-radius: 14px;
  background: #7a5353;
}

.form-block h2 {
  margin-top: 0;
}

label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #482828;
  border-radius: 8px;
}

button {
  margin-top: 12px;
  padding: 10px 16px;
  border: none;
  background: #2563eb;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}

.error {
  color: #b91c1c;
  margin-bottom: 16px;
}

.status {
  margin-bottom: 16px;
  color: #2563eb;
}

.category-card {
  margin-bottom: 18px;
  padding: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #a03a3a;
}

.category-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.items-block ul {
  list-style: none;
  padding-left: 0;
}

.items-block li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.items-block li:last-child {
  border-bottom: none;
}
</style>
