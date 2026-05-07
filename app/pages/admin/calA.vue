<script setup lang="ts">
definePageMeta({ middleware: 'admin-auth' })
import { onMounted, reactive, ref } from 'vue'

type PricingItem = {
  id: number
  title: string
  titleUk: string
  price: string
  priceMax?: string
  priceType: string
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

const globalDiscount = ref(0)

const loadDiscounts = async () => {
  try {
    const res = await fetch(`${apiUrl}/discounts/global`)
    if (res.ok) {
      const val = await res.json()
      globalDiscount.value = typeof val === 'number' ? val : 0
    }
  } catch {}
}

const discountedPrice = (price: string): string => {
  if (!globalDiscount.value) return price
  const num = parseFloat(price.replace(/[^\d.]/g, ''))
  if (isNaN(num)) return price
  return Math.round(num * (1 - globalDiscount.value / 100)).toString()
}

const categoryForm = reactive({
  id: '',
  title: '',
  description: '',
})

const itemForm = reactive({
  categoryId: '',
  title: '',
  titleUk: '',
  price: '',
  priceMax: '',
  priceType: 'fixed',
})

const loadCategories = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(baseUrl)
    if (!response.ok) throw new Error('Не вдалося завантажити категорії')
    const data = await response.json()
    categories.value = data
    const firstCategory = categories.value[0]
    if (!selectedCategoryId.value && firstCategory) {
      selectedCategoryId.value = firstCategory.id
      itemForm.categoryId = firstCategory.id
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const createCategory = async () => {
  if (!categoryForm.id || !categoryForm.title || !categoryForm.description) {
    errorMessage.value = 'Заповніть усі поля для категорії'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`${baseUrl}/category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити категорію')
    const created = await response.json()
    categories.value.push({ ...created, items: [] })
    selectedCategoryId.value = created.id
    itemForm.categoryId = created.id
    categoryForm.id = ''
    categoryForm.title = ''
    categoryForm.description = ''
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
      const firstCategory = categories.value[0]
      selectedCategoryId.value = firstCategory?.id ?? ''
      itemForm.categoryId = selectedCategoryId.value
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const createItem = async () => {
  if (!itemForm.categoryId || !itemForm.title || !itemForm.titleUk || !itemForm.price) {
    errorMessage.value = 'Заповніть усі поля для елемента'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`${baseUrl}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemForm),
    })
    if (!response.ok) throw new Error('Не вдалося створити елемент')

    const created = await response.json()
    const category = categories.value.find((category) => category.id === created.categoryId)
    if (category) {
      category.items.push(created)
    }
    itemForm.title = ''
    itemForm.titleUk = ''
    itemForm.price = ''
    itemForm.priceMax = ''
    itemForm.priceType = 'fixed'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

const deleteItem = async (id: number) => {
  if (!confirm('Видалити елемент?')) return
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

onMounted(() => { loadCategories(); loadDiscounts() })
</script>

<template>
  <section class="pricing-admin">
    <h1>Каталог послуг</h1>

    <div class="form-row">
      <div class="form-block">
        <h2>Нова категорія</h2>
        <label>
          ID
          <input v-model="categoryForm.id" placeholder="bathroom" />
        </label>
        <label>
          Заголовок
          <input v-model="categoryForm.title" placeholder="Bathroom Services" />
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
          Назва EN
          <input v-model="itemForm.title" placeholder="Shower installation" />
        </label>
        <label>
          Назва UK
          <input v-model="itemForm.titleUk" placeholder="Встановлення душу" />
        </label>
        <label>
          Ціна від (мін)
          <input v-model="itemForm.price" placeholder="900" />
        </label>
        <label>
          Ціна до (макс, необов'язково)
          <input v-model="itemForm.priceMax" placeholder="1500" />
        </label>
        <label>
          Тип ціни
          <select v-model="itemForm.priceType">
            <option value="fixed">fixed</option>
            <option value="m2">sq ft (m2)</option>
            <option value="lft">linear ft (lft)</option>
            <option value="m2l">sq ft labor (m2l)</option>
          </select>
        </label>
        <button @click.prevent="createItem" :disabled="loading">Додати елемент</button>
      </div>
    </div>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="loading" class="status">Завантаження...</div>

    <div class="categories-list">
      <h2>Категорії</h2>
      <div v-if="categories.length === 0">Категорій не знайдено.</div>
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-header">
          <div>
            <h3>{{ category.title }} <small>({{ category.id }})</small></h3>
            <p>{{ category.description }}</p>
          </div>
          <button @click.prevent="deleteCategory(category.id)" :disabled="loading">Видалити</button>
        </div>

        <div class="items-block">
          <h4>Елементи</h4>
          <div v-if="category.items.length === 0">Немає елементів</div>
          <ul>
            <li v-for="item in category.items" :key="item.id">
              <span>
                {{ item.title }} / {{ item.titleUk }} —
                <template v-if="globalDiscount > 0">
                  <s class="price-original">${{ item.price }}</s>
                  <strong class="price-discounted">${{ discountedPrice(item.price) }}</strong>
                  <span class="price-badge">−{{ globalDiscount }}%</span>
                </template>
                <template v-else>${{ item.price }}{{ item.priceMax ? ` – $${item.priceMax}` : '' }}</template>
                {{ item.priceType === 'm2' ? '/sq ft' : item.priceType === 'lft' ? '/linear ft' : item.priceType === 'm2l' ? '/sq ft (labor)' : '' }}
              </span>
              <button @click.prevent="deleteItem(item.id)" :disabled="loading">Видалити</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-admin {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-block {
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.8);
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
  padding: 10px 12px;
  margin-top: 8px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  color: #fff;
}

button {
  margin-top: 12px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #f87171;
  margin-bottom: 16px;
}

.status {
  margin-bottom: 16px;
  color: #38bdf8;
}

.category-card {
  margin-bottom: 18px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.items-block ul {
  list-style: none;
  padding-left: 0;
  margin: 12px 0 0;
}

.items-block li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.price-original {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
  margin-right: 4px;
}

.price-discounted {
  color: #34d399;
  margin-right: 4px;
}

.price-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.15);
  color: #34d399;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(34, 197, 94, 0.3);
}
</style>
